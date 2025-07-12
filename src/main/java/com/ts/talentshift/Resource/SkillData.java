package com.ts.talentshift.Resource;

import java.util.*;

public class SkillData {

    public static final Map<String, List<String>> SKILL_DATA;

    static {

        SKILL_DATA = Map.ofEntries(Map.entry("Software Development", Arrays.asList(
                "Java", "Python", "C++", "C#", "Ruby", "Go", "Rust", "TypeScript", "PHP", "Kotlin", "Scala", "Perl", "R", "MATLAB"
        )), Map.entry("Web Development", Arrays.asList(
                "HTML", "CSS", "JavaScript", "React", "Angular", "Vue.js", "Node.js", "Express.js", "Django", "Flask",
                "ASP.NET", "ASP.NET MVC", "Spring Boot", "Laravel", "Ruby on Rails"
        )), Map.entry("Mobile App Development", Arrays.asList(
                "Android Development", "iOS Development", "Flutter", "React Native", "Ionic", "Xamarin", "Swift",
                "Kotlin", "Objective-C", "Java (Android)"
        )), Map.entry("UI/UX Design", Arrays.asList(
                "Figma", "Sketch", "Adobe XD", "Invision", "Wireframing", "Prototyping", "User Research",
                "Usability Testing", "Interaction Design", "Visual Design"
        )), Map.entry("Design", Arrays.asList(
                "Graphic Design", "Adobe Photoshop", "Adobe Illustrator", "CorelDRAW", "Canva", "Motion Graphics",
                "3D Modeling", "Blender", "AutoCAD", "Typography"
        )), Map.entry("Marketing", Arrays.asList(
                "SEO", "SEM", "Content Marketing", "Social Media Marketing", "Email Marketing", "Google Analytics",
                "Digital Advertising", "Branding", "Market Research", "PPC"
        )), Map.entry("Finance", Arrays.asList(
                "Financial Analysis", "Accounting", "Budgeting", "Forecasting", "Tax Planning", "QuickBooks", "SAP",
                "Excel (Advanced)", "Risk Management", "Investment Analysis"
        )), Map.entry("HR", Arrays.asList(
                "Recruitment", "Talent Management", "Employee Relations", "Payroll Management", "HRIS",
                "Performance Management", "Training & Development", "Compensation Planning", "Onboarding",
                "Labor Law Compliance"
        )), Map.entry("Sales", Arrays.asList(
                "Sales Strategy", "Lead Generation", "CRM (Salesforce)", "Cold Calling", "Negotiation",
                "Account Management", "Sales Forecasting", "Pipeline Management", "B2B Sales", "B2C Sales"
        )), Map.entry("Customer Service", Arrays.asList(
                "Zendesk", "Customer Support", "Conflict Resolution", "Ticketing Systems", "Live Chat Support",
                "SLA Management", "Customer Feedback Analysis", "Call Center Operations", "Multichannel Support",
                "Empathy Training"
        )), Map.entry("Operations", Arrays.asList(
                "Supply Chain Management", "Logistics", "Inventory Management", "Process Optimization",
                "Lean Six Sigma", "Project Management", "Kanban", "Scrum", "ERP Systems", "Vendor Management"
        )), Map.entry("IT", Arrays.asList(
                "System Administration", "Network Security", "Cloud Computing", "AWS", "Azure", "Google Cloud",
                "DevOps", "Docker", "Kubernetes", "Cybersecurity"
        )), Map.entry("Legal", Arrays.asList(
                "Contract Drafting", "Compliance", "Intellectual Property", "Corporate Law", "Litigation",
                "Legal Research", "Regulatory Affairs", "Risk Assessment", "Data Privacy", "Employment Law"
        )));
    }
}
