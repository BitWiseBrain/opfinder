// ============================================
// ONBOARDING MODULE — Multi-step Profile Setup
// ============================================

import { el } from '../utils/render.js';

const STEPS = [
  {
    id: 'year',
    title: 'What year are you in?',
    desc: 'This helps us show opportunities that match your eligibility.',
    type: 'single',
    options: [
      { value: 1, label: '1st Year', icon: '🌱' },
      { value: 2, label: '2nd Year', icon: '🌿' },
      { value: 3, label: '3rd Year', icon: '🌳' },
      { value: 4, label: '4th Year', icon: '🎓' },
    ],
  },
  {
    id: 'interests',
    title: 'What are your interests?',
    desc: 'Select all that apply. We\'ll personalize your feed.',
    type: 'multi',
    options: [
      { value: 'ai-ml', label: 'AI / Machine Learning', icon: '🤖' },
      { value: 'web-dev', label: 'Web Development', icon: '🌐' },
      { value: 'systems', label: 'Systems / Infrastructure', icon: '⚙️' },
      { value: 'cp', label: 'Competitive Programming', icon: '⚡' },
      { value: 'security', label: 'Cybersecurity', icon: '🔒' },
      { value: 'robotics', label: 'Robotics / Hardware', icon: '🤖' },
    ],
  },
  {
    id: 'geography',
    title: 'Target geography?',
    desc: 'Where are you looking for opportunities?',
    type: 'single',
    options: [
      { value: 'global', label: 'Global (Anywhere)', icon: '🌍' },
      { value: 'india', label: 'India Only', icon: '🇮🇳' },
      { value: 'usa', label: 'USA Focused', icon: '🇺🇸' },
      { value: 'europe', label: 'Europe Focused', icon: '🇪🇺' },
    ],
  },
  {
    id: 'paidOnly',
    title: 'Opportunity preference?',
    desc: 'Do you want to see only paid opportunities, or everything?',
    type: 'single',
    options: [
      { value: false, label: 'All Opportunities', icon: '📋' },
      { value: true, label: 'Paid Only', icon: '💰' },
    ],
  },
  {
    id: 'skillLevel',
    title: 'How would you describe your skill level?',
    desc: 'Be honest — this helps us recommend the right level of opportunities.',
    type: 'single',
    options: [
      { value: 'beginner', label: 'Beginner — Just starting', icon: '🌱' },
      { value: 'intermediate', label: 'Intermediate — Some projects', icon: '🔧' },
      { value: 'advanced', label: 'Advanced — Strong portfolio', icon: '🚀' },
    ],
  },
];

export function renderOnboarding(container, onComplete) {
  document.body.classList.add('onboarding-layout');
  let currentStep = 0;
  const profile = {
    year: null,
    interests: [],
    geography: null,
    paidOnly: false,
    skillLevel: null,
  };

  function render() {
    container.innerHTML = '';
    const step = STEPS[currentStep];
    const progress = ((currentStep) / STEPS.length) * 100;

    const wrapper = el('div', { className: 'onboarding fade-in' });

    // Header (only on first step)
    if (currentStep === 0) {
      const header = el('div', { className: 'onboarding__header' });
      header.appendChild(el('div', { className: 'onboarding__logo', textContent: '📡' }));
      header.appendChild(el('h1', { className: 'onboarding__title' }, [
        el('span', { className: 'text-gradient', textContent: 'OpportunityRadar' }),
      ]));
      header.appendChild(el('p', { className: 'onboarding__subtitle', textContent: 'Discover every opportunity. Never miss a deadline.' }));
      wrapper.appendChild(header);
    }

    // Progress bar
    const progressWrap = el('div', { className: 'onboarding__progress' });
    const progressLabels = el('div', { className: 'onboarding__progress-labels' });
    progressLabels.appendChild(el('span', { textContent: `Step ${currentStep + 1} of ${STEPS.length}` }));
    progressLabels.appendChild(el('span', { textContent: `${Math.round(progress)}%` }));
    progressWrap.appendChild(progressLabels);

    const bar = el('div', { className: 'progress-bar' });
    const fill = el('div', { className: 'progress-bar__fill', style: { width: `${progress}%` } });
    bar.appendChild(fill);
    progressWrap.appendChild(bar);
    wrapper.appendChild(progressWrap);

    // Step content
    const stepDiv = el('div', { className: 'onboarding__step step-enter' });
    stepDiv.appendChild(el('h2', { className: 'onboarding__step-title', textContent: step.title }));
    stepDiv.appendChild(el('p', { className: 'onboarding__step-desc', textContent: step.desc }));

    const optionsGrid = el('div', { className: 'onboarding__options' });

    step.options.forEach((opt) => {
      const isSelected = step.type === 'multi'
        ? profile[step.id].includes(opt.value)
        : profile[step.id] === opt.value;

      const optBtn = el('button', {
        className: `onboarding__option ${isSelected ? 'onboarding__option--selected' : ''}`,
        events: {
          click: () => {
            if (step.type === 'multi') {
              const idx = profile[step.id].indexOf(opt.value);
              if (idx >= 0) profile[step.id].splice(idx, 1);
              else profile[step.id].push(opt.value);
            } else {
              profile[step.id] = opt.value;
            }
            render();
          },
        },
      });
      optBtn.appendChild(el('span', { className: 'onboarding__option-icon', textContent: opt.icon }));
      optBtn.appendChild(el('span', { textContent: opt.label }));
      optionsGrid.appendChild(optBtn);
    });

    stepDiv.appendChild(optionsGrid);
    wrapper.appendChild(stepDiv);

    // Actions
    const actions = el('div', { className: 'onboarding__actions' });

    if (currentStep > 0) {
      actions.appendChild(el('button', {
        className: 'btn btn--secondary',
        textContent: '← Back',
        events: {
          click: () => { currentStep--; render(); },
        },
      }));
    } else {
      actions.appendChild(el('div'));
    }

    const isLast = currentStep === STEPS.length - 1;
    const canProceed = step.type === 'multi'
      ? profile[step.id].length > 0
      : profile[step.id] !== null;

    const nextBtn = el('button', {
      className: `btn btn--primary btn--lg ${!canProceed ? '' : ''}`,
      textContent: isLast ? 'Launch Dashboard 🚀' : 'Continue →',
      attrs: canProceed ? {} : { disabled: 'true' },
      style: canProceed ? {} : { opacity: '0.4', cursor: 'not-allowed' },
      events: {
        click: () => {
          if (!canProceed) return;
          if (isLast) {
            localStorage.setItem('opradar_profile', JSON.stringify(profile));
            document.body.classList.remove('onboarding-layout');
            onComplete(profile);
          } else {
            currentStep++;
            render();
          }
        },
      },
    });
    actions.appendChild(nextBtn);
    wrapper.appendChild(actions);

    container.appendChild(wrapper);
  }

  render();
}
