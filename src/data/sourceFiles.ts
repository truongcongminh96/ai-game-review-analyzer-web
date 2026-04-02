export type SourceFileItem = {
    key: string;
    sectionKey: string;
    path: string;
    title: string;
    description: string;
    language: 'go' | 'sql';
    highlights: string[];
    code: string;
};

export type SourceSectionItem = {
    key: string;
    title: string;
    description: string;
    badge: string;
    fileKeys: string[];
};

export const backendRepoTree = `ai-game-review-analyzer/
  cmd/
    main.go
    migrate/
      main.go

  config/
    config.go

  db/
    migrations/
      mysql/
        000001_init_schema.up.sql
        000002_remove_analysis_run_genre.up.sql
        000003_analysis_v2.up.sql
      postgres/
        000001_init_schema.up.sql
        000002_remove_analysis_run_genre.up.sql
        000003_analysis_v2.up.sql

  internal/
    platform/
      database/
        mysql/mysql.go
        postgres/postgres.go
      uuid/uuid.go

    prompt/
      review_prompt.go

    review/
      client/
        ai/
          client.go
          new.go
          schema.go
          ollama.go
          ollama_test.go
        steam/
          client.go
          new.go
          steam.go

      delivery/http/
        error_mapper.go
        handler.go
        handler_v2.go
        middleware.go
        new.go
        response.go
        response_v2.go
        routes.go

      model/
        analysis.go
        game.go
        insight.go
        insight_v2.go
        review.go
        steam.go

      repository/
        mysql/
          game_repository.go
          analysis_repository.go
        postgres/
          game_repository.go
          analysis_repository.go

      usecase/
        analyze.go
        analyze_v2.go
        new.go
        repository.go
        analyze_test.go`;

export const sourceSections: SourceSectionItem[] = [
    {
        key: 'runtime',
        title: 'Runtime & Bootstrap',
        description: 'Application entry points, config loading, and startup dependency selection.',
        badge: 'Layer 1',
        fileKeys: ['main', 'config'],
    },
    {
        key: 'delivery',
        title: 'HTTP Delivery',
        description: 'Request decoding, route registration, and transport contracts for both sync Standard and async Advanced endpoints.',
        badge: 'Layer 2',
        fileKeys: ['http-new', 'routes', 'handler', 'handler-v2'],
    },
    {
        key: 'usecase',
        title: 'Use Case Orchestration',
        description: 'Business logic that validates input, coordinates clients, and manages both synchronous and asynchronous analysis flows.',
        badge: 'Layer 3',
        fileKeys: ['usecase-new', 'usecase-repository', 'usecase-analyze', 'usecase-analyze-v2'],
    },
    {
        key: 'integration',
        title: 'External Integrations',
        description: 'Steam review fetch, prompt shaping, JSON schema guards, and Ollama inference.',
        badge: 'Layer 4',
        fileKeys: ['steam-client', 'prompt-review', 'ai-schema', 'ai-ollama'],
    },
    {
        key: 'persistence',
        title: 'Persistence Adapters',
        description: 'Database client bootstrap plus repositories for games, analysis runs, review snapshots, and structured insight evidence.',
        badge: 'Layer 5',
        fileKeys: ['platform-mysql', 'repo-mysql-game', 'repo-mysql-analysis'],
    },
    {
        key: 'migration',
        title: 'Migration & Schema',
        description: 'Migration CLI plus the base and v2 schema changes that store runs, progress, snapshots, and evidence.',
        badge: 'Layer 6',
        fileKeys: ['migrate-main', 'mysql-init-schema', 'mysql-analysis-v2'],
    },
];

export const sourceFiles: SourceFileItem[] = [
    {
        key: 'main',
        sectionKey: 'runtime',
        path: 'cmd/main.go',
        title: 'Server bootstrap and dependency wiring',
        description:
            'The current backend no longer wires only Steam + Ollama. It now conditionally initializes MySQL or Postgres persistence, injects a health checker, and passes repositories into the use case.',
        language: 'go',
        highlights: ['driver-aware startup', 'repository wiring', 'health-aware handler'],
        code: `func main() {
    cfg := config.Load()
    mux := http.NewServeMux()
    ctx := context.Background()

    gameRepo, analysisRepo, healthChecker, closeDatabase, err := initializePersistence(ctx, cfg)
    if err != nil {
        log.Fatalf("failed to initialize database: %v", err)
    }
    defer closeDatabase()

    ollama := aiClient.NewOllamaClient(cfg)
    steam := steamClient.NewClient()
    analyzeUseCase := usecase.NewAnalyzeUseCase(ollama, steam, gameRepo, analysisRepo)

    handler := reviewHTTP.NewHandler(analyzeUseCase, healthChecker)
    reviewHTTP.RegisterRoutes(mux, handler)

    addr := ":" + cfg.ServerPort
    log.Printf("server running at %s", addr)

    if err := http.ListenAndServe(addr, reviewHTTP.WithCORS(mux)); err != nil {
        log.Fatal(err)
    }
}

func initializePersistence(
    ctx context.Context,
    cfg config.Config,
) (usecase.GameRepository, usecase.AnalysisRepository, reviewHTTP.HealthChecker, func(), error) {
    switch cfg.DatabaseDriver {
    case config.DatabaseDriverPostgres:
        client, err := platformpostgres.New(ctx, cfg)
        if err != nil {
            return nil, nil, nil, func() {}, err
        }
        return reviewpostgres.NewGameRepository(client), reviewpostgres.NewAnalysisRepository(client), client, func() {
            if client != nil {
                client.Close()
            }
        }, nil

    case config.DatabaseDriverMySQL:
        client, err := platformmysql.New(ctx, cfg)
        if err != nil {
            return nil, nil, nil, func() {}, err
        }
        return reviewmysql.NewGameRepository(client), reviewmysql.NewAnalysisRepository(client), client, func() {
            if client != nil {
                client.Close()
            }
        }, nil
    }

    return nil, nil, nil, func() {}, nil
}`,
    },
    {
        key: 'config',
        sectionKey: 'runtime',
        path: 'config/config.go',
        title: 'Environment and database config resolution',
        description:
            'Configuration now supports DATABASE_* variables, legacy Supabase/MySQL compatibility, automatic driver detection, and separate Ollama models for Standard and Advanced analysis paths.',
        language: 'go',
        highlights: ['DATABASE_DRIVER inference', 'OLLAMA_MODEL_V1/V2', 'legacy env compatibility'],
        code: `type Config struct {
    ServerPort               string
    OllamaBaseURL            string
    OllamaModel              string
    OllamaModelV1            string
    OllamaModelV2            string
    OllamaTimeoutSec         int
    DatabaseDriver           string
    DatabaseURL              string
    DatabaseMaxConns         int
    DatabaseMinConns         int
    DatabaseHealthTimeoutSec int
}

func Load() Config {
    databaseDriver := resolveDatabaseDriver()
    ollamaModel := getEnv("OLLAMA_MODEL", "llama3.2:3b")

    return Config{
        ServerPort:               getEnv("SERVER_PORT", "8080"),
        OllamaBaseURL:            getEnv("OLLAMA_BASE_URL", "http://localhost:11434"),
        OllamaModel:              ollamaModel,
        OllamaModelV1:            getFirstEnv(ollamaModel, "OLLAMA_MODEL_V1", "OLLAMA_MODEL"),
        OllamaModelV2:            getFirstEnv(ollamaModel, "OLLAMA_MODEL_V2", "OLLAMA_MODEL"),
        OllamaTimeoutSec:         getEnvAsInt("OLLAMA_TIMEOUT_SEC", 300),
        DatabaseDriver:           databaseDriver,
        DatabaseURL:              resolveDatabaseURL(databaseDriver),
        DatabaseMaxConns:         resolveDatabaseInt(databaseDriver, 5, "DATABASE_MAX_CONNS"),
        DatabaseMinConns:         resolveDatabaseInt(databaseDriver, 0, "DATABASE_MIN_CONNS"),
        DatabaseHealthTimeoutSec: resolveDatabaseInt(databaseDriver, 5, "DATABASE_HEALTH_TIMEOUT_SEC"),
    }
}

func resolveDatabaseDriver() string {
    if driver := normalizeDatabaseDriver(getFirstEnv("", "DATABASE_DRIVER", "DB_DRIVER")); driver != "" {
        return driver
    }

    if databaseURL := strings.TrimSpace(os.Getenv("DATABASE_URL")); databaseURL != "" {
        return inferDriverFromURL(databaseURL)
    }

    if strings.TrimSpace(os.Getenv("SUPABASE_DB_URL")) != "" {
        return DatabaseDriverPostgres
    }

    if strings.TrimSpace(os.Getenv("MYSQL_DB_URL")) != "" {
        return DatabaseDriverMySQL
    }

    return ""
}`,
    },
    {
        key: 'http-new',
        sectionKey: 'delivery',
        path: 'internal/review/delivery/http/new.go',
        title: 'HTTP contracts and health checker wiring',
        description:
            'The delivery layer now depends on a single use case surface that serves both the legacy sync endpoints and the new async Advanced endpoints, while still allowing optional health checks.',
        language: 'go',
        highlights: ['sync + async contract', 'optional health checker', 'transport isolation'],
        code: `type AnalyzeUseCase interface {
    AnalyzeReviews(ctx context.Context, reviews []string) (*model.Insight, error)
    AnalyzeSteamReviews(ctx context.Context, appID string, limit int, language string) (*model.Insight, error)
    RequestSteamAnalysis(ctx context.Context, appID string, limit int, language string) (*model.AnalysisRunQueued, error)
    GetAnalysisRun(ctx context.Context, runID string) (*model.AnalysisRunDetail, error)
    GetAnalysisEvidence(ctx context.Context, input model.AnalysisEvidenceQuery) (*model.AnalysisEvidencePage, error)
    GetGameHistory(ctx context.Context, appID string, limit int) (*model.GameHistory, error)
    CompareAnalysisRuns(ctx context.Context, runA string, runB string) (*model.CompareAnalysisResult, error)
}

type HealthChecker interface {
    Enabled() bool
    CheckHealth(ctx context.Context) error
}

type Handler struct {
    useCase       AnalyzeUseCase
    healthChecker HealthChecker
}

func NewHandler(useCase AnalyzeUseCase, healthChecker ...HealthChecker) *Handler {
    var checker HealthChecker = noopHealthChecker{}
    if len(healthChecker) > 0 && healthChecker[0] != nil {
        checker = healthChecker[0]
    }

    return &Handler{
        useCase:       useCase,
        healthChecker: checker,
    }
}`,
    },
    {
        key: 'routes',
        sectionKey: 'delivery',
        path: 'internal/review/delivery/http/routes.go',
        title: 'Route registration for Standard and Advanced APIs',
        description:
            'The router now exposes the original sync API alongside the async v2 workflow for queueing, polling, evidence browsing, history, and compare.',
        language: 'go',
        highlights: ['/steam/analyze', '/v2/analysis-runs/{runID}', '/v2/compare'],
        code: `func RegisterRoutes(mux *nethttp.ServeMux, handler *Handler) {
    mux.HandleFunc("/health", handler.HealthHandler)
    mux.HandleFunc("/analyze", handler.AnalyzeHandler)
    mux.HandleFunc("/steam/analyze", handler.AnalyzeSteamHandler)

    mux.HandleFunc("POST /v2/steam/analyze", handler.RequestSteamAnalysisHandler)
    mux.HandleFunc("GET /v2/analysis-runs/{runID}", handler.GetAnalysisRunHandler)
    mux.HandleFunc("GET /v2/analysis-runs/{runID}/evidence", handler.GetAnalysisEvidenceHandler)
    mux.HandleFunc("GET /v2/games/{appID}/history", handler.GetGameHistoryHandler)
    mux.HandleFunc("GET /v2/compare", handler.CompareRunsHandler)
}`,
    },
    {
        key: 'handler',
        sectionKey: 'delivery',
        path: 'internal/review/delivery/http/handler.go',
        title: 'Health and Standard analyze handlers',
        description:
            'The original handlers stay lean: health reflects database connectivity, and the Standard Steam endpoint remains a blocking request that returns the final legacy insight payload.',
        language: 'go',
        highlights: ['/health with DB status', 'POST /analyze', 'POST /steam/analyze'],
        code: `func (h Handler) HealthHandler(w nethttp.ResponseWriter, r *nethttp.Request) {
    if h.healthChecker != nil && h.healthChecker.Enabled() {
        if err := h.healthChecker.CheckHealth(r.Context()); err != nil {
            writeJSON(w, nethttp.StatusServiceUnavailable, map[string]string{
                "status":   "degraded",
                "database": "unreachable",
            })
            return
        }

        writeJSON(w, nethttp.StatusOK, map[string]string{
            "status":   "ok",
            "database": "connected",
        })
        return
    }

    writeJSON(w, nethttp.StatusOK, map[string]string{
        "status":   "ok",
        "database": "disabled",
    })
}

func (h Handler) AnalyzeSteamHandler(w nethttp.ResponseWriter, r *nethttp.Request) {
    var req model.AnalyzeSteamRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        writeError(w, nethttp.StatusBadRequest, "invalid request body")
        return
    }

    result, err := h.useCase.AnalyzeSteamReviews(r.Context(), req.AppID, req.Limit, req.Language)
    if err != nil {
        writeError(w, mapErrorToStatus(err), err.Error())
        return
    }

    writeJSON(w, nethttp.StatusOK, result)
}`,
    },
    {
        key: 'handler-v2',
        sectionKey: 'delivery',
        path: 'internal/review/delivery/http/handler_v2.go',
        title: 'Advanced queue, polling, evidence, and compare handlers',
        description:
            'The v2 handlers translate the async workflow into HTTP: queue a run, poll it by run ID, page evidence by label, inspect game history, and compare two saved runs.',
        language: 'go',
        highlights: ['202 Accepted queue response', 'evidence and history queries', 'compare by run IDs'],
        code: `func (h Handler) RequestSteamAnalysisHandler(w nethttp.ResponseWriter, r *nethttp.Request) {
    var req model.AnalyzeSteamRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        writeError(w, nethttp.StatusBadRequest, "invalid request body")
        return
    }

    result, err := h.useCase.RequestSteamAnalysis(r.Context(), req.AppID, req.Limit, req.Language)
    if err != nil {
        writeError(w, mapErrorToStatus(err), err.Error())
        return
    }

    response := analysisRunQueuedResponse{
        RunID:           result.RunID,
        Status:          result.Status,
        CurrentStage:    result.CurrentStage,
        ProgressPercent: result.ProgressPercent,
    }
    response.Links.Self = "/v2/analysis-runs/" + result.RunID
    response.Links.History = "/v2/games/" + result.Request.AppID + "/history"
    writeJSON(w, nethttp.StatusAccepted, response)
}

func (h Handler) GetAnalysisRunHandler(w nethttp.ResponseWriter, r *nethttp.Request) {
    runID := strings.TrimSpace(r.PathValue("runID"))
    result, err := h.useCase.GetAnalysisRun(r.Context(), runID)
    if err != nil {
        writeError(w, mapErrorToStatus(err), err.Error())
        return
    }
    writeJSON(w, nethttp.StatusOK, result)
}

func (h Handler) CompareRunsHandler(w nethttp.ResponseWriter, r *nethttp.Request) {
    runA := strings.TrimSpace(r.URL.Query().Get("runA"))
    runB := strings.TrimSpace(r.URL.Query().Get("runB"))
    result, err := h.useCase.CompareAnalysisRuns(r.Context(), runA, runB)
    if err != nil {
        writeError(w, mapErrorToStatus(err), err.Error())
        return
    }
    writeJSON(w, nethttp.StatusOK, result)
}`,
    },
    {
        key: 'usecase-new',
        sectionKey: 'usecase',
        path: 'internal/review/usecase/new.go',
        title: 'Use case dependency container',
        description:
            'The analyze use case now carries repository dependencies in addition to the AI and Steam clients, allowing persistence to stay optional but fully injectable.',
        language: 'go',
        highlights: ['constructor upgrade', 'repository injection', 'optional persistence'],
        code: `type AnalyzeUseCase struct {
    aiClient     ai.Client
    steamClient  steam.Client
    gameRepo     GameRepository
    analysisRepo AnalysisRepository
}

func NewAnalyzeUseCase(
    aiClient ai.Client,
    steamClient steam.Client,
    gameRepo GameRepository,
    analysisRepo AnalysisRepository,
) *AnalyzeUseCase {
    return &AnalyzeUseCase{
        aiClient:     aiClient,
        steamClient:  steamClient,
        gameRepo:     gameRepo,
        analysisRepo: analysisRepo,
    }
}`,
    },
    {
        key: 'usecase-repository',
        sectionKey: 'usecase',
        path: 'internal/review/usecase/repository.go',
        title: 'Repository interfaces for persistence',
        description:
            'The use case remains storage-agnostic by depending on small contracts instead of concrete MySQL or Postgres implementations.',
        language: 'go',
        highlights: ['GameRepository', 'run detail/history/evidence', 'clean architecture boundary'],
        code: `type GameRepository interface {
    UpsertBySteamAppID(ctx context.Context, input model.GameUpsertInput) (*model.Game, error)
}

type AnalysisRepository interface {
    CreateRun(ctx context.Context, input model.CreateAnalysisRunInput) (*model.AnalysisRun, error)
    StartRun(ctx context.Context, runID string) error
    UpdateRunProgress(ctx context.Context, input model.UpdateAnalysisRunProgressInput) error
    SaveReviewSnapshots(ctx context.Context, runID string, reviews []model.ReviewSnapshot) error
    CompleteRun(ctx context.Context, input model.CompleteAnalysisRunInput) error
    MarkFailed(ctx context.Context, input model.FailAnalysisRunInput) error
    GetRunDetail(ctx context.Context, runID string) (*model.AnalysisRunDetail, error)
    ListHistoryByAppID(ctx context.Context, appID string, limit int) (*model.GameHistory, error)
    ListEvidence(ctx context.Context, input model.AnalysisEvidenceQuery) (*model.AnalysisEvidencePage, error)
}`,
    },
    {
        key: 'usecase-analyze',
        sectionKey: 'usecase',
        path: 'internal/review/usecase/analyze.go',
        title: 'Review orchestration with persistence hooks',
        description:
            'The Standard flow still persists the legacy summary payload, but now records the Standard model name explicitly while the Advanced flow uses a separate async pipeline in analyze_v2.go.',
        language: 'go',
        highlights: ['prepareAnalysisRun', 'markRunFailed', 'StandardModelName'],
        code: `func (u *AnalyzeUseCase) AnalyzeSteamReviews(ctx context.Context, appID string, limit int, language string) (*model.Insight, error) {
    if strings.TrimSpace(appID) == "" {
        return nil, fmt.Errorf("appId required")
    }

    var persistedRun *model.AnalysisRun
    if u.persistenceEnabled() {
        run, err := u.prepareAnalysisRun(ctx, appID, limit, language)
        if err != nil {
            return nil, err
        }
        persistedRun = run
    }

    steamReviews, err := u.steamClient.GetReviews(appID, limit, language)
    if err != nil {
        _ = u.markRunFailed(ctx, persistedRun, 0, err)
        return nil, err
    }

    insight, err := u.AnalyzeReviews(ctx, reviews)
    if err != nil {
        _ = u.markRunFailed(ctx, persistedRun, len(reviews), err)
        return nil, err
    }

    if err := u.completeRun(ctx, persistedRun, insight); err != nil {
        return nil, err
    }

    return insight, nil
}

func (u *AnalyzeUseCase) completeRun(ctx context.Context, run *model.AnalysisRun, insight *model.Insight) error {
    report := model.StructuredInsightFromLegacy(insight)

    if err := u.analysisRepo.CompleteRun(ctx, model.CompleteAnalysisRunInput{
        RunID:       run.ID,
        ReviewCount: insight.ReviewCount,
        Insight:     insight,
        Report:      report,
        ModelName:   u.aiClient.StandardModelName(),
    }); err != nil {
        return fmt.Errorf("failed to save analysis result: %w", err)
    }

    return nil
}`,
    },
    {
        key: 'usecase-analyze-v2',
        sectionKey: 'usecase',
        path: 'internal/review/usecase/analyze_v2.go',
        title: 'Advanced async orchestration and comparison flow',
        description:
            'The Advanced path queues work immediately, then runs a background pipeline that snapshots reviews, tracks progress by stage, stores structured insight items, and later supports history and run-to-run comparison.',
        language: 'go',
        highlights: ['RequestSteamAnalysis queue', 'stage-based progress updates', 'AdvancedModelName persistence'],
        code: `func (u *AnalyzeUseCase) RequestSteamAnalysis(ctx context.Context, appID string, limit int, language string) (*model.AnalysisRunQueued, error) {
    run, err := u.prepareAnalysisRun(ctx, appID, limit, language)
    if err != nil {
        return nil, err
    }

    go u.runSteamAnalysis(context.WithoutCancel(ctx), run.ID, appID, limit, language)

    return &model.AnalysisRunQueued{
        RunID:           run.ID,
        Status:          model.AnalysisStatusPending,
        CurrentStage:    model.AnalysisStageQueued,
        ProgressPercent: 0,
    }, nil
}

func (u *AnalyzeUseCase) runSteamAnalysis(ctx context.Context, runID string, appID string, limit int, language string) {
    _ = u.analysisRepo.StartRun(ctx, runID)
    _ = u.analysisRepo.UpdateRunProgress(ctx, model.UpdateAnalysisRunProgressInput{
        RunID: runID, Stage: model.AnalysisStageFetchingReviews, ProgressPercent: 15,
    })

    rawReviews, err := u.steamClient.GetReviews(appID, limit, language)
    if err != nil {
        _ = u.analysisRepo.MarkFailed(ctx, model.FailAnalysisRunInput{RunID: runID, ErrorMessage: err.Error()})
        return
    }

    snapshots, reviewTexts := toSnapshots(runID, rawReviews)
    _ = u.analysisRepo.SaveReviewSnapshots(ctx, runID, snapshots)

    report, err := u.aiClient.AnalyzeReviewsDetailed(reviewTexts)
    if err != nil {
        _ = u.analysisRepo.MarkFailed(ctx, model.FailAnalysisRunInput{RunID: runID, ReviewCount: len(reviewTexts), ErrorMessage: err.Error()})
        return
    }

    report = sanitizeStructuredInsight(report, reviewTexts)
    _ = u.analysisRepo.CompleteRun(ctx, model.CompleteAnalysisRunInput{
        RunID:       runID,
        ReviewCount: len(reviewTexts),
        Report:      report,
        ModelName:   u.aiClient.AdvancedModelName(),
    })
}`,
    },
    {
        key: 'steam-client',
        sectionKey: 'integration',
        path: 'internal/review/client/steam/steam.go',
        title: 'Steam review and game-detail client',
        description:
            'The Steam client now does more than fetch review bodies. It also pulls title, cover image, genres, and release year so those values can be stored before the run completes.',
        language: 'go',
        highlights: ['GetReviews', 'GetGameDetails', 'metadata enrichment'],
        code: `func (c ClientSteam) GetReviews(appID string, limit int, language string) ([]model.ReviewSteam, error) {
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

    var data model.ResponseSteam
    if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
        return nil, fmt.Errorf("failed to decode steam response: %w", err)
    }

    return data.Reviews, nil
}

func (c ClientSteam) GetGameDetails(appID string) (*model.SteamGameDetails, error) {
    url := fmt.Sprintf(
        "https://store.steampowered.com/api/appdetails?appids=%s&l=english",
        appID,
    )

    resp, err := c.httpClient.Get(url)
    if err != nil {
        return nil, fmt.Errorf("failed to fetch steam game details: %w", err)
    }

    details := &model.SteamGameDetails{
        AppID:       appID,
        Title:       title,
        CoverURL:    strings.TrimSpace(entry.Data.HeaderImage),
        Genre:       joinGenres(entry.Data.Genres),
        ReleaseYear: parseReleaseYear(entry.Data.ReleaseDate.Date),
    }

    return details, nil
}`,
    },
    {
        key: 'prompt-review',
        sectionKey: 'integration',
        path: 'internal/prompt/review_prompt.go',
        title: 'Structured JSON prompt for Ollama',
        description:
            'The backend now keeps two prompt families: a compact Standard JSON contract and a stricter Advanced contract that intentionally asks for fewer items and exactly one evidence quote per item to reduce truncation risk.',
        language: 'go',
        highlights: ['strict JSON output', 'compact v2 contract', 'retry prompts'],
        code: `func BuildReviewAnalysisPromptV2(reviews []string) string {
    var reviewLines []string
    for i, review := range reviews {
        reviewLines = append(reviewLines, fmt.Sprintf("%d. %s", i+1, review))
    }

    return fmt.Sprintf("You are a game review intelligence AI.\\n\\n"+
        "Analyze the player reviews and return ONLY valid JSON.\\n"+
        "Rules:\\n"+
        "- Return JSON only. Do not write headings, bullet points, explanations, or markdown.\\n"+
        "- Extract up to 4 praises, up to 4 issues, and up to 5 topics.\\n"+
        "- Each item should include exactly 1 evidence entry whenever the reviews support that item.\\n"+
        "- Keep the JSON compact and avoid redundant items.\\n"+
        "- If a category has no strong signals, return an empty array instead of filler items.\\n\\n"+
        "Reviews:\\n%s\\n",
        strings.Join(reviewLines, "\\n"),
    )
}

func BuildReviewAnalysisPromptV2Retry(reviews []string) string {
    return BuildReviewAnalysisPromptV2(reviews) + "\\n\\n"+
        "Important:\\n"+
        "- The previous attempt returned invalid or incomplete JSON.\\n"+
        "- Retry from scratch.\\n"+
        "- Return one complete JSON object only.\\n"
}`,
    },
    {
        key: 'ai-schema',
        sectionKey: 'integration',
        path: 'internal/review/client/ai/schema.go',
        title: 'JSON schemas and Ollama output budgets',
        description:
            'The AI layer now treats output control as code: Standard and Advanced each have their own JSON schema and generation budget, which keeps v2 compact enough to avoid truncation.',
        language: 'go',
        highlights: ['legacyInsightSchema', 'structuredInsightSchema', 'mode-specific num_predict'],
        code: `func legacyInsightSchema() map[string]any {
    return map[string]any{
        "type": "object",
        "properties": map[string]any{
            "praised_features": map[string]any{"type": "array", "maxItems": 5},
            "common_issues":    map[string]any{"type": "array", "maxItems": 5},
            "topics":           map[string]any{"type": "array", "maxItems": 6},
            "sentiment":        map[string]any{"type": "object"},
            "summary":          map[string]any{"type": "string", "maxLength": 600},
        },
    }
}

func structuredInsightSchema() map[string]any {
    return map[string]any{
        "type": "object",
        "properties": map[string]any{
            "summary":   map[string]any{"type": "string", "maxLength": 700},
            "sentiment": map[string]any{"type": "object"},
            "praises":   map[string]any{"type": "array", "maxItems": 4},
            "issues":    map[string]any{"type": "array", "maxItems": 4},
            "topics":    map[string]any{"type": "array", "maxItems": 5},
        },
    }
}

func standardOllamaOptions(retry bool) map[string]any { /* num_predict: 1024 -> 1536 */ }
func advancedOllamaOptions(retry bool) map[string]any { /* num_predict: 1536 -> 3072 */ }`,
    },
    {
        key: 'ai-ollama',
        sectionKey: 'integration',
        path: 'internal/review/client/ai/ollama.go',
        title: 'Ollama client with split Standard/Advanced models',
        description:
            'The AI adapter now uses separate model names and output budgets for Standard vs Advanced analysis. It also retries malformed JSON with a stricter prompt and schema-backed request format.',
        language: 'go',
        highlights: ['schema-backed format', 'StandardModelName / AdvancedModelName', 'retry with larger num_predict'],
        code: `func (o OllamaClient) AnalyzeReviews(reviews []string) (*model.Insight, error) {
    reqBody := o.newJSONGenerateRequest(
        o.StandardModelName(),
        prompt.BuildReviewAnalysisPrompt(reviews),
        legacyInsightSchema(),
        standardOllamaOptions(false),
    )

    cleaned, err := o.generateJSON(reqBody)
    if err != nil {
        return nil, err
    }

    insight, parseErr := parseLegacyInsight(cleaned)
    if parseErr == nil {
        return insight, nil
    }

    retryBody := o.newJSONGenerateRequest(
        o.StandardModelName(),
        prompt.BuildReviewAnalysisRetryPrompt(reviews),
        legacyInsightSchema(),
        standardOllamaOptions(true),
    )

    retried, retryErr := o.generateJSON(retryBody)
    if retryErr != nil {
        return nil, parseErr
    }

    return parseLegacyInsight(retried)
}

func (o OllamaClient) AnalyzeReviewsDetailed(reviews []string) (*model.StructuredInsight, error) {
    reqBody := o.newJSONGenerateRequest(
        o.AdvancedModelName(),
        prompt.BuildReviewAnalysisPromptV2(reviews),
        structuredInsightSchema(),
        advancedOllamaOptions(false),
    )

    retryBody := o.newJSONGenerateRequest(
        o.AdvancedModelName(),
        prompt.BuildReviewAnalysisPromptV2Retry(reviews),
        structuredInsightSchema(),
        advancedOllamaOptions(true),
    )

    // first parse attempt, then retry with a larger output budget if needed
}

func (o OllamaClient) StandardModelName() string {
    if modelName := strings.TrimSpace(o.StandardModel); modelName != "" {
        return modelName
    }
    return strings.TrimSpace(o.Model)
}

func (o OllamaClient) AdvancedModelName() string {
    if modelName := strings.TrimSpace(o.AdvancedModel); modelName != "" {
        return modelName
    }
    return strings.TrimSpace(o.Model)
}`,
    },
    {
        key: 'platform-mysql',
        sectionKey: 'persistence',
        path: 'internal/platform/database/mysql/mysql.go',
        title: 'MySQL client bootstrap and health checks',
        description:
            'This concrete adapter shows how the backend manages sql.DB pooling and health checks when DATABASE_DRIVER=mysql. A matching Postgres adapter exists with the same shape.',
        language: 'go',
        highlights: ['sql.DB setup', 'pool sizing', 'ping health check'],
        code: `type Client struct {
    db                 *sql.DB
    healthCheckTimeout time.Duration
}

func New(ctx context.Context, cfg config.Config) (*Client, error) {
    if cfg.DatabaseURL == "" {
        return nil, nil
    }

    db, err := sql.Open(config.DatabaseDriverMySQL, cfg.DatabaseURL)
    if err != nil {
        return nil, fmt.Errorf("failed to open mysql connection: %w", err)
    }

    if cfg.DatabaseMaxConns > 0 {
        db.SetMaxOpenConns(cfg.DatabaseMaxConns)
    }

    client := &Client{
        db:                 db,
        healthCheckTimeout: time.Duration(cfg.DatabaseHealthTimeoutSec) * time.Second,
    }

    if err := client.CheckHealth(ctx); err != nil {
        _ = db.Close()
        return nil, fmt.Errorf("failed to connect to mysql: %w", err)
    }

    return client, nil
}`,
    },
    {
        key: 'repo-mysql-game',
        sectionKey: 'persistence',
        path: 'internal/review/repository/mysql/game_repository.go',
        title: 'Game upsert repository',
        description:
            'Before a run is created, the backend persists the Steam game itself so repeated analyses can share one canonical game record.',
        language: 'go',
        highlights: ['UpsertBySteamAppID', 'Steam app uniqueness', 'title preservation'],
        code: `func (r *GameRepository) UpsertBySteamAppID(ctx context.Context, input model.GameUpsertInput) (*model.Game, error) {
    if r == nil || r.db == nil {
        return nil, fmt.Errorf("game repository is not configured")
    }

    gameID, err := platformuuid.NewString()
    if err != nil {
        return nil, fmt.Errorf("generate game id: %w", err)
    }

    _, err = r.db.ExecContext(ctx, "... insert into games ... on duplicate key update ...",
        gameID,
        input.SteamAppID,
        input.Title,
        input.CoverURL,
        input.Genre,
        input.ReleaseYear,
        input.PreferExistingTitle,
    )
    if err != nil {
        return nil, fmt.Errorf("upsert game by steam_app_id: %w", err)
    }

    return r.findBySteamAppID(ctx, input.SteamAppID)
}`,
    },
    {
        key: 'repo-mysql-analysis',
        sectionKey: 'persistence',
        path: 'internal/review/repository/mysql/analysis_repository.go',
        title: 'Analysis run lifecycle repository',
        description:
            'The repository now owns the full run lifecycle: create the run, update progress, persist snapshots, save structured insight items transactionally, and later serve run detail, evidence, and history queries.',
        language: 'go',
        highlights: ['progress + snapshots', 'CompleteRun transaction', 'detail/history/evidence queries'],
        code: `func (r *AnalysisRepository) CreateRun(ctx context.Context, input model.CreateAnalysisRunInput) (*model.AnalysisRun, error) {
    runID, err := platformuuid.NewString()
    if err != nil {
        return nil, fmt.Errorf("generate analysis run id: %w", err)
    }

    _, err = r.db.ExecContext(ctx, "... insert into analysis_runs ...", runID, input.GameID, input.ReviewLimit, input.Language)
    if err != nil {
        return nil, fmt.Errorf("create analysis run: %w", err)
    }

    return &model.AnalysisRun{ID: runID, GameID: input.GameID}, nil
}

func (r *AnalysisRepository) UpdateRunProgress(ctx context.Context, input model.UpdateAnalysisRunProgressInput) error {
    _, err := r.db.ExecContext(ctx, "... update analysis_runs set current_stage = ?, progress_percent = ? ...", input.Stage, input.ProgressPercent, input.RunID)
    if err != nil {
        return fmt.Errorf("update analysis run progress: %w", err)
    }
    return nil
}

func (r *AnalysisRepository) SaveReviewSnapshots(ctx context.Context, runID string, reviews []model.ReviewSnapshot) error {
    tx, err := r.db.BeginTx(ctx, nil)
    if err != nil {
        return fmt.Errorf("begin save review snapshots transaction: %w", err)
    }
    defer func() { _ = tx.Rollback() }()

    for _, review := range reviews {
        _, err := tx.ExecContext(ctx, "... insert into review_snapshots ... on duplicate key update ...")
        if err != nil {
            return fmt.Errorf("save review snapshot: %w", err)
        }
    }

    return tx.Commit()
}

func (r *AnalysisRepository) CompleteRun(ctx context.Context, input model.CompleteAnalysisRunInput) error {
    tx, err := r.db.BeginTx(ctx, nil)
    if err != nil {
        return fmt.Errorf("begin complete analysis run transaction: %w", err)
    }
    defer func() { _ = tx.Rollback() }()

    report := normalizeStructuredReport(input)
    if err := saveAnalysisResult(ctx, tx, input, report); err != nil {
        return err
    }
    if err := replaceInsightItems(ctx, tx, input.RunID, report); err != nil {
        return err
    }

    if _, err := tx.ExecContext(ctx, "... mark analysis run as success ...", input.ReviewCount, input.RunID); err != nil {
        return fmt.Errorf("mark analysis run as success: %w", err)
    }

    return tx.Commit()
}

func (r *AnalysisRepository) GetRunDetail(ctx context.Context, runID string) (*model.AnalysisRunDetail, error) {
    // joins analysis_runs + games + analysis_results and hydrates overview plus item evidence
}

func (r *AnalysisRepository) ListHistoryByAppID(ctx context.Context, appID string, limit int) (*model.GameHistory, error) {
    // returns prior runs for compare/history UI
}`,
    },
    {
        key: 'migrate-main',
        sectionKey: 'migration',
        path: 'cmd/migrate/main.go',
        title: 'Migration CLI for MySQL and Postgres',
        description:
            'A new dedicated command handles migration lifecycle tasks and automatically points to the correct folder depending on the active database driver.',
        language: 'go',
        highlights: ['up/down/goto/force/version', 'driver normalization', 'folder selection'],
        code: `func main() {
    cfg := config.Load()
    if cfg.DatabaseURL == "" {
        log.Fatal("DATABASE_URL is required to run migrations")
    }

    m, err := newMigrator(cfg.DatabaseDriver, cfg.DatabaseURL)
    if err != nil {
        log.Fatalf("failed to initialize migrator: %v", err)
    }
    defer closeMigrator(m)

    message, err := run(m, os.Args[1], os.Args[2:])
    if err != nil {
        log.Fatal(err)
    }

    if message != "" {
        fmt.Println(message)
    }
}

func newMigrator(databaseDriver string, databaseURL string) (*migrate.Migrate, error) {
    driverName, err := normalizeMigrationDriver(databaseDriver)
    if err != nil {
        return nil, err
    }

    migrationsDir := filepath.Join("db", "migrations", "postgres")
    if driverName == config.DatabaseDriverMySQL {
        migrationsDir = filepath.Join("db", "migrations", "mysql")
    }

    return migrate.New(sourceURL, databaseURL)
}`,
    },
    {
        key: 'mysql-init-schema',
        sectionKey: 'migration',
        path: 'db/migrations/mysql/000001_init_schema.up.sql',
        title: 'Initial MySQL schema for games and legacy analysis storage',
        description:
            'The first migration establishes the core relational model: games, analysis runs, and analysis results, with integrity checks around titles, statuses, sentiment counters, and non-empty summaries.',
        language: 'sql',
        highlights: ['base relational model', 'status + summary constraints', 'raw_ai_response support'],
        code: `create table if not exists games (
  id char(36) not null primary key,
  steam_app_id varchar(50) not null,
  title varchar(255) not null,
  cover_url text null,
  genre varchar(255) null,
  release_year int null,
  created_at datetime(6) not null default current_timestamp(6),
  updated_at datetime(6) not null default current_timestamp(6) on update current_timestamp(6),
  constraint uq_games_steam_app_id unique (steam_app_id)
);

create table if not exists analysis_runs (
  id char(36) not null primary key,
  game_id char(36) not null,
  review_limit int not null default 30,
  language varchar(50) not null default 'english',
  review_count int not null default 0,
  status enum('pending', 'success', 'failed') not null default 'pending',
  requested_at datetime(6) not null default current_timestamp(6),
  completed_at datetime(6) null,
  error_message text null
);

create table if not exists analysis_results (
  id char(36) not null primary key,
  analysis_run_id char(36) not null,
  summary text not null,
  praised_features json not null,
  common_issues json not null,
  topics json not null,
  sentiment_positive int not null default 0,
  sentiment_neutral int not null default 0,
  sentiment_negative int not null default 0,
  model_name varchar(100) null,
  raw_ai_response json null,
  constraint chk_analysis_results_summary_not_blank check (trim(summary) <> '')
);`,
    },
    {
        key: 'mysql-analysis-v2',
        sectionKey: 'migration',
        path: 'db/migrations/mysql/000003_analysis_v2.up.sql',
        title: 'MySQL v2 schema for async progress and evidence',
        description:
            'The v2 migration adds progress tracking to runs plus new tables for review snapshots, structured insight items, and per-item evidence, which is what powers Advanced history and compare on the frontend.',
        language: 'sql',
        highlights: ['current_stage + progress_percent', 'review_snapshots', 'analysis_insight_items + evidence'],
        code: `alter table analysis_runs
  add column current_stage varchar(50) not null default 'queued',
  add column progress_percent int not null default 0,
  add column started_at datetime(6) null;

create table if not exists review_snapshots (
  id char(36) not null primary key,
  analysis_run_id char(36) not null,
  review_index int not null,
  review_text text not null,
  voted_up boolean not null,
  language varchar(50) not null,
  constraint uq_review_snapshots_run_review_index unique (analysis_run_id, review_index)
);

create table if not exists analysis_insight_items (
  id char(36) not null primary key,
  analysis_run_id char(36) not null,
  kind varchar(20) not null,
  label varchar(120) not null,
  summary text not null,
  severity int null,
  confidence decimal(4,3) not null default 0.5,
  evidence_count int not null default 0,
  sort_order int not null default 0,
  constraint uq_analysis_insight_items_run_kind_label unique (analysis_run_id, kind, label)
);

create table if not exists analysis_item_evidence (
  id char(36) not null primary key,
  insight_item_id char(36) not null,
  review_snapshot_id char(36) not null,
  quote text not null,
  confidence decimal(4,3) not null default 0.5,
  constraint uq_analysis_item_evidence_item_review unique (insight_item_id, review_snapshot_id)
);`,
    },
];
