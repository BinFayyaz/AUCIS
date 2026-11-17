// One timeline drives both the form and mascot; stable phases never restart it.
export const JOIN_SEQUENCE = {
  'flying-bottom': { next: 'enlarging', duration: 800, panel: 100 },
  enlarging: { next: 'hands-down', duration: 800, panel: 100 },
  'hands-down': { next: 'hands-up', duration: 1000, panel: 100 },
  'hands-up': { next: 'flying-up', duration: 900, panel: 55 },
  'flying-up': { next: 'returning', duration: 900, panel: 0 },
  returning: { next: 'form', duration: 800, panel: 0 },
  form: { panel: 0 },
  error: { panel: 0 },
  collecting: { next: 'rolling', duration: 850, panel: 0 },
  rolling: { next: 'shrinking', duration: 1300, panel: 0 },
  shrinking: { next: 'holding', duration: 900, panel: 0 },
  holding: { panel: 0 },
}

export const ARM_REACH = 1.8 * 1.5

export function getJoinRobotTarget(phase, viewport, robot) {
  const { width: vw, height: vh } = viewport
  const { width, height } = robot
  const mobile = vw < 640
  const parked = { x: vw - (mobile ? 59 : 108), y: mobile ? 70 : 230, scale: mobile ? 0.48 : 0.68 }
  const bottom = { x: vw / 2, y: vh - height * 0.4, scale: 1 }
  // Pulling the form up: the robot stands high enough that its fully stretched
  // arms reach just past the panel's top edge, so the hands land on the form
  // while the torso stays above it and the legs disappear behind it.
  const pull = { x: vw / 2, y: vh * 0.44, scale: mobile ? 1.5 : 1.8 }
  const lifted = { x: vw / 2, y: Math.max(150, height * 0.55), scale: 1 }

  switch (phase) {
    case 'flying-bottom': return bottom
    case 'enlarging':
    case 'hands-down': return { ...bottom, scale: 2 }
    case 'hands-up': return pull
    case 'flying-up': return lifted
    case 'collecting':
    case 'rolling':
    case 'shrinking': return { x: Math.max(width / 2, (vw - (mobile ? 0 : 210)) / 2), y: Math.max(110, height * 0.34), scale: 0.72 }
    default: return parked
  }
}
