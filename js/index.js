
document.addEventListener('DOMContentLoaded', () => {
    const welcomeMessages = [
        'Welcome to my creative space.',
        'Every project tells a story.',
        "Let's explore creativity together.",
        'Art meets technology.'
    ];

    const timeGreetingEl = document.getElementById('time-greeting');
    const welcomeMessageEl = document.getElementById('welcome-message');

    if (!timeGreetingEl || !welcomeMessageEl) {
        return;
    }

    const hours = new Date().getHours();
    const timeGreeting = hours < 12 ? 'Good morning' : 'Good evening';
    const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

    timeGreetingEl.textContent = timeGreeting;
    welcomeMessageEl.textContent = randomMessage;
});
