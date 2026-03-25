export const fileToFlowStep: Record<string, number> = {
    'cmd/main.go': 1,
    'config/config.go': 1,

    'internal/review/delivery/http/new.go': 2,
    'internal/review/delivery/http/handler.go': 2,

    'internal/review/usecase/new.go': 3,
    'internal/review/usecase/repository.go': 3,
    'internal/review/usecase/analyze.go': 3,

    'internal/review/client/steam/steam.go': 4,
    'internal/prompt/review_prompt.go': 4,
    'internal/review/client/ai/ollama.go': 4,

    'internal/platform/database/mysql/mysql.go': 5,
    'internal/review/repository/mysql/game_repository.go': 5,
    'internal/review/repository/mysql/analysis_repository.go': 5,

    'cmd/migrate/main.go': 6,
    'db/migrations/mysql/000001_init_schema.up.sql': 6,
};
