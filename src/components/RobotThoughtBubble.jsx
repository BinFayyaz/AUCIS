import './RobotThoughtBubble.css'

/**
 * A small "Hi!" thought bubble shown above the robot during the welcome
 * greeting animation.  Rendered inside the robot's container so it follows
 * the robot as it moves.
 */
export default function RobotThoughtBubble() {
  return (
    <div className="robot-thought-bubble" aria-hidden="true">
      <div className="robot-thought-bubble__cloud">Hi!</div>
      <span className="robot-thought-bubble__dot robot-thought-bubble__dot--1" />
      <span className="robot-thought-bubble__dot robot-thought-bubble__dot--2" />
      <span className="robot-thought-bubble__dot robot-thought-bubble__dot--3" />
    </div>
  )
}
