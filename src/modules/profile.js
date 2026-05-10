// ============================================
// PROFILE MODULE — View & Edit Profile
// ============================================

import { el } from '../utils/render.js';

const INTEREST_LABELS = {
  'ai-ml': '🤖 AI / Machine Learning',
  'web-dev': '🌐 Web Development',
  'systems': '⚙️ Systems / Infrastructure',
  'cp': '⚡ Competitive Programming',
  'security': '🔒 Cybersecurity',
  'robotics': '🤖 Robotics / Hardware',
};

const GEO_LABELS = {
  'global': '🌍 Global',
  'india': '🇮🇳 India',
  'usa': '🇺🇸 USA',
  'europe': '🇪🇺 Europe',
};

const SKILL_LABELS = {
  'beginner': '🌱 Beginner',
  'intermediate': '🔧 Intermediate',
  'advanced': '🚀 Advanced',
};

export function renderProfile(container, profile, onProfileUpdate) {
  container.innerHTML = '';

  // Header
  const header = el('div', { className: 'section-header fade-in-up' });
  const headerLeft = el('div');
  headerLeft.appendChild(el('h1', { className: 'section-header__title', innerHTML: '👤 Your Profile' }));
  headerLeft.appendChild(el('p', { className: 'section-header__subtitle', textContent: 'Your preferences shape every recommendation you see.' }));
  header.appendChild(headerLeft);
  container.appendChild(header);

  // Profile card
  const card = el('div', { className: 'card fade-in-up stagger-2', style: { maxWidth: '640px' } });

  // Avatar area
  const avatarRow = el('div', { style: { display: 'flex', alignItems: 'center', gap: 'var(--space-5)', marginBottom: 'var(--space-8)' } });
  const avatar = el('div', {
    style: {
      width: '64px', height: '64px', borderRadius: '50%',
      background: 'var(--gradient-hero)', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontSize: '1.5rem', fontWeight: '800', color: 'white', flexShrink: '0',
    },
    textContent: `Y${profile.year || '?'}`,
  });
  avatarRow.appendChild(avatar);
  const avatarInfo = el('div');
  avatarInfo.appendChild(el('div', {
    style: { fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' },
    textContent: `${profile.year ? profile.year + ordinal(profile.year) + ' Year' : 'Unknown Year'} CSE Student`,
  }));
  avatarInfo.appendChild(el('div', {
    style: { fontSize: 'var(--font-size-sm)', color: 'var(--text-tertiary)' },
    textContent: `${SKILL_LABELS[profile.skillLevel] || 'Unknown'} • ${GEO_LABELS[profile.geography] || 'Global'}`,
  }));
  avatarRow.appendChild(avatarInfo);
  card.appendChild(avatarRow);

  // Fields
  const fields = [
    {
      label: '🎓 Year of Study',
      value: profile.year ? `${profile.year}${ordinal(profile.year)} Year` : 'Not set',
      field: 'year',
    },
    {
      label: '💡 Interests',
      value: profile.interests && profile.interests.length > 0
        ? profile.interests.map(i => INTEREST_LABELS[i] || i).join(', ')
        : 'Not set',
      field: 'interests',
    },
    {
      label: '🌍 Geography',
      value: GEO_LABELS[profile.geography] || 'Not set',
      field: 'geography',
    },
    {
      label: '💰 Preference',
      value: profile.paidOnly ? '💰 Paid Only' : '📋 All Opportunities',
      field: 'paidOnly',
    },
    {
      label: '📊 Skill Level',
      value: SKILL_LABELS[profile.skillLevel] || 'Not set',
      field: 'skillLevel',
    },
  ];

  fields.forEach(f => {
    const row = el('div', {
      style: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        padding: 'var(--space-4) 0',
        borderBottom: '1px solid var(--glass-border)',
      },
    });
    const left = el('div');
    left.appendChild(el('div', {
      style: { fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-1)' },
      textContent: f.label,
    }));
    left.appendChild(el('div', {
      style: { fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', maxWidth: '360px' },
      textContent: f.value,
    }));
    row.appendChild(left);
    card.appendChild(row);
  });

  // Reset button
  const resetArea = el('div', { style: { marginTop: 'var(--space-8)', display: 'flex', gap: 'var(--space-4)' } });
  resetArea.appendChild(el('button', {
    className: 'btn btn--primary',
    textContent: '✏️ Re-do Onboarding',
    events: {
      click: () => {
        localStorage.removeItem('opradar_profile');
        onProfileUpdate(null);
      },
    },
  }));
  resetArea.appendChild(el('button', {
    className: 'btn btn--secondary',
    textContent: '🗑️ Clear All Data',
    events: {
      click: () => {
        if (confirm('This will clear your profile and all roadmap progress. Continue?')) {
          localStorage.clear();
          onProfileUpdate(null);
        }
      },
    },
  }));
  card.appendChild(resetArea);

  container.appendChild(card);

  // Info card
  const infoCard = el('div', {
    className: 'card fade-in-up stagger-3',
    style: { maxWidth: '640px', marginTop: 'var(--space-6)' },
  });
  infoCard.appendChild(el('h3', {
    style: { fontSize: 'var(--font-size-md)', marginBottom: 'var(--space-3)' },
    textContent: 'ℹ️ About OpportunityRadar',
  }));
  infoCard.appendChild(el('p', {
    style: { fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--line-height-relaxed)' },
    textContent: 'OpportunityRadar helps undergraduate CSE students discover internships, fellowships, research programs, scholarships, competitions, conferences, and trending research papers. All opportunity data is verified from official sources (May 2026 snapshot). Your profile is stored locally on your device — we don\'t collect any data.',
  }));
  container.appendChild(infoCard);
}

function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}
