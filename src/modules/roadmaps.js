// ============================================
// ROADMAPS MODULE — Study Plan View
// ============================================

import { roadmaps } from '../data/roadmaps.js';
import { el, staggerChildren } from '../utils/render.js';

let activeRoadmap = null;

export function renderRoadmaps(container) {
  container.innerHTML = '';

  if (activeRoadmap) {
    renderRoadmapDetail(container, activeRoadmap);
    return;
  }

  // Header
  const header = el('div', { className: 'section-header fade-in-up' });
  const headerLeft = el('div');
  headerLeft.appendChild(el('h1', { className: 'section-header__title', innerHTML: '🗺️ Study Roadmaps' }));
  headerLeft.appendChild(el('p', { className: 'section-header__subtitle', textContent: 'Week-by-week preparation plans for top programs' }));
  header.appendChild(headerLeft);
  container.appendChild(header);

  // Roadmap cards
  const grid = el('div', { className: 'roadmaps-grid' });

  roadmaps.forEach(rm => {
    const card = el('div', {
      className: 'card',
      style: { cursor: 'pointer' },
      events: { click: () => { activeRoadmap = rm.id; renderRoadmaps(container); } },
    });

    const iconRow = el('div', { style: { display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' } });
    iconRow.appendChild(el('span', { style: { fontSize: '2rem' }, textContent: rm.icon }));
    iconRow.appendChild(el('span', {
      className: 'badge badge--fellowship',
      textContent: `${rm.totalWeeks} weeks`,
    }));
    card.appendChild(iconRow);

    card.appendChild(el('h3', {
      style: { fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-2)' },
      textContent: rm.title,
    }));

    card.appendChild(el('p', {
      style: { fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--space-4)' },
      textContent: rm.description,
    }));

    card.appendChild(el('div', {
      style: { fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' },
      textContent: `${rm.phases.length} phases • ${rm.readinessCriteria.length} readiness checks`,
    }));

    const viewBtn = el('div', {
      style: {
        marginTop: 'var(--space-4)', paddingTop: 'var(--space-3)',
        borderTop: '1px solid var(--glass-border)',
        fontSize: 'var(--font-size-sm)', color: 'var(--accent-purple)',
        fontWeight: 'var(--font-weight-semibold)',
      },
      textContent: 'View Full Roadmap →',
    });
    card.appendChild(viewBtn);

    grid.appendChild(card);
  });

  container.appendChild(grid);
  staggerChildren(grid);
}

function renderRoadmapDetail(container, roadmapId) {
  const rm = roadmaps.find(r => r.id === roadmapId);
  if (!rm) return;

  const completedPhases = JSON.parse(localStorage.getItem(`opradar_roadmap_${rm.id}`) || '[]');

  // Back button
  const backBtn = el('button', {
    className: 'btn btn--ghost fade-in-up',
    textContent: '← Back to Roadmaps',
    style: { marginBottom: 'var(--space-6)' },
    events: { click: () => { activeRoadmap = null; renderRoadmaps(container); } },
  });
  container.appendChild(backBtn);

  // Header
  const header = el('div', { className: 'fade-in-up stagger-2', style: { marginBottom: 'var(--space-8)' } });
  const iconRow = el('div', { style: { display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' } });
  iconRow.appendChild(el('span', { style: { fontSize: '2.5rem' }, textContent: rm.icon }));
  iconRow.appendChild(el('span', { className: 'badge badge--fellowship', textContent: `${rm.totalWeeks} weeks` }));
  header.appendChild(iconRow);
  header.appendChild(el('h1', { style: { fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-2)' }, textContent: rm.title }));
  header.appendChild(el('p', { style: { color: 'var(--text-secondary)' }, textContent: rm.description }));

  // Progress
  const completedCount = completedPhases.length;
  const totalPhases = rm.phases.length;
  const progressPct = (completedCount / totalPhases) * 100;
  const progressWrap = el('div', { style: { marginTop: 'var(--space-4)' } });
  progressWrap.appendChild(el('div', {
    style: { fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' },
    textContent: `${completedCount} of ${totalPhases} phases completed (${Math.round(progressPct)}%)`,
  }));
  const bar = el('div', { className: 'progress-bar' });
  bar.appendChild(el('div', { className: 'progress-bar__fill', style: { width: `${progressPct}%` } }));
  progressWrap.appendChild(bar);
  header.appendChild(progressWrap);

  container.appendChild(header);

  // Timeline
  const timeline = el('div', { className: 'timeline fade-in-up stagger-3' });

  rm.phases.forEach((phase, idx) => {
    const isCompleted = completedPhases.includes(idx);
    const item = el('div', { className: 'timeline__item' });

    const dot = el('div', {
      className: `timeline__dot ${isCompleted ? 'timeline__dot--completed' : ''}`,
    });
    item.appendChild(dot);

    const content = el('div', { className: 'timeline__content' });

    // Week label + checkbox
    const weekRow = el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } });
    weekRow.appendChild(el('span', { className: 'timeline__week', textContent: phase.week }));

    const checkbox = el('button', {
      className: `btn btn--sm ${isCompleted ? 'btn--primary' : 'btn--secondary'}`,
      textContent: isCompleted ? '✓ Done' : 'Mark Done',
      events: {
        click: (e) => {
          e.stopPropagation();
          const stored = JSON.parse(localStorage.getItem(`opradar_roadmap_${rm.id}`) || '[]');
          if (stored.includes(idx)) {
            stored.splice(stored.indexOf(idx), 1);
          } else {
            stored.push(idx);
          }
          localStorage.setItem(`opradar_roadmap_${rm.id}`, JSON.stringify(stored));
          container.innerHTML = '';
          renderRoadmapDetail(container, roadmapId);
        },
      },
    });
    weekRow.appendChild(checkbox);
    content.appendChild(weekRow);

    content.appendChild(el('h3', { className: 'timeline__goal', textContent: phase.goal }));
    content.appendChild(el('p', { className: 'timeline__topics', textContent: phase.topics }));

    // Resources
    const resList = el('ul', { className: 'timeline__resources' });
    phase.resources.forEach(r => {
      resList.appendChild(el('li', { textContent: r }));
    });
    content.appendChild(resList);

    // Milestone
    content.appendChild(el('div', { className: 'timeline__milestone', innerHTML: `🎯 <strong>Milestone:</strong> ${phase.milestone}` }));

    item.appendChild(content);
    timeline.appendChild(item);
  });

  container.appendChild(timeline);

  // Readiness criteria
  const readiness = el('div', {
    className: 'card fade-in-up stagger-4',
    style: { marginTop: 'var(--space-8)' },
  });
  readiness.appendChild(el('h3', {
    style: { fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-4)' },
    textContent: '✅ How to Know You\'re Ready',
  }));

  const checkList = el('ul', { style: { listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' } });
  rm.readinessCriteria.forEach(criteria => {
    const li = el('li', {
      style: {
        fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)',
        paddingLeft: 'var(--space-6)', position: 'relative',
      },
      textContent: criteria,
    });
    const marker = el('span', {
      style: { position: 'absolute', left: 0 },
      textContent: '✓',
    });
    marker.style.color = 'var(--accent-emerald)';
    li.prepend(marker);
    checkList.appendChild(li);
  });
  readiness.appendChild(checkList);
  container.appendChild(readiness);
}

export function resetRoadmapView() {
  activeRoadmap = null;
}
