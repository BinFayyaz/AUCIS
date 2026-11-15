import Robot3D from './Robot3D.jsx'
import './PageRobot.css'

/**
 * The mascot on the inner pages. `pose="recumbent"` lays it on its right side
 * so it can rest on top of a heading word; the default keeps it hovering.
 */
export default function PageRobot({ pose = 'upright', className = '' }) {
  return (
    <div className={`page-robot ${className}`}>
      <Robot3D pose={pose} />
    </div>
  )
}
