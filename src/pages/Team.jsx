import './Team.css';
import TeamAccordion, { TeamAvatar } from '../components/TeamAccordion.jsx';

const patrons = [
  {
    name: 'Mustajab Hassan',
    role: 'Society Mentor',
    description: 'Mentors the society and guides its growth and direction.',
    image: '/pictures/Mr. Mustajab Hussain.jpg',
    alt: 'Mustajab Hussain',
  },
  {
    name: 'Dr. Muhammad Saud Khan',
    role: 'Chairperson',
    description: 'Chairs AUCIS and oversees its academic and strategic direction.',
    image: '/pictures/dr saud.jpg',
    alt: 'Dr. Muhammad Saud Khan',
  },
];

const president = {
  name: 'Abdul Rehman',
  role: 'President',
  description: 'Leads AUCIS, establishes its vision and represents the society.',
  image: '/picture/member.jpg',
  alt: 'Abdul Rehman',
};

const vicePresidents = [
  {
    name: 'Tayyab',
    role: 'Vice President',
    description: 'Assists the President and oversees society operations.',
    image: '/picture/tayyab.jpg',
    alt: 'Tayyab',
  },
  {
    name: 'Areeba Noor',
    role: 'Vice President',
    description: 'Supports leadership and coordinates society activities.',
    image: '/picture/areeba-noor.jpg',
    alt: 'Areeba Noor',
  },
];

const generalSecretaries = [
  {
    name: 'Jawad Mustafa',
    role: 'General Secretary',
    description: 'Manages official communication, records and administrative coordination.',
    image: '/picture/jawad mustafa.jpg',
    alt: 'Jawad Mustafa',
  },
  {
    name: 'Samrana Abbas',
    role: 'General Secretary',
    description: 'Coordinates society programmes and supports administrative activities.',
    image: '/picture/samrana-abbass.jpg',
    alt: 'Samrana Abbas',
  },
];

function MemberCard({ member, variant }) {
  return (
    <article className={`member-card ${variant}-card`}>
      <TeamAvatar person={member} className="member-image" />

      <div className="member-info">
        <h3>{member.name}</h3>
        <p className="member-role">{member.role}</p>
        <p className="member-description">{member.description}</p>
      </div>
    </article>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-description">{description}</p>
    </div>
  );
}

export default function Team() {
  return (
    <main className="team-page">
      <section className="page-header">
        <div className="page-header-inner">
          <p className="eyebrow">Air University Computing &amp; Innovation Society</p>

          <h1>
            Our <em>Team.</em>
          </h1>

          <p className="page-description">
            Meet the people driving innovation, collaboration and excellence at AUCIS.
          </p>
        </div>
      </section>

      <div className="team-container">
        <section className="members-section patron-section">
          <SectionHeading
            eyebrow="SOCIETY PATRONS"
            title="Our Patrons"
            description="The guidance and mentorship behind AUCIS."
          />

          <div className="patron-grid">
            {patrons.map((member) => (
              <MemberCard key={member.name} member={member} variant="patron" />
            ))}
          </div>
        </section>

        <section className="members-section">
          <SectionHeading
            eyebrow="SOCIETY LEADERSHIP"
            title="Core Team"
            description="The leadership guiding the vision and direction of AUCIS."
          />

          <div className="supervisor-section">
            <MemberCard member={president} variant="supervisor" />
          </div>

          <div className="executive-grid">
            {vicePresidents.map((member) => (
              <MemberCard key={member.name} member={member} variant="executive" />
            ))}
          </div>

          <div className="leadership-grid">
            {generalSecretaries.map((member) => (
              <MemberCard key={member.name} member={member} variant="leadership" />
            ))}
          </div>
        </section>

        <section className="members-section">
          <SectionHeading
            eyebrow="OUR DEPARTMENTS"
            title="Our Teams"
            description="Select a team to meet its leads, co-leads and members."
          />

          <TeamAccordion />
        </section>
      </div>
    </main>
  );
}
