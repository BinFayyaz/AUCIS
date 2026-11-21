/**
 * All editable site content lives here.
 *
 * Where you see `null` (email, socials, supervisors, events), the site shows a
 * graceful "coming soon" state — fill the value in and it appears everywhere.
 */

export const site = {
  name: 'AUCIS',
  campus: 'Air University · Kamra Campus',
  tagline: 'Learn. Lead. Innovate.',
  intro:
    'AUCIS is the student computing and innovation society of Air University, Kamra Campus — a home for builders, problem solvers and the endlessly curious.',
  email: null, // e.g. 'aucis@au.edu.pk'
  location: {
    line1: 'Air University, Kamra Campus',
    line2: 'Attock, Punjab, Pakistan',
  },
  socials: [
    // { label: 'Instagram', href: 'https://instagram.com/...' },
  ],
}

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Team', to: '/team' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
]

export const pillars = [
  {
    title: 'Workshops',
    icon: 'code',
    text: 'Hands-on sessions where members ship something real — from first lines of code to deployed products.',
  },
  {
    title: 'Competitions',
    icon: 'trophy',
    text: 'Hackathons, coding contests and problem-solving sprints that sharpen judgement under pressure.',
  },
  {
    title: 'Tech Talks',
    icon: 'mic',
    text: 'Conversations with faculty, alumni and industry practitioners on where computing is heading.',
  },
  {
    title: 'Showcases',
    icon: 'sparkles',
    text: 'A stage for members to present the projects they have built and the ideas behind them.',
  },
]

export const objectives = [
  'Build a consistent practice of learning beyond the classroom.',
  'Give every member a portfolio of work they can be proud of.',
  'Connect students with alumni and industry mentors.',
  'Represent Air University Kamra in national competitions.',
  'Make technical skill accessible to every department on campus.',
]

/** Supervisors — names and photos to be added. */
export const supervisors = []

export const executiveBody = [
  {
    name: 'Abdur Rehman',
    role: 'President',
    note: 'Leads the society, sets direction and represents AUCIS on campus.',
  },
  {
    name: 'Tayyab',
    role: 'Vice President',
    note: 'Supports the President and keeps every team moving in step.',
  },
  {
    name: 'Aimen Nadeem',
    role: 'Co-Lead',
    note: 'Coordinates programmes and member experience across the society.',
  },
]

export const coreRoles = [
  {
    name: 'Fatima Batool',
    role: 'Technical Lead',
    note: 'Owns the technical programme — workshops, builds and competition teams.',
  },
  {
    name: 'Fahham Bin Fayyaz',
    role: 'Technical Member',
    note: 'Contributes to technical projects and supports society events.',
  },
]

/**
 * Events — nothing here yet. Add entries in this shape and both the Events page
 * and the home page highlight pick them up.
 * {
 *   title, date (ISO string), venue, description, poster (image url), registerUrl
 * }
 */
export const upcomingEvents = []
export const pastEvents = []

export const memberBenefits = [
  'Priority seats in every AUCIS workshop and bootcamp.',
  'A place on competition and hackathon teams.',
  'Mentorship from seniors, alumni and faculty.',
  'Access to the society’s project archive and learning resources.',
  'A certificate of participation for the events you attend.',
  'A community that keeps building after the semester ends.',
]

export const codeOfConduct = [
  'Treat every member with respect — in person, in group chats and online.',
  'Harassment, discrimination and gatekeeping have no place in AUCIS.',
  'Credit other people’s work. Plagiarism ends your membership.',
  'Keep shared accounts, datasets and credentials confidential.',
  'Represent the society honestly at competitions and public events.',
  'Report concerns to the executive body — every report is handled privately.',
]

export const groups = [
  'Technical',
  'Design',
  'Research and Innovation',
  'PR',
  'Event Management',
  'General',
  'Support and Discipline',
  'Team Leads and Co-Leads',
  'Media',
  'Finance',
  'Operations',
  'Decor',
  'Dept. Ambassadors',
  'Digital Marketing Liaison',
  'Marketing',
]

export const interests = [
  'Programming & software',
  'Artificial intelligence',
  'Cybersecurity',
  'Data & analytics',
  'Design & product',
  'Robotics & hardware',
  'Competitive programming',
]
