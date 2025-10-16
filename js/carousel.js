// Carousel functionality (Manual, Hardcoded Version)

const projectImages = {
    construction: [
        'images/projects/construction/1.jpg',
        'images/projects/construction/2.jpg',
        'images/projects/construction/3.jpg',
        'images/projects/construction/4.jpg',
        'images/projects/construction/5.jpg',
        'images/projects/construction/6.jpg',
        'images/projects/construction/7.jpg',
        'images/projects/construction/8.jpg',
        'images/projects/construction/9.jpg',
        'images/projects/construction/10.jpg',
        'images/projects/construction/11.jpg',
        'images/projects/construction/12.jpg',
        'images/projects/construction/13.jpg',
        'images/projects/construction/14.jpg',
        'images/projects/construction/15.jpg',
        'images/projects/construction/16.jpg',
        'images/projects/construction/17.jpg',
        'images/projects/construction/18.jpg',
        'images/projects/construction/19.jpg',
        'images/projects/construction/20.jpg'
    ],
    // NOTE: The folder name is 'constrution2', so the project key must match.
    constrution2: [
        'images/projects/constrution2/1.jpg',
        'images/projects/constrution2/2.jpg',
        'images/projects/constrution2/3.jpg',
        'images/projects/constrution2/4.jpg',
        'images/projects/constrution2/5.jpg',
        'images/projects/constrution2/6.jpg',
        'images/projects/constrution2/7.jpg',
        'images/projects/constrution2/8.jpg',
        'images/projects/constrution2/9.jpg',
        'images/projects/constrution2/10.jpg',
        'images/projects/constrution2/11.jpg',
        'images/projects/constrution2/12.jpg',
        'images/projects/constrution2/13.jpg',
        'images/projects/constrution2/14.jpg',
        'images/projects/constrution2/15.jpg',
        'images/projects/constrution2/16.jpg',
        'images/projects/constrution2/17.jpg',
        'images/projects/constrution2/18.jpg',
        'images/projects/constrution2/19.jpg',
        'images/projects/constrution2/20.jpg'
    ],
    equipment: [
        'images/projects/equipment/1.jpg',
        'images/projects/equipment/2.jpg',
        'images/projects/equipment/3.jpg',
        'images/projects/equipment/4.jpg',
        'images/projects/equipment/5.jpg',
        'images/projects/equipment/6.jpg',
        'images/projects/equipment/7.jpg'
    ]
};

const currentSlides = {
    construction: 0,
    constrution2: 0, // Matching the key above
    equipment: 0
};

function initializeCarousels() {
    // In projects.html, the second project has data-project="demolition". This needs to match "constrution2".
    // For now, we manually select it to populate the carousel.
    const demolitionProject = document.querySelector('[data-project="demolition"]');
    if (demolitionProject) {
        populateCarousel(demolitionProject, 'constrution2');
    }

    Object.keys(projectImages).forEach(project => {
        const projectElement = document.querySelector(`[data-project="${project}"]`);
        if (projectElement) {
            populateCarousel(projectElement, project);
        }
    });
}

function populateCarousel(projectElement, projectKey) {
    const carouselTrack = projectElement.querySelector('.carousel-track');
    const indicators = document.getElementById(`${projectKey}-indicators`) || document.getElementById(`${projectElement.dataset.project}-indicators`);
    if (!carouselTrack || !indicators) return;

    carouselTrack.innerHTML = '';
    indicators.innerHTML = '';

    projectImages[projectKey].forEach((imageSrc, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `${projectKey} - Image ${index + 1}`;
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openLightbox(imageSrc));

        slide.appendChild(img);
        carouselTrack.appendChild(slide);

        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToSlide(projectKey, index));
        indicators.appendChild(indicator);
    });
    updateCarousel(projectKey);
}

function updateCarousel(project) {
    const projectElement = document.querySelector(`[data-project="${project}"]`) || document.querySelector('[data-project="demolition"]');
    const carouselTrack = projectElement.querySelector('.carousel-track');
    const indicators = document.querySelectorAll(`#${project}-indicators .indicator, #${projectElement.dataset.project}-indicators .indicator`);
    if (!carouselTrack || !projectImages[project] || projectImages[project].length === 0) return;

    carouselTrack.style.transform = `translateX(-${currentSlides[project] * 100}%)`;
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlides[project]);
    });
}

function nextSlide(project) {
    if (!projectImages[project] || projectImages[project].length === 0) return;
    const totalSlides = projectImages[project].length;
    currentSlides[project] = (currentSlides[project] + 1) % totalSlides;
    updateCarousel(project);
}

function prevSlide(project) {
    if (!projectImages[project] || projectImages[project].length === 0) return;
    const totalSlides = projectImages[project].length;
    currentSlides[project] = (currentSlides[project] - 1 + totalSlides) % totalSlides;
    updateCarousel(project);
}

function goToSlide(project, slideIndex) {
    if (!projectImages[project] || projectImages[project].length === 0) return;
    currentSlides[project] = slideIndex;
    updateCarousel(project);
}

document.addEventListener('DOMContentLoaded', initializeCarousels);

window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;