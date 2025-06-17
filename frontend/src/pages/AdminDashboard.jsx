import React from "react";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminHeader from "../components/Admin/AdminHeader";

const stats = [
  { label: "Total Users", value: "1,245", color: "#14a800" },
  { label: "Active Jobs", value: "87", color: "#14a800" },
  { label: "Pending Companies", value: "12", color: "#14a800" },
  { label: "Revenue (USD)", value: "$12,340", color: "#14a800" },
];

const activities = [
  { time: "2 min ago", text: "User <b>John Doe</b> registered." },
  { time: "10 min ago", text: "Company <b>ABC Corp</b> requested approval." },
  { time: "20 min ago", text: "User <b>Jane Smith</b> updated profile." },
  { time: "30 min ago", text: "Job <b>Frontend Developer</b> posted." },
  { time: "1 hour ago", text: "Company <b>XYZ Ltd</b> approved." },
];

const AdminDashboard = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f8fa' }}>
      <AdminSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminHeader />
        <main style={{ flex: 1, padding: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#222', marginBottom: 32 }}>Dashboard Overview</h1>
          <section style={{ display: 'flex', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
            {stats.map(stat => (
              <div key={stat.label} style={{ flex: '1 1 200px', background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0001', minWidth: 200 }}>
                <h3 style={{ color: stat.color, fontSize: 18 }}>{stat.label}</h3>
                <p style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>{stat.value}</p>
              </div>
            ))}
          </section>
          <section style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: 2, background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0001', minWidth: 320 }}>
              <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 16 }}>Recent Activities</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {activities.map((a, i) => (
                  <li key={i} style={{ marginBottom: 16, fontSize: 16 }}>
                    <span style={{ color: '#888', fontSize: 13, marginRight: 8 }}>{a.time}</span>
                    <span dangerouslySetInnerHTML={{ __html: a.text }} />
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ flex: 1, background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0001', minWidth: 240 }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Quick Stats</h2>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: 16 }}>
                <li>New Users Today: <b>12</b></li>
                <li>Jobs Posted Today: <b>5</b></li>
                <li>Companies Approved: <b>2</b></li>
                <li>Revenue Today: <b>$1,200</b></li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;