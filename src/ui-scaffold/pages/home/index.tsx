// import {
// 	ApiOutlined,
// 	CheckCircleOutlined,
// 	ClearOutlined,
// 	CloseCircleOutlined,
// 	CloudOutlined,
// 	DatabaseOutlined,
// 	DeleteOutlined,
// 	DisconnectOutlined,
// 	DownloadOutlined,
// 	ExclamationCircleOutlined,
// 	InfoCircleOutlined,
// 	LinkOutlined,
// 	LoadingOutlined,
// 	PlayCircleOutlined,
// 	PoweroffOutlined,
// 	ReloadOutlined,
// 	SettingOutlined,
// 	StopOutlined,
// 	SyncOutlined,
// 	UnorderedListOutlined,
// 	WarningOutlined,
// } from "@ant-design/icons";
// import { Badge, Button, Card, Col, Descriptions, Divider, List, Modal, Progress, Row, Space, Statistic, Table, Tag, Tooltip, Typography, notification } from "antd";
// import {
// 	SYNC_URL,
// 	db,
// 	resetDatabase,
// 	useSelectedCollars,
// 	useSelectedPrograms,
// 	useSyncInfo,
// 	useSyncLifecycle,
// 	useSyncStatus,
// 	useSyncStore,
// 	useTriggerSync,
// } from "#src/data";
// import { useCallback, useEffect, useState } from "react";

// import type { SyncStatus } from "#src/data";
// import { formatDistanceToNow } from "date-fns";

// const { Title, Paragraph, Text } = Typography;

// // ============================================================================
// // STATUS CONFIGURATION
// // ============================================================================

// const statusConfig: Record<SyncStatus, {
// 	color: string
// 	badgeColor: string
// 	icon: React.ReactNode
// 	text: string
// 	description: string
// }> = {
// 	CONNECTED: {
// 		color: "success",
// 		badgeColor: "#52c41a",
// 		icon: <CheckCircleOutlined />,
// 		text: "Connected",
// 		description: "Sync is active and working",
// 	},
// 	CONNECTING: {
// 		color: "processing",
// 		badgeColor: "#1890ff",
// 		icon: <LoadingOutlined />,
// 		text: "Connecting...",
// 		description: "Establishing connection to sync server",
// 	},
// 	OFFLINE: {
// 		color: "default",
// 		badgeColor: "#8c8c8c",
// 		icon: <CloseCircleOutlined />,
// 		text: "Offline",
// 		description: "Not connected to sync server",
// 	},
// 	ERROR: {
// 		color: "error",
// 		badgeColor: "#f5222d",
// 		icon: <ExclamationCircleOutlined />,
// 		text: "Error",
// 		description: "Sync encountered an error",
// 	},
// 	UNAUTHORIZED: {
// 		color: "warning",
// 		badgeColor: "#faad14",
// 		icon: <ExclamationCircleOutlined />,
// 		text: "Unauthorized",
// 		description: "Authentication required for sync",
// 	},
// };

// // ============================================================================
// // STATUS CARDS
// // ============================================================================

// interface SyncStatusCardProps {
// 	status: SyncStatus
// 	lastSyncTime: Date | null
// 	error: string | null
// 	hasSelection: boolean
// 	selectedPrograms: number
// 	selectedCollars: number
// }

// function SyncStatusCard({ status, lastSyncTime, error, hasSelection, selectedPrograms, selectedCollars }: SyncStatusCardProps) {
// 	const config = statusConfig[status];

// 	return (
// 		<Card>
// 			<Space direction="vertical" size="small" style={{ width: "100%" }}>
// 				<Space>
// 					<Badge color={config.badgeColor} />
// 					<Text type="secondary">Sync Status</Text>
// 				</Space>

// 				<Space>
// 					<span style={{ fontSize: 24, color: config.badgeColor }}>{config.icon}</span>
// 					<Text strong style={{ fontSize: 18 }}>
// 						{config.text}
// 					</Text>
// 				</Space>

// 				<Text type="secondary" style={{ fontSize: 12 }}>
// 					{config.description}
// 				</Text>

// 				{lastSyncTime && (
// 					<Text type="secondary" style={{ fontSize: 12 }}>
// 						Last sync:
// 						{" "}
// 						{formatDistanceToNow(lastSyncTime, { addSuffix: true })}
// 					</Text>
// 				)}

// 				{error && (
// 					<Text type="danger" style={{ fontSize: 12 }}>
// 						Error:
// 						{" "}
// 						{error}
// 					</Text>
// 				)}

// 				<Divider style={{ margin: "8px 0" }} />

// 				<Space direction="vertical" size={2}>
// 					<Text type="secondary" style={{ fontSize: 11 }}>
// 						Offline Selection:
// 					</Text>
// 					<Text style={{ fontSize: 12 }}>
// 						{hasSelection
// 							? `${selectedPrograms} programs, ${selectedCollars} collars`
// 							: "Nothing selected for offline"}
// 					</Text>
// 				</Space>
// 			</Space>
// 		</Card>
// 	);
// }

// interface DatabaseStatusCardProps {
// 	isOpen: boolean
// 	isReady: boolean
// 	version: number
// 	tableCount: number
// }

// function DatabaseStatusCard({ isOpen, isReady, version, tableCount }: DatabaseStatusCardProps) {
// 	return (
// 		<Card>
// 			<Space direction="vertical" size="small" style={{ width: "100%" }}>
// 				<Space>
// 					<Badge color={isOpen ? "#52c41a" : "#8c8c8c"} />
// 					<Text type="secondary">Database</Text>
// 				</Space>

// 				<Space>
// 					<DatabaseOutlined style={{ fontSize: 24, color: isOpen ? "#52c41a" : "#8c8c8c" }} />
// 					<Text strong style={{ fontSize: 18 }}>
// 						{isOpen ? "Open" : "Closed"}
// 					</Text>
// 					{isReady && <CheckCircleOutlined style={{ color: "#52c41a" }} />}
// 				</Space>

// 				<Space direction="vertical" size={4} style={{ width: "100%" }}>
// 					<Space size="small">
// 						<Badge
// 							status={isReady ? "success" : "error"}
// 							text={isReady ? "Ready" : "Not Ready"}
// 						/>
// 					</Space>

// 					<Text type="secondary" style={{ fontSize: 12 }}>
// 						Schema Version:
// 						{" "}
// 						<strong>{version}</strong>
// 					</Text>

// 					<Text type="secondary" style={{ fontSize: 12 }}>
// 						Tables:
// 						{" "}
// 						<strong>{tableCount}</strong>
// 					</Text>
// 				</Space>
// 			</Space>
// 		</Card>
// 	);
// }

// interface StorageStatusCardProps {
// 	usage?: number
// 	quota?: number
// 	percentage?: number
// }

// function StorageStatusCard({ usage, quota, percentage }: StorageStatusCardProps) {
// 	const usageMB = usage ? (usage / 1024 / 1024).toFixed(2) : "0";
// 	const quotaMB = quota ? (quota / 1024 / 1024).toFixed(2) : "0";
// 	const pct = percentage || 0;

// 	const getStatus = (): "success" | "exception" | "normal" | "active" => {
// 		if (pct > 95)
// 			return "exception";
// 		if (pct > 80)
// 			return "active";
// 		return "normal";
// 	};

// 	const getStatusText = () => {
// 		if (pct > 95)
// 			return "Critical - Clean up data";
// 		if (pct > 80)
// 			return "Warning - Monitor usage";
// 		return "Healthy";
// 	};

// 	return (
// 		<Card>
// 			<Space direction="vertical" size="small" style={{ width: "100%" }}>
// 				<Space>
// 					<Badge color={pct > 80 ? "#faad14" : "#52c41a"} />
// 					<Text type="secondary">Storage</Text>
// 				</Space>

// 				<Text strong style={{ fontSize: 18 }}>
// 					{getStatusText()}
// 				</Text>

// 				<Progress
// 					percent={Math.round(pct)}
// 					status={getStatus()}
// 					strokeColor={pct > 80 ? "#faad14" : undefined}
// 					size="small"
// 				/>

// 				<Text type="secondary" style={{ fontSize: 12 }}>
// 					{usageMB}
// 					{" "}
// 					MB /
// 					{quotaMB}
// 					{" "}
// 					MB used
// 				</Text>
// 			</Space>
// 		</Card>
// 	);
// }

// // ============================================================================
// // DETAILED INFO PANEL
// // ============================================================================

// interface DetailedInfoPanelProps {
// 	syncInfo: ReturnType<typeof useSyncInfo>
// 	dbStatus: {
// 		isOpen: boolean
// 		isReady: boolean
// 		version: number
// 	}
// 	syncStore: ReturnType<typeof useSyncStore>
// }

// function DetailedInfoPanel({ syncInfo, dbStatus, syncStore }: DetailedInfoPanelProps) {
// 	const [syncNodes, setSyncNodes] = useState<string[]>([]);
// 	const [internalTables, setInternalTables] = useState<{ name: string, count: number }[]>([]);

// 	const refreshInternalInfo = useCallback(async () => {
// 		// Skip if database is not open
// 		if (!db.isOpen()) {
// 			setSyncNodes([]);
// 			setInternalTables([]);
// 			return;
// 		}

// 		try {
// 			// Get sync nodes
// 			const nodes = await db.syncable.list();
// 			setSyncNodes(nodes);

// 			// Get internal tables info
// 			const internal = [];
// 			try {
// 				const changes = await (db as any)._changes?.count() || 0;
// 				internal.push({ name: "_changes", count: changes });
// 			}
// 			catch (e) { /* ignore */ }

// 			try {
// 				const uncommitted = await (db as any)._uncommittedChanges?.count() || 0;
// 				internal.push({ name: "_uncommittedChanges", count: uncommitted });
// 			}
// 			catch (e) { /* ignore */ }

// 			try {
// 				const nodes = await (db as any)._syncNodes?.count() || 0;
// 				internal.push({ name: "_syncNodes", count: nodes });
// 			}
// 			catch (e) { /* ignore */ }

// 			setInternalTables(internal);
// 		}
// 		catch (error: any) {
// 			// Don't log DatabaseClosedError as it's expected during close/open cycles
// 			if (error.name === "DatabaseClosedError" || error.message?.includes("Database has been closed")) {
// 				setSyncNodes([]);
// 				setInternalTables([]);
// 			}
// 			else {
// 				console.error("[DASHBOARD] Error refreshing internal info:", error);
// 			}
// 		}
// 	}, []);

// 	useEffect(() => {
// 		refreshInternalInfo();
// 		const interval = setInterval(refreshInternalInfo, 3000);
// 		return () => clearInterval(interval);
// 	}, [refreshInternalInfo]);

// 	const syncItems = [
// 		{ label: "Status", value: syncInfo.status },
// 		{ label: "Online", value: syncInfo.isOnline ? "Yes" : "No" },
// 		{ label: "Has Error", value: syncInfo.hasError ? "Yes" : "No" },
// 		{ label: "Has Selection", value: syncInfo.hasSelection ? "Yes" : "No" },
// 		{ label: "Last Sync", value: syncInfo.lastSyncTime ? formatDistanceToNow(syncInfo.lastSyncTime, { addSuffix: true }) : "Never" },
// 		{ label: "Unsynced Changes", value: syncInfo.unsyncedCount.toString() },
// 		{ label: "Conflicts", value: syncInfo.conflictsCount.toString() },
// 		{ label: "Active Nodes", value: syncNodes.length.toString() },
// 	];

// 	const dbItems = [
// 		{ label: "State", value: dbStatus.isOpen ? "Open" : "Closed" },
// 		{ label: "Ready", value: dbStatus.isReady ? "Yes" : "No" },
// 		{ label: "Version", value: dbStatus.version.toString() },
// 		...internalTables.map(t => ({ label: t.name, value: t.count.toString() })),
// 	];

// 	return (
// 		<Row gutter={16}>
// 			<Col span={12}>
// 				<Card
// 					title={(
// 						<Space>
// 							<CloudOutlined />
// 							<span>Sync Details</span>
// 						</Space>
// 					)}
// 					size="small"
// 				>
// 					<Descriptions column={2} size="small">
// 						{syncItems.map(item => (
// 							<Descriptions.Item key={item.label} label={item.label}>
// 								<code>{item.value}</code>
// 							</Descriptions.Item>
// 						))}
// 					</Descriptions>
// 					<Divider style={{ margin: "8px 0" }} />
// 					<Text type="secondary" style={{ fontSize: 11 }}>
// 						Sync URL:
// 						{" "}
// 						<code style={{ fontSize: 10 }}>{SYNC_URL}</code>
// 					</Text>
// 				</Card>
// 			</Col>
// 			<Col span={12}>
// 				<Card
// 					title={(
// 						<Space>
// 							<DatabaseOutlined />
// 							<span>Database Details</span>
// 						</Space>
// 					)}
// 					size="small"
// 				>
// 					<Descriptions column={2} size="small">
// 						{dbItems.map(item => (
// 							<Descriptions.Item key={item.label} label={item.label}>
// 								<code>{item.value}</code>
// 							</Descriptions.Item>
// 						))}
// 					</Descriptions>
// 				</Card>
// 			</Col>
// 		</Row>
// 	);
// }

// // ============================================================================
// // CONTROL PANEL
// // ============================================================================

// interface ControlPanelProps {
// 	syncInfo: ReturnType<typeof useSyncInfo>
// 	onRefresh: () => void
// }

// function ControlPanel({ syncInfo, onRefresh }: ControlPanelProps) {
// 	const [isProcessing, setIsProcessing] = useState<string | null>(null);

// 	const triggerSync = useTriggerSync();
// 	const syncStore = useSyncStore();

// 	const withLoading = async (action: string, fn: () => Promise<void>) => {
// 		setIsProcessing(action);
// 		try {
// 			await fn();
// 		}
// 		finally {
// 			setIsProcessing(null);
// 			onRefresh();
// 		}
// 	};
// 	const handleStartSync = async () => {
// 		await withLoading("start", async () => {
// 			console.log("[DASHBOARD] Start Sync clicked");

// 			if (!db.isOpen()) {
// 				notification.warning({ message: "Database is closed", description: "Open the database first" });
// 				return;
// 			}

// 			// Force a reconnection by triggering the lifecycle
// 			syncStore.setSyncStatus("CONNECTING");

// 			// The useSyncLifecycle hook should pick this up and reconnect
// 			notification.success({
// 				message: "Sync Starting",
// 				description: "Sync lifecycle is attempting to connect...",
// 			});
// 		});
// 	};

// 	const handleStopSync = async () => {
// 		await withLoading("stop", async () => {
// 			console.log("[DASHBOARD] Stop Sync clicked");

// 			try {
// 				await db.syncable.disconnect(SYNC_URL);
// 				syncStore.setSyncStatus("OFFLINE");
// 				notification.success({ message: "Sync Stopped" });
// 			}
// 			catch (error: any) {
// 				notification.error({ message: "Failed to stop sync", description: error.message });
// 			}
// 		});
// 	};

// 	const handleResetSync = async () => {
// 		Modal.confirm({
// 			title: "Reset Sync State?",
// 			content: "This will clear sync nodes and reset the sync state. The sync lifecycle will attempt to reconnect automatically.",
// 			okText: "Reset",
// 			okType: "danger",
// 			onOk: async () => {
// 				await withLoading("reset", async () => {
// 					console.log("[DASHBOARD] Reset Sync clicked");

// 					try {
// 						// Disconnect first
// 						try { await db.syncable.disconnect(SYNC_URL); }
// 						catch (e) { /* ignore */ }

// 						// Clear sync nodes
// 						try { await (db as any)._syncNodes?.clear(); }
// 						catch (e) { /* ignore */ }

// 						// Reset store state
// 						syncStore.setSyncStatus("OFFLINE");
// 						syncStore.resetBadges();

// 						notification.success({
// 							message: "Sync Reset",
// 							description: "Sync state cleared. Refresh page or wait for auto-reconnect.",
// 						});
// 					}
// 					catch (error: any) {
// 						notification.error({ message: "Reset failed", description: error.message });
// 					}
// 				});
// 			},
// 		});
// 	};

// 	const handleConnect = async () => {
// 		await withLoading("connect", async () => {
// 			console.log("[DASHBOARD] Connect clicked");

// 			if (!db.isOpen()) {
// 				notification.warning({ message: "Database is closed", description: "Open the database first" });
// 				return;
// 			}

// 			try {
// 				syncStore.setSyncStatus("CONNECTING");
// 				notification.info({ message: "Connecting...", description: "Attempting to connect to sync server" });
// 			}
// 			catch (error: any) {
// 				notification.error({ message: "Connect failed", description: error.message });
// 			}
// 		});
// 	};

// 	const handleDisconnect = async () => {
// 		await withLoading("disconnect", async () => {
// 			console.log("[DASHBOARD] Disconnect clicked");

// 			try {
// 				await db.syncable.disconnect(SYNC_URL);
// 				syncStore.setSyncStatus("OFFLINE");
// 				notification.success({ message: "Disconnected" });
// 			}
// 			catch (error: any) {
// 				notification.error({ message: "Disconnect failed", description: error.message });
// 			}
// 		});
// 	};

// 	const handleSyncNow = async () => {
// 		await withLoading("sync", async () => {
// 			console.log("[DASHBOARD] Sync Now clicked");

// 			const result = await triggerSync();

// 			if (result.success) {
// 				notification.success({ message: "Sync Triggered", description: result.message });
// 			}
// 			else {
// 				notification.warning({ message: "Sync Not Triggered", description: result.message });
// 			}
// 		});
// 	};

// 	const handleListConnections = async () => {
// 		await withLoading("list", async () => {
// 			console.log("[DASHBOARD] List Connections clicked");

// 			try {
// 				const urls = await db.syncable.list();
// 				const syncNodesCount = await (db as any)._syncNodes?.count() || 0;

// 				Modal.info({
// 					title: `Sync Connections (${urls.length} active, ${syncNodesCount} nodes)`,
// 					content: (
// 						<div>
// 							<p><strong>Active URLs:</strong></p>
// 							{urls.length > 0
// 								? (
// 									urls.map(url => <div key={url}><code>{url}</code></div>)
// 								)
// 								: (
// 									<Text type="secondary">No active connections</Text>
// 								)}
// 							<Divider />
// 							<p><strong>Sync URL Config:</strong></p>
// 							<code>{SYNC_URL}</code>
// 						</div>
// 					),
// 				});
// 			}
// 			catch (error: any) {
// 				notification.error({ message: "Failed to list connections", description: error.message });
// 			}
// 		});
// 	};

// 	const handleOpenDB = async () => {
// 		await withLoading("openDB", async () => {
// 			console.log("[DASHBOARD] Open DB clicked");

// 			if (db.isOpen()) {
// 				notification.warning({ message: "Database already open" });
// 				return;
// 			}

// 			try {
// 				await db.open();
// 				notification.success({ message: "Database Opened" });
// 			}
// 			catch (error: any) {
// 				notification.error({ message: "Failed to open database", description: error.message });
// 			}
// 		});
// 	};

// 	const handleCloseDB = async () => {
// 		Modal.confirm({
// 			title: "Close Database?",
// 			content: "This will close the database connection and reset the database singleton. Any pending sync operations will be interrupted.",
// 			okText: "Close",
// 			okType: "danger",
// 			onOk: async () => {
// 				await withLoading("closeDB", async () => {
// 					console.log("[DASHBOARD] Close DB clicked - using resetDatabase()");

// 					try {
// 						// Disconnect sync first
// 						try { await db.syncable.disconnect(SYNC_URL); }
// 						catch (e) { /* ignore */ }

// 						// Use resetDatabase() to properly close AND reset the singleton
// 						// This ensures a fresh instance on next open
// 						await resetDatabase();
// 						syncStore.setSyncStatus("OFFLINE");
// 						notification.success({ message: "Database Closed" });
// 					}
// 					catch (error: any) {
// 						notification.error({ message: "Failed to close database", description: error.message });
// 					}
// 				});
// 			},
// 		});
// 	};

// 	const handleUseSyncLifecycle = async () => {
// 		await withLoading("lifecycle", async () => {
// 			console.log("[DASHBOARD] Reinitialize sync lifecycle");
// 			// The useSyncLifecycle hook is already running at the component level
// 			// This button just triggers a refresh of the dashboard
// 			onRefresh();
// 			notification.success({
// 				message: "Sync Lifecycle",
// 				description: "Sync lifecycle is active and monitoring",
// 			});
// 		});
// 	};
// 	const handleClearData = async () => {
// 		Modal.confirm({
// 			title: "DANGER: Clear All Local Data?",
// 			content: (
// 				<Space direction="vertical">
// 					<Text type="danger">This will permanently delete ALL local data:</Text>
// 					<ul>
// 						<li>All collars, drill plans, geology logs</li>
// 						<li>All surveys, samples, and other data</li>
// 						<li>Sync metadata and uncommitted changes</li>
// 					</ul>
// 					<Text strong type="danger">This action cannot be undone!</Text>
// 				</Space>
// 			),
// 			okText: "Clear All Data",
// 			okType: "danger",
// 			onOk: async () => {
// 				await withLoading("clear", async () => {
// 					console.log("[DASHBOARD] Clear Data clicked");

// 					try {
// 						await db.clearAll();
// 						notification.success({ message: "All Data Cleared" });
// 					}
// 					catch (error: any) {
// 						notification.error({ message: "Clear failed", description: error.message });
// 					}
// 				});
// 			},
// 		});
// 	};

// 	return (
// 		<div>
// 			{/* Sync Lifecycle Controls */}
// 			<div style={{ marginBottom: 16 }}>
// 				<Text strong>Sync Lifecycle:</Text>
// 				<Tooltip title="Controls for starting/stopping the sync system">
// 					<InfoCircleOutlined style={{ marginLeft: 8, color: "#8c8c8c" }} />
// 				</Tooltip>
// 			</div>
// 			<Space wrap style={{ marginBottom: 24 }}>
// 				<Button
// 					type="primary"
// 					icon={<PlayCircleOutlined />}
// 					onClick={handleStartSync}
// 					loading={isProcessing === "start"}
// 					disabled={syncInfo.isOnline || !db.isOpen()}
// 				>
// 					Start Sync
// 				</Button>

// 				<Button
// 					danger
// 					icon={<StopOutlined />}
// 					onClick={handleStopSync}
// 					loading={isProcessing === "stop"}
// 					disabled={!syncInfo.isOnline}
// 				>
// 					Stop Sync
// 				</Button>

// 				<Button
// 					icon={<ReloadOutlined />}
// 					onClick={handleResetSync}
// 					loading={isProcessing === "reset"}
// 				>
// 					Reset
// 				</Button>
// 			</Space>

// 			<Divider style={{ margin: "16px 0" }} />

// 			{/* Connection Controls */}
// 			<div style={{ marginBottom: 16 }}>
// 				<Text strong>Connection:</Text>
// 				<Tooltip title="Connect or disconnect from the sync server">
// 					<InfoCircleOutlined style={{ marginLeft: 8, color: "#8c8c8c" }} />
// 				</Tooltip>
// 			</div>
// 			<Space wrap style={{ marginBottom: 24 }}>
// 				<Button
// 					type="primary"
// 					icon={<LinkOutlined />}
// 					onClick={handleConnect}
// 					loading={isProcessing === "connect"}
// 					disabled={syncInfo.status === "CONNECTING" || !db.isOpen()}
// 				>
// 					Connect
// 				</Button>

// 				<Button
// 					icon={<DisconnectOutlined />}
// 					onClick={handleDisconnect}
// 					loading={isProcessing === "disconnect"}
// 					disabled={!syncInfo.isOnline && syncInfo.status !== "CONNECTING"}
// 				>
// 					Disconnect
// 				</Button>

// 				<Button
// 					icon={<SyncOutlined />}
// 					onClick={handleSyncNow}
// 					loading={isProcessing === "sync"}
// 					disabled={!syncInfo.isOnline}
// 				>
// 					Sync Now
// 				</Button>

// 				<Button
// 					icon={<UnorderedListOutlined />}
// 					onClick={handleListConnections}
// 					loading={isProcessing === "list"}
// 				>
// 					List Connections
// 				</Button>
// 				<Button
// 					icon={<UnorderedListOutlined />}
// 					onClick={handleUseSyncLifecycle}
// 					loading={isProcessing === "list"}
// 				>
// 					useSyncLifecycle
// 				</Button>
// 			</Space>
// 			<Divider style={{ margin: "16px 0" }} />

// 			{/* Database Controls */}
// 			<div style={{ marginBottom: 16 }}>
// 				<Text strong>Database:</Text>
// 				<Tooltip title="Open, close, or clear the local database">
// 					<InfoCircleOutlined style={{ marginLeft: 8, color: "#8c8c8c" }} />
// 				</Tooltip>
// 			</div>
// 			<Space wrap>
// 				<Button
// 					icon={<DatabaseOutlined />}
// 					onClick={handleOpenDB}
// 					loading={isProcessing === "openDB"}
// 					disabled={db.isOpen()}
// 				>
// 					Open DB
// 				</Button>

// 				<Button
// 					icon={<PoweroffOutlined />}
// 					onClick={handleCloseDB}
// 					loading={isProcessing === "closeDB"}
// 					disabled={!db.isOpen()}
// 				>
// 					Close DB
// 				</Button>

// 				<Button
// 					danger
// 					icon={<DeleteOutlined />}
// 					onClick={handleClearData}
// 					loading={isProcessing === "clear"}
// 				>
// 					Clear All Data
// 				</Button>
// 			</Space>
// 		</div>
// 	);
// }

// // ============================================================================
// // TABLE STATISTICS
// // ============================================================================

// interface TableStatsItem {
// 	name: string
// 	count: number
// }

// interface TableStatisticsProps {
// 	stats: TableStatsItem[]
// 	loading: boolean
// 	onRefresh: () => void
// }

// function TableStatistics({ stats, loading, onRefresh }: TableStatisticsProps) {
// 	const columns = [
// 		{
// 			title: "Table",
// 			dataIndex: "name",
// 			key: "name",
// 			render: (name: string) => (
// 				<code style={{
// 					padding: "2px 6px",
// 					background: "#f5f5f5",
// 					borderRadius: 3,
// 					fontFamily: "monospace",
// 					fontSize: 11,
// 				}}
// 				>
// 					{name}
// 				</code>
// 			),
// 		},
// 		{
// 			title: "Records",
// 			dataIndex: "count",
// 			key: "count",
// 			align: "right" as const,
// 			render: (count: number) => (
// 				<strong>{count.toLocaleString()}</strong>
// 			),
// 		},
// 	];

// 	return (
// 		<Space direction="vertical" style={{ width: "100%" }}>
// 			<Button
// 				icon={<ReloadOutlined />}
// 				onClick={onRefresh}
// 				loading={loading}
// 				size="small"
// 			>
// 				Refresh
// 			</Button>

// 			<Table
// 				dataSource={stats}
// 				columns={columns}
// 				rowKey="name"
// 				pagination={false}
// 				size="small"
// 				loading={loading}
// 				scroll={{ y: 300 }}
// 			/>
// 		</Space>
// 	);
// }

// // ============================================================================
// // SYNC METRICS
// // ============================================================================

// interface SyncMetricsPanelProps {
// 	unsyncedCount: number
// 	conflictsCount: number
// 	uncommittedChanges: number
// 	syncNodes: number
// }

// function SyncMetricsPanel({ unsyncedCount, conflictsCount, uncommittedChanges, syncNodes }: SyncMetricsPanelProps) {
// 	return (
// 		<Row gutter={[16, 16]}>
// 			<Col span={12}>
// 				<Card size="small">
// 					<Statistic
// 						title="Unsynced Changes"
// 						value={unsyncedCount}
// 						prefix={<SyncOutlined />}
// 						valueStyle={{ color: unsyncedCount > 0 ? "#faad14" : "#52c41a", fontSize: 24 }}
// 					/>
// 				</Card>
// 			</Col>
// 			<Col span={12}>
// 				<Card size="small">
// 					<Statistic
// 						title="Conflicts"
// 						value={conflictsCount}
// 						prefix={<WarningOutlined />}
// 						valueStyle={{ color: conflictsCount > 0 ? "#f5222d" : "#52c41a", fontSize: 24 }}
// 					/>
// 				</Card>
// 			</Col>
// 			<Col span={12}>
// 				<Card size="small">
// 					<Statistic
// 						title="Uncommitted"
// 						value={uncommittedChanges}
// 						prefix={<DatabaseOutlined />}
// 						valueStyle={{ color: uncommittedChanges > 0 ? "#1890ff" : "#52c41a", fontSize: 24 }}
// 					/>
// 				</Card>
// 			</Col>
// 			<Col span={12}>
// 				<Card size="small">
// 					<Statistic
// 						title="Sync Nodes"
// 						value={syncNodes}
// 						prefix={<ApiOutlined />}
// 						valueStyle={{ color: syncNodes > 0 ? "#52c41a" : "#8c8c8c", fontSize: 24 }}
// 					/>
// 				</Card>
// 			</Col>
// 		</Row>
// 	);
// }

// // ============================================================================
// // ACTIVITY LOG
// // ============================================================================

// interface LogEntry {
// 	id: string
// 	timestamp: Date
// 	level: "info" | "warn" | "error" | "success"
// 	message: string
// 	source: string
// }

// function ActivityLog() {
// 	const [logs, setLogs] = useState<LogEntry[]>([]);
// 	const [autoScroll, setAutoScroll] = useState(true);
// 	const [filter, setFilter] = useState<string | null>(null);

// 	useEffect(() => {
// 		const originalLog = console.log;
// 		const originalWarn = console.warn;
// 		const originalError = console.error;

// 		const captureLog = (level: LogEntry["level"], ...args: any[]) => {
// 			const message = args.join(" ");
// 			const sources = ["[SYNC-", "[DB-", "[SYNC-PROTOCOL]", "[SYNC-LIFECYCLE]", "[SYNC-STORE]", "[DB-CONNECTION]"];
// 			const matchedSource = sources.find(s => message.includes(s));

// 			if (matchedSource) {
// 				const entry: LogEntry = {
// 					id: Date.now().toString() + Math.random(),
// 					timestamp: new Date(),
// 					level,
// 					message: message.replace(/\[.*?\]\s*/, ""), // Remove prefix for cleaner display
// 					source: matchedSource.replace(/[[\]]/g, ""),
// 				};

// 				setLogs((prev) => {
// 					const newLogs = [...prev.slice(-499), entry];
// 					return newLogs;
// 				});
// 			}
// 		};

// 		console.log = (...args) => {
// 			captureLog("info", ...args);
// 			originalLog(...args);
// 		};

// 		console.warn = (...args) => {
// 			captureLog("warn", ...args);
// 			originalWarn(...args);
// 		};

// 		console.error = (...args) => {
// 			captureLog("error", ...args);
// 			originalError(...args);
// 		};

// 		return () => {
// 			console.log = originalLog;
// 			console.warn = originalWarn;
// 			console.error = originalError;
// 		};
// 	}, []);

// 	const handleClear = () => setLogs([]);

// 	const handleExport = () => {
// 		const json = JSON.stringify(logs, null, 2);
// 		const blob = new Blob([json], { type: "application/json" });
// 		const url = URL.createObjectURL(blob);
// 		const a = document.createElement("a");
// 		a.href = url;
// 		a.download = `sync-log-${Date.now()}.json`;
// 		a.click();
// 	};

// 	const getLevelColor = (level: LogEntry["level"]) => {
// 		const colors = { info: "blue", warn: "orange", error: "red", success: "green" };
// 		return colors[level];
// 	};

// 	const filteredLogs = filter ? logs.filter(l => l.source.includes(filter)) : logs;

// 	return (
// 		<Card
// 			title={(
// 				<Space>
// 					<Badge count={logs.length} style={{ backgroundColor: "#1890ff" }} />
// 					<span>Activity Log</span>
// 				</Space>
// 			)}
// 			extra={(
// 				<Space>
// 					<Button size="small" onClick={() => setFilter(null)}>
// 						All
// 					</Button>
// 					<Button size="small" onClick={() => setFilter("SYNC")}>
// 						Sync
// 					</Button>
// 					<Button size="small" onClick={() => setFilter("DB")}>
// 						DB
// 					</Button>
// 					<Button
// 						size="small"
// 						onClick={() => setAutoScroll(!autoScroll)}
// 					>
// 						Auto:
// 						{" "}
// 						{autoScroll ? "ON" : "OFF"}
// 					</Button>
// 					<Button
// 						size="small"
// 						icon={<ClearOutlined />}
// 						onClick={handleClear}
// 					>
// 						Clear
// 					</Button>
// 					<Button
// 						size="small"
// 						icon={<DownloadOutlined />}
// 						onClick={handleExport}
// 					>
// 						Export
// 					</Button>
// 				</Space>
// 			)}
// 		>
// 			<div
// 				style={{
// 					height: 300,
// 					overflowY: "auto",
// 					fontFamily: "monospace",
// 					fontSize: 11,
// 				}}
// 			>
// 				<List
// 					dataSource={filteredLogs}
// 					renderItem={log => (
// 						<List.Item key={log.id} style={{ padding: "2px 0", borderBottom: "none" }}>
// 							<Space size="small" style={{ width: "100%" }} align="start">
// 								<Tag color={getLevelColor(log.level)} style={{ margin: 0, fontSize: 10, padding: "0 4px" }}>
// 									{log.level.toUpperCase()}
// 								</Tag>
// 								<Tag style={{ margin: 0, fontSize: 10, padding: "0 4px" }}>
// 									{log.source}
// 								</Tag>
// 								<Text type="secondary" style={{ fontSize: 10, whiteSpace: "nowrap" }}>
// 									{log.timestamp.toLocaleTimeString()}
// 								</Text>
// 								<Text style={{ flex: 1, wordBreak: "break-all" }}>{log.message}</Text>
// 							</Space>
// 						</List.Item>
// 					)}
// 				/>
// 			</div>
// 		</Card>
// 	);
// }

// // ============================================================================
// // MAIN DASHBOARD
// // ============================================================================

// export default function SyncDashboard() {
// 	// Initialize sync lifecycle - this hook manages the entire sync connection lifecycle
// 	useSyncLifecycle();

// 	const syncInfo = useSyncInfo();
// 	const syncStatus = useSyncStatus();
// 	const selectedPrograms = useSelectedPrograms();
// 	const selectedCollars = useSelectedCollars();
// 	const syncStore = useSyncStore();

// 	const [tableStats, setTableStats] = useState<TableStatsItem[]>([]);
// 	const [storageInfo, setStorageInfo] = useState<any>(null);
// 	const [uncommittedCount, setUncommittedCount] = useState(0);
// 	const [syncNodesCount, setSyncNodesCount] = useState(0);
// 	const [loading, setLoading] = useState(false);

// 	const refreshTableStats = useCallback(async () => {
// 		// Skip if database is not open
// 		if (!db.isOpen()) {
// 			console.log("[DASHBOARD] Skipping stats refresh - database is closed");
// 			setTableStats([]);
// 			setUncommittedCount(0);
// 			setSyncNodesCount(0);
// 			return;
// 		}

// 		setLoading(true);
// 		try {
// 			const stats = await Promise.all(
// 				db.tables.map(async table => ({
// 					name: table.name,
// 					count: await table.count(),
// 				})),
// 			);
// 			setTableStats(stats);

// 			// Get internal table counts
// 			let changes = 0; let uncommitted = 0; let nodes = 0;

// 			try { changes = await (db as any)._changes?.count() || 0; }
// 			catch (e) { /* ignore */ }
// 			try { uncommitted = await (db as any)._uncommittedChanges?.count() || 0; }
// 			catch (e) { /* ignore */ }
// 			try { nodes = await (db as any)._syncNodes?.count() || 0; }
// 			catch (e) { /* ignore */ }

// 			setUncommittedCount(changes + uncommitted);
// 			setSyncNodesCount(nodes);
// 		}
// 		catch (error: any) {
// 			// Don't log DatabaseClosedError as it's expected during close/open cycles
// 			if (error.name === "DatabaseClosedError" || error.message?.includes("Database has been closed")) {
// 				console.log("[DASHBOARD] Database closed during stats refresh - skipping");
// 				setTableStats([]);
// 				setUncommittedCount(0);
// 				setSyncNodesCount(0);
// 			}
// 			else {
// 				console.error("[DASHBOARD] Failed to refresh stats:", error);
// 			}
// 		}
// 		finally {
// 			setLoading(false);
// 		}
// 	}, []);

// 	const refreshStorageInfo = useCallback(async () => {
// 		try {
// 			const estimate = await db.getStorageEstimate();
// 			setStorageInfo(estimate);
// 		}
// 		catch (error) {
// 			console.error("[DASHBOARD] Failed to get storage info:", error);
// 		}
// 	}, []);

// 	const refreshAll = useCallback(() => {
// 		refreshTableStats();
// 		refreshStorageInfo();
// 	}, [refreshTableStats, refreshStorageInfo]);

// 	useEffect(() => {
// 		refreshAll();
// 		const interval = setInterval(refreshAll, 3000);
// 		return () => clearInterval(interval);
// 	}, [refreshAll]);

// 	useEffect(() => {
// 		const handler = () => refreshTableStats();
// 		db.on("changes", handler);
// 		return () => db.on("changes").unsubscribe(handler);
// 	}, [refreshTableStats]);

// 	return (
// 		<div style={{ padding: 24, maxWidth: 1600, margin: "0 auto" }}>
// 			<Title level={2}>Sync & Database Control Panel</Title>
// 			<Paragraph type="secondary">
// 				Monitor and control all aspects of the offline-first sync system
// 			</Paragraph>

// 			{/* Status Cards Row */}
// 			<Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
// 				<Col xs={24} sm={12} lg={8}>
// 					<SyncStatusCard
// 						status={syncInfo.status}
// 						lastSyncTime={syncInfo.lastSyncTime}
// 						error={syncStore.syncError}
// 						hasSelection={syncInfo.hasSelection}
// 						selectedPrograms={selectedPrograms.length}
// 						selectedCollars={selectedCollars.length}
// 					/>
// 				</Col>
// 				<Col xs={24} sm={12} lg={8}>
// 					<DatabaseStatusCard
// 						isOpen={db.isOpen()}
// 						isReady={db.isReady}
// 						version={db.verno}
// 						tableCount={db.tables.length}
// 					/>
// 				</Col>
// 				<Col xs={24} sm={12} lg={8}>
// 					<StorageStatusCard
// 						usage={storageInfo?.usage}
// 						quota={storageInfo?.quota}
// 						percentage={storageInfo?.percentage}
// 					/>
// 				</Col>
// 			</Row>

// 			{/* Detailed Info Panel */}
// 			<Card title="Detailed Status" style={{ marginBottom: 24 }}>
// 				<DetailedInfoPanel
// 					syncInfo={syncInfo}
// 					dbStatus={{ isOpen: db.isOpen(), isReady: db.isReady, version: db.verno }}
// 					syncStore={syncStore}
// 				/>
// 			</Card>

// 			{/* Control Panel */}
// 			<Card
// 				title={(
// 					<Space>
// 						<SettingOutlined />
// 						<span>Control Panel</span>
// 					</Space>
// 				)}
// 				style={{ marginBottom: 24 }}
// 			>
// 				<ControlPanel syncInfo={syncInfo} onRefresh={refreshAll} />
// 			</Card>

// 			{/* Metrics and Statistics Row */}
// 			<Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
// 				<Col xs={24} lg={12}>
// 					<Card title="Table Statistics" style={{ height: "100%" }}>
// 						<TableStatistics
// 							stats={tableStats}
// 							loading={loading}
// 							onRefresh={refreshTableStats}
// 						/>
// 					</Card>
// 				</Col>
// 				<Col xs={24} lg={12}>
// 					<Card title="Sync Metrics" style={{ height: "100%" }}>
// 						<SyncMetricsPanel
// 							unsyncedCount={syncInfo.unsyncedCount}
// 							conflictsCount={syncInfo.conflictsCount}
// 							uncommittedChanges={uncommittedCount}
// 							syncNodes={syncNodesCount}
// 						/>
// 					</Card>
// 				</Col>
// 			</Row>

// 			{/* Activity Log */}
// 			<ActivityLog />
// 		</div>
// 	);
// }
export default function Home() {

	return (<div>Hello World</div>);
}
