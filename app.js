// Cache DOM selections to improve performance
const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelector('.controlls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');
const themeBtn = document.querySelector('.theme-btn');

function PageTransitions() {
    // Use event delegation for button clicks to improve performance
    if (sectBtns) {
        sectBtns.addEventListener('click', (e) => {
            const target = e.target.closest('.control');
            if (!target) return; // Only proceed if a control button was clicked

            // Handle active button state
            const currentBtn = document.querySelector('.active-btn');
            if (currentBtn) currentBtn.classList.remove('active-btn');
            target.classList.add('active-btn');

            // Handle section visibility
            const id = target.dataset.id;
            if (id) {
                // Remove active class from all buttons and sections
                sectBtn.forEach(btn => btn.classList.remove('active'));
                sections.forEach(section => section.classList.remove('active'));

                // Add active class to clicked button and corresponding section
                target.classList.add('active');
                const element = document.getElementById(id);
                if (element) element.classList.add('active');
            }
        });
    }

    // Initialize the page with default active section
    function initPage() {
        // Set default active section if none is active
        const activeSection = document.querySelector('.section.active');
        if (!activeSection && sections.length > 0) {
            sections[0].classList.add('active');
            
            // Set corresponding button active
            const firstSectionId = sections[0].id;
            const correspondingBtn = document.querySelector(`.control[data-id="${firstSectionId}"]`);
            if (correspondingBtn) {
                correspondingBtn.classList.add('active-btn');
                correspondingBtn.classList.add('active');
            }
        }
    }

    // Theme toggle with local storage persistence
    if (themeBtn) {
        // Apply saved theme on page load
        if (localStorage.getItem('theme') === 'light-mode') {
            document.body.classList.add('light-mode');
        }

        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            // Save theme preference
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light-mode');
            } else {
                localStorage.setItem('theme', 'dark-mode');
            }
        });
    }

    // Call init function
    initPage();

    // Optional: Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optional: Add transition animation class
    function addTransitionClass() {
        sections.forEach(section => {
            section.addEventListener('transitionstart', () => {
                section.classList.add('is-transitioning');
            });
            
            section.addEventListener('transitionend', () => {
                section.classList.remove('is-transitioning');
            });
        });
    }
    
    addTransitionClass();
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', PageTransitions);
} else {
    PageTransitions();
}