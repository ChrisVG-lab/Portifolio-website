function sayHello(){

    alert("GitHub Pages is working!");

}

document.addEventListener('DOMContentLoaded', function(){
    const body = document.body;
    const themeButton = document.querySelector('.top-right-button');

    if (themeButton) {
        themeButton.addEventListener('click', function(){
            const lightMode = body.classList.toggle('light-mode');
            themeButton.textContent = lightMode ? '☀️' : '🌙';
            themeButton.setAttribute('aria-label', lightMode ? 'Switch to dark mode' : 'Switch to light mode');
        });
    }

    // Initialize smooth details dropdowns for coursework (works on touch devices)
    (function setupCourseworkDropdowns(){
        document.querySelectorAll('details.education-coursework-dropdown').forEach(dropdown => {
            const content = dropdown.querySelector('.education-coursework');
            const summary = dropdown.querySelector('summary');
            if (!content || !summary) return;
            const updateHeight = () => {
                if (dropdown.open) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = '0px';
                }
            };
            dropdown.addEventListener('toggle', updateHeight);
            // ensure taps and keyboard activate the animated height update
            summary.addEventListener('click', () => setTimeout(updateHeight, 0));
            summary.addEventListener('pointerup', () => setTimeout(updateHeight, 0));
            summary.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') setTimeout(updateHeight, 0); });
            // initialize on load
            updateHeight();
        });
    })();

    const projectRange = document.querySelector('.project-range');
    const projectTrack = document.querySelector('.projects-slider-track');

    if (projectRange && projectTrack) {
        const sliderWindow = document.querySelector('.projects-slider-window');
        const sliderControl = document.querySelector('.slider-control');

        const updateProjectPosition = () => {
            const maxScroll = projectTrack.scrollWidth - projectTrack.parentElement.offsetWidth;
            projectTrack.style.transform = 'translateX(0)';
            if (maxScroll <= 0) {
                return;
            }

            const value = Number(projectRange.value) / Number(projectRange.max || 100);
            projectTrack.style.transform = `translateX(-${maxScroll * value}px)`;
        };

        const adjustRangeByWheel = (event) => {
            const maxScroll = projectTrack.scrollWidth - projectTrack.parentElement.offsetWidth;
            if (maxScroll <= 0) return;

            event.preventDefault();
            const delta = event.deltaY || event.deltaX;
            const sensitivity = 10;
            const step = Math.sign(delta) * Math.max(1, Math.round(Math.abs(delta) * sensitivity));
            projectRange.value = Math.min(
                Number(projectRange.max),
                Math.max(Number(projectRange.min), Number(projectRange.value) + step)
            );
            updateProjectPosition();
        };

        projectRange.addEventListener('input', updateProjectPosition);
        sliderWindow?.addEventListener('wheel', adjustRangeByWheel, { passive: false });
        projectRange.addEventListener('wheel', adjustRangeByWheel, { passive: false });

        document.querySelectorAll('.project-card').forEach((card) => {
            let pointerToggled = false;
            const toggleCard = () => {
                card.classList.toggle('flipped');
                const pressed = card.classList.contains('flipped');
                card.setAttribute('aria-pressed', String(pressed));
            };
            const onPointerUp = (e) => {
                pointerToggled = true;
                toggleCard();
                setTimeout(() => { pointerToggled = false; }, 500);
            };
            const onClick = (e) => {
                if (pointerToggled) return;
                toggleCard();
            };
            card.addEventListener('pointerup', onPointerUp);
            card.addEventListener('click', onClick);
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleCard();
                }
            });
        });

        projectRange.step = 1;
        projectRange.max = Number(projectRange.max) || 1000;
        updateProjectPosition();
    }
});