/*
  All AUCIS teams.

  leaders  -> big cards (Lead, Co-Lead, Coordinator) with a short description
  members  -> compact cards

  PHOTOS: every person has an  image  line that points to a file inside the
  public folder:  public/picture/team/<team-id>/<name>.jpg
  - Put the photo there with exactly that file name and it shows up.
  - No photo yet? The circle shows their initials instead (nothing breaks).
  - To use another file or a .png, just edit that person's image line.
*/

export const teams = [
  {
    id: 'event-management',
    name: 'Event Management Team',
    memberRole: 'Member',
    leaders: [
      {
        name: 'Tahir Mehmood',
        role: 'Lead',
        image: '/picture/team/event-management/tahir-mehmood.jpg',
        description: "Leads the Event Management Team and oversees the planning and execution of AUCIS events.",
      },
      {
        name: 'Tayyaba Azam',
        role: 'Co-Lead',
        image: '/picture/team/event-management/tayyaba-azam.jpg',
        description: "Supports the Lead in planning events and guiding the team through every stage of execution.",
      },
      {
        name: 'Muhammad Raza Meer Hayat',
        role: 'Co-Lead',
        image: '/picture/team/event-management/muhammad-raza-meer-hayat.jpg',
        description: "Assists the Lead with event logistics and keeps team members aligned on their tasks.",
      },
      {
        name: 'Esha Ilyas',
        role: 'Coordinator',
        image: '/picture/team/event-management/esha-ilyas.jpg',
        description: "Coordinates schedules, tasks and communication across the Event Management Team.",
      },
    ],
    members: [
      { name: 'Syed Umais Ali Shah', image: '/picture/team/event-management/syed-umais-ali-shah.jpg' },
      { name: 'Maria', image: '/picture/team/event-management/maria.jpg' },
      { name: 'Sana Fatima', image: '/picture/team/event-management/sana-fatima.jpg' },
      { name: 'Hassan Maaz Ali', image: '/picture/team/event-management/hassan-maaz-ali.jpg' },
      { name: 'Yahya Hussain', image: '/picture/team/event-management/yahya-hussain.jpg' },
      { name: 'Abubakar Jan', image: '/picture/team/event-management/abubakar-jan.jpg' },
      { name: 'Ayyan Ali Abbas', image: '/picture/team/event-management/ayyan-ali-abbas.jpg' },
      { name: 'Arslan Mehmood', image: '/picture/team/event-management/arslan-mehmood.jpg' },
      { name: 'Shaizal Saud', image: '/picture/team/event-management/shaizal-saud.jpg' },
      { name: 'Abdul Hanan', image: '/picture/team/event-management/abdul-hanan.jpg' },
      { name: 'Fatima Shahid', image: '/picture/team/event-management/fatima-shahid.jpg' },
      { name: 'Dua Fatima', image: '/picture/team/event-management/dua-fatima.jpg' },
      { name: 'Shiza Javed', image: '/picture/team/event-management/shiza-javed.jpg' },
      { name: 'Hafiz Muhammad Waleed Abdullah', image: '/picture/team/event-management/hafiz-muhammad-waleed-abdullah.jpg' },
      { name: 'Hanzallah Khan', image: '/picture/team/event-management/hanzallah-khan.jpg' },
      { name: 'Rameen Haider', image: '/picture/team/event-management/rameen-haider.jpg' },
      { name: 'Memona Kalsoom', image: '/picture/team/event-management/memona-kalsoom.jpg' },
      { name: 'Talha Ahmed', image: '/picture/team/event-management/talha-ahmed.jpg' },
      { name: 'Mishal Mehmood', image: '/picture/team/event-management/mishal-mehmood.jpg' },
      { name: 'Malik Zaryab Asad', image: '/picture/team/event-management/malik-zaryab-asad.jpg' },
      { name: 'Muhammad Almas Haider', image: '/picture/team/event-management/muhammad-almas-haider.jpg' },
    ],
  },
  {
    id: 'pr',
    name: 'PR Team',
    memberRole: 'Member',
    leaders: [
      {
        name: 'Hafsah Naseer',
        role: 'Lead',
        image: '/picture/team/pr/hafsah-naseer.jpg',
        description: "Leads the PR Team and manages AUCIS public relations, outreach and partnerships.",
      },
      {
        name: 'Syed Ali Zain',
        role: 'Co-Lead',
        image: '/picture/team/pr/syed-ali-zain.jpg',
        description: "Supports the PR Lead in outreach and in keeping AUCIS communication consistent.",
      },
      {
        name: 'Savaira Khan',
        role: 'Coordinator',
        image: '/picture/team/pr/savaira-khan.jpg',
        description: "Coordinates PR tasks, schedules and day-to-day communication within the team.",
      },
    ],
    members: [
      { name: 'Insha Ur Rehman', image: '/picture/team/pr/insha-ur-rehman.jpg' },
      { name: 'Muhammad Tausif Bin Qasim', image: '/picture/team/pr/muhammad-tausif-bin-qasim.jpg' },
      { name: 'Ayesha Rashid', image: '/picture/team/pr/ayesha-rashid.jpg' },
      { name: 'Eman Shafi', image: '/picture/team/pr/eman-shafi.jpg' },
      { name: 'Ali Haider Bhatti', image: '/picture/team/pr/ali-haider-bhatti.jpg' },
    ],
  },
  {
    id: 'media-design',
    name: 'Media & Design Team',
    memberRole: 'Media & Design Member',
    leaders: [
      {
        name: 'Ali Hassan',
        role: 'Media Lead',
        image: '/picture/team/media-design/ali-hassan.jpg',
        description: "Leads media coverage for AUCIS, capturing and sharing the society's events and stories.",
      },
      {
        name: 'Rija Saif',
        role: 'Design Lead',
        image: '/picture/team/media-design/rija-saif.jpg',
        description: "Leads the design side of the team and shapes the visual identity of AUCIS.",
      },
      {
        name: 'Wajeeha Ahmed Khattak',
        role: 'Design Co-Lead',
        image: '/picture/team/media-design/wajeeha-ahmed-khattak.jpg',
        description: "Supports the Design Lead in creating posters, graphics and other visual material.",
      },
    ],
    members: [
      { name: 'Laiba Ansari', image: '/picture/team/media-design/laiba-ansari.jpg' },
      { name: 'Amna Bibi', image: '/picture/team/media-design/amna-bibi.jpg' },
      { name: 'Sawera Tahir', image: '/picture/team/media-design/sawera-tahir.jpg' },
      { name: 'Hajra Noor', image: '/picture/team/media-design/hajra-noor.jpg' },
      { name: 'Adan Rasool', image: '/picture/team/media-design/adan-rasool.jpg' },
      { name: 'Haad Abdullah', image: '/picture/team/media-design/haad-abdullah.jpg' },
      { name: 'Muhammad Shabbar Hussain', image: '/picture/team/media-design/muhammad-shabbar-hussain.jpg' },
      { name: 'Muhammad Awais', image: '/picture/team/media-design/muhammad-awais.jpg' },
      { name: 'Muhammad Hammad', image: '/picture/team/media-design/muhammad-hammad.jpg' },
    ],
  },
  {
    id: 'finance',
    name: 'Finance Team',
    memberRole: 'Member',
    leaders: [
      {
        name: 'Syed M. Taqi Naqvi',
        role: 'Lead',
        image: '/picture/team/finance/syed-m-taqi-naqvi.jpg',
        description: "Leads the Finance Team and oversees budgets, funds and expenses for AUCIS.",
      },
      {
        name: 'Muhammad Bin Faisal',
        role: 'Co-Lead',
        image: '/picture/team/finance/muhammad-bin-faisal.jpg',
        description: "Supports the Finance Lead in tracking budgets and keeping financial records in order.",
      },
    ],
    members: [],
  },
  {
    id: 'decor',
    name: 'Décor Team',
    memberRole: 'Member',
    leaders: [
      {
        name: 'Darakhshanda Fatima',
        role: 'Lead',
        image: '/picture/team/decor/darakhshanda-fatima.jpg',
        description: "Leads the Décor Team and shapes the look and setup of AUCIS events and venues.",
      },
    ],
    members: [],
  },
  {
    id: 'support-discipline',
    name: 'Support & Discipline Team',
    memberRole: 'Support & Discipline Member',
    leaders: [
      {
        name: 'Moid Babar',
        role: 'Lead (Male)',
        image: '/picture/team/support-discipline/moid-babar.jpg',
        description: "Leads the Support & Discipline Team, helping keep AUCIS events orderly and well supported.",
      },
      {
        name: 'Zara Tahir',
        role: 'Lead (Female)',
        image: '/picture/team/support-discipline/zara-tahir.jpg',
        description: "Leads Support & Discipline alongside the male lead, helping attendees and keeping events orderly.",
      },
    ],
    members: [
      { name: 'Muhammad Abdullah Saqib', image: '/picture/team/support-discipline/muhammad-abdullah-saqib.jpg' },
      { name: 'Mubashir', image: '/picture/team/support-discipline/mubashir.jpg' },
      { name: 'Asim Jadoon', image: '/pictures/asim member.jpeg' },
      { name: 'Muhammad Tayyab', image: '/picture/team/support-discipline/muhammad-tayyab.jpg' },
      { name: 'Ehtisham Aslam', image: '/picture/team/support-discipline/ehtisham-aslam.jpg' },
      { name: 'Asad Iqbal', image: '/picture/team/support-discipline/asad-iqbal.jpg' },
      { name: 'Tehreem', image: '/picture/team/support-discipline/tehreem.jpg' },
    ],
  },
  {
    id: 'research-innovation',
    name: 'Research & Innovation Team',
    memberRole: 'Research & Innovation Member',
    leaders: [
      {
        name: 'Ahmed Hassan',
        role: 'Lead',
        image: '/picture/team/research-innovation/ahmed-hassan.jpg',
        description: "Leads the Research & Innovation Team and drives research-based and creative ideas at AUCIS.",
      },
      {
        name: 'Muhammad Hassan Ali',
        role: 'Co-Lead',
        image: '/picture/team/research-innovation/muhammad-hassan-ali.jpg',
        description: "Supports the Lead in guiding research projects and encouraging new ideas among members.",
      },
    ],
    members: [
      { name: 'Zain Ul Abideen Shahzad', image: '/picture/team/research-innovation/zain-ul-abideen-shahzad.jpg' },
      { name: 'Laiba Shahzadi', image: '/picture/team/research-innovation/laiba-shahzadi.jpg' },
      { name: 'Urooj Fatima', image: '/picture/team/research-innovation/urooj-fatima.jpg' },
      { name: 'Zeeshan Alam', image: '/picture/team/research-innovation/zeeshan-alam.jpg' },
      { name: 'Alina Mehboob', image: '/picture/team/research-innovation/alina-mehboob.jpg' },
      { name: 'Manha Wajdan', image: '/picture/team/research-innovation/manha-wajdan.jpg' },
      { name: 'Abdullah Mughal', image: '/picture/team/research-innovation/abdullah-mughal.jpg' },
      { name: 'Mohib Ul Hassan Mehmood', image: '/picture/team/research-innovation/mohib-ul-hassan-mehmood.jpg' },
    ],
  },
  {
    id: 'technical',
    name: 'Technical Team',
    memberRole: 'Technical Member',
    leaders: [
      {
        name: 'Fatima Batool',
        role: 'Lead',
        image: '/picture/team/technical/fatima-batool.jpg',
        description: "Leads the Technical Team and oversees the technical work and projects of AUCIS.",
      },
      {
        name: 'Aimen Nadeem',
        role: 'Co-Lead',
        image: '/picture/team/technical/aimen-nadeem.jpg',
        description: "Supports the Technical Lead in guiding projects and helping members build their skills.",
      },
      {
        name: 'Huzaifa',
        role: 'Coordinator',
        image: '/picture/team/technical/huzaifa.jpg',
        description: "Coordinates technical tasks, schedules and communication within the team.",
      },
    ],
    members: [
      { name: 'Muhammad Ebad', image: '/pictures/ebad.jpeg' },
      { name: 'Hassan Zia', image: '/picture/team/technical/hassan-zia.jpg' },
      { name: 'Muhammad Mudassir Saleem', image: '/picture/team/technical/muhammad-mudassir-saleem.jpg' },
      { name: 'Fiza Saif', image: '/picture/team/technical/fiza-saif.jpg' },
      { name: 'Saad Ali', image: '/picture/team/technical/saad-ali.jpg' },
      { name: 'Waqas Khan', image: '/picture/team/technical/waqas-khan.jpg' },
      { name: 'Iqra Afzal', image: '/picture/team/technical/iqra-afzal.jpg' },
      { name: 'Imra Tanveer', image: '/picture/team/technical/imra-tanveer.jpg' },
      { name: 'Imsaal Sikandar', image: '/picture/team/technical/imsaal-sikandar.jpg' },
      { name: 'Muhammad Awais', image: '/picture/team/technical/muhammad-awais.jpg' },
      { name: 'Saifullah', image: '/picture/team/technical/saifullah.jpg' },
      { name: 'Muhammad Umar', image: '/picture/team/technical/muhammad-umar.jpg' },
      { name: 'Nadia Kalsoom', image: '/picture/team/technical/nadia-kalsoom.jpg' },
      { name: 'Manahil Batool Hashmi', image: '/picture/team/technical/manahil-batool-hashmi.jpg' },
      { name: 'Abdullah Bilal Qureshi', image: '/picture/team/technical/abdullah-bilal-qureshi.jpg' },
      { name: 'Abdul Mateen Khan', image: '/picture/team/technical/abdul-mateen-khan.jpg' },
      { name: 'Fahham Bin Fayyaz', image: '/picture/team/technical/fahham-bin-fayyaz.jpg' },
      { name: 'Ibrahim Bin Nazir', image: '/picture/team/technical/ibrahim-bin-nazir.jpg' },
      { name: 'Alishba Eman', image: '/picture/team/technical/alishba-eman.jpg' },
      { name: 'Sumayya Akbar', image: '/picture/team/technical/sumayya-akbar.jpg' },
      { name: 'Muhammad Affan Farooq', image: '/picture/team/technical/muhammad-affan-farooq.jpg' },
      { name: 'Asmeen Fatima', image: '/picture/team/technical/asmeen-fatima.jpg' },
      { name: 'Muhammad Hasher Khan', image: '/picture/team/technical/muhammad-hasher-khan.jpg' },
      { name: 'Muhammad Ali', image: '/picture/team/technical/muhammad-ali.jpg' },
      { name: 'Muhammad Ali', image: '/picture/team/technical/muhammad-ali-2.jpg' },
      { name: 'Dua Afzal', image: '/picture/team/technical/dua-afzal.jpg' },
      { name: 'Muhammad Tayyab', image: '/picture/team/technical/muhammad-tayyab.jpg' },
      { name: 'Muhammad Ali Naveed', image: '/picture/team/technical/muhammad-ali-naveed.jpg' },
      { name: 'Muhammad Hashir', image: '/picture/team/technical/muhammad-hashir.jpg' },
      { name: 'Haider Imran', image: '/picture/team/technical/haider-imran.jpg' },
    ],
  },
  {
    id: 'general-members',
    name: 'General Members',
    memberRole: 'General Member',
    leaders: [],
    members: [
      { name: 'Misbah Ul Islam', image: '/picture/team/general-members/misbah-ul-islam.jpg' },
      { name: 'Junaid Siddique', image: '/picture/team/general-members/junaid-siddique.jpg' },
      { name: 'Hammad Asghar', image: '/picture/team/general-members/hammad-asghar.jpg' },
      { name: 'Abeera Noor', image: '/picture/team/general-members/abeera-noor.jpg' },
    ],
  },
];
