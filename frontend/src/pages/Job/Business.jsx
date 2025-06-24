import React, { useState } from "react";
import { Table, Tag, Input, Select, Button } from "antd";
import styles from './Business.module.css';

// Demo data ứng viên
const applicantsData = [
  {
    id: 1,
    name: "Nguyen Van A",
    email: "a@gmail.com",
    skills: ["React", "Node.js", "CSS"],
    experience: 3,
    expectedSalary: 1200,
    status: "Pending",
  },
  {
    id: 2,
    name: "Tran Thi B",
    email: "b@gmail.com",
    skills: ["Java", "Spring", "SQL"],
    experience: 5,
    expectedSalary: 1500,
    status: "Pending",
  },
  {
    id: 3,
    name: "Le Van C",
    email: "c@gmail.com",
    skills: ["Python", "Django", "React"],
    experience: 2,
    expectedSalary: 1000,
    status: "Pending",
  },
];

const allSkills = [
  ...new Set(applicantsData.flatMap((u) => u.skills)),
];

export default function Business() {
  const [search, setSearch] = useState("");
  const [skill, setSkill] = useState("");
  const [minExp, setMinExp] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  // Filter logic
  const filtered = applicantsData.filter((u) => {
    const matchName =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchSkill = skill ? u.skills.includes(skill) : true;
    const matchExp = minExp ? u.experience >= Number(minExp) : true;
    const matchSalary = maxSalary ? u.expectedSalary <= Number(maxSalary) : true;
    return matchName && matchSkill && matchExp && matchSalary;
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 600 }}>{text}</div>
          <div style={{ fontSize: 13, color: "#888" }}>{record.email}</div>
        </div>
      ),
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
      render: (skills) => (
        <>
          {skills.map((s) => (
            <Tag color="blue" key={s}>{s}</Tag>
          ))}
        </>
      ),
    },
    {
      title: "Experience (years)",
      dataIndex: "experience",
      key: "experience",
      align: "center",
    },
    {
      title: "Expected Salary ($)",
      dataIndex: "expectedSalary",
      key: "expectedSalary",
      align: "center",
      render: (val) => <span style={{ fontWeight: 600 }}>{val}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Pending" ? "orange" : "green"}>{status}</Tag>
      ),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" size="small">View Profile</Button>
      ),
      align: "center",
    },
  ];

  return (
    <div className={styles.businessContainer}>
      <h2 className={styles.businessTitle}>Applicants for Your Job</h2>
      <div className={styles.businessFilterBar}>
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 240, borderRadius: 8 }}
        />
        <Select
          allowClear
          placeholder="Filter by skill"
          value={skill}
          onChange={setSkill}
          style={{ width: 180 }}
        >
          {allSkills.map(s => (
            <Select.Option key={s} value={s}>{s}</Select.Option>
          ))}
        </Select>
        <Input
          type="number"
          min={0}
          placeholder="Min experience (years)"
          value={minExp}
          onChange={e => setMinExp(e.target.value)}
          style={{ width: 180, borderRadius: 8 }}
        />
        <Input
          type="number"
          min={0}
          placeholder="Max salary ($)"
          value={maxSalary}
          onChange={e => setMaxSalary(e.target.value)}
          style={{ width: 180, borderRadius: 8 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filtered}
        rowKey="id"
        pagination={{ pageSize: 6 }}
        bordered
        className={styles.businessTable}
        style={{ background: '#fff', borderRadius: 12 }}
      />
    </div>
  );
} 