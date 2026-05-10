// ============================================
// DASHBOARD MODULE — Main Opportunity View
// ============================================

import { allOpportunities, CATEGORIES } from '../data/opportunities.js';
import { filterOpportunities, sortOpportunities, getStats } from '../utils/filters.js';
import { el, staggerChildren, getDeadlineInfo, getCategoryInfo } from '../utils/render.js';

let activeFilters = { category: 'all', deadlineStatus: 'all', search: '' };

export function renderDashboard(container, profile) {
  container.innerHTML = '';

  const filtered = sortOpportunities(
    filterOpportunities(allOpportunities, profile, activeFilters)
  );
  const stats = getStats(filterOpportunities(allOpportunities, profile, {}));

  // Hero
  const hero = el('div', { className: 'hero fade-in-up' });
  const yearLabel = profile.year ? `${profile.year}${getOrdinal(profile.year)} year` : '';
  hero.appendChild(el('h1', { className: 'hero__greeting', innerHTML: `Hey there, ${yearLabel} explorer! 👋` }));
  hero.appendChild(el('p', { className: 'hero__summary', textContent: `We found ${stats.total} opportunities matching your profile. ${stats.active} are currently active.` }));
  container.appendChild(hero);

  // Stats
  const statsGrid = el('div', { className: 'stats-grid fade-in-up stagger-2' });
  const statItems = [
    { number: stats.total, label: 'Total Matches', color: 'var(--accent-purple)' },
    { number: stats.active, label: 'Active Now', color: 'var(--accent-emerald)' },
    { number: stats.soon, label: 'Closing Soon', color: 'var(--accent-amber)' },
    { number: stats.urgent, label: 'Urgent', color: 'var(--deadline-red)' },
  ];
  statItems.forEach(s => {
    const card = el('div', { className: 'stat-card' });
    card.appendChild(el('div', { className: 'stat-card__number count-up', textContent: s.number, style: { color: s.color } }));
    card.appendChild(el('div', { className: 'stat-card__label', textContent: s.label }));
    statsGrid.appendChild(card);
  });
  container.appendChild(statsGrid);

  // Filter bar
  const filterBar = el('div', { className: 'filter-bar fade-in-up stagger-3' });

  // Search
  const searchBar = el('div', { className: 'search-bar' });
  searchBar.appendChild(el('span', { className: 'search-bar__icon', textContent: '🔍' }));
  const searchInput = el('input', {
    className: 'search-bar__input',
    attrs: { type: 'text', placeholder: 'Search opportunities...', id: 'search-input', value: activeFilters.search },
    events: {
      input: (e) => {
        activeFilters.search = e.target.value;
        renderDashboard(container, profile);
      },
    },
  });
  searchBar.appendChild(searchInput);
  filterBar.appendChild(searchBar);

  // Category chips
  const chipWrap = el('div', { className: 'filter-chips' });
  const allChip = el('button', {
    className: `chip ${activeFilters.category === 'all' ? 'chip--active' : ''}`,
    textContent: 'All',
    events: { click: () => { activeFilters.category = 'all'; renderDashboard(container, profile); } },
  });
  chipWrap.appendChild(allChip);

  Object.entries(CATEGORIES).forEach(([key, cat]) => {
    const chip = el('button', {
      className: `chip ${activeFilters.category === key ? 'chip--active' : ''}`,
      textContent: `${cat.icon} ${cat.label}`,
      events: { click: () => { activeFilters.category = key; renderDashboard(container, profile); } },
    });
    chipWrap.appendChild(chip);
  });
  filterBar.appendChild(chipWrap);

  // Deadline filter chips
  const dlWrap = el('div', { className: 'filter-chips' });
  const dlOptions = [
    { value: 'all', label: 'All Deadlines' },
    { value: 'active', label: '✅ Active Only' },
    { value: 'urgent', label: '🔴 Urgent' },
    { value: 'soon', label: '🟡 Closing Soon' },
  ];
  dlOptions.forEach(opt => {
    const chip = el('button', {
      className: `chip ${activeFilters.deadlineStatus === opt.value ? 'chip--active' : ''}`,
      textContent: opt.label,
      events: { click: () => { activeFilters.deadlineStatus = opt.value; renderDashboard(container, profile); } },
    });
    dlWrap.appendChild(chip);
  });
  filterBar.appendChild(dlWrap);

  container.appendChild(filterBar);

  // Opportunities grid
  if (filtered.length === 0) {
    const empty = el('div', { className: 'empty-state fade-in' });
    empty.appendChild(el('div', { className: 'empty-state__icon', textContent: '🔍' }));
    empty.appendChild(el('div', { className: 'empty-state__title', textContent: 'No opportunities found' }));
    empty.appendChild(el('div', { className: 'empty-state__text', textContent: 'Try adjusting your filters or updating your profile to see more results.' }));
    container.appendChild(empty);
    return;
  }

  const grid = el('div', { className: 'opportunities-grid' });

  filtered.forEach((opp) => {
    const catInfo = getCategoryInfo(opp.type);
    const dlInfo = getDeadlineInfo(opp.deadlineStatus);

    const card = el('div', { className: 'card opportunity-card' });

    // Header
    const header = el('div', { className: 'opportunity-card__header' });
    header.appendChild(el('h3', { className: 'opportunity-card__title', textContent: opp.name }));
    header.appendChild(el('span', { className: `badge ${catInfo.cssClass}`, textContent: `${catInfo.icon} ${catInfo.label}` }));
    card.appendChild(header);

    // Body
    const body = el('div', { className: 'opportunity-card__body' });

    const rows = [
      { icon: '🎓', label: 'Eligibility', value: opp.eligibility },
      { icon: '💰', label: 'Stipend', value: opp.stipend },
      { icon: '📅', label: 'Deadline', value: opp.deadline },
      { icon: '🌍', label: 'Location', value: opp.location },
    ];

    rows.forEach(r => {
      const row = el('div', { className: 'opportunity-card__row' });
      row.appendChild(el('span', { textContent: r.icon }));
      row.appendChild(el('span', { className: 'opportunity-card__label', textContent: r.label }));
      if (r.label === 'Deadline') {
        const dlWrap2 = el('span', { style: { display: 'flex', alignItems: 'center', gap: '8px' } });
        dlWrap2.appendChild(el('span', { textContent: r.value }));
        dlWrap2.appendChild(el('span', {
          className: `deadline-flag ${dlInfo.cssClass} ${opp.deadlineStatus === 'urgent' ? 'pulse' : ''}`,
          textContent: `${dlInfo.emoji} ${dlInfo.label}`,
        }));
        row.appendChild(dlWrap2);
      } else {
        row.appendChild(el('span', { textContent: r.value }));
      }
      body.appendChild(row);
    });

    card.appendChild(body);

    // Notes
    if (opp.notes) {
      card.appendChild(el('div', { className: 'opportunity-card__notes', innerHTML: `📝 ${opp.notes}` }));
    }

    // Next cycle info
    if (opp.nextCycleInfo && opp.deadlineStatus === 'passed') {
      card.appendChild(el('div', {
        className: 'opportunity-card__notes',
        style: { borderLeftColor: 'var(--accent-cyan)' },
        innerHTML: `🔄 <strong>Next cycle:</strong> ${opp.nextCycleInfo}`,
      }));
    }

    // Footer
    const footer = el('div', { className: 'opportunity-card__footer' });
    const tagsWrap = el('div', { className: 'opportunity-card__tags' });
    opp.tags.slice(0, 3).forEach(t => {
      tagsWrap.appendChild(el('span', { className: 'tag', textContent: t }));
    });
    footer.appendChild(tagsWrap);

    const applyBtn = el('a', {
      className: 'btn btn--primary btn--sm',
      textContent: opp.deadlineStatus === 'passed' ? 'View Website ↗' : 'Apply Now ↗',
      attrs: { href: opp.applyUrl, target: '_blank', rel: 'noopener noreferrer' },
    });
    footer.appendChild(applyBtn);
    card.appendChild(footer);

    grid.appendChild(card);
  });

  container.appendChild(grid);
  staggerChildren(grid);

  // Restore focus to search
  setTimeout(() => {
    const si = document.getElementById('search-input');
    if (si && activeFilters.search) {
      si.focus();
      si.setSelectionRange(si.value.length, si.value.length);
    }
  }, 50);
}

function getOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

export function resetFilters() {
  activeFilters = { category: 'all', deadlineStatus: 'all', search: '' };
}
