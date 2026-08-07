const candidateForm = document.querySelector(".candidate-form");

candidateForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    // Get candidate details
    const candidateData = {

        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        location: document.getElementById("location").value,

        qualification: document.getElementById("qualification").value,
        course: document.getElementById("course").value,
        institution: document.getElementById("institution").value,
        graduationYear: document.getElementById("graduationYear").value,
        percentage: document.getElementById("percentage").value,
        educationType: document.getElementById("educationType").value,

        skills: document.getElementById("skills").value,
        otherSkills: document.getElementById("otherSkills").value,
        experience: document.getElementById("experience").value,
        jobRole: document.getElementById("jobRole").value,

        certificateName: document.getElementById("certificateName").value,
        issuingOrganization: document.getElementById("issuingOrganization").value,

        preferredLocation: document.getElementById("preferredLocation").value,
        jobType: document.getElementById("jobType").value,
        expectedSalary: document.getElementById("expectedSalary").value

    };


    try {

        const response = await fetch(
            "http://localhost:3000/candidate",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(candidateData)
            }
        );


        const data = await response.json();


        if (response.ok) {

            // Save candidate information
            localStorage.setItem(
                "candidateData",
                JSON.stringify(candidateData)
            );


            // Save matching jobs
            localStorage.setItem(
                "matchingJobs",
                JSON.stringify(data.matchingJobs)
            );


            // Go to jobs page
            window.location.href = "job.html";

        } else {

            alert(
                data.message ||
                "Something went wrong."
            );

        }


    } catch (error) {

        console.error(error);

        alert(
            "Could not connect to the backend."
        );

    }

});