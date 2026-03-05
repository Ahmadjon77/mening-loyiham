// pages/index.js
import { useState, useEffect } from "react";
import { teams as allTeams, projectDeliveries as allDeliveries } from "../data/mockData";

// getStaticProps - endi localhost emas, to'g'ridan mockData dan oladi
export async function getStaticProps() {
  return {
    props: {
      staticTeamsStrength: allTeams.map(({ members, ...rest }) => rest),
      staticProjectDeliveries: allDeliveries,
    },
  };
}

export default function HomePage({ staticTeamsStrength, staticProjectDeliveries }) {
  const [dynamicData, setDynamicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api");
        if (!response.ok) throw new Error("Ma'lumot olishda xato!");
        const data = await response.json();
        setDynamicData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Dashboard</h1>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>
          🏗️ getStaticProps — Build vaqtida olingan ma'lumotlar
        </h2>
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>💪 Teams Strength</h3>
            {staticTeamsStrength.map((team) => (
              <div key={team.id} style={styles.item}>
                <span style={styles.teamName}>{team.name}</span>
                <div style={styles.strengthBar}>
                  <div style={{ ...styles.strengthFill, width: `${(team.strength / 10) * 100}%` }} />
                </div>
                <span style={styles.strengthNum}>{team.strength}/10</span>
              </div>
            ))}
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>🚀 Project Deliveries</h3>
            {staticProjectDeliveries.map((project) => (
              <div key={project.id} style={styles.item}>
                <span style={styles.projectName}>{project.name}</span>
                <span style={{ ...styles.badge, background: project.status === "Delivered" ? "#22c55e" : "#f59e0b" }}>
                  {project.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>
          ⚡ useEffect — Client tomonida olingan ma'lumotlar
        </h2>
        {loading && <p style={styles.loading}>⏳ Ma'lumotlar yuklanmoqda...</p>}
        {error && <p style={styles.error}>❌ Xato: {error}</p>}
        {dynamicData && (
          <div style={styles.grid}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>💪 Teams Strength (useEffect)</h3>
              {dynamicData.teamsStrength.map((team) => (
                <div key={team.id} style={styles.item}>
                  <span>{team.name}</span>
                  <strong style={{ color: "#6366f1" }}>{team.strength} kishi</strong>
                </div>
              ))}
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>🚀 Projects (useEffect)</h3>
              {dynamicData.projectDeliveries.map((p) => (
                <div key={p.id} style={styles.item}>
                  <span>{p.name}</span>
                  <span>{p.progress}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

const styles = {
  container: { maxWidth: "900px", margin: "0 auto", padding: "24px", fontFamily: "sans-serif" },
  title: { fontSize: "2rem", fontWeight: "bold", marginBottom: "32px", color: "#1e293b" },
  section: { marginBottom: "40px" },
  sectionTitle: { fontSize: "1.2rem", color: "#475569", marginBottom: "16px", borderBottom: "2px solid #e2e8f0", paddingBottom: "8px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  card: { background: "#f8fafc", borderRadius: "12px", padding: "20px", border: "1px solid #e2e8f0" },
  cardTitle: { fontSize: "1rem", fontWeight: "bold", marginBottom: "16px", color: "#1e293b" },
  item: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e2e8f0" },
  teamName: { fontSize: "0.875rem", color: "#334155" },
  strengthBar: { flex: 1, height: "8px", background: "#e2e8f0", borderRadius: "4px", margin: "0 12px" },
  strengthFill: { height: "100%", background: "#6366f1", borderRadius: "4px", transition: "width 0.3s" },
  strengthNum: { fontSize: "0.75rem", color: "#64748b", minWidth: "35px" },
  projectName: { fontSize: "0.875rem", color: "#334155" },
  badge: { fontSize: "0.75rem", color: "white", padding: "2px 10px", borderRadius: "20px" },
  loading: { color: "#6366f1", fontSize: "1rem" },
  error: { color: "#ef4444", fontSize: "1rem" },
};