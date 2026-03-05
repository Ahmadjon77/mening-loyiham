// pages/api/teams/[id].js
// TASK 5: Tanlangan team bo'yicha ma'lumotlarni qaytaruvchi API
// URL: /api/teams/1, /api/teams/2 ...

import { teams } from "../../../data/mockData";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Faqat GET so'rov qabul qilinadi" });
  }

  // URL dan id ni olamiz: /api/teams/[id]
  const { id } = req.query;

  // id bo'yicha teamni topamiz
  const team = teams.find((t) => t.id === Number(id));

  // Agar team topilmasa 404 qaytaramiz
  if (!team) {
    return res.status(404).json({
      success: false,
      message: `ID ${id} bo'yicha team topilmadi`,
    });
  }

  // Topilgan teamni qaytaramiz (members bilan birga)
  res.status(200).json({
    success: true,
    team,
  });
}
