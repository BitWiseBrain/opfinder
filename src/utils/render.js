// ============================================
// RENDER UTILITIES
// ============================================

/**
 * Create a DOM element with optional attributes, classes, and children
 */
export function el(tag, opts = {}, children = []) {
  const element = document.createElement(tag);
  if (opts.className) element.className = opts.className;
  if (opts.id) element.id = opts.id;
  if (opts.textContent) element.textContent = opts.textContent;
  if (opts.innerHTML) element.innerHTML = opts.innerHTML;
  if (opts.attrs) {
    for (const [k, v] of Object.entries(opts.attrs)) {
      element.setAttribute(k, v);
    }
  }
  if (opts.style) Object.assign(element.style, opts.style);
  if (opts.events) {
    for (const [ev, fn] of Object.entries(opts.events)) {
      element.addEventListener(ev, fn);
    }
  }
  const childArray = Array.isArray(children) ? children : [children];
  for (const child of childArray) {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      element.appendChild(child);
    }
  }
  return element;
}

/**
 * Transition to a new view with animation
 */
export function transitionView(container, renderFn) {
  container.classList.add('view-exit');
  setTimeout(() => {
    container.innerHTML = '';
    container.classList.remove('view-exit');
    renderFn(container);
    container.classList.add('view-enter');
    setTimeout(() => container.classList.remove('view-enter'), 400);
  }, 200);
}

/**
 * Apply staggered entrance animation to child elements
 */
export function staggerChildren(parent, selector = '.card') {
  const children = parent.querySelectorAll(selector);
  children.forEach((child, i) => {
    child.classList.add('fade-in-up', `stagger-${Math.min(i + 1, 10)}`);
  });
}

/**
 * Get deadline status info
 */
export function getDeadlineInfo(deadlineStatus) {
  const map = {
    urgent: { emoji: '🔴', label: '< 7 days', cssClass: 'deadline-flag--urgent' },
    soon: { emoji: '🟡', label: '< 30 days', cssClass: 'deadline-flag--soon' },
    open: { emoji: '🟢', label: 'Open / Rolling', cssClass: 'deadline-flag--open' },
    passed: { emoji: '⚪', label: 'Passed', cssClass: 'deadline-flag--passed' },
  };
  return map[deadlineStatus] || map.open;
}

/**
 * Get category display info
 */
export function getCategoryInfo(type) {
  const map = {
    internship: { label: 'Internship', cssClass: 'badge--internship', icon: '💼' },
    fellowship: { label: 'Fellowship', cssClass: 'badge--fellowship', icon: '🏅' },
    opensource: { label: 'Open Source', cssClass: 'badge--opensource', icon: '🌐' },
    research: { label: 'Research', cssClass: 'badge--research', icon: '🔬' },
    scholarship: { label: 'Scholarship', cssClass: 'badge--scholarship', icon: '🎓' },
    competition: { label: 'Competition', cssClass: 'badge--competition', icon: '🏆' },
    conference: { label: 'Conference', cssClass: 'badge--conference', icon: '🎤' },
    summerschool: { label: 'Summer School', cssClass: 'badge--summerschool', icon: '☀️' },
  };
  return map[type] || map.internship;
}
