const express = require("express");
const Job = require("../models/job");

const router = express.Router();


// GET ALL JOBS
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });

        res.json(jobs);

    } catch (error) {
        console.error("Error fetching jobs:", error);

        res.status(500).json({
            message: "Server error while fetching jobs."
        });
    }
});


// POST A JOB
// POST A JOB
router.post("/", async (req, res) => {
    try {
        const {
            title,
            company,
            location,
            jobType,
            salary,
            experience,
            qualification,
            skills,
            description
        } = req.body;

        if (!title || !company || !location || !description) {
            return res.status(400).json({
                message: "Title, company, location and description are required."
            });
        }

        const job = await Job.create({
            title,
            company,
            location,
            jobType,
            salary,
            experience,
            qualification,
            skills,
            description
        });

        res.status(201).json({
            message: "Job posted successfully!",
            job
        });

    } catch (error) {
        console.error("Error posting job:", error);

        res.status(500).json({
            message: "Server error while posting job."
        });
    }
});


module.exports = router;