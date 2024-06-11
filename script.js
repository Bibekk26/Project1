document.addEventListener('DOMContentLoaded', () => {
    const jobListings = document.getElementById('job-listings');
    const searchInput = document.getElementById('search');
    const postJobBtn = document.getElementById('post-job-btn');
    const modal = document.getElementById('modal');
    const closeModalBtn = document.querySelector('.close');
    const jobForm = document.getElementById('job-form');
    let jobs = [];

    fetch('jobs.json')
        .then(response => response.json())
        .then(data => {
            jobs = data;
            displayJobs(jobs);
            searchInput.addEventListener('input', () => filterJobs(jobs, searchInput.value));
        });

    postJobBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    jobForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newJob = {
            title: jobForm.title.value,
            company: jobForm.company.value,
            location: jobForm.location.value,
            description: jobForm.description.value,
        };
        jobs.push(newJob);
        displayJobs(jobs);
        modal.style.display = 'none';
        jobForm.reset();
    });

    function displayJobs(jobs) {
        jobListings.innerHTML = '';
        jobs.forEach(job => {
            const jobItem = document.createElement('div');
            jobItem.className = 'job-item';
            jobItem.innerHTML = `
                <h2>${job.title}</h2>
                <p>${job.company}</p>
                <p>${job.location}</p>
                <p>${job.description}</p>
            `;
            jobListings.appendChild(jobItem);
        });
    }

    function filterJobs(jobs, searchTerm) {
        const filteredJobs = jobs.filter(job => 
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
        displayJobs(filteredJobs);
    }
});
