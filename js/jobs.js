
const form = document.getElementById("jobSearchForm");
const titleInput = document.getElementById("jobTitle");
const locationInput = document.getElementById("location");
const results = document.getElementById("results");

let jobs = [];


// Get all jobs from backend
fetch("http://localhost:3000/jobs")
    .then(response => response.json())
    .then(data => {

        jobs = data;

        // Check if candidate has matching jobs
        const savedMatchingJobs =
            localStorage.getItem("matchingJobs");

        if (savedMatchingJobs) {

            const matchingJobs =
                JSON.parse(savedMatchingJobs);

            displayJobs(matchingJobs);

            // Remove them after displaying
            localStorage.removeItem("matchingJobs");

        }

    })
    .catch(error => {

        console.error(error);

        results.innerHTML =
            "<p>Unable to load jobs.</p>";

    });


// Search Jobs
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const title =
        titleInput.value.toLowerCase().trim();

    const location =
        locationInput.value.toLowerCase().trim();


    const filteredJobs = jobs.filter(job => {

        const jobTitle =
            job.title.toLowerCase();

        const jobLocation =
            job.location.toLowerCase();


        return (

            jobTitle.includes(title) &&

            jobLocation.includes(location)

        );

    });


    displayJobs(filteredJobs);

});


// Display Jobs Function
function displayJobs(jobList) {

    if (jobList.length === 0) {

        results.innerHTML =
            "<p>No matching jobs found.</p>";

        return;

    }


    const cards = jobList.map(job => `

        <div class="job-card">

            <h3>${job.title}</h3>

            <p>
                <strong>
                    ${job.company}
                </strong>
            </p>

            <p>
                📍 ${job.location}
            </p>

            <button class="apply-btn">
                Apply Now
            </button>

        </div>

    `);


    results.innerHTML =
        cards.join("");

}