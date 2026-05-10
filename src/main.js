// ============================================
// MAIN — App Entry Point & Router
// ============================================

import { renderOnboarding } from './modules/onboarding.js';
import { renderDashboard, resetFilters } from './modules/dashboard.js';
import { renderPapers } from './modules/papers.js';
import { renderRoadmaps, resetRoadmapView } from './modules/roadmaps.js';
import { renderProfile } from './modules/profile.js';
import { el } from './utils/render.js';

// ---- State ----
let currentView = 'dashboard';
let profile = null;

// ---- DOM refs ----
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');

// ---- Navigation items ----
const NAV_ITEMS = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'papers', icon: '📄', label: 'Research Papers' },
  { id: 'roadmaps', icon: '🗺️', label: 'Study Roadmaps' },
  { id: 'profile', icon: '👤', label: 'Profile' },
];

// ---- Initialize ----
function init() {
  const stored = localStorage.getItem('opradar_profile');
  if (stored) {
    try {
      profile = JSON.parse(stored);
      showApp();
    } catch {
      showOnboarding();
    }
  } else {
    showOnboarding();
  }
}

// ---- Onboarding ----
function showOnboarding() {
  sidebar.innerHTML = '';
  sidebar.style.display = 'none';
  document.body.classList.add('onboarding-layout');
  content.innerHTML = '';
  renderOnboarding(content, (newProfile) => {
    profile = newProfile;
    document.body.classList.remove('onboarding-layout');
    sidebar.style.display = '';
    showApp();
  });
}

// ---- App with sidebar ----
function showApp() {
  document.body.classList.remove('onboarding-layout');
  sidebar.style.display = '';
  renderSidebar();
  renderView();
}

// ---- Sidebar ----
function renderSidebar() {
  sidebar.innerHTML = '';

  // Logo
  const logo = el('a', {
    className: 'sidebar__logo',
    attrs: { href: '#' },
    events: { click: (e) => { e.preventDefault(); navigate('dashboard'); } },
  });
  logo.appendChild(el('span', { className: 'sidebar__logo-icon', textContent: '📡' }));
  logo.appendChild(el('span', { className: 'sidebar__logo-text', textContent: 'OpportunityRadar' }));
  sidebar.appendChild(logo);

  // Nav
  const nav = el('nav', { className: 'sidebar__nav' });

  NAV_ITEMS.forEach(item => {
    const link = el('button', {
      className: `sidebar__link ${currentView === item.id ? 'sidebar__link--active' : ''}`,
      attrs: { id: `nav-${item.id}` },
      events: { click: () => navigate(item.id) },
    });
    link.appendChild(el('span', { className: 'sidebar__link-icon', textContent: item.icon }));
    link.appendChild(el('span', { textContent: item.label }));
    nav.appendChild(link);
  });

  sidebar.appendChild(nav);

  // Divider
  sidebar.appendChild(el('div', { className: 'sidebar__divider' }));

  // Quick links section
  const quickNav = el('div', { style: { padding: '0 var(--space-3)' } });
  quickNav.appendChild(el('div', {
    style: {
      fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)',
      textTransform: 'uppercase', letterSpacing: '0.08em',
      fontWeight: 'var(--font-weight-semibold)',
      padding: 'var(--space-2) var(--space-4)', marginBottom: 'var(--space-1)',
    },
    textContent: 'Quick Links',
  }));

  const quickLinks = [
    { icon: '☀️', label: 'GSoC', url: 'https://summerofcode.withgoogle.com/' },
    { icon: '🇨🇦', label: 'MITACS', url: 'https://www.mitacs.ca/en/programs/globalink' },
    { icon: '🌐', label: 'LFX Mentorship', url: 'https://mentorship.lfx.linuxfoundation.org/' },
    { icon: '📊', label: 'Kaggle', url: 'https://www.kaggle.com/competitions' },
  ];

  quickLinks.forEach(ql => {
    const link = el('a', {
      className: 'sidebar__link',
      attrs: { href: ql.url, target: '_blank', rel: 'noopener noreferrer' },
    });
    link.appendChild(el('span', { className: 'sidebar__link-icon', textContent: ql.icon }));
    link.appendChild(el('span', { textContent: ql.label }));
    link.appendChild(el('span', {
      style: { marginLeft: 'auto', fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' },
      textContent: '↗',
    }));
    quickNav.appendChild(link);
  });
  sidebar.appendChild(quickNav);

  // Footer with profile
  if (profile) {
    const footer = el('div', { className: 'sidebar__footer' });
    const profileBtn = el('div', {
      className: 'sidebar__profile',
      events: { click: () => navigate('profile') },
    });
    profileBtn.appendChild(el('div', {
      className: 'sidebar__profile-avatar',
      textContent: `Y${profile.year || '?'}`,
    }));
    const info = el('div', { className: 'sidebar__profile-info' });
    info.appendChild(el('div', {
      className: 'sidebar__profile-name',
      textContent: `${profile.year ? profile.year + ordSuffix(profile.year) + ' Year' : 'Student'}`,
    }));
    info.appendChild(el('div', {
      className: 'sidebar__profile-detail',
      textContent: profile.interests ? `${profile.interests.length} interests` : 'Edit profile',
    }));
    profileBtn.appendChild(info);
    footer.appendChild(profileBtn);
    sidebar.appendChild(footer);
  }

  // Mobile toggle
  let toggleBtn = document.querySelector('.sidebar__toggle');
  if (!toggleBtn) {
    toggleBtn = el('button', {
      className: 'sidebar__toggle',
      textContent: '☰',
      attrs: { 'aria-label': 'Toggle navigation' },
      events: {
        click: () => sidebar.classList.toggle('sidebar--open'),
      },
    });
    document.body.appendChild(toggleBtn);
  }
}

// ---- Navigate ----
function navigate(view) {
  if (currentView === view) return;
  currentView = view;
  // Reset sub-views
  resetFilters();
  resetRoadmapView();
  // Close mobile sidebar
  sidebar.classList.remove('sidebar--open');
  // Update sidebar active state
  renderSidebar();
  // Transition content
  renderView();
}

// ---- Render current view ----
function renderView() {
  content.classList.add('view-exit');
  setTimeout(() => {
    content.innerHTML = '';
    content.classList.remove('view-exit');

    switch (currentView) {
      case 'dashboard':
        renderDashboard(content, profile);
        break;
      case 'papers':
        renderPapers(content);
        break;
      case 'roadmaps':
        renderRoadmaps(content);
        break;
      case 'profile':
        renderProfile(content, profile, (updated) => {
          if (updated === null) {
            profile = null;
            currentView = 'dashboard';
            showOnboarding();
          } else {
            profile = updated;
            renderView();
          }
        });
        break;
      default:
        renderDashboard(content, profile);
    }

    content.classList.add('view-enter');
    setTimeout(() => content.classList.remove('view-enter'), 400);
  }, 200);
}

// ---- Utility ----
function ordSuffix(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

// ---- Boot ----
init();
