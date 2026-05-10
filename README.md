# 📡 OpportunityRadar

OpportunityRadar is an intelligent career dashboard designed exclusively for undergraduate Computer Science and Engineering students. It helps students discover verified internships, fellowships, research opportunities, scholarships, hackathons, and trending research papers.

## 🚀 Features

- **Personalized Dashboard**: Filter opportunities based on your year of study, interests, and geography.
- **Exhaustive Categories**:
  - Internships (Big Tech, Startups, Government/PSU)
  - Research Fellowships (IITs, International programs like MITACS, DAAD, ETH Zurich)
  - Open Source Programs (GSoC, MLH, LFX, Outreachy)
  - Summer/Winter Schools (ACM, IEEE, AI/ML specific)
  - Hackathons & Competitions (ICPC, SIH, CTFs)
  - Scholarships & Conferences
- **Study Roadmaps**: Phase-by-phase preparation guides for top programs like GSoC and MITACS.
- **Research Tracker**: Plain-English summaries of trending AI/ML and Systems research papers.
- **Privacy-First**: No data collection. Your profile and progress are stored locally in your browser.

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript (ES Modules)
- **Styling**: Vanilla CSS (Modern CSS Grid/Flexbox, Glassmorphism)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: LocalStorage for profile persistence

## 🏃 How to Run Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.0.0 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd opfinder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## 📂 Project Structure

- `src/main.js`: App entry point and routing logic.
- `src/modules/`: Individual view modules (dashboard, onboarding, papers, etc.).
- `src/data/`: Static opportunity and paper datasets.
- `src/styles/`: CSS design system and component styles.
- `src/utils/`: Helper functions for rendering and filtering.

## 📄 License

This project is open-source and available under the MIT License.
