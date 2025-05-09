// Pomodoro Timer - A simple timer application for productivity
// Created by psychodynamicpsychology

class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.timerId = null;
        this.isRunning = false;
        this.mode = 'pomodoro';
        
        // Timer durations in minutes
        this.durations = {
            pomodoro: 25,
            shortBreak: 5,
            longBreak: 15
        };

        // DOM elements
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');
        this.pomodoroButton = document.getElementById('pomodoro');
        this.shortBreakButton = document.getElementById('shortBreak');
        this.longBreakButton = document.getElementById('longBreak');
        this.modal = document.getElementById('focusModal');
        this.focusInput = document.getElementById('focusInput');
        this.confirmFocusButton = document.getElementById('confirmFocus');
        this.cancelFocusButton = document.getElementById('cancelFocus');

        // Event listeners
        this.startButton.addEventListener('click', () => this.showFocusModal());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());
        this.pomodoroButton.addEventListener('click', () => this.setMode('pomodoro'));
        this.shortBreakButton.addEventListener('click', () => this.setMode('shortBreak'));
        this.longBreakButton.addEventListener('click', () => this.setMode('longBreak'));
        this.confirmFocusButton.addEventListener('click', () => this.handleFocusConfirm());
        this.cancelFocusButton.addEventListener('click', () => this.hideFocusModal());
        this.focusInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleFocusConfirm();
            }
        });
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
        document.title = `${timeString} - Pomodoro Timer`;
    }

    showFocusModal() {
        if (!this.isRunning) {
            this.modal.style.display = 'flex';
            this.focusInput.value = '';
            this.focusInput.focus();
        }
    }

    hideFocusModal() {
        this.modal.style.display = 'none';
    }

    handleFocusConfirm() {
        const focusTask = this.focusInput.value.trim();
        if (focusTask) {
            this.hideFocusModal();
            this.startTimer();
        }
    }

    startTimer() {
        this.isRunning = true;
        this.timerId = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft === 0) {
                this.playAlarm();
                this.pause();
            }
        }, 1000);
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.timerId);
    }

    reset() {
        this.pause();
        this.timeLeft = this.durations[this.mode] * 60;
        this.updateDisplay();
    }

    setMode(mode) {
        this.mode = mode;
        this.pause();
        this.timeLeft = this.durations[mode] * 60;
        this.updateDisplay();

        // Update active button
        document.querySelectorAll('.mode-switches button').forEach(button => {
            button.classList.remove('active');
        });
        document.getElementById(mode).classList.add('active');
    }

    playAlarm() {
        const audio = new Audio('data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4Rcf8KjfvEg+0TsrzrceyTQKQJgA4d1q/CmBrHgPcmjiGoh//EwC5nGPEmS4Rcf8KjfvEg+0TsrzrceyTQKQJgAAABXBaBABVDY5FohDAQwAmIOD3kbidAvuZBVYjobBFx+xkBywqQm/GDESPMVSB8ehJD1Crso3CofC4HXcwDhrWr8OYGseA9yaOIaiH/8TALmcY8SZLhFx/wqN+8SD7ROyvOtx7JNApAmADh3Wr8KYGseA9yaOIaiH/8TALmcY8SZLhFx/wqN+8SD7ROyvOtx7JNApAmAAA==');
        audio.play();
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const timer = new PomodoroTimer();
}); 