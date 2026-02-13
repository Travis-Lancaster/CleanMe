// appState.js
export const WorkMode = {
	ONLINE: 'online',   // UI <-> API
	OFFLINE: 'offline'  // UI <-> Dexie
};

// You can store this in localStorage or a small Dexie table
let currentMode = localStorage.getItem('app_mode') || WorkMode.ONLINE;

export const getMode = () => currentMode;
export const setMode = (mode: string) => {
	currentMode = mode;
	localStorage.setItem('app_mode', mode);
};
