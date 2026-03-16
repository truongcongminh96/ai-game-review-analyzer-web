export const fileToFlowStep: Record<string, number> = {
    "cmd/main.go": 1,
    "internal/review/delivery/http/new.go": 2,
    "internal/review/delivery/http/error_mapper.go": 2,
    "internal/review/delivery/http/handler.go": 2,
    "internal/review/delivery/http/response.go": 2,
    "internal/review/delivery/http/middleware.go": 2,
    "internal/review/delivery/http/routes.go": 2,

    "internal/review/usecase/analyze.go": 3,
    "internal/review/usecase/new.go": 3,

    "internal/review/client/steam/client.go": 4,
    "internal/review/client/steam/new.go": 4,
    "internal/review/client/steam/steam.go": 4,

    "internal/prompt/review_prompt.go": 5,
    "internal/review/client/ai/client.go": 5,
    "internal/review/client/ai/new.go": 5,
    "internal/review/client/ai/ollama.go": 5,

    "internal/review/model/review.go": 2,
    "internal/review/model/steam.go": 4,
    "internal/review/model/insight.go": 6,
};
