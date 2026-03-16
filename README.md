# AI Game Review Analyzer Web

A React + TypeScript frontend for exploring Steam game review insights with AI.

The app lets users:
- search a Steam title from a curated mock list
- submit a Steam `appId` and review limit for analysis
- switch between `Mock Mode` and `Live API`
- view structured insight results such as sentiment, summary, praised features, and common issues
- open a dedicated `Source Review` page to walk through the Go backend architecture and source files

## Highlights

- Steam game search with local suggestion data
- AI review analysis flow connected to `POST /steam/analyze`
- Result dashboard with sentiment chart, summary, topics, praised features, and common issues
- Metadata strip for genre, release year, Steam App ID, and review sample size
- `Mock Mode` for UI demos without a running backend
- `Source Review` page with:
  - request flow mapping
  - backend repo structure
  - interactive code viewer for important Go backend files

## Tech Stack

- React 19
- TypeScript
- Vite
- Ant Design
- Axios
- Recharts
- react-syntax-highlighter

## Pages

### Home

The main analysis experience:
- search or select a game
- choose a review limit
- call the analysis API
- inspect the normalized result UI

### Source Review

A backend walkthrough page for portfolio/demo use:
- clickable backend file tree
- syntax-highlighted code viewer
- request flow visualization
- backend architecture section

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env`

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_DEFAULT_REVIEW_LANGUAGE=english
VITE_MOCK_MODE=false
```

### 3. Run the app

```bash
npm run dev
```

The app will usually be available at `http://localhost:5173`.

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Environment Variables

| Variable | Default | Description |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `http://localhost:8080` | Backend base URL used for live analysis requests |
| `VITE_DEFAULT_REVIEW_LANGUAGE` | `english` | Default review language sent to the backend |
| `VITE_MOCK_MODE` | `false` | When `true`, the app uses local mock analysis data instead of calling the backend |

## Backend Contract

The frontend calls:

```http
POST {VITE_API_BASE_URL}/steam/analyze
Content-Type: application/json
```

Request body:

```json
{
  "appId": "1245620",
  "limit": 50,
  "language": "english"
}
```

The UI is tolerant to multiple backend naming styles and normalizes them into one frontend shape.

Supported examples:

```json
{
  "summary": "Players love the world design and combat depth.",
  "praised_features": ["world design", "combat depth"],
  "common_issues": ["performance stutter"],
  "topics": ["combat", "exploration", "performance"],
  "sentiment": {
    "positive": 62,
    "neutral": 18,
    "negative": 20
  }
}
```

```json
{
  "aiSummary": "Players love the world design and combat depth.",
  "praisedFeatures": ["world design", "combat depth"],
  "commonComplaints": ["performance stutter"],
  "topics": ["combat", "exploration", "performance"],
  "sentiment": {
    "positive": 62,
    "neutral": 18,
    "negative": 20
  }
}
```

Normalization is handled in `src/utils/resultMapper.ts`.

## Mock Mode

When `VITE_MOCK_MODE=true`:

- the app does not call the live backend
- analysis results come from local mock data
- each mock game can return its own tailored review insight profile
- the UI displays `Mock Mode` badges in the header and result view

This is useful for:
- UI development
- demos
- portfolio recording
- backend downtime

## Project Structure

```text
src/
  app/                         Main app composition
  components/
    common/                    Empty, loading, error, shared UI blocks
    layout/                    Header, hero, supporting layout sections
    results/                   Insight dashboard components
    search/                    Search form and analysis controls
    source-review/             Code viewer and backend architecture blocks
  config/                      Runtime env config
  data/
    mock/                      Mock games and mock analyze responses
    flowMapping.ts             File-to-request-flow mapping
    sourceFiles.ts             Backend source file data for the code viewer
  hooks/                       Search and analyze logic
  pages/                       Full-page views such as Source Review
  services/                    API calls and mock/live switching
  types/                       Shared TypeScript models
  utils/                       Constants and response normalization helpers
```

## Key Files

- `src/app/App.tsx` — top-level app shell and page navigation
- `src/components/search/SearchPanel.tsx` — main game search and analysis controls
- `src/components/results/ResultGrid.tsx` — analysis result dashboard
- `src/hooks/useAnalyzeReviews.ts` — loading, error, and analysis request flow
- `src/services/api.ts` — live API request + mock mode handling
- `src/utils/resultMapper.ts` — backend response normalization
- `src/pages/SourceReviewPage.tsx` — backend walkthrough page
- `src/components/source-review/CodeViewer.tsx` — syntax-highlighted backend source viewer
- `src/data/sourceFiles.ts` — curated backend files shown in the code viewer

## Current Notes

- Search suggestions currently come from local mock game data
- Live mode still uses the real backend for review analysis
- The `Source Review` page is intentionally curated for explanation/demo quality, not as a full repository browser

## Recommended Backend Setup

If you want to run the frontend against the real backend:

1. Start your Go backend on `http://localhost:8080`
2. Make sure `POST /steam/analyze` is available
3. Set `VITE_MOCK_MODE=false`
4. Run `npm run dev`

If the backend is not running, switch to `VITE_MOCK_MODE=true`.
