const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth");


const app = express();
const PORT = 3000;

app.use(cors());        // <-- ADD THIS LINE
app.use(express.json());
mongoose
    .connect("mongodb://127.0.0.1:27017/jobboard")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
    app.use("/api/auth", authRoutes);

const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "Google",
        location: "Bangalore",
        qualification: "B.Tech CSE",
        skills: ["HTML", "CSS", "JavaScript"]
    },

    {
        id: 2,
        title: "Backend Developer",
        company: "Microsoft",
        location: "Hyderabad",
        qualification: "B.Tech CSE",
        skills: ["Java", "Node.js", "SQL", "Python"]
    },

    {
        id: 3,
        title: "Full Stack Developer",
        company: "Amazon",
        location: "Chennai",
        qualification: "B.Tech CSE",
        skills: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"]
    },

    {
        id: 4,
        title: "UI/UX Designer",
        company: "Adobe",
        location: "Remote",
        qualification: "Bachelor's Degree",
        skills: ["Figma", "Adobe XD", "Photoshop", "UI Design"]
    },

    {
        id: 5,
        title: "Data Analyst",
        company: "Deloitte",
        location: "Pune",
        qualification: "B.Tech / B.Sc",
        skills: ["Python", "SQL", "Excel", "Power BI"]
    },

    {
        id: 6,
        title: "Cloud Engineer",
        company: "IBM",
        location: "Noida",
        qualification: "B.Tech CSE",
        skills: ["AWS", "Azure", "Linux", "Docker"]
    },

    {
        id: 7,
        title: "Cyber Security Analyst",
        company: "Infosys",
        location: "Bangalore",
        qualification: "B.Tech CSE",
        skills: ["Cyber Security", "Networking", "Linux", "Python"]
    },

    {
        id: 8,
        title: "Android Developer",
        company: "Samsung",
        location: "Delhi",
        qualification: "B.Tech CSE",
        skills: ["Java", "Kotlin", "Android", "XML"]
    },

    {
        id: 9,
        title: "iOS Developer",
        company: "Apple",
        location: "Remote",
        qualification: "B.Tech CSE",
        skills: ["Swift", "iOS", "Xcode", "UIKit"]
    },

    {
        id: 10,
        title: "Machine Learning Engineer",
        company: "NVIDIA",
        location: "Hyderabad",
        qualification: "B.Tech CSE / AI",
        skills: ["Python", "Machine Learning", "TensorFlow", "Data Science"]
    },

    {
        id: 11,
        title: "Software Engineer",
        company: "Oracle",
        location: "Mumbai",
        qualification: "B.Tech CSE",
        skills: ["Java", "Python", "DSA", "SQL"]
    },

    {
        id: 12,
        title: "DevOps Engineer",
        company: "Accenture",
        location: "Pune",
        qualification: "B.Tech CSE",
        skills: ["Docker", "Kubernetes", "AWS", "Linux", "CI/CD"]
    },

    {
        id: 13,
        title: "QA Engineer",
        company: "Capgemini",
        location: "Chennai",
        qualification: "B.Tech CSE",
        skills: ["Testing", "Selenium", "Java", "SQL"]
    },

    {
        id: 14,
        title: "Business Analyst",
        company: "TCS",
        location: "Kolkata",
        qualification: "Bachelor's Degree",
        skills: ["Excel", "SQL", "Data Analysis", "Communication"]
    },

    {
        id: 15,
        title: "AI Engineer",
        company: "OpenAI",
        location: "Remote",
        qualification: "B.Tech CSE / AI",
        skills: ["Python", "Machine Learning", "Deep Learning", "AI"]
    },

    {
        id: 16,
        title: "Database Administrator",
        company: "Wipro",
        location: "Bangalore",
        qualification: "B.Tech CSE",
        skills: ["SQL", "MySQL", "MongoDB", "Database Management"]
    },

    {
        id: 17,
        title: "Network Engineer",
        company: "Cisco",
        location: "Hyderabad",
        qualification: "B.Tech CSE",
        skills: ["Networking", "CCNA", "Linux", "TCP/IP"]
    },

    {
        id: 18,
        title: "Technical Support Engineer",
        company: "HCL Technologies",
        location: "Noida",
        qualification: "Bachelor's Degree",
        skills: ["Networking", "Linux", "Troubleshooting", "Communication"]
    },

    {
        id: 19,
        title: "Game Developer",
        company: "Ubisoft",
        location: "Pune",
        qualification: "B.Tech CSE",
        skills: ["C++", "Unity", "C#", "Game Development"]
    },

    {
        id: 20,
        title: "Product Manager",
        company: "Zoho",
        location: "Chennai",
        qualification: "Bachelor's Degree",
        skills: ["Product Management", "Communication", "Leadership", "Agile"]
    }
];


// Home route
app.get("/", (req, res) => {
    res.send("Backend is working!");
});


// Get all jobs
app.get("/jobs", (req, res) => {
    res.json(jobs);
});
//POST candidate credentials
app.post("/candidate", (req, res) => {

    const candidate = req.body;

    const jobRole = (candidate.jobRole || "").toLowerCase();
    const skills = (candidate.skills || "").toLowerCase();
    const preferredLocation =
        (candidate.preferredLocation || "").toLowerCase();

    const matchingJobs = jobs.filter(job => {

        const jobTitle = job.title.toLowerCase();
        const jobLocation = job.location.toLowerCase();

        const roleMatch =
            jobTitle.includes(jobRole) ||
            jobRole.includes(jobTitle);

        const locationMatch =
            !preferredLocation ||
            jobLocation.includes(preferredLocation) ||
            jobLocation === "remote";

        return roleMatch || locationMatch;
    });

    res.json({
        message: "Candidate credentials received successfully!",
        matchingJobs: matchingJobs
    });

});
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "pages")));
app.use(express.static(path.join(__dirname, "js")));



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});