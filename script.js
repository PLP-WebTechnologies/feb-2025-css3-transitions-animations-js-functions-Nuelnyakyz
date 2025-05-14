const animatedElement = document.getElementById('animated-element');
const animationType = document.getElementById('animation-type');
const animationDuration = document.getElementById('animation-duration');
const durationDisplay = document.getElementById('duration-display');
const animationColor = document.getElementById('animation-color');
const applyBtn = document.getElementById('apply-btn');
const saveBtn = document.getElementById('save-btn');
const resetBtn = document.getElementById('reset-btn');
const playBtn = document.getElementById('play-btn');
const savedMessage = document.getElementById('saved-message');

// Default settings
const defaultSettings = {
    type: 'bounce',
    duration: 1,
    color: '#3498db'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadPreferences();
    
    setupEventListeners();
    
    updateDurationDisplay();
});

function setupEventListeners() {

    applyBtn.addEventListener('click', applySettings);
    
    saveBtn.addEventListener('click', savePreferences);
    
    resetBtn.addEventListener('click', resetToDefaults);
    
    playBtn.addEventListener('click', playAnimation);
    
    animationDuration.addEventListener('input', updateDurationDisplay);

    animatedElement.addEventListener('mouseover', function() {
    });
}

function applySettings() {

    removeAnimationClasses();

    const type = animationType.value;
    const duration = animationDuration.value;
    const color = animationColor.value;

    animatedElement.style.backgroundColor = color;
    animatedElement.style.animationDuration = `${duration}s`;

    updateDurationDisplay();
}

function playAnimation() {
    removeAnimationClasses();

    const type = animationType.value;
    animatedElement.classList.add(`animate-${type}`);

    const duration = parseFloat(animationDuration.value) * 1000;
    setTimeout(() => {
        removeAnimationClasses();
        }, duration * 2);
    }

function removeAnimationClasses() {
    animatedElement.classList.remove(
        'animate-bounce',
        'animate-spin',
        'animate-pulse',
        'animate-shake'
    );
}

function updateDurationDisplay() {
    durationDisplay.textContent = `${animationDuration.value}s`;
}

function savePreferences() {
    const preferences = {
        type: animationType.value,
        duration: animationDuration.value,
        color: animationColor.value
    };
    
    // Save to localStorage
    localStorage.setItem('animationPreferences', JSON.stringify(preferences));

    showSavedMessage();
}

function loadPreferences() {
    // Try to get saved preferences from localStorage
    const savedPreferences = localStorage.getItem('animationPreferences');
    
    if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);
        
        // Apply the saved preferences to the UI
        animationType.value = preferences.type || defaultSettings.type;
        animationDuration.value = preferences.duration || defaultSettings.duration;
        animationColor.value = preferences.color || defaultSettings.color;
        
        applySettings();
    } else {
        resetToDefaults();
    }
}

function resetToDefaults() {
    animationType.value = defaultSettings.type;
    animationDuration.value = defaultSettings.duration;
    animationColor.value = defaultSettings.color;
    
    applySettings();
}

function showSavedMessage() {
    savedMessage.classList.add('show');
    
    // Hide the message after 2 seconds
    setTimeout(() => {
        savedMessage.classList.remove('show');
    }, 2000);
}