// ============================================
// FILTER & SORT UTILITIES
// ============================================

/**
 * Filter opportunities based on student profile and active filters
 */
export function filterOpportunities(opportunities, profile, filters = {}) {
  let result = [...opportunities];

  // Filter by profile — year
  if (profile && profile.year) {
    result = result.filter(opp => opp.yearTargets.includes(profile.year));
  }

  // Filter by profile — geography
  if (profile && profile.geography && profile.geography !== 'all') {
    result = result.filter(opp =>
      opp.geoTargets.includes(profile.geography) || opp.geoTargets.includes('global')
    );
  }

  // Filter by profile — interests
  if (profile && profile.interests && profile.interests.length > 0) {
    result = result.filter(opp =>
      opp.interests.some(interest => profile.interests.includes(interest))
    );
  }

  // Filter by profile — paid only
  if (profile && profile.paidOnly) {
    result = result.filter(opp => {
      const stipend = opp.stipend.toLowerCase();
      return !stipend.includes('unpaid') && !stipend.includes('no stipend') && !stipend.includes('free');
    });
  }

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    result = result.filter(opp => opp.type === filters.category);
  }

  // Filter by deadline status
  if (filters.deadlineStatus && filters.deadlineStatus !== 'all') {
    if (filters.deadlineStatus === 'active') {
      result = result.filter(opp => opp.deadlineStatus !== 'passed');
    } else {
      result = result.filter(opp => opp.deadlineStatus === filters.deadlineStatus);
    }
  }

  // Filter by search query
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(opp =>
      opp.name.toLowerCase().includes(q) ||
      opp.type.toLowerCase().includes(q) ||
      opp.tags.some(t => t.toLowerCase().includes(q)) ||
      opp.notes.toLowerCase().includes(q)
    );
  }

  return result;
}

/**
 * Sort opportunities: active first, then by urgency, then alphabetical
 */
export function sortOpportunities(opportunities) {
  const statusOrder = { urgent: 0, soon: 1, open: 2, passed: 3 };
  return [...opportunities].sort((a, b) => {
    const aOrder = statusOrder[a.deadlineStatus] ?? 4;
    const bOrder = statusOrder[b.deadlineStatus] ?? 4;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return a.name.localeCompare(b.name);
  });
}

/**
 * Filter papers by topic
 */
export function filterPapers(papers, topicFilter) {
  if (!topicFilter || topicFilter === 'all') return papers;
  return papers.filter(p => p.topics.includes(topicFilter));
}

/**
 * Get counts by category
 */
export function getCategoryCounts(opportunities) {
  const counts = {};
  for (const opp of opportunities) {
    counts[opp.type] = (counts[opp.type] || 0) + 1;
  }
  return counts;
}

/**
 * Get stats for dashboard
 */
export function getStats(opportunities) {
  const total = opportunities.length;
  const active = opportunities.filter(o => o.deadlineStatus !== 'passed').length;
  const urgent = opportunities.filter(o => o.deadlineStatus === 'urgent').length;
  const soon = opportunities.filter(o => o.deadlineStatus === 'soon').length;
  return { total, active, urgent, soon };
}
