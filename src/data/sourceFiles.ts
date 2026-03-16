export type SourceFileItem = {
    key: string;
    path: string;
    title: string;
    description: string;
    language: 'go' | 'json' | 'bash' | 'text';
    code: string;
};

export const sourceFiles: SourceFileItem[] = [
    {
        key: 'main',
        path: 'cmd/main.go',
        title: 'Application bootstrap',
        description:
            'The entry point of the backend. It loads config, wires Steam + Ollama clients, registers HTTP routes, and starts the server with CORS enabled.',
        language: 'go',
        code: `package main

import (
    "log"
    "net/http"

    "github.com/truongcongminh96/ai-game-review-analyzer/config"
    aiClient "github.com/truongcongminh96/ai-game-review-analyzer/internal/review/client/ai"
    steamClient "github.com/truongcongminh96/ai-game-review-analyzer/internal/review/client/steam"
    reviewHTTP "github.com/truongcongminh96/ai-game-review-analyzer/internal/review/delivery/http"
    "github.com/truongcongminh96/ai-game-review-analyzer/internal/review/usecase"
)

func main() {
    cfg := config.Load()
    mux := http.NewServeMux()

    ollama := aiClient.NewOllamaClient(cfg)
    steam := steamClient.NewClient()
    analyzeUseCase := usecase.NewAnalyzeUseCase(ollama, steam)

    handler := reviewHTTP.NewHandler(analyzeUseCase)
    reviewHTTP.RegisterRoutes(mux, handler)

    addr := ":" + cfg.ServerPort
    log.Printf("server running at %s", addr)

    if err := http.ListenAndServe(addr, reviewHTTP.WithCORS(mux)); err != nil {
        log.Fatal(err)
    }
}`,
    },
    {
        key: 'config',
        path: 'config/config.go',
        title: 'Environment configuration',
        description:
            'Loads environment variables with fallback defaults for server port, Ollama base URL, and model name.',
        language: 'go',
        code: `package config

import (
    "log"
    "os"

    "github.com/joho/godotenv"
)

type Config struct {
    ServerPort    string
    OllamaBaseURL string
    OllamaModel   string
}

func Load() Config {
    err := godotenv.Load()
    if err != nil {
        log.Println("warning: .env file not found, using system env")
    }

    return Config{
        ServerPort:    getEnv("SERVER_PORT", "8080"),
        OllamaBaseURL: getEnv("OLLAMA_BASE_URL", "http://localhost:11434"),
        OllamaModel:   getEnv("OLLAMA_MODEL", "llama3.2:3b"),
    }
}

func getEnv(key, fallback string) string {
    value := os.Getenv(key)
    if value == "" {
        return fallback
    }
    return value
}`,
    },
    {
        key: 'handler',
        path: 'internal/review/delivery/http/handler.go',
        title: 'HTTP handlers',
        description:
            'Handles /health, /analyze, and /steam/analyze requests. It validates method + input, calls the use case, and returns JSON responses.',
        language: 'go',
        code: `package http

import (
    "encoding/json"
    nethttp "net/http"

    "github.com/truongcongminh96/ai-game-review-analyzer/internal/review/model"
)

func (h Handler) HealthHandler(w nethttp.ResponseWriter, r *nethttp.Request) {
    if r.Method != nethttp.MethodGet {
        writeError(w, nethttp.StatusMethodNotAllowed, "method not allowed")
        return
    }

    writeJSON(w, nethttp.StatusOK, map[string]string{
        "status": "ok",
    })
}

func (h Handler) AnalyzeSteamHandler(w nethttp.ResponseWriter, r *nethttp.Request) {
    if r.Method != nethttp.MethodPost {
        writeError(w, nethttp.StatusMethodNotAllowed, "method not allowed")
        return
    }

    var req model.AnalyzeSteamRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        writeError(w, nethttp.StatusBadRequest, "invalid request body")
        return
    }

    result, err := h.useCase.AnalyzeSteamReviews(req.AppID, req.Limit, req.Language)
    if err != nil {
        writeError(w, mapErrorToStatus(err), err.Error())
        return
    }

    writeJSON(w, nethttp.StatusOK, result)
}`,
    },
    {
        key: 'routes',
        path: 'internal/review/delivery/http/routes.go',
        title: 'Route registration',
        description:
            'Central place for binding handler methods to backend endpoints.',
        language: 'go',
        code: `package http

import nethttp "net/http"

func RegisterRoutes(mux *nethttp.ServeMux, handler *Handler) {
    mux.HandleFunc("/health", handler.HealthHandler)
    mux.HandleFunc("/analyze", handler.AnalyzeHandler)
    mux.HandleFunc("/steam/analyze", handler.AnalyzeSteamHandler)
}`,
    },
    {
        key: 'usecase-new',
        path: 'internal/review/usecase/new.go',
        title: 'Use case dependency wiring',
        description:
            'Defines the AnalyzeUseCase structure and injects the AI client and Steam client.',
        language: 'go',
        code: `package usecase

import (
    "github.com/truongcongminh96/ai-game-review-analyzer/internal/review/client/ai"
    "github.com/truongcongminh96/ai-game-review-analyzer/internal/review/client/steam"
)

type AnalyzeUseCase struct {
    aiClient    ai.Client
    steamClient steam.Client
}

func NewAnalyzeUseCase(aiClient ai.Client, steamClient steam.Client) *AnalyzeUseCase {
    return &AnalyzeUseCase{
        aiClient:    aiClient,
        steamClient: steamClient,
    }
}`,
    },
    {
        key: 'usecase-analyze',
        path: 'internal/review/usecase/analyze.go',
        title: 'Core review analysis flow',
        description:
            'This is the main business logic: validate appId, fetch Steam reviews, normalize review text, call the AI client, and enrich the final insight response.',
        language: 'go',
        code: `package usecase

import (
    "fmt"
    "strings"

    "github.com/truongcongminh96/ai-game-review-analyzer/internal/review/model"
)

func (u *AnalyzeUseCase) AnalyzeSteamReviews(appID string, limit int, language string) (*model.Insight, error) {
    if strings.TrimSpace(appID) == "" {
        return nil, fmt.Errorf("appId required")
    }

    if limit <= 0 {
        limit = 30
    }

    if strings.TrimSpace(language) == "" {
        language = "english"
    }

    steamReviews, err := u.steamClient.GetReviews(appID, limit, language)
    if err != nil {
        return nil, err
    }

    reviews := make([]string, 0, len(steamReviews))
    sentiment := model.SentimentBreakdown{}

    for _, r := range steamReviews {
        trimmed := strings.TrimSpace(r.Review)
        if trimmed == "" {
            continue
        }

        reviews = append(reviews, trimmed)

        if r.VotedUp {
            sentiment.Positive++
        } else {
            sentiment.Negative++
        }
    }

    insight, err := u.AnalyzeReviews(reviews)
    if err != nil {
        return nil, err
    }

    insight.Sentiment = sentiment
    insight.ReviewCount = len(reviews)

    return insight, nil
}`,
    },
    {
        key: 'steam-client',
        path: 'internal/review/client/steam/client.go',
        title: 'Steam client contract',
        description:
            'Defines the Steam client interface so the use case depends on abstraction instead of a concrete implementation.',
        language: 'go',
        code: `package steam

import "github.com/truongcongminh96/ai-game-review-analyzer/internal/review/model"

type Client interface {
    GetReviews(appID string, limit int, language string) ([]model.ReviewSteam, error)
}`,
    },
    {
        key: 'ai-new',
        path: 'internal/review/client/ai/new.go',
        title: 'Ollama client setup',
        description:
            'Creates the Ollama client with model, base URL, and HTTP timeout configuration.',
        language: 'go',
        code: `package ai

import (
    "net/http"
    "time"

    "github.com/truongcongminh96/ai-game-review-analyzer/config"
)

type ollamaGenerateRequest struct {
    Model  string \`json:"model"\`
    Prompt string \`json:"prompt"\`
    Stream bool   \`json:"stream"\`
}

type ollamaGenerateResponse struct {
    Response string \`json:"response"\`
}

type OllamaClient struct {
    BaseURL string
    Model   string
    Client  *http.Client
}

func NewOllamaClient(cfg config.Config) OllamaClient {
    return OllamaClient{
        BaseURL: cfg.OllamaBaseURL,
        Model:   cfg.OllamaModel,
        Client:  &http.Client{Timeout: 120 * time.Second},
    }
}`,
    },
    {
        key: 'ai-ollama',
        path: 'internal/review/client/ai/ollama.go',
        title: 'Ollama inference call',
        description:
            'Builds the review analysis prompt, calls /api/generate, parses the LLM output, strips markdown fences, and converts the JSON string into a typed Insight object.',
        language: 'go',
        code: `package ai

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "strings"

    "github.com/truongcongminh96/ai-game-review-analyzer/internal/prompt"
    "github.com/truongcongminh96/ai-game-review-analyzer/internal/review/model"
)

func (o OllamaClient) AnalyzeReviews(reviews []string) (*model.Insight, error) {
    if len(reviews) == 0 {
        return nil, fmt.Errorf("reviews cannot be empty")
    }

    reqBody := ollamaGenerateRequest{
        Model:  o.Model,
        Prompt: prompt.BuildReviewAnalysisPrompt(reviews),
        Stream: false,
    }

    bodyBytes, err := json.Marshal(reqBody)
    if err != nil {
        return nil, err
    }

    resp, err := o.Client.Post(o.BaseURL+"/api/generate", "application/json", bytes.NewBuffer(bodyBytes))
    if err != nil {
        return nil, fmt.Errorf("failed to call ollama: %w", err)
    }
    defer func(body io.ReadCloser) { _ = body.Close() }(resp.Body)

    raw, err := io.ReadAll(resp.Body)
    if err != nil {
        return nil, err
    }

    if resp.StatusCode >= 300 {
        return nil, fmt.Errorf("ollama returned status %d: %s", resp.StatusCode, string(raw))
    }

    var ollamaResp ollamaGenerateResponse
    if err := json.Unmarshal(raw, &ollamaResp); err != nil {
        return nil, fmt.Errorf("failed to parse ollama response: %w, raw=%s", err, string(raw))
    }

    cleaned := cleanJSONText(ollamaResp.Response)

    var insight model.Insight
    if err := json.Unmarshal([]byte(cleaned), &insight); err != nil {
        return nil, fmt.Errorf("failed to parse insight JSON: %w, llm_output=%s", err, cleaned)
    }

    return &insight, nil
}`,
    },
];
