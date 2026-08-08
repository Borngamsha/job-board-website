const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        company: {
    type: String,
    required: true,
    trim: true
},

companyEmail: {
    type: String,
    required: true,
    trim: true
},

contactNumber: {
    type: String,
    required: true,
    trim: true
},

        location: {
            type: String,
            required: true,
            trim: true
        },

        jobType: {
            type: String,
            required: true
        },

        salary: {
            type: String,
            default: ""
        },

        experience: {
            type: String,
            default: ""
        },

        qualification: {
            type: String,
            default: ""
        },

        skills: {
            type: String,
            default: ""
        },

        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Job", jobSchema);