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
}
`,
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
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	ServerPort       string
	OllamaBaseURL    string
	OllamaModel      string
	OllamaTimeoutSec int
}

func Load() Config {
	err := godotenv.Load()
	if err != nil {
		log.Println("warning: .env file not found, using system env")
	}

	return Config{
		ServerPort:       getEnv("SERVER_PORT", "8080"),
		OllamaBaseURL:    getEnv("OLLAMA_BASE_URL", "http://localhost:11434"),
		OllamaModel:      getEnv("OLLAMA_MODEL", "llama3.2:3b"),
		OllamaTimeoutSec: getEnvAsInt("OLLAMA_TIMEOUT_SEC", 300),
	}
}

func getEnv(key, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}

func getEnvAsInt(key string, fallback int) int {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}

	intValue, err := strconv.Atoi(value)
	if err != nil {
		return fallback
	}

	return intValue
}
`,
    },
    {
        key: 'prompt-review',
        path: 'internal/prompt/review_prompt.go',
        title: 'Review analysis prompt builder',
        description:
            'Builds the LLM prompt from normalized Steam reviews and enforces the exact JSON output shape expected by the backend.',
        language: 'go',
        code: `package prompt

import (
	"fmt"
	"strings"
)

func BuildReviewAnalysisPrompt(reviews []string) string {
	var reviewLines []string
	for i, review := range reviews {
		reviewLines = append(reviewLines, fmt.Sprintf("%d. %s", i+1, review))
	}

	return fmt.Sprintf(\`You are a game analytics AI.

Analyze the following player reviews and return ONLY valid JSON.
Do not add markdown.
Do not wrap the JSON in backticks.

Rules:
- Count sentiment across all reviews.
- Extract up to 5 praised features.
- Extract up to 5 common issues.
- Extract up to 6 key topics about gameplay systems or player experience.
- Topics should be short noun phrases like: combat, progression, performance, story, quest design, balance, UI/UX, monetization, matchmaking, exploration.
- Write a professional 2-3 sentence summary.

Return this exact JSON shape:
{
  "praised_features": [],
  "common_issues": [],
  "topics": [],
  "sentiment": {
    "positive": 0,
    "neutral": 0,
    "negative": 0
  },
  "summary": ""
}

Reviews:
%s
\`, strings.Join(reviewLines, "\\n"))
}
`,
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

func (h Handler) AnalyzeHandler(w nethttp.ResponseWriter, r *nethttp.Request) {
	if r.Method != nethttp.MethodPost {
		writeError(w, nethttp.StatusMethodNotAllowed, "method not allowed")
		return
	}

	var req model.AnalyzeReviewRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, nethttp.StatusBadRequest, "invalid request body")
		return
	}

	result, err := h.useCase.AnalyzeReviews(req.Reviews)
	if err != nil {
		writeError(w, mapErrorToStatus(err), err.Error())
		return
	}

	writeJSON(w, nethttp.StatusOK, result)
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
}
`,
    },
    {
        key: 'http-new',
        path: 'internal/review/delivery/http/new.go',
        title: 'HTTP handler contract',
        description:
            'Defines the use case interface expected by the delivery layer and wires it into the HTTP handler.',
        language: 'go',
        code: `package http

import "github.com/truongcongminh96/ai-game-review-analyzer/internal/review/model"

type AnalyzeUseCase interface {
	AnalyzeReviews(reviews []string) (*model.Insight, error)
	AnalyzeSteamReviews(appID string, limit int, language string) (*model.Insight, error)
}

type Handler struct {
	useCase AnalyzeUseCase
}

func NewHandler(useCase AnalyzeUseCase) *Handler {
	return &Handler{useCase: useCase}
}
`,
    },
    {
        key: 'http-error-mapper',
        path: 'internal/review/delivery/http/error_mapper.go',
        title: 'HTTP error mapping',
        description:
            'Maps domain and infrastructure failures into appropriate HTTP status codes for the API response.',
        language: 'go',
        code: `package http

import (
	"errors"
	"net/http"
	"strings"
)

func mapErrorToStatus(err error) int {
	if err == nil {
		return http.StatusOK
	}

	msg := err.Error()

	switch {
	case strings.Contains(msg, "invalid request"),
		strings.Contains(msg, "required"),
		strings.Contains(msg, "cannot be empty"):
		return http.StatusBadRequest
	case strings.Contains(msg, "steam returned status"),
		strings.Contains(msg, "failed to call steam"),
		strings.Contains(msg, "ollama returned status"),
		strings.Contains(msg, "failed to call ollama"):
		return http.StatusBadGateway
	default:
		var target interface{ Temporary() bool }
		if errors.As(err, &target) {
			return http.StatusBadGateway
		}
		return http.StatusInternalServerError
	}
}
`,
    },
    {
        key: 'http-response',
        path: 'internal/review/delivery/http/response.go',
        title: 'HTTP response helpers',
        description:
            'Provides small helpers for sending JSON payloads and standardized error responses back to the frontend.',
        language: 'go',
        code: `package http

import (
	"encoding/json"
	nethttp "net/http"
)

type errorResponse struct {
	Error string \`json:"error"\`
}

func writeJSON(w nethttp.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(data)
}

func writeError(w nethttp.ResponseWriter, status int, message string) {
	writeJSON(w, status, errorResponse{
		Error: message,
	})
}
`,
    },
    {
        key: 'http-middleware',
        path: 'internal/review/delivery/http/middleware.go',
        title: 'CORS middleware',
        description:
            'Wraps the HTTP mux with CORS headers so the frontend can call the backend during local development.',
        language: 'go',
        code: `package http

import nethttp "net/http"

func WithCORS(next nethttp.Handler) nethttp.Handler {
	return nethttp.HandlerFunc(func(w nethttp.ResponseWriter, r *nethttp.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == nethttp.MethodOptions {
			w.WriteHeader(nethttp.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
`,
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
}
`,
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
}
`,
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

// AnalyzeReviews analyzes player reviews using the AI client
// and returns a summarized Insight.
func (u *AnalyzeUseCase) AnalyzeReviews(reviews []string) (*model.Insight, error) {
	reviews = normalizeReviews(reviews)
	if len(reviews) == 0 {
		return nil, fmt.Errorf("reviews cannot be empty")
	}

	insight, err := u.aiClient.AnalyzeReviews(reviews)
	if err != nil {
		return nil, err
	}

	return sanitizeInsight(insight, len(reviews)), nil
}

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
}

func normalizeReviews(reviews []string) []string {
	normalized := make([]string, 0, len(reviews))
	for _, review := range reviews {
		trimmed := strings.TrimSpace(review)
		if trimmed != "" {
			normalized = append(normalized, trimmed)
		}
	}
	return normalized
}

func sanitizeInsight(insight *model.Insight, reviewCount int) *model.Insight {
	if insight == nil {
		return &model.Insight{ReviewCount: reviewCount}
	}

	insight.PraisedFeatures = cleanStringList(insight.PraisedFeatures)
	insight.CommonIssues = cleanStringList(insight.CommonIssues)
	insight.Topics = cleanStringList(insight.Topics)
	insight.Summary = strings.TrimSpace(insight.Summary)
	insight.ReviewCount = reviewCount

	total := insight.Sentiment.Positive + insight.Sentiment.Neutral + insight.Sentiment.Negative
	if total < 0 {
		insight.Sentiment.Positive = 0
		insight.Sentiment.Neutral = 0
		insight.Sentiment.Negative = 0
	}

	return insight
}

func cleanStringList(items []string) []string {
	seen := make(map[string]struct{})
	result := make([]string, 0, len(items))

	for _, item := range items {
		trimmed := strings.TrimSpace(item)
		if trimmed == "" {
			continue
		}
		key := strings.ToLower(trimmed)
		if _, ok := seen[key]; ok {
			continue
		}
		seen[key] = struct{}{}
		result = append(result, trimmed)
	}

	return result
}
`,
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
}
`,
    },
    {
        key: 'steam-new',
        path: 'internal/review/client/steam/new.go',
        title: 'Steam client setup',
        description:
            'Creates the concrete Steam client with an HTTP timeout used for fetching review data from Steam.',
        language: 'go',
        code: `package steam

import (
	"net/http"
	"time"
)

type ClientSteam struct {
	httpClient *http.Client
}

func NewClient() ClientSteam {
	return ClientSteam{
		httpClient: &http.Client{
			Timeout: 15 * time.Second,
		},
	}
}
`,
    },
    {
        key: 'steam-api',
        path: 'internal/review/client/steam/steam.go',
        title: 'Steam review fetcher',
        description:
            'Calls the Steam app reviews endpoint, validates the response, decodes JSON, and filters empty review entries.',
        language: 'go',
        code: `package steam

import (
	"encoding/json"
	"fmt"
	"io"

	"github.com/truongcongminh96/ai-game-review-analyzer/internal/review/model"
)

func (c ClientSteam) GetReviews(appID string, limit int, language string) ([]model.ReviewSteam, error) {
	url := fmt.Sprintf(
		"https://store.steampowered.com/appreviews/%s?json=1&num_per_page=%d&language=%s",
		appID,
		limit,
		language,
	)

	resp, err := c.httpClient.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to call steam: %w", err)
	}
	defer func() { _ = resp.Body.Close() }()

	if resp.StatusCode >= 300 {
		raw, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("steam returned status %d: %s", resp.StatusCode, string(raw))
	}

	var data model.ResponseSteam
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, fmt.Errorf("failed to decode steam response: %w", err)
	}

	reviews := make([]model.ReviewSteam, 0, len(data.Reviews))
	for _, r := range data.Reviews {
		if r.Review == "" {
			continue
		}
		reviews = append(reviews, r)
	}

	return reviews, nil
}
`,
    },
    {
        key: 'ai-client',
        path: 'internal/review/client/ai/client.go',
        title: 'AI client contract',
        description:
            'Defines the abstraction that the use case depends on for turning raw reviews into an insight response.',
        language: 'go',
        code: `package ai

import "github.com/truongcongminh96/ai-game-review-analyzer/internal/review/model"

type Client interface {
	AnalyzeReviews(reviews []string) (*model.Insight, error)
}
`,
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
		Client:  &http.Client{Timeout: time.Duration(cfg.OllamaTimeoutSec) * time.Second},
	}
}
`,
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
}

func cleanJSONText(s string) string {
	s = strings.TrimSpace(s)
	s = strings.TrimPrefix(s, "\`\`\`json")
	s = strings.TrimPrefix(s, "\`\`\`")
	s = strings.TrimSuffix(s, "\`\`\`")
	return strings.TrimSpace(s)
}
`,
    },
    {
        key: 'model-review',
        path: 'internal/review/model/review.go',
        title: 'Review request models',
        description:
            'Defines the request payloads accepted by the API for direct review analysis and Steam-based review analysis.',
        language: 'go',
        code: `package model

type AnalyzeReviewRequest struct {
	Reviews []string \`json:"reviews"\`
}

type AnalyzeSteamRequest struct {
	AppID    string \`json:"appId"\`
	Limit    int    \`json:"limit"\`
	Language string \`json:"language"\`
}
`,
    },
    {
        key: 'model-steam',
        path: 'internal/review/model/steam.go',
        title: 'Steam response models',
        description:
            'Represents the subset of Steam review response fields needed by the backend during analysis.',
        language: 'go',
        code: `package model

type ResponseSteam struct {
	Reviews []ReviewSteam \`json:"reviews"\`
}

type ReviewSteam struct {
	Review   string \`json:"review"\`
	VotedUp  bool   \`json:"voted_up"\`
	Language string \`json:"language"\`
}
`,
    },
    {
        key: 'model-insight',
        path: 'internal/review/model/insight.go',
        title: 'Insight response model',
        description:
            'Defines the final structured insight returned to the frontend, including sentiment, topics, and summarized findings.',
        language: 'go',
        code: `package model

type SentimentBreakdown struct {
	Positive int \`json:"positive"\`
	Neutral  int \`json:"neutral"\`
	Negative int \`json:"negative"\`
}

type Insight struct {
	PraisedFeatures []string           \`json:"praised_features"\`
	CommonIssues    []string           \`json:"common_issues"\`
	Topics          []string           \`json:"topics"\`
	ReviewCount     int                \`json:"review_count"\`
	Sentiment       SentimentBreakdown \`json:"sentiment"\`
	Summary         string             \`json:"summary"\`
}
`,
    },
];
