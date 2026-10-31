# Advance Analyzer v2 — Clean Phase 5A

No built-in exams, tiers, subjects or demo mocks. Start in Settings → Manage target exams → Add exam.

This version uses IndexedDB `advance_analyzer_v2_clean_phase5a` and isolated localStorage keys. On first launch, it PERMANENTLY DELETES the previous v2 database `advance_analyzer_v2_isolated` on the same browser origin. It does NOT delete v1. This clean project stores new records in `advance_analyzer_v2_clean_phase5a`.

Install: `npm install` then `npm run dev`. Build: `npm run build`. On Windows PowerShell use `npm.cmd install`, `npm.cmd run dev`, and `npm.cmd run build` if needed.

IMPORTANT: Export any backup you need BEFORE running this version. Deletion happens automatically once on first launch, on the same browser origin. This cannot delete data stored on a different origin or browser profile.

Files in src: main.tsx, style.css, db.ts, ExamManager.tsx, AnalyticsPlus.tsx, PerformanceInsights.tsx.
