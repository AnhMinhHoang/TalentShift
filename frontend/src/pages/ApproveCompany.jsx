import React, { useState } from "react";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminHeader from "../components/Admin/AdminHeader";

const initialCompanies = [
  { id: 1, name: "ABC Corp", email: "contact@abccorp.com", status: "Pending", industry: "IT Services", registered: "2024-05-30", logo: "https://logo.clearbit.com/abccorp.com" },
  { id: 2, name: "XYZ Ltd", email: "info@xyzltd.com", status: "Pending", industry: "Marketing", registered: "2024-05-28", logo: "https://logo.clearbit.com/xyzltd.com" },
  { id: 3, name: "Upwork Vietnam", email: "hello@upwork.vn", status: "Pending", industry: "Freelance", registered: "2024-05-25", logo: "https://logo.clearbit.com/upwork.com" },
  { id: 4, name: "Tech Solutions", email: "contact@techsolutions.com", status: "Approved", industry: "IT Services", registered: "2024-05-20", logo: "https://logo.clearbit.com/techsolutions.com" },
  { id: 5, name: "Digital Marketing Pro", email: "info@digitalmarketingpro.com", status: "Rejected", industry: "Marketing", registered: "2024-05-15", logo: "https://logo.clearbit.com/digitalmarketingpro.com" },
];

const ApproveCompany = () => {
  const [companies] = useState(initialCompanies);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [industryFilter, setIndustryFilter] = useState("All");

  const filtered = companies.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    const matchesIndustry = industryFilter === "All" || c.industry === industryFilter;
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  const handleStatusChange = (companyId, newStatus) => {
    // Here you would typically make an API call to update the company's status
    console.log(`Changing company ${companyId} status to ${newStatus}`);
  };

  // Get unique industries for filter
  const industries = ["All", ...new Set(companies.map(c => c.industry))];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f8fa' }}>
      <AdminSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminHeader />
        <main style={{ flex: 1, padding: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#222', marginBottom: 32 }}>Approve Companies</h1>
          <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search company by name or email..."
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
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <select
              value={industryFilter}
              onChange={e => setIndustryFilter(e.target.value)}
              style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e4e7ec', width: 200 }}
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 24 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f3f6f8' }}>
                  <th style={{ padding: 12, textAlign: 'left' }}>Logo</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Company Name</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Email</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Industry</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Registered</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(company => (
                  <tr key={company.id}>
                    <td style={{ padding: 12 }}><img src={company.logo} alt={company.name} style={{ width: 36, height: 36, borderRadius: 8, background: '#eee' }} /></td>
                    <td style={{ padding: 12 }}>{company.name}</td>
                    <td style={{ padding: 12 }}>{company.email}</td>
                    <td style={{ padding: 12 }}>{company.industry}</td>
                    <td style={{ padding: 12 }}>{company.registered}</td>
                    <td style={{ padding: 12 }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: 4,
                        fontSize: 13,
                        fontWeight: 500,
                        background: company.status === 'Approved' ? '#e6f7ef' : 
                                  company.status === 'Pending' ? '#fff4e5' : '#ffe5e5',
                        color: company.status === 'Approved' ? '#14a800' : 
                               company.status === 'Pending' ? '#ff9800' : '#e74c3c'
                      }}>
                        {company.status}
                      </span>
                    </td>
                    <td style={{ padding: 12 }}>
                      {company.status === 'Pending' ? (
                        <>
                          <button 
                            onClick={() => handleStatusChange(company.id, 'Approved')}
                            style={{ background: '#14a800', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 16px', marginRight: 8 }}
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleStatusChange(company.id, 'Rejected')}
                            style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 16px' }}
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span style={{ color: '#999', fontSize: 14 }}>Done</span>
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

export default ApproveCompany;

