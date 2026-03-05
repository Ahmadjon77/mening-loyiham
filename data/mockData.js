// Mock ma'lumotlar - barcha API lardan foydalaniladi

export const teams = [
  {
    id: 1,
    name: "Frontend Team",
    strength: 8,
    lead: "Jasur Karimov",
    tech: "React, Next.js, Tailwind",
    members: [
      { id: 101, name: "Jasur Karimov", role: "Team Lead", experience: "5 yil" },
      { id: 102, name: "Malika Yusupova", role: "Senior Dev", experience: "4 yil" },
      { id: 103, name: "Bobur Toshmatov", role: "Mid Dev", experience: "2 yil" },
      { id: 104, name: "Nilufar Rahimova", role: "Junior Dev", experience: "1 yil" },
    ],
  },
  {
    id: 2,
    name: "Backend Team",
    strength: 6,
    lead: "Sardor Mirzayev",
    tech: "Node.js, PostgreSQL, Redis",
    members: [
      { id: 201, name: "Sardor Mirzayev", role: "Team Lead", experience: "6 yil" },
      { id: 202, name: "Dilshod Nazarov", role: "Senior Dev", experience: "4 yil" },
      { id: 203, name: "Kamola Ergasheva", role: "Mid Dev", experience: "3 yil" },
    ],
  },
  {
    id: 3,
    name: "Design Team",
    strength: 4,
    lead: "Zulfiya Hasanova",
    tech: "Figma, Adobe XD, Illustrator",
    members: [
      { id: 301, name: "Zulfiya Hasanova", role: "Team Lead", experience: "5 yil" },
      { id: 302, name: "Akbar Sobirov", role: "UI Designer", experience: "3 yil" },
    ],
  },
  {
    id: 4,
    name: "DevOps Team",
    strength: 3,
    lead: "Firdavs Umarov",
    tech: "Docker, Kubernetes, AWS",
    members: [
      { id: 401, name: "Firdavs Umarov", role: "Team Lead", experience: "7 yil" },
      { id: 402, name: "Sherzod Alimov", role: "DevOps Eng", experience: "3 yil" },
    ],
  },
];

export const projectDeliveries = [
  { id: 1, name: "Website Redesign", team: "Frontend Team", status: "Delivered", date: "2024-01-15", progress: 100 },
  { id: 2, name: "Mobile App v2", team: "Frontend Team", status: "In Progress", date: "2024-04-01", progress: 65 },
  { id: 3, name: "API Integration", team: "Backend Team", status: "Delivered", date: "2024-02-20", progress: 100 },
  { id: 4, name: "Database Migration", team: "Backend Team", status: "Delivered", date: "2024-03-10", progress: 100 },
  { id: 5, name: "UI Kit Design", team: "Design Team", status: "In Progress", date: "2024-04-15", progress: 80 },
  { id: 6, name: "CI/CD Pipeline", team: "DevOps Team", status: "Delivered", date: "2024-01-30", progress: 100 },
];
