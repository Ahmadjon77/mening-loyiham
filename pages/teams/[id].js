// pages/teams/[id].js
// TASK 6: Team tanlanganda getServerSideProps orqali so'rov yuborish
// TASK 7: Team a'zolari haqidagi ma'lumotlarni ko'rsatuvchi JSX

import Link from "next/link";

// ============================================================
// TASK 6: getServerSideProps — Har so'rovda serverda ishlaydi
// getStaticProps dan farqi: har safar yangi ma'lumot oladi
// ============================================================
export async function getServerSideProps({ params }) {
  const { id } = params; // URL dan id ni olamiz: /teams/[id]

  try {
    // /api/teams/[id] ga so'rov yuboramiz
    const res = await fetch(`http://localhost:3000/api/teams/${id}`);

    // Team topilmasa 404 sahifasiga yo'naltiramiz
    if (!res.ok) {
      return { notFound: true };
    }

    const data = await res.json();

    return {
      props: {
        team: data.team,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}

// ============================================================
// TASK 7: Team a'zolarini ko'rsatuvchi komponent
// ============================================================
export default function TeamDetailPage({ team }) {
  const roleColors = {
    "Team Lead": "#6366f1",
    "Senior Dev": "#22c55e",
    "Mid Dev": "#f59e0b",
    "Junior Dev": "#94a3b8",
    "UI Designer": "#ec4899",
    "DevOps Eng": "#14b8a6",
  };

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <div style={styles.nav}>
        <Link href="/" style={styles.navLink}>🏠 Bosh sahifa</Link>
        <span style={styles.separator}>/</span>
        <Link href="/teams" style={styles.navLink}>👥 Teamlar</Link>
        <span style={styles.separator}>/</span>
        <span style={styles.current}>{team.name}</span>
      </div>

      {/* Team Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>{team.name}</h1>
        <div style={styles.meta}>
          <span style={styles.metaBadge}>👤 Lead: {team.lead}</span>
          <span style={styles.metaBadge}>💪 Kuch: {team.strength}/10</span>
          <span style={styles.metaBadge}>🛠️ {team.tech}</span>
        </div>
      </div>

      {/* Members Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          👨‍💻 A'zolar ({team.members.length} kishi)
        </h2>

        {/* Members Grid */}
        <div style={styles.grid}>
          {team.members.map((member, index) => (
            <div key={member.id} style={styles.memberCard}>
              {/* Avatar */}
              <div
                style={{
                  ...styles.avatar,
                  background: roleColors[member.role] || "#6366f1",
                }}
              >
                {member.name.charAt(0)}
              </div>

              {/* Info */}
              <div style={styles.memberInfo}>
                <h3 style={styles.memberName}>{member.name}</h3>
                <span
                  style={{
                    ...styles.roleBadge,
                    background: `${roleColors[member.role]}20`,
                    color: roleColors[member.role] || "#6366f1",
                    border: `1px solid ${roleColors[member.role] || "#6366f1"}`,
                  }}
                >
                  {member.role}
                </span>
                <p style={styles.experience}>
                  📅 Tajriba: <strong>{member.experience}</strong>
                </p>
                <p style={styles.memberId}>ID: #{member.id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info banner */}
      <div style={styles.infoBanner}>
        <p style={styles.infoText}>
          ℹ️ Bu sahifa <strong>getServerSideProps</strong> orqali yuklangan.
          Har safar yangi so'rov kelganda server ma'lumotni qayta oladi.
        </p>
      </div>
    </div>
  );
}

// ============================================================
// Styles
// ============================================================
const styles = {
  container: { maxWidth: "800px", margin: "0 auto", padding: "24px", fontFamily: "sans-serif" },
  nav: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px", fontSize: "0.875rem" },
  navLink: { color: "#6366f1", textDecoration: "none" },
  separator: { color: "#94a3b8" },
  current: { color: "#64748b" },
  header: { marginBottom: "32px", padding: "24px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" },
  title: { fontSize: "2rem", fontWeight: "bold", color: "#1e293b", marginBottom: "12px" },
  meta: { display: "flex", gap: "12px", flexWrap: "wrap" },
  metaBadge: { background: "#e0e7ff", color: "#4338ca", padding: "4px 12px", borderRadius: "20px", fontSize: "0.875rem" },
  section: { marginBottom: "32px" },
  sectionTitle: { fontSize: "1.2rem", fontWeight: "bold", color: "#1e293b", marginBottom: "16px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" },
  memberCard: { display: "flex", gap: "16px", padding: "16px", background: "white", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
  avatar: { width: "48px", height: "48px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "1.2rem", fontWeight: "bold", flexShrink: 0 },
  memberInfo: { flex: 1 },
  memberName: { fontSize: "1rem", fontWeight: "600", color: "#1e293b", margin: "0 0 6px" },
  roleBadge: { fontSize: "0.75rem", padding: "2px 8px", borderRadius: "20px", fontWeight: "500" },
  experience: { fontSize: "0.8rem", color: "#64748b", margin: "8px 0 4px" },
  memberId: { fontSize: "0.75rem", color: "#94a3b8", margin: 0 },
  infoBanner: { background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "8px", padding: "16px" },
  infoText: { color: "#1d4ed8", fontSize: "0.875rem", margin: 0 },
};