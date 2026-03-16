const repoTree = `ai-game-review-analyzer/
  cmd/
    main.go

  config/
    config.go

  internal/
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

      delivery/
        http/
          error_mapper.go
          handler.go
          handler_test.go
          middleware.go
          mock_handle_test.go
          new.go
          response.go
          response_test.go
          routes.go

      model/
        insight.go
        review.go
        steam.go

      usecase/
        analyze.go
        new.go
`;

function RepoStructure() {
    return (
        <div
            className="repo-structure"
            style={{
                background: 'rgba(15,23,42,0.72)',
                border: '1px solid rgba(148,163,184,0.12)',
                borderRadius: 20,
                padding: 24,
                boxShadow: '0 18px 48px rgba(2,6,23,0.18)',
            }}
        >
            <h3
                style={{
                    margin: 0,
                    color: '#f8fafc',
                    fontSize: 22,
                    fontWeight: 700,
                }}
            >
                Backend Architecture
            </h3>

            <pre
                style={{
                    margin: '18px 0 0',
                    padding: 20,
                    borderRadius: 18,
                    border: '1px solid rgba(148,163,184,0.10)',
                    background: '#020617',
                    color: '#cbd5e1',
                    fontSize: 14,
                    lineHeight: 1.8,
                    overflowX: 'auto',
                    fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace',
                }}
            >{repoTree}</pre>
        </div>
    );
}

export default RepoStructure;
