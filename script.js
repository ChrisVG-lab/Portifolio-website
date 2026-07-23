function sayHello(){

    alert("GitHub Pages is working!");

}

document.addEventListener('DOMContentLoaded', function(){
    const body = document.body;
    const themeButton = document.querySelector('.top-right-button');

    if (!themeButton) return;

    themeButton.addEventListener('click', function(){
        const lightMode = body.classList.toggle('light-mode');
        themeButton.textContent = lightMode ? '☀️' : '🌙';
        themeButton.setAttribute('aria-label', lightMode ? 'Switch to dark mode' : 'Switch to light mode');
    });
});