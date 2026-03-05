// pages/api/teams.js
// TASK 3: Barcha teamlarni qaytaruvchi API endpoint

import { teams } from "../../data/mockData";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Faqat GET so'rov qabul qilinadi" });
  }

  // Teamlarni qaytaramiz (members ni chiqarib tashlaymiz - alohida API bor)
  const teamsData = teams.map(({ members, ...rest }) => rest);

  res.status(200).json({
    success: true,
    count: teamsData.length,
    teams: teamsData,
  });
}
