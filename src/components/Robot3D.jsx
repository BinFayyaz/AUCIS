import { useEffect, useMemo, useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import './Robot3D.css'
import RobotScroll from './RobotScroll.jsx'
import { ARM_REACH } from '../lib/joinSequence.js'

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

/**
 * A single arm: ceramic upper, navy joint, ceramic forearm, glowing palm. The
 * forearm and palm hang off the elbow group so the elbow can bend to put the
 * hand where a pose needs it.
 */
function Arm({ side = 1, armRef, elbowRef, children }) {
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
      {/* elbow — the forearm pivots here */}
      <group ref={elbowRef} position={[0.02 * side, -0.44, 0]}>
        <mesh>
          <sphereGeometry args={[0.105, 28, 28]} />
          <meshPhysicalMaterial color={NAVY} roughness={0.34} metalness={0.65} />
        </mesh>
        {/* forearm */}
        <mesh position={[0.04 * side, -0.19, 0.05]} rotation={[0.18, 0, -0.16 * side]}>
          <capsuleGeometry args={[0.082, 0.2, 8, 24]} />
          <meshPhysicalMaterial
            color={CERAMIC_WARM}
            roughness={0.32}
            metalness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.26}
          />
        </mesh>
        {children}
        {/* palm */}
        <mesh position={[0.08 * side, -0.39, 0.1]}>
          <sphereGeometry args={[0.095, 24, 24]} />
          <meshPhysicalMaterial color={NAVY} roughness={0.36} metalness={0.6} />
        </mesh>
        <mesh position={[0.08 * side, -0.43, 0.16]}>
          <sphereGeometry args={[0.028, 16, 16]} />
          <meshStandardMaterial color={TEAL_LIGHT} emissive={TEAL} emissiveIntensity={2.4} toneMapped={false} />
        </mesh>
      </group>
    </group>
  )
}

/**
 * A single leg: ceramic thigh, navy knee joint and a flat ceramic foot. The
 * hip and knee groups are exposed as refs so the gait can drive them.
 */
function Leg({ side = 1, hipRef, kneeRef, footRef }) {
  return (
    <group ref={hipRef} position={[0.215 * side, -0.5, 0]} rotation={[0, 0, 0.1 * side]}>
      {/* hip cap */}
      <mesh>
        <sphereGeometry args={[0.125, 28, 28]} />
        <meshPhysicalMaterial color={NAVY} roughness={0.32} metalness={0.7} clearcoat={0.8} />
      </mesh>
      {/* thigh */}
      <mesh position={[0, -0.145, 0]}>
        <capsuleGeometry args={[0.082, 0.17, 8, 24]} />
        <meshPhysicalMaterial
          color={CERAMIC}
          roughness={0.3}
          metalness={0.06}
          clearcoat={1}
          clearcoatRoughness={0.22}
        />
      </mesh>
      {/* knee — the shin pivots here */}
      <group ref={kneeRef} position={[0, -0.29, 0]}>
        <mesh>
          <sphereGeometry args={[0.092, 26, 26]} />
          <meshPhysicalMaterial color={NAVY} roughness={0.34} metalness={0.65} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.1, 0.011, 10, 32]} />
          <meshStandardMaterial color={TEAL} emissive={TEAL} emissiveIntensity={1.2} toneMapped={false} />
        </mesh>
        {/* shin */}
        <mesh position={[0, -0.135, 0]}>
          <capsuleGeometry args={[0.07, 0.15, 8, 24]} />
          <meshPhysicalMaterial
            color={CERAMIC_WARM}
            roughness={0.32}
            metalness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.26}
          />
        </mesh>
        {/* ankle joint + foot */}
        <group ref={footRef} position={[0, -0.27, 0]}>
          <mesh>
            <sphereGeometry args={[0.072, 22, 22]} />
            <meshPhysicalMaterial color={NAVY} roughness={0.36} metalness={0.6} />
          </mesh>
          <mesh position={[0, -0.05, 0.055]} scale={[0.11, 0.055, 0.16]}>
            <sphereGeometry args={[1, 24, 20]} />
            <meshPhysicalMaterial
              color={CERAMIC}
              roughness={0.3}
              metalness={0.06}
              clearcoat={1}
              clearcoatRoughness={0.22}
            />
          </mesh>
        </group>
      </group>
    </group>
  )
}

// --- Idle-animation helpers -------------------------------------------------

/** smoothstep: 0 → 1 eased curve for organic grow / shrink transitions. */
function smooth(t) {
  return t * t * (3 - 2 * t)
}

/**
 * Arm targets for each idle animation, keyed by elapsed seconds.  Returns the
 * same shape as the normal `armTargets` function so `poseArm` can apply them.
 */
function idleArmTargets(anim, elapsed, t, side) {
  const rest = { rz: -0.26 * side, rx: 0, ez: 0, ex: 0 }

  if (anim === 'apple-juggle') {
    if (elapsed < 1.5) return rest
    if (elapsed < 7) {
      // Both arms reach forward to juggle — arms tilt forward (rx) so elbows
      // and hands stay in front of the torso, not clipping into it.
      const frac = (elapsed - 1.5) % 1
      const armUp = 4 * frac * (1 - frac) // 0 → 1 → 0 per bounce
      return {
        rz: 0.1 * side,
        rx: -0.45 - armUp * 0.25,
        ez: 0,
        ex: -0.2 - armUp * 0.15,
      }
    }
    if (elapsed < 8) {
      // Throw — arms reach up
      return { rz: 2.3 * side, rx: -0.15, ez: -0.25, ex: -0.1 }
    }
    return rest
  }

  if (anim === 'twirl') {
    // Arms raised up-and-out in a "Y" pose so they clear the body silhouette
    // and stay visible as the torso spins 720°.
    if (elapsed < 0.5) {
      const p = smooth(elapsed / 0.5)
      return {
        rz: (-0.26 + (-2.0 + 0.26) * p) * side,
        rx: -0.2 * p,
        ez: 0,
        ex: 0,
      }
    }
    if (elapsed < 4.0) {
      return { rz: -2.0 * side, rx: -0.2, ez: 0, ex: 0 }
    }
    const p = smooth((elapsed - 4.0) / 0.5)
    return {
      rz: (-2.0 + (2.0 - 0.26) * p) * side,
      rx: -0.2 * (1 - p),
      ez: 0,
      ex: 0,
    }
  }

  if (anim === 'greeting') {
    if (side > 0) {
      // Right arm raises to the side of the head and waves — kept at z≈0
      // so the hand is always beside the head, never behind it.
      if (elapsed < 0.3) {
        const p = smooth(elapsed / 0.3)
        return { rz: 2.5 * p, rx: 0, ez: -0.15 * p, ex: -0.1 * p }
      }
      if (elapsed < 2.8) {
        const wave = Math.sin((elapsed - 0.3) * 8) * 0.35
        return { rz: 2.5 + wave, rx: 0, ez: -0.15, ex: -0.1 }
      }
      const p = smooth((elapsed - 2.8) / 0.7)
      return { rz: 2.5 * (1 - p), rx: 0, ez: -0.15 * (1 - p), ex: -0.1 * (1 - p) }
    }
    return rest
  }

  if (anim === 'stretch') {
    // Both arms reach straight up for a morning stretch.
    if (elapsed < 0.8) {
      const p = smooth(elapsed / 0.8)
      return {
        rz: (-0.26 + (2.6 + 0.26) * p) * side,
        rx: -0.05 * p,
        ez: -0.1 * p,
        ex: 0,
      }
    }
    if (elapsed < 3.0) {
      return { rz: 2.6 * side, rx: -0.05, ez: -0.1, ex: 0 }
    }
    const p = smooth((elapsed - 3.0) / 0.8)
    return {
      rz: (2.6 - (2.6 + 0.26) * p) * side,
      rx: -0.05 * (1 - p),
      ez: -0.1 * (1 - p),
      ex: 0,
    }
  }

  if (anim === 'look-around') {
    // Arms stay at rest; the head turns left-right (handled in useFrame).
    return rest
  }

  if (anim === 'bounce') {
    // Arms swing slightly outward with each hop.
    const bouncePhase = Math.sin(elapsed * 4)
    return {
      rz: (-0.26 + bouncePhase * 0.15) * side,
      rx: 0,
      ez: 0,
      ex: 0,
    }
  }

  if (anim === 'clap') {
    // Both arms come forward; hands meet at centre then part, repeatedly.
    if (elapsed < 0.5) {
      const p = smooth(elapsed / 0.5)
      return {
        rz: 0.1 * side * (1 - p) + 0 * p,
        rx: -0.5 * p,
        ez: -0.6 * side * p,
        ex: -0.3 * p,
      }
    }
    if (elapsed < 3.5) {
      const clapOpen = Math.abs(Math.sin(elapsed * Math.PI / 0.5))
      return {
        rz: 0,
        rx: -0.5,
        ez: (-0.6 + clapOpen * 0.3) * side,
        ex: -0.3,
      }
    }
    const p = smooth((elapsed - 3.5) / 0.5)
    return {
      rz: 0.1 * side * p,
      rx: -0.5 * (1 - p),
      ez: -0.6 * side * (1 - p),
      ex: -0.3 * (1 - p),
    }
  }

  return rest
}

function Robot({ reduced, externalPose, motionRef, pose: stance, idleAnimation }) {
  const recumbent = stance === 'recumbent'
  const body = useRef(null)
  const head = useRef(null)
  const core = useRef(null)
  const orbA = useRef(null)
  const orbB = useRef(null)
  const [pose, setPose] = useState('idle')
  const poseTimer = useRef(null)
  const leftArmRef = useRef(null)
  const rightArmRef = useRef(null)
  const leftElbowRef = useRef(null)
  const rightElbowRef = useRef(null)
  const rightHip = useRef(null)
  const rightKnee = useRef(null)
  const rightFoot = useRef(null)
  const leftHip = useRef(null)
  const leftKnee = useRef(null)
  const leftFoot = useRef(null)
  const gait = useRef({ phase: 0, amplitude: 0 })

  // Idle animation state — tracks which animation is playing and when it started
  const idleState = useRef({ name: null, startTime: 0 })
  // Apple + particle refs for the apple-juggle animation
  const appleGroup = useRef(null)
  const particleRef = useRef(null)

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

    // --- Gait (computed early so the walking bob can use it) ---
    const travel = recumbent ? 0 : motionRef?.current?.speed || 0
    const gaitTarget = reduced || recumbent ? 0 : Math.min(1, travel / 260)
    gait.current.amplitude = THREE.MathUtils.damp(gait.current.amplitude, gaitTarget, 4, ease)
    if (!reduced) gait.current.phase += ease * (1.8 + Math.min(travel, 1600) * 0.03)
    const stride = gait.current.amplitude

    // --- Idle animation tracking ---
    if (idleAnimation !== idleState.current.name) {
      idleState.current = { name: idleAnimation, startTime: t }
    }
    const idleElapsed = idleState.current.name ? t - idleState.current.startTime : -1
    const idleActive = idleAnimation && !externalPose && !recumbent && idleElapsed >= 0

    // --- Body ---
    if (recumbent && body.current) {
      body.current.rotation.z = THREE.MathUtils.damp(body.current.rotation.z, Math.PI / 2, 3, ease)
      body.current.rotation.x = THREE.MathUtils.damp(body.current.rotation.x, 0, 4, ease)
      body.current.rotation.y = THREE.MathUtils.damp(body.current.rotation.y, 0, 4, ease)
      body.current.position.x = THREE.MathUtils.damp(body.current.position.x, 0.25, 4, ease)
      body.current.position.y = reduced ? 0 : Math.sin(t * 0.9) * 0.02
    } else if (body.current) {
      if (idleActive) {
        // Robot stands still for idle animations — no hover, no walk bob
        body.current.position.x = THREE.MathUtils.damp(body.current.position.x, 0, 8, ease)
        body.current.rotation.x = THREE.MathUtils.damp(body.current.rotation.x, 0, 8, ease)
        body.current.rotation.z = THREE.MathUtils.damp(body.current.rotation.z, 0, 8, ease)
        body.current.position.y = THREE.MathUtils.damp(body.current.position.y, 0, 8, ease)

        if (idleAnimation === 'twirl') {
          if (idleElapsed < 0.5) {
            body.current.rotation.y = THREE.MathUtils.damp(body.current.rotation.y, 0, 8, ease)
          } else if (idleElapsed < 4.0) {
            body.current.rotation.y = ((idleElapsed - 0.5) / 3.5) * Math.PI * 4
          } else {
            body.current.rotation.y = THREE.MathUtils.damp(body.current.rotation.y, 0, 6, ease)
          }
        } else if (idleAnimation === 'bounce') {
          body.current.position.y = Math.abs(Math.sin(idleElapsed * 4)) * 0.12
          body.current.rotation.y = THREE.MathUtils.damp(body.current.rotation.y, 0, 8, ease)
        } else if (idleAnimation === 'stretch') {
          if (idleElapsed > 0.8 && idleElapsed < 3.0) {
            body.current.position.y = 0.06
          }
          body.current.rotation.y = THREE.MathUtils.damp(body.current.rotation.y, 0, 8, ease)
        } else {
          body.current.rotation.y = THREE.MathUtils.damp(body.current.rotation.y, 0, 8, ease)
        }
      } else {
        // Normal grounded stance: a gentle walking bob replaces the old hover
        body.current.position.y = reduced ? 0 : stride * Math.sin(gait.current.phase * 2) * 0.04
        body.current.rotation.y = reduced || externalPose ? 0 : Math.sin(t * 0.42) * 0.28 + pointer.current.x * 0.34
        body.current.rotation.x = reduced || externalPose ? 0 : Math.cos(t * 0.36) * 0.04 - pointer.current.y * 0.1
        if (eff === 'giggle') {
          body.current.rotation.z = Math.sin(t * 28) * 0.1
          body.current.position.x = Math.sin(t * 28) * 0.04
        } else {
          body.current.rotation.z = reduced ? 0 : Math.sin(t * 0.55) * 0.03
          body.current.position.x = THREE.MathUtils.damp(body.current.position.x, 0, 8, ease)
        }
      }
    }

    // --- Arms ---
    const roll = !reduced ? Math.sin(t * 10) * 0.22 : 0
    const armTargets = (side) => {
      if (recumbent) {
        return side > 0
          ? { rz: -0.45, rx: -1.15, ez: -0.55, ex: -0.25 }
          : { rz: -0.35, rx: -0.45, ez: 0.35, ex: -0.3 }
      }
      if (eff === 'hands-to-head') {
        return { rz: 2.3 * side, rx: -0.18, ez: -0.35 * side, ex: -0.15 }
      }
      if (eff === 'hands-down') {
        return { rz: 0, rx: 0, ez: 0, ex: 0, scale: ARM_REACH }
      }
      if (eff === 'holding-scroll') {
        return side > 0
          ? { rz: -0.45, rx: -1.1, ez: -0.55, ex: -0.35 }
          : { rz: 0.26, rx: 0, ez: 0, ex: 0 }
      }
      if (eff === 'rolling') {
        return { rz: -0.65 * side, rx: side * roll, ez: 0, ex: 0 }
      }
      return { rz: -0.26 * side, rx: 0, ez: 0, ex: 0 }
    }

    // When an idle animation is active, override the arm targets
    const resolveArms = (side) => {
      if (idleActive) {
        return idleArmTargets(idleAnimation, idleElapsed, t, side)
      }
      return armTargets(side)
    }

    const poseArm = (arm, elbow, targets) => {
      if (arm) {
        arm.rotation.z = THREE.MathUtils.damp(arm.rotation.z, targets.rz, 8, ease)
        arm.rotation.x = THREE.MathUtils.damp(arm.rotation.x, targets.rx, 8, ease)
        arm.scale.y = THREE.MathUtils.damp(arm.scale.y, targets.scale ?? 1, 8, ease)
      }
      if (elbow) {
        elbow.rotation.z = THREE.MathUtils.damp(elbow.rotation.z, targets.ez, 8, ease)
        elbow.rotation.x = THREE.MathUtils.damp(elbow.rotation.x, targets.ex, 8, ease)
      }
    }

    poseArm(rightArmRef.current, rightElbowRef.current, resolveArms(1))
    poseArm(leftArmRef.current, leftElbowRef.current, resolveArms(-1))

    // --- Apple-juggle prop animation ---
    if (appleGroup.current && particleRef.current) {
      const apple = appleGroup.current
      const particle = particleRef.current

      // Default: hide both props
      apple.visible = false
      particle.visible = false

      if (idleAnimation === 'apple-juggle' && idleElapsed >= 0) {
        const e = idleElapsed

        if (e < 1) {
          // Phase 0 — particle materialises in front of the robot
          particle.visible = true
          const s = smooth(e)
          particle.scale.setScalar(s)
          particle.material.opacity = s
          particle.material.emissiveIntensity = 3
          particle.position.set(0, 0.3, 0.62)
        } else if (e < 1.5) {
          // Phase 1 — particle blasts outward
          particle.visible = true
          const p = (e - 1) / 0.5
          particle.scale.setScalar(1 + p * 1.6)
          particle.material.opacity = 1 - p
          particle.material.emissiveIntensity = 3 + p * 6
          particle.position.set(0, 0.3, 0.62)
        } else if (e < 2) {
          // Phase 2 — apple appears where the particle blasted
          apple.visible = true
          const s = smooth((e - 1.5) / 0.5)
          apple.scale.setScalar(s)
          apple.position.set(0, 0.3, 0.62)
        } else if (e < 7) {
          // Phase 3 — bounce the apple 5 times
          apple.visible = true
          apple.scale.setScalar(1)
          const frac = (e - 2) % 1
          const y = 0.3 + 0.4 * 4 * frac * (1 - frac)
          apple.position.set(0, y, 0.62)
        } else if (e < 8) {
          // Phase 4 — throw the apple high into the air
          apple.visible = true
          apple.scale.setScalar(1)
          const p = (e - 7)
          apple.position.set(0, 0.3 + 1.5 * p, 0.62)
        } else if (e < 8.5) {
          // Phase 5 — apple shrinks and vanishes
          apple.visible = true
          const s = 1 - (e - 8) / 0.5
          apple.scale.setScalar(Math.max(0, s))
          apple.position.set(0, 1.8, 0.62)
        } else if (e < 9) {
          // Phase 6 — particle reappears where the apple was
          particle.visible = true
          const s = smooth((e - 8.5) / 0.5)
          particle.scale.setScalar(s)
          particle.material.opacity = s
          particle.material.emissiveIntensity = 3
          particle.position.set(0, 1.8, 0.62)
        } else if (e < 10) {
          // Phase 7 — particle fades away
          particle.visible = true
          particle.scale.setScalar(1)
          particle.material.opacity = 1 - (e - 9)
          particle.position.set(0, 1.8, 0.62)
        }
      }
    }

    // --- Legs ---
    const swing = Math.sin(gait.current.phase)
    const idleSway = 0.06 * (1 - stride)

    const poseLeg = (hip, knee, foot, hipAngle, kneeBend) => {
      if (!hip || !knee) return
      const bend = kneeBend ?? 0.14 + Math.max(0, -hipAngle) * 0.9
      hip.rotation.x = hipAngle
      knee.rotation.x = bend
      if (foot) foot.rotation.x = -(hipAngle + bend) * 0.6
    }

    const restBreath = reduced ? 0 : Math.sin(t * 0.9) * 0.04
    poseLeg(
      rightHip.current,
      rightKnee.current,
      rightFoot.current,
      recumbent ? 0.3 + restBreath : swing * 0.8 * stride + Math.sin(t * 1.2) * idleSway,
      recumbent ? 0.58 : undefined,
    )
    poseLeg(
      leftHip.current,
      leftKnee.current,
      leftFoot.current,
      recumbent ? 0.1 + restBreath : -swing * 0.8 * stride + Math.sin(t * 1.2 + 1.7) * idleSway,
      recumbent ? 0.24 : undefined,
    )

    // --- Head ---
    if (head.current) {
      if (recumbent) {
        head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, 0, 4, ease)
        head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, 0.1, 4, ease)
        head.current.rotation.z = reduced ? 0 : Math.sin(t * 0.9) * 0.03
      } else if (idleActive) {
        if (idleAnimation === 'look-around') {
          head.current.rotation.y = Math.sin(idleElapsed * 1.5) * 0.6
          head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, 0, 8, ease)
          head.current.rotation.z = THREE.MathUtils.damp(head.current.rotation.z, 0, 8, ease)
        } else {
          head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, 0, 8, ease)
          head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, 0, 8, ease)
          head.current.rotation.z = THREE.MathUtils.damp(head.current.rotation.z, 0, 8, ease)
        }
      } else {
        head.current.rotation.y = eff === 'dissatisfied' && !reduced ? Math.sin(t * 7) * 0.18 : externalPose ? 0 : pointer.current.x * 0.3 + (reduced ? 0 : Math.sin(t * 0.63) * 0.08)
        head.current.rotation.x = externalPose ? 0 : pointer.current.y * 0.16
        head.current.rotation.z = eff === 'dissatisfied' ? -0.1 : reduced ? 0 : Math.sin(t * 0.9) * 0.02
      }
    }

    if (core.current) {
      core.current.material.emissiveIntensity = reduced ? 1.8 : 1.7 + Math.sin(t * 2.2) * 0.5
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
        {externalPose === 'dissatisfied' ? (
          <group position={[0, 0.055, 0.49]}>
            {[-1, 1].map((direction) => (
              <mesh key={direction} rotation={[0, 0, direction * Math.PI / 4]}>
                <boxGeometry args={[0.29, 0.046, 0.025]} />
                <meshStandardMaterial color="#ff6262" emissive="#ff3030" emissiveIntensity={2} toneMapped={false} />
              </mesh>
            ))}
          </group>
        ) : [-1, 1].map((side) => (
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
      <Arm side={1} armRef={rightArmRef} elbowRef={rightElbowRef}>
        {externalPose === 'holding-scroll' && <RobotScroll />}
      </Arm>
      <Arm side={-1} armRef={leftArmRef} elbowRef={leftElbowRef} />

      {/* ---- legs ---- */}
      <Leg side={1} hipRef={rightHip} kneeRef={rightKnee} footRef={rightFoot} />
      <Leg side={-1} hipRef={leftHip} kneeRef={leftKnee} footRef={leftFoot} />

      {/* ---- contact shadow (replaces the old hover drive) ---- */}
      <mesh position={[0, -1.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.55, 32]} />
        <meshBasicMaterial color={NAVY} transparent opacity={0.22} depthWrite={false} />
      </mesh>

      {/* ---- apple-juggle props ---- */}
      <group ref={appleGroup} position={[0, 0.3, 0.62]} visible={false}>
        <mesh scale={[1, 0.9, 1]}>
          <sphereGeometry args={[0.11, 24, 24]} />
          <meshPhysicalMaterial color="#e63946" roughness={0.3} clearcoat={0.8} clearcoatRoughness={0.2} />
        </mesh>
        <mesh position={[0, 0.12, 0]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.011, 0.014, 0.05, 8]} />
          <meshStandardMaterial color="#5a3d2b" roughness={0.7} />
        </mesh>
        <mesh position={[0.04, 0.13, 0]} rotation={[0, 0, -0.5]} scale={[0.045, 0.022, 0.028]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshPhysicalMaterial color="#52b945" roughness={0.5} clearcoat={0.3} />
        </mesh>
      </group>

      <mesh ref={particleRef} position={[0, 0.3, 0.62]} visible={false}>
        <sphereGeometry args={[0.07, 20, 20]} />
        <meshStandardMaterial
          color={TEAL_LIGHT}
          emissive={TEAL}
          emissiveIntensity={3}
          transparent
          opacity={1}
          toneMapped={false}
        />
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

function Scene({ externalPose, motionRef, pose, idleAnimation }) {
  const reduced = useReducedMotion()
  return (
    <>
      <StudioEnvironment />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 6]} intensity={2.6} color="#fff7e8" />
      <directionalLight position={[-5, 2, -4]} intensity={1.1} color="#8fd8ff" />
      <pointLight position={[-2.6, -1.4, 2.6]} intensity={9} distance={9} color={TEAL} />
      <pointLight position={[2.4, 2.2, -3]} intensity={6} distance={9} color={SAND} />
      <Robot reduced={reduced} externalPose={externalPose} motionRef={motionRef} pose={pose} idleAnimation={idleAnimation} />
    </>
  )
}

export default function Robot3D({ className = '', externalPose, motionRef, pose, idleAnimation }) {
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
          <Scene externalPose={externalPose} motionRef={motionRef} pose={pose} idleAnimation={idleAnimation} />
        </Suspense>
      </Canvas>
    </div>
  )
}
