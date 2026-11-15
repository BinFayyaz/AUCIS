import Reveal from './Reveal.jsx'
import './HierarchyChart.css'

const NODES = {
  supervisors: { label: 'Supervisors', sub: 'Faculty guidance' },
  president: { label: 'President', sub: 'Society lead' },
  vp: { label: 'Vice-President', sub: 'Supports the President' },
  lead1: { label: 'Team Lead 1', sub: 'Branch lead' },
  lead2: { label: 'Team Lead 2', sub: 'Branch lead' },
  colead1: { label: 'Team Co-Lead 1', sub: 'Deputy' },
  colead2: { label: 'Team Co-Lead 2', sub: 'Deputy' },
  members1: { label: 'Team Members', sub: 'Branch members' },
  members2: { label: 'Team Members', sub: 'Branch members' },
}

function Node({ id }) {
  const { label, sub } = NODES[id]
  return (
    <div className="hierarchy-node">
      <span className="hierarchy-label">{label}</span>
      <span className="hierarchy-sub">{sub}</span>
    </div>
  )
}

export default function HierarchyChart() {
  return (
    <section className="container-page pt-16">
      <Reveal>
        <div className="mb-10 text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-sand/50" />
            Structure
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl">Organisation Hierarchy</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/50">
            How AUCIS is organised — from faculty supervision down to team members.
          </p>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="hierarchy-chart">
          {/* Level 1: Supervisors */}
          <div className="hierarchy-level">
            <Node id="supervisors" />
          </div>

          {/* Level 2: President */}
          <div className="hierarchy-level">
            <div className="hierarchy-connector vertical" />
            <Node id="president" />
          </div>

          {/* Level 3: Vice-President */}
          <div className="hierarchy-level">
            <div className="hierarchy-connector vertical" />
            <Node id="vp" />
          </div>

          {/* Level 4: Split into two branches */}
          <div className="hierarchy-level hierarchy-split">
            <div className="hierarchy-branch">
              <div className="hierarchy-connector vertical" />
              <Node id="lead1" />
            </div>
            <div className="hierarchy-branch">
              <div className="hierarchy-connector vertical" />
              <Node id="lead2" />
            </div>
          </div>
          {/* Horizontal bar connecting the two branches */}
          <div className="hierarchy-bar" />

          {/* Level 5: Co-Leads */}
          <div className="hierarchy-level hierarchy-split">
            <div className="hierarchy-branch">
              <div className="hierarchy-connector vertical" />
              <Node id="colead1" />
            </div>
            <div className="hierarchy-branch">
              <div className="hierarchy-connector vertical" />
              <Node id="colead2" />
            </div>
          </div>

          {/* Level 6: Team Members */}
          <div className="hierarchy-level hierarchy-split">
            <div className="hierarchy-branch">
              <div className="hierarchy-connector vertical" />
              <Node id="members1" />
            </div>
            <div className="hierarchy-branch">
              <div className="hierarchy-connector vertical" />
              <Node id="members2" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
