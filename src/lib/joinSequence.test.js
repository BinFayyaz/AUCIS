import test from 'node:test'
import assert from 'node:assert/strict'
import { ARM_REACH, JOIN_SEQUENCE, getJoinRobotTarget } from './joinSequence.js'

test('opening is one continuous pull, including returning and error phases', () => {
  const path = []
  let phase = 'flying-bottom'
  while (phase) {
    path.push(phase)
    phase = JOIN_SEQUENCE[phase].next
  }
  assert.deepEqual(path, ['flying-bottom', 'enlarging', 'hands-down', 'hands-up', 'flying-up', 'returning', 'form'])
  const panel = path.map((step) => JOIN_SEQUENCE[step].panel)
  for (let i = 1; i < panel.length; i++) assert.ok(panel[i] <= panel[i - 1])
  assert.equal(JOIN_SEQUENCE.returning.panel, 0)
  assert.equal(JOIN_SEQUENCE.error.panel, 0)
})

test('successful submission rolls then shrinks and remains held without reopening', () => {
  assert.equal(JOIN_SEQUENCE.collecting.next, 'rolling')
  assert.equal(JOIN_SEQUENCE.rolling.next, 'shrinking')
  assert.equal(JOIN_SEQUENCE.shrinking.next, 'holding')
  assert.equal(JOIN_SEQUENCE.holding.next, undefined)
  for (const phase of ['collecting', 'rolling', 'shrinking', 'holding']) assert.equal(JOIN_SEQUENCE[phase].panel, 0)
})

test('arms reach 50 percent farther than the previous 1.8 scale', () => {
  assert.equal(ARM_REACH, 1.8 * 1.5)
})

for (const width of [390, 921, 1280]) {
  test(`robot goes bottom-center, doubles, lifts, then parks on the right at ${width}`, () => {
    const viewport = { width, height: 800 }
    const robot = { width: 280, height: 310 }
    const bottom = getJoinRobotTarget('flying-bottom', viewport, robot)
    assert.equal(bottom.x, width / 2)
    assert.ok(bottom.y > 600)
    assert.equal(getJoinRobotTarget('enlarging', viewport, robot).scale, 2)
    const up = getJoinRobotTarget('flying-up', viewport, robot)
    assert.ok(up.y < 200)
    const returning = getJoinRobotTarget('returning', viewport, robot)
    assert.ok(returning.x > width * 0.7)
    for (const phase of ['form', 'error', 'holding']) assert.deepEqual(getJoinRobotTarget(phase, viewport, robot), returning)
  })
}
