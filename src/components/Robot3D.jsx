import { useEffect, useMemo, useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import './Robot3D.css'

// ---------------------------------------------------------------------------
// Palette — mirrors the site theme variables (navy / sand / teal).
// ---------------------------------------------------------------------------
const CERAMIC = '#f3eee1'
const CERAMIC_WARM = '#e6ddc8'
const NAVY = '#0f1d2e'
const DEEP = '#1b2638'
const SAND = '#d4c4a8'
const TEAL = '#5cd6c0'
const TEAL_LIGHT = '#a8f4e3'

/** Soft studio reflections so the ceramic shell reads as a real 3D object. */
function StudioEnvironment() {
  const { gl, scene } = useThree()

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const room = new RoomEnvironment()
    const texture = pmrem.fromScene(room, 0.04).texture

    scene.environment = texture
    scene.environmentIntensity = 0.5

    return () => {
      texture.dispose()
      pmrem.dispose()
      room.traverse((node) => {
        node.geometry?.dispose()
        node.material?.dispose()
      })
    }
  }, [gl, scene])

  return null
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return reduced
}

/** A single arm: ceramic upper, navy joint, ceramic forearm, glowing palm. */
function Arm({ side = 1, armRef }) {
  return (
    <group ref={armRef} position={[0.56 * side, 0.4, 0]} rotation={[0, 0, -0.26 * side]}>
      {/* shoulder cap */}
      <mesh>
        <sphereGeometry args={[0.17, 32, 32]} />
        <meshPhysicalMaterial color={NAVY} roughness={0.32} metalness={0.7} clearcoat={0.8} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.17, 0.016, 12, 40]} />
        <meshStandardMaterial color={TEAL} emissive={TEAL} emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
      {/* upper arm */}
      <mesh position={[0.02 * side, -0.24, 0]}>
        <capsuleGeometry args={[0.1, 0.22, 8, 24]} />
        <meshPhysicalMaterial
          color={CERAMIC}
          roughness={0.3}
          metalness={0.06}
          clearcoat={1}
          clearcoatRoughness={0.22}
        />
      </mesh>
      {/* elbow */}
      <mesh position={[0.02 * side, -0.44, 0]}>
        <sphereGeometry args={[0.105, 28, 28]} />
        <meshPhysicalMaterial color={NAVY} roughness={0.34} metalness={0.65} />
      </mesh>
      {/* forearm */}
      <mesh position={[0.06 * side, -0.63, 0.05]} rotation={[0.18, 0, -0.16 * side]}>
        <capsuleGeometry args={[0.082, 0.2, 8, 24]} />
        <meshPhysicalMaterial
          color={CERAMIC_WARM}
          roughness={0.32}
          metalness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.26}
        />
      </mesh>
      {/* palm */}
      <mesh position={[0.1 * side, -0.83, 0.1]}>
        <sphereGeometry args={[0.095, 24, 24]} />
        <meshPhysicalMaterial color={NAVY} roughness={0.36} metalness={0.6} />
      </mesh>
      <mesh position={[0.1 * side, -0.87, 0.16]}>
        <sphereGeometry args={[0.028, 16, 16]} />
        <meshStandardMaterial color={TEAL_LIGHT} emissive={TEAL} emissiveIntensity={2.4} toneMapped={false} />
      </mesh>
    </group>
  )
}

function Robot({ reduced, externalPose }) {
  const body = useRef(null)
  const head = useRef(null)
  const core = useRef(null)
  const thruster = useRef(null)
  const orbA = useRef(null)
  const orbB = useRef(null)
  const [pose, setPose] = useState('idle')
  const poseTimer = useRef(null)
  const leftArmRef = useRef(null)
  const rightArmRef = useRef(null)

  const pointer = useRef({ x: 0, y: 0 })
  const aim = useRef({ x: 0, y: 0 })

  const torsoGeometry = useMemo(() => {
    const profile = [
      [0, -0.36],
      [0.3, -0.3],
      [0.44, -0.16],
      [0.5, 0.05],
      [0.5, 0.28],
      [0.43, 0.48],
      [0.26, 0.59],
      [0, 0.61],
    ].map(([x, y]) => new THREE.Vector2(x, y))
    return new THREE.LatheGeometry(profile, 64)
  }, [])

  useEffect(() => () => torsoGeometry.dispose(), [torsoGeometry])

  useEffect(() => {
    const onMove = (event) => {
      aim.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      }
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const triggerPose = (newPose) => {
    if (externalPose) return
    setPose(newPose)
    if (poseTimer.current) clearTimeout(poseTimer.current)
    poseTimer.current = setTimeout(() => setPose('idle'), 2500)
  }

  useEffect(() => () => clearTimeout(poseTimer.current), [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const ease = Math.min(delta, 0.05)
    const eff = externalPose || pose

    if (reduced) {
      pointer.current.x = THREE.MathUtils.damp(pointer.current.x, 0, 4, ease)
      pointer.current.y = THREE.MathUtils.damp(pointer.current.y, 0, 4, ease)
    } else {
      pointer.current.x = THREE.MathUtils.damp(pointer.current.x, aim.current.x, 2.6, ease)
      pointer.current.y = THREE.MathUtils.damp(pointer.current.y, aim.current.y, 2.6, ease)
    }

    if (body.current) {
      body.current.position.y = reduced ? 0 : Math.sin(t * 1.1) * 0.06
      body.current.rotation.y = reduced ? 0 : Math.sin(t * 0.42) * 0.28 + pointer.current.x * 0.34
      body.current.rotation.x = reduced ? 0 : Math.cos(t * 0.36) * 0.04 - pointer.current.y * 0.1
      if (eff === 'giggle') {
        body.current.rotation.z = Math.sin(t * 28) * 0.1
        body.current.position.x = Math.sin(t * 28) * 0.04
      } else {
        body.current.rotation.z = reduced ? 0 : Math.sin(t * 0.55) * 0.03
        body.current.position.x = THREE.MathUtils.damp(body.current.position.x, 0, 8, ease)
      }
    }

    // Arm animation driven by the effective pose.
    if (eff === 'hands-down') {
      // Arms point straight down and stretch downward.
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = THREE.MathUtils.damp(rightArmRef.current.rotation.z, 0, 8, ease)
        rightArmRef.current.scale.y = THREE.MathUtils.damp(rightArmRef.current.scale.y, 1.8, 8, ease)
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = THREE.MathUtils.damp(leftArmRef.current.rotation.z, 0, 8, ease)
        leftArmRef.current.scale.y = THREE.MathUtils.damp(leftArmRef.current.scale.y, 1.8, 8, ease)
      }
    } else {
      const rightArmTarget = eff === 'hands-to-head' ? 2.3 : -0.26
      const leftArmTarget = eff === 'hands-to-head' ? -2.3 : 0.26
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = THREE.MathUtils.damp(rightArmRef.current.rotation.z, rightArmTarget, 8, ease)
        rightArmRef.current.scale.y = THREE.MathUtils.damp(rightArmRef.current.scale.y, 1, 8, ease)
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = THREE.MathUtils.damp(leftArmRef.current.rotation.z, leftArmTarget, 8, ease)
        leftArmRef.current.scale.y = THREE.MathUtils.damp(leftArmRef.current.scale.y, 1, 8, ease)
      }
    }

    if (head.current) {
      head.current.rotation.y = pointer.current.x * 0.3 + (reduced ? 0 : Math.sin(t * 0.63) * 0.08)
      head.current.rotation.x = pointer.current.y * 0.16
      head.current.rotation.z = reduced ? 0 : Math.sin(t * 0.9) * 0.02
    }

    if (core.current) {
      core.current.material.emissiveIntensity = reduced ? 1.8 : 1.7 + Math.sin(t * 2.2) * 0.5
    }

    if (thruster.current) {
      const pulse = reduced ? 1 : 1 + Math.sin(t * 3.4) * 0.14
      thruster.current.scale.set(pulse, pulse, pulse)
      thruster.current.material.emissiveIntensity = 2.2 + (reduced ? 0 : Math.sin(t * 3.4) * 0.8)
    }

    if (!reduced) {
      if (orbA.current) {
        orbA.current.position.x = Math.cos(t * 0.8) * 1.12
        orbA.current.position.z = Math.sin(t * 0.8) * 1.12
        orbA.current.position.y = 0.5 + Math.sin(t * 1.4) * 0.09
      }
      if (orbB.current) {
        orbB.current.position.x = Math.cos(-t * 0.62 + 2.1) * 1.24
        orbB.current.position.z = Math.sin(-t * 0.62 + 2.1) * 1.24
        orbB.current.position.y = -0.35 + Math.cos(t * 1.1) * 0.08
      }
    }
  })

  return (
    <group ref={body} onClick={(e) => { e.stopPropagation(); triggerPose('giggle') }}>
      {/* ---- head ---- */}
      <group
        ref={head}
        position={[0, 1.1, 0]}
        onClick={(e) => { e.stopPropagation(); triggerPose('hands-to-head') }}
      >
        <mesh scale={[1, 0.94, 0.92]}>
          <sphereGeometry args={[0.5, 64, 64]} />
          <meshPhysicalMaterial color={CERAMIC} roughness={0.26} metalness={0.06} clearcoat={1} clearcoatRoughness={0.18} />
        </mesh>
        <mesh position={[0, 0.01, 0.1]} scale={[0.95, 0.52, 0.74]}>
          <sphereGeometry args={[0.5, 48, 48]} />
          <meshPhysicalMaterial color={DEEP} roughness={0.1} metalness={0.6} clearcoat={1} clearcoatRoughness={0.08} />
        </mesh>
        {[-1, 1].map((side) => (
          <mesh key={side} position={[0.145 * side, 0.055, 0.452]} scale={[0.078, 0.042, 0.03]} rotation={[0, 0, -0.08 * side]}>
            <sphereGeometry args={[1, 24, 24]} />
            <meshStandardMaterial color="#c9fff4" emissive={TEAL} emissiveIntensity={3} toneMapped={false} />
          </mesh>
        ))}
        {[-1, 1].map((side) => (
          <mesh key={side} position={[0.47 * side, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.11, 0.11, 0.08, 32]} />
            <meshPhysicalMaterial color={NAVY} roughness={0.3} metalness={0.75} clearcoat={0.8} />
          </mesh>
        ))}
        {[-1, 1].map((side) => (
          <mesh key={`dot-${side}`} position={[0.515 * side, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.038, 0.038, 0.02, 24]} />
            <meshStandardMaterial color={TEAL} emissive={TEAL} emissiveIntensity={1.8} toneMapped={false} />
          </mesh>
        ))}
        <mesh position={[0.16, 0.55, -0.08]}>
          <cylinderGeometry args={[0.016, 0.02, 0.3, 12]} />
          <meshStandardMaterial color={NAVY} metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.16, 0.72, -0.08]}>
          <sphereGeometry args={[0.055, 20, 20]} />
          <meshStandardMaterial color={TEAL_LIGHT} emissive={TEAL} emissiveIntensity={2.6} toneMapped={false} />
        </mesh>
      </group>

      {/* ---- neck ---- */}
      <mesh position={[0, 0.66, 0]}>
        <cylinderGeometry args={[0.14, 0.18, 0.14, 32]} />
        <meshPhysicalMaterial color={NAVY} roughness={0.34} metalness={0.7} />
      </mesh>

      {/* ---- torso ---- */}
      <mesh geometry={torsoGeometry}>
        <meshPhysicalMaterial color={CERAMIC} roughness={0.28} metalness={0.07} clearcoat={1} clearcoatRoughness={0.2} />
      </mesh>

      {/* chest core */}
      <mesh position={[0, 0.16, 0.455]}>
        <torusGeometry args={[0.195, 0.045, 20, 64]} />
        <meshPhysicalMaterial color={NAVY} roughness={0.24} metalness={0.85} clearcoat={1} />
      </mesh>
      <mesh ref={core} position={[0, 0.16, 0.45]}>
        <circleGeometry args={[0.165, 48]} />
        <meshStandardMaterial color={TEAL} emissive={TEAL} emissiveIntensity={1.8} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.08, 0.44]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.032, 0.2, 6, 20]} />
        <meshStandardMaterial color={SAND} metalness={0.4} roughness={0.45} />
      </mesh>

      {/* shoulder arms */}
      <Arm side={1} armRef={rightArmRef} />
      <Arm side={-1} armRef={leftArmRef} />

      {/* ---- hover drive ---- */}
      <mesh position={[0, -0.47, 0]}>
        <cylinderGeometry args={[0.3, 0.17, 0.24, 32]} />
        <meshPhysicalMaterial color={NAVY} roughness={0.3} metalness={0.75} clearcoat={0.9} />
      </mesh>
      <mesh position={[0, -0.63, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.26, 0.035, 16, 64]} />
        <meshStandardMaterial color={TEAL} emissive={TEAL} emissiveIntensity={1.6} toneMapped={false} />
      </mesh>
      <mesh ref={thruster} position={[0, -0.66, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.24, 48]} />
        <meshBasicMaterial color={TEAL_LIGHT} transparent opacity={0.85} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.98, 0]}>
        <coneGeometry args={[0.3, 0.6, 32, 1, true]} />
        <meshBasicMaterial color={TEAL} transparent opacity={0.16} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>

      {/* ---- orbit accents ---- */}
      <mesh ref={orbA} position={[1.12, 0.5, 0]}>
        <sphereGeometry args={[0.045, 20, 20]} />
        <meshStandardMaterial color={TEAL_LIGHT} emissive={TEAL} emissiveIntensity={2.4} toneMapped={false} />
      </mesh>
      <mesh ref={orbB} position={[-1.2, -0.35, 0]}>
        <sphereGeometry args={[0.035, 20, 20]} />
        <meshStandardMaterial color={SAND} emissive={SAND} emissiveIntensity={1.2} toneMapped={false} />
      </mesh>
    </group>
  )
}

function Scene({ externalPose }) {
  const reduced = useReducedMotion()
  return (
    <>
      <StudioEnvironment />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 6]} intensity={2.6} color="#fff7e8" />
      <directionalLight position={[-5, 2, -4]} intensity={1.1} color="#8fd8ff" />
      <pointLight position={[-2.6, -1.4, 2.6]} intensity={9} distance={9} color={TEAL} />
      <pointLight position={[2.4, 2.2, -3]} intensity={6} distance={9} color={SAND} />
      <Robot reduced={reduced} externalPose={externalPose} />
    </>
  )
}

export default function Robot3D({ className = '', externalPose }) {
  return (
    <div className={`robot-3d ${className}`}>
      <div className="robot-3d-glow" aria-hidden="true" />
      <Canvas
        className="robot-3d-canvas"
        dpr={[1, 1.8]}
        camera={{ position: [0, 0.05, 7.1], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Scene externalPose={externalPose} />
        </Suspense>
      </Canvas>
    </div>
  )
}
