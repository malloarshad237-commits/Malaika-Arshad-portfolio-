// Dark/Light Theme Switcher
const themeToggleBtn = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');

if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    lightIcon.classList.remove('hidden');
} else {
    document.documentElement.classList.remove('dark');
    darkIcon.classList.remove('hidden');
}

themeToggleBtn.addEventListener('click', function () {
    darkIcon.classList.toggle('hidden');
    lightIcon.classList.toggle('hidden');
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    }
});

// Mobile Menu Drawer
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('scroll-progress').style.width = scrolled + '%';
});

// Project Filter Functionality
function filterProjects(category) {
    const buttons = document.querySelectorAll('.project-filter-btn');
    const items = document.querySelectorAll('.project-card-item');

    buttons.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.remove('glass-card', 'text-slate-700', 'dark:text-slate-300');
            btn.classList.add('bg-indigo-600', 'text-white', 'shadow-md');
        } else {
            btn.classList.add('glass-card', 'text-slate-700', 'dark:text-slate-300');
            btn.classList.remove('bg-indigo-600', 'text-white', 'shadow-md');
        }
    });

    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Project Modal Dialogs
const projectData = {
    1: {
        title: 'Responsive Landing Page',
        image: 'assets/project1.png',
        category: 'Web Development',
        description: 'A completely hand-coded landing page following modern responsive design standards. Built using semantic HTML5 tags and CSS Flexbox for cross-device support.',
        tags: ['HTML5', 'CSS3', 'Flexbox', 'Responsive']
    },
    2: {
        title: 'Exploratory Data Analytics Dashboard',
        image: 'assets/project2.png',
        category: 'Data Analytics',
        description: 'An interactive analytical dashboard tracking key performance indicators using Google Sheets formulas, pivot tables, and dynamic chart elements.',
        tags: ['Data Analytics', 'Google Sheets', 'Pivot Tables']
    },
    3: {
        title: 'Official Portfolio Website',
        image: 'assets/project3.png',
        category: 'GitHub Pages Deployment',
        description: 'Personal single-page portfolio designed for the D4WEE GCWUF coding assignment, deployed live on GitHub Pages.',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages']
    }
};

const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');

function openModal(id) {
    const data = projectData[id];
    if (!data) return;
    modalContent.innerHTML = `
        <img src="${data.image}" alt="${data.title}" class="w-full h-44 object-cover object-top rounded-2xl mb-4">
        <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">${data.category}</span>
        <h3 class="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">${data.title}</h3>
        <p class="text-slate-600 dark:text-slate-300 text-sm mt-3 leading-relaxed">${data.description}</p>
        <div class="mt-4 flex flex-wrap gap-2">
            ${data.tags.map(t => `<span class="px-3 py-1 rounded-lg bg-indigo-100 dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 text-xs font-bold">${t}</span>`).join('')}
        </div>
        <div class="mt-6 flex space-x-4">
            <a href="https://github.com" target="_blank" class="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-all">View Code Repository</a>
        </div>
    `;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Contact Form Handler
function handleContactSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('contact-form');
    const successBox = document.getElementById('contact-success');
    successBox.classList.remove('hidden');
    form.reset();
    setTimeout(() => successBox.classList.add('hidden'), 5000);
}

// Footer Year
document.getElementById('year').textContent = new Date().getFullYear();