const sections =  document.querySelectorAll('.section');
const sectBtns =  document.querySelectorAll('.controlls');
const sectBtn =  document.querySelectorAll('.control');
const allSections =  document.querySelectorAll('.main-content');

function PageTransitions() {
    // button click active class
    for (let i = 0; i < sectBtn.length; i++) {
        sectBtn[i].addEventListener('click', function() {
            let currentBtn = document.querySelector('.active-btn'); 
            if (currentBtn) {
                currentBtn.classList.remove('active-btn'); // Use classList to remove the class
            }
            this.classList.add('active-btn'); // Use classList to add the class
        });
    }

    // section active class 
    allSections.forEach(section => {
        section.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            if (id) {
                // remove selected from the other buttons
                sectBtn.forEach((btn) => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');

                // hide other sections 
                sections.forEach((section) => {
                    section.classList.remove('active');
                });

                const element = document.getElementById(id);
                if (element) {
                    element.classList.add('active');
                }
            }
        });
    });

    // toggle theme 
    const themeBtn = document.querySelector('.theme-btn')
    themeBtn.addEventListener('click', ()=>{
        let element = document.body;
        element.classList.toggle('light-mode')
    })
}



PageTransitions();