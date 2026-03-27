class BirthdayCountdown {
    constructor() {
        this.users = [];
        this.currentUser = null;
        this.dateMode = 'picker';
        this.lastTime = {
            days: -1,
            hours: -1,
            minutes: -1,
            seconds: -1
        };
        this.init();
    }

    init() {
        this.createParticles();
        this.loadUsersFromStorage();
        this.bindEvents();
        this.renderUsers();
        this.startCountdown();
    }

    createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = Math.random() * 10 + 5 + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = Math.random() * 10 + 10 + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            particlesContainer.appendChild(particle);
        }
    }

    bindEvents() {
        document.getElementById('create-user').addEventListener('click', () => {
            this.handleCreateUser();
        });
        
        document.getElementById('update-user').addEventListener('click', () => {
            this.handleUpdateUser();
        });
        
        document.getElementById('user-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleCreateUser();
            }
        });
        
        document.getElementById('picker-mode-btn').addEventListener('click', () => {
            this.switchDateMode('picker');
        });
        
        document.getElementById('manual-mode-btn').addEventListener('click', () => {
            this.switchDateMode('manual');
        });
        
        const datePicker = document.getElementById('birthday-date-picker');
        const dateManual = document.getElementById('birthday-date-manual');
        
        datePicker.addEventListener('change', () => {
            this.clearDateError();
        });
        
        dateManual.addEventListener('input', (e) => {
            this.handleManualDateInput(e);
        });
        
        dateManual.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleCreateUser();
            }
        });
        
        dateManual.addEventListener('blur', () => {
            this.validateManualDate();
        });
    }

    switchDateMode(mode) {
        this.dateMode = mode;
        const pickerBtn = document.getElementById('picker-mode-btn');
        const manualBtn = document.getElementById('manual-mode-btn');
        const pickerWrapper = document.getElementById('date-picker-wrapper');
        const manualWrapper = document.getElementById('date-manual-wrapper');
        
        if (mode === 'picker') {
            pickerBtn.classList.add('active');
            manualBtn.classList.remove('active');
            pickerWrapper.style.display = 'block';
            manualWrapper.style.display = 'none';
        } else {
            pickerBtn.classList.remove('active');
            manualBtn.classList.add('active');
            pickerWrapper.style.display = 'none';
            manualWrapper.style.display = 'flex';
            document.getElementById('birthday-date-manual').focus();
        }
        
        this.clearDateError();
    }

    handleManualDateInput(e) {
        let value = e.target.value.replace(/[^\d]/g, '');
        
        if (value.length >= 4) {
            value = value.slice(0, 4) + '-' + value.slice(4);
        }
        if (value.length >= 7) {
            value = value.slice(0, 7) + '-' + value.slice(7);
        }
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        e.target.value = value;
        
        if (value.length === 10) {
            this.validateManualDate();
        } else {
            this.clearDateError();
            e.target.classList.remove('success', 'error');
        }
    }

    validateManualDate() {
        const input = document.getElementById('birthday-date-manual');
        const value = input.value;
        
        if (!value) {
            this.clearDateError();
            input.classList.remove('success', 'error');
            return false;
        }
        
        const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
        const match = value.match(dateRegex);
        
        if (!match) {
            this.showDateError('日期格式不正确，请使用 YYYY-MM-DD 格式');
            input.classList.add('error');
            input.classList.remove('success');
            return false;
        }
        
        const year = parseInt(match[1], 10);
        const month = parseInt(match[2], 10);
        const day = parseInt(match[3], 10);
        
        if (year < 1900 || year > 2100) {
            this.showDateError('年份应在 1900-2100 之间');
            input.classList.add('error');
            input.classList.remove('success');
            return false;
        }
        
        if (month < 1 || month > 12) {
            this.showDateError('月份应在 01-12 之间');
            input.classList.add('error');
            input.classList.remove('success');
            return false;
        }
        
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day < 1 || day > daysInMonth) {
            this.showDateError(`该月份日期应在 01-${daysInMonth.toString().padStart(2, '0')} 之间`);
            input.classList.add('error');
            input.classList.remove('success');
            return false;
        }
        
        const testDate = new Date(year, month - 1, day);
        if (testDate.getFullYear() !== year || 
            testDate.getMonth() !== month - 1 || 
            testDate.getDate() !== day) {
            this.showDateError('无效的日期');
            input.classList.add('error');
            input.classList.remove('success');
            return false;
        }
        
        this.clearDateError();
        input.classList.add('success');
        input.classList.remove('error');
        return true;
    }

    showDateError(message) {
        const errorElement = document.getElementById('date-error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    clearDateError() {
        const errorElement = document.getElementById('date-error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    getBirthdayDate() {
        if (this.dateMode === 'picker') {
            return document.getElementById('birthday-date-picker').value;
        } else {
            const input = document.getElementById('birthday-date-manual');
            if (this.validateManualDate()) {
                return input.value;
            }
            return '';
        }
    }

    setBirthdayDate(date) {
        if (this.dateMode === 'picker') {
            document.getElementById('birthday-date-picker').value = date;
        } else {
            const input = document.getElementById('birthday-date-manual');
            input.value = date;
            this.validateManualDate();
        }
    }

    handleCreateUser() {
        const nameInput = document.getElementById('user-name');
        const name = nameInput.value.trim();
        const date = this.getBirthdayDate();
        
        if (!name) {
            alert('请输入用户名称！');
            nameInput.focus();
            return;
        }
        
        if (!date) {
            if (this.dateMode === 'manual') {
                this.showDateError('请输入有效的生日日期！');
                document.getElementById('birthday-date-manual').focus();
            } else {
                alert('请选择生日日期！');
                document.getElementById('birthday-date-picker').focus();
            }
            return;
        }
        
        const user = {
            id: Date.now().toString(),
            name: name,
            birthday: date
        };
        
        this.users.push(user);
        this.saveUsersToStorage();
        this.setCurrentUser(user);
        this.renderUsers();
        
        nameInput.value = '';
        if (this.dateMode === 'picker') {
            document.getElementById('birthday-date-picker').value = '';
        } else {
            document.getElementById('birthday-date-manual').value = '';
            document.getElementById('birthday-date-manual').classList.remove('success', 'error');
        }
        this.clearDateError();
    }

    handleUpdateUser() {
        if (!this.currentUser) return;
        
        const nameInput = document.getElementById('user-name');
        const name = nameInput.value.trim();
        const date = this.getBirthdayDate();
        
        if (!name) {
            alert('请输入用户名称！');
            nameInput.focus();
            return;
        }
        
        if (!date) {
            if (this.dateMode === 'manual') {
                this.showDateError('请输入有效的生日日期！');
                document.getElementById('birthday-date-manual').focus();
            } else {
                alert('请选择生日日期！');
                document.getElementById('birthday-date-picker').focus();
            }
            return;
        }
        
        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            this.users[userIndex].name = name;
            this.users[userIndex].birthday = date;
            this.saveUsersToStorage();
            this.currentUser = this.users[userIndex];
            this.updateCurrentUserDisplay();
            this.renderUsers();
            this.updateBirthdayInfo();
            this.lastTime = { days: -1, hours: -1, minutes: -1, seconds: -1 };
            this.updateCountdown();
        }
        
        nameInput.value = '';
        if (this.dateMode === 'picker') {
            document.getElementById('birthday-date-picker').value = '';
        } else {
            document.getElementById('birthday-date-manual').value = '';
            document.getElementById('birthday-date-manual').classList.remove('success', 'error');
        }
        this.clearDateError();
        this.showCreateMode();
    }

    setCurrentUser(user) {
        this.currentUser = user;
        this.saveCurrentUserToStorage();
        this.updateCurrentUserDisplay();
        this.updateBirthdayInfo();
        this.lastTime = { days: -1, hours: -1, minutes: -1, seconds: -1 };
        this.updateCountdown();
        this.highlightActiveUser();
    }

    selectUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            this.setCurrentUser(user);
            document.getElementById('user-name').value = user.name;
            this.setBirthdayDate(user.birthday);
            this.showUpdateMode();
        }
    }

    deleteUser(userId, event) {
        event.stopPropagation();
        
        if (!confirm('确定要删除此用户吗？')) {
            return;
        }
        
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
            this.saveUsersToStorage();
            
            if (this.currentUser && this.currentUser.id === userId) {
                this.currentUser = null;
                this.saveCurrentUserToStorage();
                this.updateCurrentUserDisplay();
                this.clearCountdown();
                this.showCreateMode();
            }
            
            this.renderUsers();
        }
    }

    showCreateMode() {
        document.getElementById('create-user').style.display = 'inline-block';
        document.getElementById('update-user').style.display = 'none';
    }

    showUpdateMode() {
        document.getElementById('create-user').style.display = 'none';
        document.getElementById('update-user').style.display = 'inline-block';
    }

    updateCurrentUserDisplay() {
        const displayElement = document.getElementById('current-user-name');
        if (this.currentUser) {
            displayElement.textContent = `当前用户: ${this.currentUser.name}`;
        } else {
            displayElement.textContent = '请创建或选择用户';
        }
    }

    updateBirthdayInfo() {
        const solarDateElement = document.getElementById('solar-date');
        const lunarDateElement = document.getElementById('lunar-date');
        
        if (this.currentUser) {
            const dateObj = new Date(this.currentUser.birthday);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedSolarDate = dateObj.toLocaleDateString('zh-CN', options);
            solarDateElement.textContent = `${this.currentUser.name}的生日: ${formattedSolarDate}`;
            
            const lunarDate = lunarCalendar.formatLunarDate(this.currentUser.birthday);
            lunarDateElement.textContent = lunarDate;
        } else {
            solarDateElement.textContent = '';
            lunarDateElement.textContent = '';
        }
    }

    renderUsers() {
        const container = document.getElementById('users-container');
        
        if (this.users.length === 0) {
            container.innerHTML = '<p class="no-users">暂无用户，请创建新用户</p>';
            return;
        }
        
        container.innerHTML = this.users.map(user => {
            const dateObj = new Date(user.birthday);
            const options = { month: 'long', day: 'numeric' };
            const formattedDate = dateObj.toLocaleDateString('zh-CN', options);
            const lunarDate = lunarCalendar.formatLunarDateShort(user.birthday);
            const isActive = this.currentUser && this.currentUser.id === user.id;
            
            return `
                <div class="user-card ${isActive ? 'active' : ''}" data-user-id="${user.id}">
                    <button class="user-card-delete" onclick="birthdayCountdown.deleteUser('${user.id}', event)">×</button>
                    <div class="user-card-name">${this.escapeHtml(user.name)}</div>
                    <div class="user-card-birthday">${formattedDate}</div>
                    <div class="user-card-lunar">${lunarDate}</div>
                </div>
            `;
        }).join('');
        
        container.querySelectorAll('.user-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('user-card-delete')) {
                    this.selectUser(card.dataset.userId);
                }
            });
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    highlightActiveUser() {
        document.querySelectorAll('.user-card').forEach(card => {
            if (this.currentUser && card.dataset.userId === this.currentUser.id) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    saveUsersToStorage() {
        localStorage.setItem('birthdayUsers', JSON.stringify(this.users));
    }

    loadUsersFromStorage() {
        const savedUsers = localStorage.getItem('birthdayUsers');
        if (savedUsers) {
            this.users = JSON.parse(savedUsers);
        }
        
        const savedCurrentUser = localStorage.getItem('currentUser');
        if (savedCurrentUser) {
            this.currentUser = this.users.find(u => u.id === savedCurrentUser);
            if (this.currentUser) {
                this.updateCurrentUserDisplay();
                this.updateBirthdayInfo();
            }
        }
    }

    saveCurrentUserToStorage() {
        if (this.currentUser) {
            localStorage.setItem('currentUser', this.currentUser.id);
        } else {
            localStorage.removeItem('currentUser');
        }
    }

    startCountdown() {
        this.updateCountdown();
        setInterval(() => this.updateCountdown(), 1000);
    }

    calculateTimeLeft() {
        if (!this.currentUser || !this.currentUser.birthday) return null;

        const now = new Date();
        let nextBirthday = new Date(this.currentUser.birthday);
        nextBirthday.setFullYear(now.getFullYear());
        
        if (nextBirthday <= now) {
            nextBirthday.setFullYear(now.getFullYear() + 1);
        }

        const diff = nextBirthday - now;

        if (diff <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return {
            days,
            hours,
            minutes,
            seconds
        };
    }

    updateCountdown() {
        const timeLeft = this.calculateTimeLeft();
        if (!timeLeft) return;

        this.updateTimeUnit('days', timeLeft.days);
        this.updateTimeUnit('hours', timeLeft.hours);
        this.updateTimeUnit('minutes', timeLeft.minutes);
        this.updateTimeUnit('seconds', timeLeft.seconds);

        this.lastTime = timeLeft;
    }

    clearCountdown() {
        this.updateTimeUnit('days', 0);
        this.updateTimeUnit('hours', 0);
        this.updateTimeUnit('minutes', 0);
        this.updateTimeUnit('seconds', 0);
        this.lastTime = { days: -1, hours: -1, minutes: -1, seconds: -1 };
    }

    updateTimeUnit(unit, value) {
        const formattedValue = value.toString().padStart(2, '0');
        const card = document.getElementById(`${unit}-card`);
        const topValue = card.querySelector('.flip-card-top .flip-card-value');
        const bottomValue = card.querySelector('.flip-card-bottom .flip-card-value');
        const backValue = card.querySelector('.flip-card-back .flip-card-value');

        if (this.lastTime[unit] !== value) {
            backValue.textContent = formattedValue;
            card.classList.add('flipping');
            
            setTimeout(() => {
                topValue.textContent = formattedValue;
                bottomValue.textContent = formattedValue;
                card.classList.remove('flipping');
            }, 300);
        } else if (topValue.textContent !== formattedValue) {
            topValue.textContent = formattedValue;
            bottomValue.textContent = formattedValue;
            backValue.textContent = formattedValue;
        }
    }
}

let birthdayCountdown;

window.addEventListener('DOMContentLoaded', () => {
    birthdayCountdown = new BirthdayCountdown();
});