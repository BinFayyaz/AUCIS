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

// The open form leaves a right-hand gutter for the robot (see .join-layout in
// JoinRegistration.css). On wider screens the centred panel leaves extra room
// outside that gutter, so the robot may stand bigger the bigger the display.
const LAYOUT_MAX = 1136
const LAYOUT_INSET = 24
const LAYOUT_GUTTER = 210
const EDGE_MARGIN = 16
const BESIDE_PANEL_GAP = 12
const MAX_BESIDE_SCALE = 1.15

export function getJoinRobotTarget(phase, viewport, robot) {
  const { width: vw, height: vh } = viewport
  const { width, height } = robot
  const mobile = vw < 640

  // Free width between the panel's right edge and the screen edge.
  const panelRight = (vw + Math.min(LAYOUT_MAX, vw - LAYOUT_INSET * 2)) / 2 - LAYOUT_GUTTER
  const space = vw - panelRight - EDGE_MARGIN
  // Grow into that space (never past the robot's own size, never tiny), then
  // stand right beside the panel with a small gap.
  const besideScale = Math.min(MAX_BESIDE_SCALE, Math.max(0.6, (space - BESIDE_PANEL_GAP) / width))
  const besideX = panelRight + BESIDE_PANEL_GAP + (width * besideScale) / 2

  // Parked/stepped-aside spot: beside the open form, so the robot stays in
  // view instead of disappearing behind the panel.
  const gutterX = mobile ? vw - 59 : besideX
  const parkedY = mobile ? 70 : Math.max(160, Math.round(vh * 0.42))
  const parked = { x: gutterX, y: parkedY, scale: mobile ? 0.48 : besideScale }
  const bottom = { x: vw / 2, y: vh - height * 0.4, scale: 1 }
  // Pulling the form up: the robot stands high enough that its fully stretched
  // arms reach just past the panel's top edge, so the hands land on the form
  // while the torso stays above it and the legs disappear behind it.
  const pull = { x: vw / 2, y: vh * 0.44, scale: mobile ? 1.5 : 1.8 }
  // Released from the pull: it rises up beside the form and settles into place.
  const lifted = {
    x: gutterX,
    y: mobile ? 60 : Math.max(120, parkedY - 80),
    scale: parked.scale,
  }

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
