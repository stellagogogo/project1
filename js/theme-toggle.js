document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            toggleButton.textContent = 'Light';
        }
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior if it's an anchor
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark-mode');
                toggleButton.textContent = 'Light';
            } else {
                localStorage.setItem('theme', 'light-mode');
                toggleButton.textContent = 'Dark';
            }
        });
    }
});
