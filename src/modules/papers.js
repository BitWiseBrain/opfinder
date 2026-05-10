// ============================================
// PAPERS MODULE — Research Papers View
// ============================================

import { papers, PAPER_TOPICS } from '../data/papers.js';
import { filterPapers } from '../utils/filters.js';
import { el, staggerChildren } from '../utils/render.js';

let activeTopic = 'all';

export function renderPapers(container) {
  container.innerHTML = '';

  const filtered = filterPapers(papers, activeTopic);

  // Header
  const header = el('div', { className: 'section-header fade-in-up' });
  const headerLeft = el('div');
  headerLeft.appendChild(el('h1', { className: 'section-header__title', innerHTML: '📄 Trending Research Papers' }));
  headerLeft.appendChild(el('p', { className: 'section-header__subtitle', textContent: 'Latest papers in AI/ML, Systems, and more — May 2026' }));
  header.appendChild(headerLeft);
  container.appendChild(header);

  // Topic filter chips
  const filterBar = el('div', { className: 'filter-chips fade-in-up stagger-2', style: { marginBottom: 'var(--space-6)' } });

  const allChip = el('button', {
    className: `chip ${activeTopic === 'all' ? 'chip--active' : ''}`,
    textContent: 'All Topics',
    events: { click: () => { activeTopic = 'all'; renderPapers(container); } },
  });
  filterBar.appendChild(allChip);

  // Get unique topics from papers
  const allTopics = [...new Set(papers.flatMap(p => p.topics))];
  allTopics.forEach(topic => {
    const topicInfo = PAPER_TOPICS[topic];
    if (!topicInfo) return;
    const chip = el('button', {
      className: `chip ${activeTopic === topic ? 'chip--active' : ''}`,
      textContent: topicInfo.label,
      events: { click: () => { activeTopic = topic; renderPapers(container); } },
    });
    filterBar.appendChild(chip);
  });
  container.appendChild(filterBar);

  // Papers grid
  if (filtered.length === 0) {
    const empty = el('div', { className: 'empty-state fade-in' });
    empty.appendChild(el('div', { className: 'empty-state__icon', textContent: '📭' }));
    empty.appendChild(el('div', { className: 'empty-state__title', textContent: 'No papers found for this topic' }));
    container.appendChild(empty);
    return;
  }

  const grid = el('div', { className: 'papers-grid' });

  filtered.forEach(paper => {
    const card = el('div', { className: 'card paper-card' });

    // Title
    card.appendChild(el('h3', { className: 'paper-card__title', textContent: paper.title }));

    // Meta
    const meta = el('div', { className: 'paper-card__meta' });
    meta.appendChild(el('span', { textContent: `👥 ${paper.authors}` }));
    meta.appendChild(el('span', { textContent: '•' }));
    meta.appendChild(el('span', { textContent: `📅 ${paper.published}` }));
    meta.appendChild(el('span', { textContent: '•' }));
    meta.appendChild(el('span', { className: 'badge badge--venue', textContent: paper.venue }));
    if (paper.codeUrl) {
      meta.appendChild(el('span', { className: 'badge badge--code', textContent: '💻 Code Available' }));
    }
    card.appendChild(meta);

    // Topic badges
    const topicBadges = el('div', { style: { display: 'flex', gap: '4px', flexWrap: 'wrap' } });
    paper.topics.forEach(t => {
      const info = PAPER_TOPICS[t];
      if (info) {
        topicBadges.appendChild(el('span', {
          className: 'tag',
          textContent: info.label,
          style: { color: info.color, background: `color-mix(in srgb, ${info.color} 15%, transparent)` },
        }));
      }
    });
    card.appendChild(topicBadges);

    // Summary
    card.appendChild(el('p', { className: 'paper-card__summary', innerHTML: `💡 ${paper.summary}` }));

    // Links
    const links = el('div', { className: 'paper-card__links' });
    links.appendChild(el('a', {
      className: 'btn btn--secondary btn--sm',
      textContent: '📄 Read Paper ↗',
      attrs: { href: paper.paperUrl, target: '_blank', rel: 'noopener noreferrer' },
    }));
    if (paper.codeUrl) {
      links.appendChild(el('a', {
        className: 'btn btn--primary btn--sm',
        textContent: '💻 View Code ↗',
        attrs: { href: paper.codeUrl, target: '_blank', rel: 'noopener noreferrer' },
      }));
    }
    card.appendChild(links);

    grid.appendChild(card);
  });

  container.appendChild(grid);
  staggerChildren(grid);
}
