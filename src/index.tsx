// import { setupLoading } from "#src/plugins";
// import { TanstackQuery } from '#src/components';
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app";
import { setupI18n } from "./app/locales";
// import { setupI18n } from "#src/app/locales";
import { setupLoading } from "./app/plugins";
// import { setupLoading } from "./plugins/loading";
// import { registerServiceWorker } from "./utils/register-sw";
import "./app/styles/index.css";

// import { initializeSyncTriggers, scheduleBackgroundSync } from '#src/services/sync-service';

async function setupApp() {
	console.log("[INIT] 📍 Step 1 of 6: Starting app setup");

	/**
	 * Initialize internationalization, must be placed first. Loading refers to internationalization
	 */
	console.log("[INIT] 📍 Step 2 of 6: Setting up i18n");
	setupI18n();
	console.log("[INIT] ✅ Step 2 Complete: i18n ready");

	// App Loading
	console.log("[INIT] 📍 Step 3 of 6: Setting up loading animation");
	setupLoading();
	console.log("[INIT] ✅ Step 3 Complete: Loading ready");

	// Initialize offline-first sync system
	console.log("[INIT] 📍 Step 4 of 6: Initializing sync system");
	// initializeSyncTriggers();
	// scheduleBackgroundSync(30000); // Sync every 30 seconds when online
	console.log("[INIT] ✅ Step 4 Complete: Sync system initialized");

	// Register Service Worker for PWA
	console.log("[INIT] 📍 Step 5 of 6: Registering service worker");
	// registerServiceWorker();
	console.log("[INIT] ✅ Step 5 Complete: Service worker registered");

	console.log("[INIT] 📍 Step 6 of 6: Mounting React app");
	const rootElement = document.getElementById("root");
	if (!rootElement) {
		console.error("[INIT] ❌ Root element not found!");
		return;
	}
	const root = createRoot(
		rootElement,
	);

	root.render(
		// <StrictMode>
		// <TanstackQuery>
		<App />,
		// </TanstackQuery>,
		// </StrictMode>,
	);
	console.log("[INIT] ✅ Step 6 Complete: React app mounted");
	console.log("[INIT] 🎯 APP SETUP COMPLETE");
}

setupApp();
