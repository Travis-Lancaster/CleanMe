export const logger = {
	info: (msg: string, data?: any) => console.log(`%c[SYNC-INFO]: ${msg}`, "color: #00ff00", data || ""),
	error: (msg: string, err?: any) => console.error(`[SYNC-ERROR]: ${msg}`, err || ""),
	debug: (msg: string, data?: any) => console.debug(`[SYNC-DEBUG]: ${msg}`, data || ""),
};
