# AI Game Review Analyzer Web

Frontend for analyzing Steam game reviews with AI. The app lets users search for a Steam title or app id, choose a review limit, call the backend analyze endpoint, and render a normalized result view with sentiment, summary, praised features, and common complaints.

## What This App Does

- Searches local Steam game suggestions from mock data.
- Accepts a Steam app id directly when you already know it.
- Sends review analysis requests to `POST /steam/analyze`.
- Normalizes backend responses that use either camelCase or snake_case.
- Supports mock mode so the UI can run without a live backend.
- Uses the new modular source structure under `src/app`, `src/components`, `src/hooks`, `src/types`, and `src/utils`.

## Tech Stack

- React 19
- TypeScript
- Vite
- Ant Design
- Axios

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_DEFAULT_REVIEW_LANGUAGE=english
VITE_MOCK_MODE=false
```

`VITE_MOCK_MODE=true` makes the app return local mock analysis data instead of calling the backend.

### 3. Start the development server

```bash
npm run dev
```

### 4. Optional commands

```bash
npm run build
npm run lint
npm run preview
```

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

The UI currently supports either of these response naming styles:

```json
{
  "gameTitle": "Elden Ring",
  "summary": "....",
  "praisedFeatures": ["Open world exploration"],
  "commonComplaints": ["Performance issues"],
  "sentiment": {
    "positive": 62,
    "neutral": 18,
    "negative": 20
  }
}
```

or

```json
{
  "game_title": "Elden Ring",
  "aiSummary": "....",
  "praised_features": ["Open world exploration"],
  "common_complaints": ["Performance issues"],
  "sentiment": {
    "positive": 0.62,
    "neutral": 0.18,
    "negative": 0.2
  }
}
```

The mapper in `src/utils/resultMapper.ts` converts both formats into a single UI-friendly shape.

## Project Structure

```text
src/
  app/                  App composition entry
  components/
    common/             Reusable UI blocks
    layout/             Header, hero, backend info blocks
    results/            Summary, sentiment, insights
    search/             Search form, input controls, analyze button
  config/               Runtime env parsing
  data/mock/            Mock Steam titles and mock analysis response
  hooks/                Search and analysis state logic
  services/             API clients
  types/                Shared TypeScript models
  utils/                Constants and result normalization helpers
```

## Key Files

- `src/app/App.tsx`: top-level page composition.
- `src/App.tsx`: compatibility bridge that re-exports the new app entry.
- `src/hooks/useGameSearch.ts`: local game suggestion and selection logic.
- `src/hooks/useAnalyzeReviews.ts`: analysis request flow and loading/error state.
- `src/services/api.ts`: backend API call plus mock mode switching.
- `src/utils/resultMapper.ts`: backend-to-UI response normalization.
- `src/data/mock/mockGames.ts`: local Steam title suggestions.
- `src/data/mock/mockAnalyzeResult.ts`: local mock response used in mock mode.

## Notes

- If no backend is running, enable `VITE_MOCK_MODE=true` to work on the UI safely.
- The default API base URL is `http://localhost:8080`.
- The app currently shows mock Steam suggestions locally; it does not yet fetch search suggestions from the backend.
