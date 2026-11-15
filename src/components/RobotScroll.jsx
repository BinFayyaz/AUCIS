// This lives inside the right palm's group, so the rolled application follows
// the actual hand rather than floating independently of the 3D robot.
export default function RobotScroll() {
  return (
    <group position={[0.08, -0.39, 0.15]} rotation={[0, 0, Math.PI / 2]}>
      <mesh>
        <cylinderGeometry args={[0.085, 0.085, 0.65, 32]} />
        <meshPhysicalMaterial color="#f4f1de" roughness={0.6} clearcoat={0.2} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.09, 0.09, 0.1, 32]} />
        <meshStandardMaterial color="#5cd6c0" metalness={0.4} roughness={0.35} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[0, 0.33 * side, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.059, 0.012, 8, 24]} />
          <meshStandardMaterial color="#d4c4a8" roughness={0.7} />
        </mesh>
      ))}
    </group>
  )
}
