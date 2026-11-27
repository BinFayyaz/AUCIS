import { useState } from 'react';
import { teams } from '../data/teams.js';

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

const PHOTO_DIR = '/picture/team';

const orderedTeams = (() => {
  const list = [...teams];
  const technicalIndex = list.findIndex(
    (team) => /technical/i.test(team.name) || /technical/i.test(team.id)
  );
  if (technicalIndex > 0) {
    [list[0], list[technicalIndex]] = [list[technicalIndex], list[0]];
  }
  return list;
})();

const slugify = (name) =>
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getInitials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

export function TeamAvatar({ person, className }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={className}>
      {person.image && !imgError ? (
        <img
          src={person.image}
          alt={person.alt || person.name}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="avatar-initials" aria-hidden="true">
          {getInitials(person.name)}
        </span>
      )}
    </div>
  );
}

function LeaderCard({ person }) {
  const isLead = !/co-lead|coordinator/i.test(person.role);

  return (
    <div className={`member-card team-leader-card ${isLead ? 'is-lead' : ''}`}>
      <TeamAvatar person={person} className="member-image" />
      <div className="member-info">
        <h4>{person.name}</h4>
        <p className="member-role">{person.role}</p>
        {person.description && <p className="member-description">{person.description}</p>}
      </div>
    </div>
  );
}

function MemberChip({ person, role }) {
  return (
    <div className="team-member-card">
      <TeamAvatar person={person} className="member-avatar" />
      <div className="team-member-text">
        <p className="team-member-name">{person.name}</p>
        <p className="team-member-role">{role}</p>
      </div>
    </div>
  );
}

function TeamItem({ team, index, isOpen, onToggle }) {
  const seen = {};
  const withPhoto = (person) => {
    if (person.image) return person;
    const base = slugify(person.name);
    seen[base] = (seen[base] || 0) + 1;
    const file = seen[base] > 1 ? `${base}-${seen[base]}` : base;
    return { ...person, image: `${PHOTO_DIR}/${team.id}/${file}.jpg` };
  };

  const leaders = team.leaders.map(withPhoto);
  const members = team.members
    .map((m) => (typeof m === 'string' ? { name: m } : m))
    .map(withPhoto);
  const meta = [
    leaders.length ? plural(leaders.length, 'leader') : null,
    members.length ? plural(members.length, 'member') : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <div className={`team-item ${isOpen ? 'is-open' : ''}`}>
      <h3 className="team-heading">
        <button
          type="button"
          id={`team-tab-${team.id}`}
          className="team-toggle"
          aria-expanded={isOpen}
          aria-controls={`team-panel-${team.id}`}
          onClick={onToggle}
        >
          <span className="team-index">{String(index + 1).padStart(2, '0')}</span>
          <span className="team-title">
            <span className="team-name">{team.name}</span>
            <span className="team-meta">{meta}</span>
          </span>
          <span className="team-chevron" aria-hidden="true" />
        </button>
      </h3>

      <div
        id={`team-panel-${team.id}`}
        className="team-panel"
        role="region"
        aria-labelledby={`team-tab-${team.id}`}
      >
        <div className="team-panel-inner">
          <div className="team-panel-body">
            {leaders.length > 0 && (
              <>
                <p className="team-subheading">Leadership</p>
                <div className="team-leaders">
                  {leaders.map((person, i) => (
                    <LeaderCard key={`${person.name}-${i}`} person={person} />
                  ))}
                </div>
              </>
            )}

            {members.length > 0 && (
              <>
                <p className="team-subheading">Members</p>
                <div className="team-members">
                  {members.map((person, i) => (
                    <MemberChip key={`${person.name}-${i}`} person={person} role={team.memberRole} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamAccordion() {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="team-accordion">
      {orderedTeams.map((team, i) => (
        <TeamItem
          key={team.id}
          team={team}
          index={i}
          isOpen={openId === team.id}
          onToggle={() => setOpenId(openId === team.id ? null : team.id)}
        />
      ))}
    </div>
  );
}

export default TeamAccordion;