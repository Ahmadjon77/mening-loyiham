// pages/api/index.js
// TASK 1: "Teams Strength" va "Project Deliveries" ma'lumotlarini
// bitta object ichida qaytaruvchi API endpoint

import { teams, projectDeliveries } from "../../data/mockData";

export default function handler(req, res) {
  // Faqat GET so'rovni qabul qilamiz
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Faqat GET so'rov qabul qilinadi" });
  }

  // Teams Strength - har bir teamning kuchini hisoblash
  const teamsStrength = teams.map((team) => ({
    id: team.id,
    name: team.name,
    strength: team.strength,
    lead: team.lead,
    tech: team.tech,
  }));

  // Project Deliveries - loyihalar holati
  const deliveries = projectDeliveries.map((project) => ({
    id: project.id,
    name: project.name,
    team: project.team,
    status: project.status,
    date: project.date,
    progress: project.progress,
  }));

  // Ikkalasini bitta object ichida qaytaramiz
  res.status(200).json({
    teamsStrength,
    projectDeliveries: deliveries,
  });
}