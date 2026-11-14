import './RobotSpeechBubble.css'

/**
 * A speech bubble that appears near the robot, showing form validation errors.
 * Positioned on the right side where the robot sits during the join sequence.
 */
export default function RobotSpeechBubble({ message }) {
  if (!message) return null

  return (
    <div className="robot-speech-bubble" role="alert">
      <div className="speech-content">
        <span className="speech-icon">⚠</span>
        <p>{message}</p>
      </div>
      <div className="speech-tail" />
    </div>
  )
}
