1. Enterprise Folder Structure: src/data
This structure separates the "Local Database" (Dexie) from the "Sync Logic" and "Business Rules" (Zod).

Plaintext
src\data\
┃
┣━ 📂 database/             # API TypeScript Export from API (auto-generated)
┃  ┣━ 📜 Api.ts             # Apis
┃  ┣━ 📜 ApiRoute.ts        # Routes
┃  ┗━ 📜 data-contracts.ts  # All data contracts in database.
┃

┣━ 📂 db/                   # DEXIE CORE
┃  ┣━ 📜 schema.ts          # Dexie table definitions & indexes
┃  ┣━ 📜 connection.ts      # Singleton Dexie instance & versioning
┃  ┗━ 📜 migrations.ts      # Logic for upgrading local DB versions
┃
┣━ 📂 sync/                 # DEXIE-SYNCABLE & WORKERS
┃  ┣━ 📜 sync-protocol.ts   # WebSocket or AJAX sync implementation
┃  ┣━ 📜 sync-worker.ts     # Web Worker for background processing
┃  ┗━ 📜 conflict-rules.ts  # Logic for Last-Write-Wins or Manual Resolve
┃
┣━ 📂 domain/               # THE BUSINESS BRAIN (Zod & Logic)
┃  ┣━ 📂 geology/
┃  ┃  ┣━ 📜 geology.schema.ts # Zod schemas for the 80-field log
┃  ┃  ┣━ 📜 geology.repo.ts   # CRUD operations for Geology logs
┃  ┃  ┗━ 📜 geology.utils.ts  # Domain math (Volume, % calcs)
┃  ┣━ 📂 survey/
┃  ┃  ┣━ 📜 survey.schema.ts
┃  ┃  ┗━ 📜 survey.repo.ts   # Handles multi-source merge logic
┃  ┗━ 📜 base.repo.ts       # Shared Repo logic (Soft deletes, logging)
┃
┣━ 📂 hooks/                # REACT DATA BINDINGS
┃  ┣━ 📜 useLiveQuery.ts    # Re-export of dexie-react-hooks
┃  ┗━ 📜 useSyncStatus.ts   # Monitoring the sync worker state
┃
┗━ 📜 index.ts              # Clean export of the Data API
2. Folder & File Purpose Details
db/schema.ts & connection.ts
Purpose: Defines the IndexedDB structure.

Best Practice: In an offline mining app, indexes are your best friend. You should index collarId, depthFrom, and rowStatus to ensure the AG Grid stays fast even with 10,000+ rows.

SOLID: Separation of concerns—definitions stay in schema, instance management in connection.

sync/sync-worker.ts
Purpose: Offloads the heavy lifting of diffing and uploading data to a background thread.

UX Impact: This prevents the UI from stuttering while the laptop is trying to re-establish a handshake with the server.

domain/[feature]/[feature].schema.ts (Zod)
Purpose: The Source of Truth.

Why here? Zod schemas are used by the Repo to validate data before it hits Dexie and by the API client to ensure the server receives clean data.

DRY: One schema for the Form, the Grid, and the Database.

domain/[feature]/[feature].repo.ts
Purpose: Abstracting Dexie queries.

Pattern: Instead of calling db.geology.put() in your components, you call GeologyRepo.save(data).

Benefit: If you ever switch from Dexie to another DB (like DuckDB or SQLite-Wasm), you only change the Repository files.
