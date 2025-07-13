import React, { useState } from "react";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminHeader from "../components/Admin/AdminHeader";
import { getImageUrl } from "../../utils/imageUtils";

const initialUsers = [
  { id: 1, name: "John Doe", email: "john@upwork.com", status: "Active", role: "Client", created: "2024-06-01", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: 2, name: "Jane Smith", email: "jane@upwork.com", status: "Pending", role: "Freelancer", created: "2024-05-28", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
  { id: 3, name: "Alice Brown", email: "alice@upwork.com", status: "Suspended", role: "Client", created: "2024-05-20", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
  { id: 4, name: "Bob Lee", email: "bob@upwork.com", status: "Active", role: "Freelancer", created: "2024-05-15", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
];

const UserModified = () => {
  const [users] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (userId, newStatus) => {
    // Here you would typically make an API call to update the user's status
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f8fa' }}>
      <AdminSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminHeader />
        <main style={{ flex: 1, padding: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#222', marginBottom: 32 }}>User Management</h1>
          <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
            <input
              type="text"
              placeholder="Search user by name or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e4e7ec', width: 320 }}
            />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e4e7ec', width: 200 }}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 24 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f3f6f8' }}>
                  <th style={{ padding: 12, textAlign: 'left' }}>Avatar</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Name</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Email</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Role</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Created</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(user => (
                  <tr key={user.id}>
                    <td style={{ padding: 12 }}><img src={getImageUrl(user.avatar)} alt={user.name} style={{ width: 36, height: 36, borderRadius: '50%' }} /></td>
                    <td style={{ padding: 12 }}>{user.name}</td>
                    <td style={{ padding: 12 }}>{user.email}</td>
                    <td style={{ padding: 12 }}>{user.role}</td>
                    <td style={{ padding: 12 }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: 4,
                        fontSize: 13,
                        fontWeight: 500,
                        background: user.status === 'Active' ? '#e6f7ef' :
                          user.status === 'Pending' ? '#fff4e5' : '#ffe5e5',
                        color: user.status === 'Active' ? '#14a800' :
                          user.status === 'Pending' ? '#ff9800' : '#e74c3c'
                      }}>
                        {user.status}
                      </span>
                    </td>
                    <td style={{ padding: 12 }}>{user.created}</td>
                    <td style={{ padding: 12 }}>
                      {user.status === 'Active' ? (
                        <button
                          onClick={() => handleStatusChange(user.id, 'Suspended')}
                          style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 16px' }}
                        >
                          Ban User
                        </button>
                      ) : user.status === 'Suspended' ? (
                        <button
                          onClick={() => handleStatusChange(user.id, 'Active')}
                          style={{ background: '#ffc107', color: '#000', border: 'none', borderRadius: 6, padding: '6px 16px' }}
                        >
                          Unban User
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(user.id, 'Active')}
                          style={{ background: '#14a800', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 16px' }}
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserModified;