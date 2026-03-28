import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signOut } from "@/lib/auth";

export default async function DashboardPage() {
  // Check if user is logged in
  const session = await auth();

  // If not logged in, send to login page
  if (!session) {
    redirect("/login");
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F9FAFB",
    }}>
      {/* Top Navigation Bar */}
      <nav style={{
        background: "white",
        borderBottom: "1px solid #E5E7EB",
        padding: "0 24px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        {/* Logo */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <div style={{
            width: "36px",
            height: "36px",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
          }}>
            🧠
          </div>
          <span style={{
            fontWeight: "700",
            fontSize: "18px",
            color: "#111827",
          }}>
            MeetingMind
          </span>
        </div>

        {/* User Info + Sign Out */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}>
          {/* User Avatar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}>
            {session.user?.image && (
              <img
                src={session.user.image}
                alt="avatar"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "2px solid #E5E7EB",
                }}
              />
            )}
            <span style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#374151",
            }}>
              {session.user?.name}
            </span>
          </div>

          {/* Sign Out Button */}
          <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}>
            <button
              type="submit"
              style={{
                padding: "8px 16px",
                background: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "14px",
                color: "#6B7280",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Sign out
            </button>
          </form>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px 24px",
      }}>
        {/* Welcome Banner */}
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "20px",
          padding: "36px 40px",
          marginBottom: "32px",
          color: "white",
        }}>
          <h1 style={{
            fontSize: "26px",
            fontWeight: "800",
            marginBottom: "8px",
          }}>
            Welcome back, {session.user?.name?.split(" ")[0]}! 👋
          </h1>
          <p style={{
            fontSize: "16px",
            opacity: 0.85,
            marginBottom: "24px",
          }}>
            You're on the Free plan — 5 meetings per month.
          </p>
          <div style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}>
            <div style={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: "12px",
              padding: "12px 20px",
              backdropFilter: "blur(10px)",
            }}>
              <div style={{ fontSize: "24px", fontWeight: "800" }}>0</div>
              <div style={{ fontSize: "13px", opacity: 0.85 }}>Meetings recorded</div>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: "12px",
              padding: "12px 20px",
              backdropFilter: "blur(10px)",
            }}>
              <div style={{ fontSize: "24px", fontWeight: "800" }}>0</div>
              <div style={{ fontSize: "13px", opacity: 0.85 }}>Action items</div>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: "12px",
              padding: "12px 20px",
              backdropFilter: "blur(10px)",
            }}>
              <div style={{ fontSize: "24px", fontWeight: "800" }}>5</div>
              <div style={{ fontSize: "13px", opacity: 0.85 }}>Meetings remaining</div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          border: "1px solid #E5E7EB",
          padding: "60px 40px",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎯</div>
          <h2 style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#111827",
            marginBottom: "8px",
          }}>
            No meetings recorded yet
          </h2>
          <p style={{
            color: "#6B7280",
            fontSize: "15px",
            marginBottom: "28px",
            maxWidth: "400px",
            margin: "0 auto 28px",
          }}>
            Connect your Google Calendar and MeetingMind will
            automatically join and summarize your meetings.
          </p>
          <button style={{
            padding: "12px 28px",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
          }}>
            Connect Google Calendar →
          </button>
        </div>
      </main>
    </div>
  );
}
