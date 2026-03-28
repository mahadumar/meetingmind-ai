export default function Home() {
  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      gap: "16px"
    }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#111827" }}>
        MeetingMind AI 🧠
      </h1>
      <p style={{ fontSize: "1.1rem", color: "#6B7280" }}>
        Your meeting intelligence platform is being built.
      </p>
      <div style={{
        background: "#F0FDF4",
        border: "1px solid #86EFAC",
        borderRadius: "8px",
        padding: "12px 24px",
        color: "#166534",
        fontWeight: "500"
      }}>
        ✅ Next.js is running correctly
      </div>
    </main>
  );
}