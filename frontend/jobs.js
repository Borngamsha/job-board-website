const results = document.getElementById("results");
const searchForm = document.getElementById("jobSearchForm");


// Load all jobs when the page opens
loadJobs();


async function loadJobs() {

    try {

        const response = await fetch("https://job-board-backend-ml8v.onrender.com/api/jobs");

        const jobs = await response.json();

        displayJobs(jobs);

    } catch (error) {

        console.error("Error loading jobs:", error);

        results.innerHTML = `
            <p>Cannot connect to the server.</p>
        `;
    }
}


// Search jobs
searchForm.addEventListener("submit", async function(e) {

    e.preventDefault();

    const title = document
        .getElementById("jobTitle")
        .value
        .toLowerCase()
        .trim();

    const location = document
        .getElementById("location")
        .value
        .toLowerCase()
        .trim();


    try {

        const response = await fetch("https://job-board-backend-ml8v.onrender.com/api/jobs");

        const jobs = await response.json();


        const filteredJobs = jobs.filter(job => {

            const jobTitle = job.title.toLowerCase();
            const jobLocation = job.location.toLowerCase();

            return (
                (!title || jobTitle.includes(title)) &&
                (!location || jobLocation.includes(location))
            );

        });


        displayJobs(filteredJobs);

    } catch (error) {

        console.error("Search error:", error);

        results.innerHTML = `
            <p>Cannot connect to the server.</p>
        `;
    }

});


// Display jobs
function displayJobs(jobs) {

    if (jobs.length === 0) {

        results.innerHTML = `
            <p>No jobs found.</p>
        `;

        return;
    }


    results.innerHTML = "";


    jobs.forEach(job => {

        const jobCard = document.createElement("div");

        jobCard.className = "job-card";


        jobCard.innerHTML = `

           <h3>${job.title}</h3>

<p>
    <strong>Company:</strong>
    ${job.company}
</p>

<p>
    <strong>Company Email:</strong>
    ${job.companyEmail}
</p>

<p>
    <strong>Contact Number:</strong>
    ${job.contactNumber}
</p>

<p>
    <strong>Location:</strong>
    ${job.location}
</p>
            <p>
                <strong>Job Type:</strong>
                ${job.jobType}
            </p>

            <p>
                <strong>Salary:</strong>
                ${job.salary || "Not specified"}
            </p>

            <p>
                <strong>Experience:</strong>
                ${job.experience || "Not specified"}
            </p>

            <p>
                <strong>Qualifications:</strong>
                ${job.qualification || "Not specified"}
            </p>

            <p>
                <strong>Skills:</strong>
                ${job.skills || "Not specified"}
            </p>

            <p>
                <strong>Description:</strong>
                ${job.description}
            </p>

        `;


        results.appendChild(jobCard);

    });

}