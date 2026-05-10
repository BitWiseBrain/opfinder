// ============================================
// ROADMAPS DATA — Study Plans
// ============================================

export const roadmaps = [
  {
    id: 'gsoc-prep',
    title: 'GSoC Preparation Roadmap',
    description: 'A 10-week plan to prepare for Google Summer of Code — from first contribution to a winning proposal.',
    icon: '☀️',
    totalWeeks: 10,
    phases: [
      {
        week: 'Week 1–2',
        goal: 'Learn Open Source Basics',
        topics: 'Git/GitHub workflow, how to read codebases, issue trackers, mailing lists, IRC/Slack/Discord etiquette',
        resources: [
          'First Contributions (GitHub) — hands-on guide',
          'How to Contribute to Open Source — opensource.guide',
          'Git & GitHub Crash Course — freeCodeCamp YouTube',
        ],
        milestone: 'Make your first PR to any beginner-friendly repo (good-first-issue tag)',
      },
      {
        week: 'Week 3–4',
        goal: 'Explore GSoC Organizations',
        topics: 'Browse past GSoC orgs, identify 3–5 matching your skills, read their contributing guides, join communication channels',
        resources: [
          'GSoC Past Organizations Archive — summerofcode.withgoogle.com',
          'GSoC Guides — google.github.io/gsocguides',
          'Org selection strategy — YouTube tutorials from past GSoC students',
        ],
        milestone: 'Join 3 org channels and introduce yourself. Read 2 codebases.',
      },
      {
        week: 'Week 5–6',
        goal: 'Start Contributing',
        topics: 'Fix bugs, improve docs, add tests, engage in code reviews. Focus on quality over quantity.',
        resources: [
          'Target org\'s issue tracker — filter by "good first issue" or "help wanted"',
          'CodeTriage.com — find projects needing help',
        ],
        milestone: 'Get 2–3 PRs merged in your target org. Build rapport with mentors.',
      },
      {
        week: 'Week 7–8',
        goal: 'Understand Project Ideas & Draft Proposal',
        topics: 'Read org\'s idea list, propose your own ideas, write a detailed project plan with timeline, milestones, and deliverables',
        resources: [
          'Past winning proposals — Google search "[org name] GSoC accepted proposals"',
          'How to Write a GSoC Proposal — YouTube / blog posts by past students',
        ],
        milestone: 'Complete first draft of your proposal. Share with mentors for feedback.',
      },
      {
        week: 'Week 9–10',
        goal: 'Refine & Submit',
        topics: 'Incorporate mentor feedback, add detailed timeline, test your prototype/PoC, proofread, submit before deadline',
        resources: [
          'GSoC Student Manual — google.github.io/gsocguides/student',
          'Grammarly or similar — for proofreading',
        ],
        milestone: 'Submit final proposal with at least 5 merged contributions to the org.',
      },
    ],
    readinessCriteria: [
      'You have 5+ merged PRs in your target organization',
      'Your proposal has been reviewed by at least one mentor',
      'You can clearly explain your project\'s technical approach',
      'You have a realistic week-by-week timeline with milestones',
      'You know how to set up the development environment from scratch',
    ],
  },
  {
    id: 'mitacs-prep',
    title: 'MITACS Globalink Preparation Roadmap',
    description: 'An 8-week plan to build a strong MITACS Globalink Research Internship application.',
    icon: '🇨🇦',
    totalWeeks: 8,
    phases: [
      {
        week: 'Week 1–2',
        goal: 'Identify Research Interests',
        topics: 'Read survey papers in your area, identify sub-topics, understand what research problems excite you',
        resources: [
          'Google Scholar — search survey papers in your interest area',
          'Papers With Code — browse state-of-the-art by task',
          'MIT OCW / NPTEL — introductory lectures in target domain',
        ],
        milestone: 'Write a 1-page "research interest statement" draft.',
      },
      {
        week: 'Week 3–4',
        goal: 'Build Academic Profile',
        topics: 'Update resume for research (highlight projects, skills, coursework). Get faculty recommendation letters lined up.',
        resources: [
          'Academic CV templates — Overleaf',
          'How to ask for recommendation letters — YouTube/blog guides',
        ],
        milestone: 'Updated CV + 2 professors agreed to write recommendations.',
      },
      {
        week: 'Week 5–6',
        goal: 'Research MITACS Projects & Supervisors',
        topics: 'Browse the MITACS project catalog, read supervisor profiles, match with your interests. Rank your top 7 choices.',
        resources: [
          'MITACS Globalink portal — browse projects when catalog opens',
          'Google Scholar profiles of listed supervisors',
        ],
        milestone: 'Ranked list of 7 projects with 1-line explanation of why each fits you.',
      },
      {
        week: 'Week 7–8',
        goal: 'Write Application & Submit',
        topics: 'Write compelling motivation letter, finalize CV, ensure transcripts are ready, submit before September deadline',
        resources: [
          'Sample MITACS motivation letters from past interns (Reddit, LinkedIn)',
          'Grammarly or faculty review for proofreading',
        ],
        milestone: 'Application submitted with all documents before September 17 deadline.',
      },
    ],
    readinessCriteria: [
      'Your motivation letter clearly connects your background to chosen projects',
      'You have strong recommendation letters from 2+ professors',
      'Your GPA is competitive (typically 8.0+ / 3.5+ for strong candidacy)',
      'You can articulate your research interests clearly in 2 minutes',
      'Your CV highlights relevant projects, coursework, and skills',
    ],
  },
  {
    id: 'cp-roadmap',
    title: 'Competitive Programming Roadmap',
    description: 'A 12-week plan to go from beginner to ICPC regionals-ready.',
    icon: '⚡',
    totalWeeks: 12,
    phases: [
      {
        week: 'Week 1–2',
        goal: 'Master Fundamentals',
        topics: 'Time complexity, arrays, strings, sorting, binary search, basic math (GCD, primes, modular arithmetic)',
        resources: [
          'CSES Problem Set — Introductory Problems',
          'cp-algorithms.com — reference for all topics',
          'Striver\'s A2Z DSA Sheet (first section)',
        ],
        milestone: 'Solve 30 problems on CSES Introductory + Sorting & Searching sections.',
      },
      {
        week: 'Week 3–4',
        goal: 'Data Structures',
        topics: 'Stacks, queues, linked lists, hash maps, sets, priority queues, segment trees (basics)',
        resources: [
          'CSES Problem Set — Data Structures section',
          'Errichto\'s YouTube channel — CP tutorials',
        ],
        milestone: 'Solve 25 problems. Reach Codeforces Pupil (1200+) rating.',
      },
      {
        week: 'Week 5–6',
        goal: 'Graph Algorithms',
        topics: 'BFS, DFS, shortest paths (Dijkstra, BFS), connected components, topological sort, union-find',
        resources: [
          'CSES Graph Problems',
          'William Fiset\'s Graph Theory playlist — YouTube',
          'cp-algorithms.com/graph',
        ],
        milestone: 'Solve 20 graph problems. Handle BFS/DFS confidently in contests.',
      },
      {
        week: 'Week 7–8',
        goal: 'Dynamic Programming',
        topics: 'Knapsack variants, LCS, LIS, DP on grids, bitmask DP, digit DP basics',
        resources: [
          'CSES DP Section',
          'Atcoder DP Contest (all 26 problems)',
          'Errichto DP tutorials',
        ],
        milestone: 'Solve all 26 Atcoder DP problems. DP intuition should be solid.',
      },
      {
        week: 'Week 9–10',
        goal: 'Advanced Topics',
        topics: 'Segment trees with lazy propagation, Fenwick trees, advanced graph algorithms (flows, bridges), string hashing',
        resources: [
          'CSES Range Queries + Advanced sections',
          'Competitive Programmer\'s Handbook — Antti Laaksonen (free PDF)',
        ],
        milestone: 'Solve 15 advanced problems. Reach Codeforces Specialist (1400+).',
      },
      {
        week: 'Week 11–12',
        goal: 'Contest Practice & Team Drills',
        topics: 'Virtual contests on Codeforces, team practice sessions, ICPC-style problems, time management',
        resources: [
          'Codeforces — virtual contest mode',
          'Kattis — ICPC archive problems',
          'ICPC Live Archive',
        ],
        milestone: 'Complete 6 virtual contests. Practice 3 team sessions with your ICPC team.',
      },
    ],
    readinessCriteria: [
      'You can solve Codeforces Div2 A–C consistently within contest time',
      'You\'re comfortable with graphs, DP, segment trees, and binary search',
      'Your Codeforces rating is 1400+ (Specialist or above)',
      'You\'ve practiced team contests and have clear role division',
      'You can debug under time pressure',
    ],
  },
];
