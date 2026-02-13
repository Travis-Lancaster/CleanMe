/**
 * Generic Error Boundary Component
 *
 * Catches React errors in child components and displays a fallback UI.
 * Preserves line numbers in error logs for debugging.
 *
 * @example
 * ```tsx
 * <ErrorBoundary moduleName="DrillPlan" onError={handleError}>
 *   <DrillPlanListView />
 * </ErrorBoundary>
 * ```
 */

import type { ReactNode } from "react";
import { HomeOutlined, ReloadOutlined } from "@ant-design/icons";
import { Alert, Button, Space } from "antd";
import React, { Component } from "react";

export interface ErrorBoundaryProps {
	children: ReactNode
	moduleName?: string
	onError?: (error: Error, errorInfo: React.ErrorInfo) => void
	fallback?: ReactNode
	showDetails?: boolean
}

interface ErrorBoundaryState {
	hasError: boolean
	error: Error | null
	errorInfo: React.ErrorInfo | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
		// Log error with flow-based naming convention for filtering
		console.error("[FLOW:error-boundary] [ERROR] Component error caught:", error);
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		const { moduleName, onError } = this.props;

		// Log with module context for debugging
		console.error(
			`[FLOW:error-boundary] [ERROR] ${moduleName || "Unknown"} module error:`,
			{
				error,
				errorInfo,
				componentStack: errorInfo.componentStack,
			},
		);

		this.setState({
			error,
			errorInfo,
		});

		// Call custom error handler if provided
		if (onError) {
			onError(error, errorInfo);
		}
	}

	handleReload = () => {
		console.log("[FLOW:error-boundary] [ACTION] User clicked reload button");
		this.setState({ hasError: false, error: null, errorInfo: null });
		window.location.reload();
	};

	handleGoHome = () => {
		console.log("[FLOW:error-boundary] [NAV] User clicked go home button");
		window.location.href = "/";
	};

	render() {
		const { hasError, error, errorInfo } = this.state;
		const { children, moduleName, fallback, showDetails = import.meta.env.DEV } = this.props;

		if (hasError) {
			// Use custom fallback if provided
			if (fallback) {
				return fallback;
			}

			// Default error UI
			return (
				<div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
					<Alert
						message="Application Error"
						description={(
							<div>
								<p>
									{moduleName
										? `The ${moduleName} module encountered an error and cannot be displayed.`
										: "An error occurred and the component cannot be displayed."}
								</p>

								{showDetails && error && (
									<>
										<p style={{ marginTop: "12px" }}>
											<strong>Error:</strong>
											{" "}
											{error.message}
										</p>
										{errorInfo?.componentStack && (
											<details style={{ marginTop: "12px" }}>
												<summary
													style={{
														cursor: "pointer",
														fontWeight: "bold",
														userSelect: "none",
													}}
												>
													Component Stack (click to expand)
												</summary>
												<pre
													style={{
														marginTop: "8px",
														padding: "12px",
														background: "#f5f5f5",
														borderRadius: "4px",
														overflow: "auto",
														fontSize: "12px",
														maxHeight: "300px",
													}}
												>
													{errorInfo.componentStack}
												</pre>
											</details>
										)}
									</>
								)}

								<Space style={{ marginTop: "16px" }}>
									<Button
										type="primary"
										icon={<ReloadOutlined />}
										onClick={this.handleReload}
									>
										Reload Page
									</Button>
									<Button icon={<HomeOutlined />} onClick={this.handleGoHome}>
										Go to Home
									</Button>
								</Space>
							</div>
						)}
						type="error"
						showIcon
					/>
				</div>
			);
		}

		return children;
	}
}
