---

# 🎨 FRONTEND README (`work-order-desk-web`)

```md
# Work Order Desk Web

Frontend application for the Work Order Desk system.

Built with:
- React
- TypeScript
- Vite
- React Query

---

## 🧱 Architecture

The project follows a feature-based structure:

- **ui/**
  - Pages and presentational components

- **features/**
  - Feature logic (hooks, API calls)

- **domain/**
  - Type definitions and domain models

- **infra/**
  - HTTP client and external integrations

---

## ⚙️ Tech Stack

- React
- TypeScript
- Vite
- @tanstack/react-query

---

## 🚀 Running Locally

```bash
npm install
npm run dev
```

## Commit Message Convention

This project follows a simplified Conventional Commits format:

```

type(scope): short summary

```

### Eamples

```

chore: initialize solution and EF setup
feat(workorders): add WorkOrder domain model
feat(api): add create work order endpoint
fix(infrastructure): correct DbContext configuration
refactor(application): extract validation logic
docs: update README with architecture overview
test(domain): add WorkOrder validation tests

```

## CHANGELOG Policy

This project maintains a manual `CAHNGELOG.md`

Each merge request must:

1. Include a small entry in the Unreleased section
2. Following this format

```

## [Unreleased]

### Added

- WorkOrder domain model
- CreateWorkOrder endpoint

### Changed

- Refactored validation logic

### Fixed

- Corrected SQLite migration error

```

When preparing a release, `unreleased` becomes a version:

```

## [0.1.0] - 2026-02-23

### Added

- Initial layered architecture
- EF Core setup with SQLite
- Health endpoint

```

## Versioning Strategy

We follow Semantic **rsioning (SemVer)**

MAJOR.MINOR.PATCH

```

```
