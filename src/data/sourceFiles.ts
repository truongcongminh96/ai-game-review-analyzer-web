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
      postgres/
        000001_init_schema.up.sql
        000002_remove_analysis_run_genre.up.sql

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
          ollama.go
        steam/
          client.go
          new.go
          steam.go

      delivery/http/
        error_mapper.go
        handler.go
        middleware.go
        new.go
        response.go
        routes.go

      model/
        analysis.go
        game.go
        insight.go
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
        new.go
        repository.go`;

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
        description: 'Request decoding, health responses, and transport-layer contracts.',
        badge: 'Layer 2',
        fileKeys: ['http-new', 'handler'],
    },
    {
        key: 'usecase',
        title: 'Use Case Orchestration',
        description: 'Business logic that validates input, coordinates clients, and manages analysis runs.',
        badge: 'Layer 3',
        fileKeys: ['usecase-new', 'usecase-repository', 'usecase-analyze'],
    },
    {
        key: 'integration',
        title: 'External Integrations',
        description: 'Steam review fetch, prompt shaping, and Ollama inference.',
        badge: 'Layer 4',
        fileKeys: ['steam-client', 'prompt-review', 'ai-ollama'],
    },
    {
        key: 'persistence',
        title: 'Persistence Adapters',
        description: 'Database client bootstrap plus repositories for games and analysis runs.',
        badge: 'Layer 5',
        fileKeys: ['platform-mysql', 'repo-mysql-game', 'repo-mysql-analysis'],
    },
    {
        key: 'migration',
        title: 'Migration & Schema',
        description: 'Migration CLI and the schema that stores games, runs, and analysis results.',
        badge: 'Layer 6',
        fileKeys: ['migrate-main', 'mysql-init-schema'],
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
            'Configuration now supports DATABASE_* variables, legacy Supabase/MySQL compatibility, and automatic driver detection from the connection string.',
        language: 'go',
        highlights: ['DATABASE_DRIVER inference', 'legacy env compatibility', 'pool sizing config'],
        code: `type Config struct {
    ServerPort               string
    OllamaBaseURL            string
    OllamaModel              string
    OllamaTimeoutSec         int
    DatabaseDriver           string
    DatabaseURL              string
    DatabaseMaxConns         int
    DatabaseMinConns         int
    DatabaseHealthTimeoutSec int
}

func Load() Config {
    databaseDriver := resolveDatabaseDriver()

    return Config{
        ServerPort:               getEnv("SERVER_PORT", "8080"),
        OllamaBaseURL:            getEnv("OLLAMA_BASE_URL", "http://localhost:11434"),
        OllamaModel:              getEnv("OLLAMA_MODEL", "llama3.2:3b"),
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
            'The delivery layer now expects context-aware use case methods and can optionally expose database health via a shared interface.',
        language: 'go',
        highlights: ['context-aware contract', 'optional health checker', 'transport isolation'],
        code: `type AnalyzeUseCase interface {
    AnalyzeReviews(ctx context.Context, reviews []string) (*model.Insight, error)
    AnalyzeSteamReviews(ctx context.Context, appID string, limit int, language string) (*model.Insight, error)
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
        key: 'handler',
        sectionKey: 'delivery',
        path: 'internal/review/delivery/http/handler.go',
        title: 'Health, manual analyze, and Steam analyze handlers',
        description:
            'Health responses now report database status, while both analysis endpoints forward the incoming request context to the use case.',
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
        highlights: ['GameRepository', 'AnalysisRepository', 'clean architecture boundary'],
        code: `type GameRepository interface {
    UpsertBySteamAppID(ctx context.Context, input model.GameUpsertInput) (*model.Game, error)
}

type AnalysisRepository interface {
    CreateRun(ctx context.Context, input model.CreateAnalysisRunInput) (*model.AnalysisRun, error)
    CompleteRun(ctx context.Context, input model.CompleteAnalysisRunInput) error
    MarkFailed(ctx context.Context, input model.FailAnalysisRunInput) error
}`,
    },
    {
        key: 'usecase-analyze',
        sectionKey: 'usecase',
        path: 'internal/review/usecase/analyze.go',
        title: 'Review orchestration with persistence hooks',
        description:
            'This is the biggest change in the new backend: the flow can create a pending analysis run, enrich game metadata from Steam, and persist success or failure around the AI call.',
        language: 'go',
        highlights: ['prepareAnalysisRun', 'markRunFailed', 'completeRun'],
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

func (u *AnalyzeUseCase) prepareAnalysisRun(ctx context.Context, appID string, limit int, language string) (*model.AnalysisRun, error) {
    gameInput := buildGameUpsertInput(appID)

    details, err := u.steamClient.GetGameDetails(appID)
    if err == nil && details != nil {
        gameInput = applyGameDetails(gameInput, details)
    }

    game, err := u.gameRepo.UpsertBySteamAppID(ctx, gameInput)
    if err != nil {
        return nil, fmt.Errorf("failed to upsert game: %w", err)
    }

    return u.analysisRepo.CreateRun(ctx, model.CreateAnalysisRunInput{
        GameID:      game.ID,
        ReviewLimit: limit,
        Language:    language,
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
            'The prompt contract stays strict so the backend can safely parse the model output and persist structured insights.',
        language: 'go',
        highlights: ['strict JSON output', 'topic extraction rules', 'summary instructions'],
        code: `func BuildReviewAnalysisPrompt(reviews []string) string {
    var reviewLines []string
    for i, review := range reviews {
        reviewLines = append(reviewLines, fmt.Sprintf("%d. %s", i+1, review))
    }

    return fmt.Sprintf("You are a game analytics AI.\\n\\n"+
        "Analyze the following player reviews and return ONLY valid JSON.\\n"+
        "Do not add markdown.\\n"+
        "Rules:\\n"+
        "- Count sentiment across all reviews.\\n"+
        "- Extract up to 5 praised features.\\n"+
        "- Extract up to 5 common issues.\\n"+
        "- Extract up to 6 key topics.\\n"+
        "- Write a professional 2-3 sentence summary.\\n\\n"+
        "Reviews:\\n%s\\n",
        strings.Join(reviewLines, "\\n"),
    )
}`,
    },
    {
        key: 'ai-ollama',
        sectionKey: 'integration',
        path: 'internal/review/client/ai/ollama.go',
        title: 'Ollama client and JSON cleanup',
        description:
            'The AI adapter still calls Ollama directly, but it now also exposes the active model name so successful runs can persist which model produced the insight.',
        language: 'go',
        highlights: ['POST /api/generate', 'cleanJSONText', 'ModelName exposure'],
        code: `func (o OllamaClient) AnalyzeReviews(reviews []string) (*model.Insight, error) {
    reqBody := ollamaGenerateRequest{
        Model:  o.Model,
        Prompt: prompt.BuildReviewAnalysisPrompt(reviews),
        Stream: false,
    }

    resp, err := o.Client.Post(o.BaseURL+"/api/generate", "application/json", bytes.NewBuffer(bodyBytes))
    if err != nil {
        return nil, fmt.Errorf("failed to call ollama: %w", err)
    }

    cleaned := cleanJSONText(ollamaResp.Response)

    var insight model.Insight
    if err := json.Unmarshal([]byte(cleaned), &insight); err != nil {
        return nil, fmt.Errorf("failed to parse insight JSON: %w, llm_output=%s", err, cleaned)
    }

    return &insight, nil
}

func (o OllamaClient) ModelName() string {
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
            'The persistence layer records pending runs, stores AI output transactionally, and marks failures with explicit review counts and error messages.',
        language: 'go',
        highlights: ['CreateRun', 'CompleteRun transaction', 'MarkFailed'],
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

func (r *AnalysisRepository) CompleteRun(ctx context.Context, input model.CompleteAnalysisRunInput) error {
    tx, err := r.db.BeginTx(ctx, nil)
    if err != nil {
        return fmt.Errorf("begin complete analysis run transaction: %w", err)
    }
    defer func() { _ = tx.Rollback() }()

    if err := saveAnalysisResult(ctx, tx, input); err != nil {
        return err
    }

    if _, err := tx.ExecContext(ctx, "... mark analysis run as success ...", input.ReviewCount, input.RunID); err != nil {
        return fmt.Errorf("mark analysis run as success: %w", err)
    }

    return tx.Commit()
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
        title: 'Initial MySQL schema for games and analysis runs',
        description:
            'The schema now stores game metadata, pending/completed analysis runs, and the final insight payload in dedicated tables. Postgres mirrors the same design.',
        language: 'sql',
        highlights: ['games table', 'analysis_runs lifecycle', 'analysis_results JSON payloads'],
        code: `create table if not exists games (
  id char(36) not null primary key,
  steam_app_id varchar(50) not null,
  title varchar(255) not null,
  cover_url text null,
  genre varchar(255) null,
  release_year int null,
  constraint uq_games_steam_app_id unique (steam_app_id)
);

create table if not exists analysis_runs (
  id char(36) not null primary key,
  game_id char(36) not null,
  review_limit int not null default 30,
  language varchar(50) not null default 'english',
  review_count int not null default 0,
  status enum('pending', 'success', 'failed') not null default 'pending',
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
  model_name varchar(100) null
);`,
    },
];
