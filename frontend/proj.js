let jobs = [];

fetch("http://localhost:3000/jobs")
    .then(response => response.json())
    .then(data => {
        jobs = data;
    })
    .catch(error => console.error(error));


// Select Elements
const form = document.querySelector(".search form");
const titleInput = document.getElementById("jobTitle");
const locationInput = document.getElementById("location");
const results = document.getElementById("results");

// Search Function
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const title = titleInput.value.toLowerCase().trim();
    const location = locationInput.value.toLowerCase().trim();

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(title) &&
        job.location.toLowerCase().includes(location)
    );

    if (filteredJobs.length === 0) {

        results.innerHTML = "<p>No jobs found.</p>";

    } else {

       const cards = filteredJobs.map(job => `
    <div class="job-card">
        <h3>${job.title}</h3>
        <p><strong>${job.company}</strong></p>
        <p>📍 ${job.location}</p>
    </div>
`);

        results.innerHTML = cards.join("");
    }

    showToast("Search completed!");

});

// Toast Notification
let toastTimer = null;

function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.background = "green";
    toast.style.color = "white";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "5px";
    toast.style.fontFamily = "Arial";
    toast.style.zIndex = "1000";

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.remove();
    }, 2000);

}

// Back to Top Button
const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";
topBtn.title = "Back to Top";

topBtn.style.position = "fixed";
topBtn.style.bottom = "20px";
topBtn.style.left = "20px";
topBtn.style.padding = "10px 15px";
topBtn.style.fontSize = "18px";
topBtn.style.border = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.background = "#007bff";
topBtn.style.color = "#fff";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.zIndex = "1000";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

    if (window.scrollY > 200) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


popupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    alert(popupTitle.textContent + " Successful!");

    popup.style.display = "none";
});