// pages/teams/index.js
import Link from "next/link";
import { teams as allTeams } from "../../data/mockData";

// getStaticProps - endi localhost emas, to'g'ridan mockData dan oladi
export async function getStaticProps() {
  const teamsData = allTeams.map(({ members, ...rest }) => rest);
  return {
    props: { teams: teamsData },
  };
}

export default function TeamsPage({ teams }) {
  const colors = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link href="/" style={styles.backLink}>← Bosh sahifa</Link>
        <h1 style={styles.title}>👥 Barcha Teamlar</h1>
        <p style={styles.subtitle}>Jami {teams.length} ta team</p>
      </div>

      <div style={styles.grid}>
        {teams.map((team, index) => (
          <div key={team.id} style={styles.card}>
            <div style={{ ...styles.accent, background: colors[index % colors.length] }} />
            <div style={styles.cardBody}>
              <h2 style={styles.teamName}>{team.name}</h2>
              <p style={styles.lead}>👤 Lead: <strong>{team.lead}</strong></p>
              <p style={styles.tech}>🛠️ {team.tech}</p>
              <div style={styles.strengthRow}>
                <span style={styles.strengthLabel}>💪 Kuch:</span>
                <div style={styles.bar}>
                  <div style={{ ...styles.barFill, width: `${(team.strength / 10) * 100}%`, background: colors[index % colors.length] }} />
                </div>
                <span style={styles.strengthNum}>{team.strength}</span>
              </div>
              <Link href={`/teams/${team.id}`} style={styles.button}>
                Batafsil ko'rish →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: "900px", margin: "0 auto", padding: "24px", fontFamily: "sans-serif" },
  header: { marginBottom: "32px" },
  backLink: { color: "#6366f1", textDecoration: "none", fontSize: "0.875rem" },
  title: { fontSize: "2rem", fontWeight: "bold", color: "#1e293b", margin: "8px 0 4px" },
  subtitle: { color: "#64748b", fontSize: "0.875rem" },
  grid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" },
  card: { background: "white", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
  accent: { height: "4px" },
  cardBody: { padding: "20px" },
  teamName: { fontSize: "1.2rem", fontWeight: "bold", color: "#1e293b", marginBottom: "8px" },
  lead: { color: "#475569", fontSize: "0.875rem", margin: "4px 0" },
  tech: { color: "#64748b", fontSize: "0.8rem", margin: "4px 0 16px" },
  strengthRow: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" },
  strengthLabel: { fontSize: "0.8rem", color: "#64748b", minWidth: "55px" },
  bar: { flex: 1, height: "8px", background: "#e2e8f0", borderRadius: "4px" },
  barFill: { height: "100%", borderRadius: "4px" },
  strengthNum: { fontSize: "0.8rem", fontWeight: "bold", color: "#334155" },
  button: { display: "inline-block", background: "#6366f1", color: "white", padding: "8px 16px", borderRadius: "8px", textDecoration: "none", fontSize: "0.875rem", fontWeight: "500" },
};




