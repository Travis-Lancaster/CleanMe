/**
 * Canonical RowStatus model for Features domain.
 *
 * Numeric values align with persisted/API row status codes.
 * `Submitted` is kept as an alias of `Complete` for backward compatibility.
 */
export enum RowStatus {
	Draft = 0,
	Complete = 1,
	Submitted = 1,
	Reviewed = 2,
	Approved = 3,
	Superseded = 4,
	Imported = 99,
	Rejected = 255,
}

export const RowStatusTransitions: Record<RowStatus, RowStatus[]> = {
	[RowStatus.Draft]: [RowStatus.Complete],
	[RowStatus.Complete]: [RowStatus.Draft, RowStatus.Reviewed, RowStatus.Rejected],
	[RowStatus.Reviewed]: [RowStatus.Draft, RowStatus.Approved, RowStatus.Rejected],
	[RowStatus.Approved]: [RowStatus.Superseded],
	[RowStatus.Superseded]: [],
	[RowStatus.Imported]: [RowStatus.Draft, RowStatus.Complete],
	[RowStatus.Rejected]: [RowStatus.Draft],
} as const;

export function canTransition(from: RowStatus, to: RowStatus): boolean {
	return RowStatusTransitions[from].includes(to);
}

export function getAvailableTransitions(from: RowStatus): RowStatus[] {
	return RowStatusTransitions[from];
}

export function toRowStatus(apiStatus: number | undefined | null): RowStatus {
	if (apiStatus === null || apiStatus === undefined) {
		return RowStatus.Draft;
	}

	switch (apiStatus) {
		case 0: return RowStatus.Draft;
		case 1: return RowStatus.Complete;
		case 2: return RowStatus.Reviewed;
		case 3: return RowStatus.Approved;
		case 4: return RowStatus.Superseded;
		case 99: return RowStatus.Imported;
		case 255: return RowStatus.Rejected;
		default:
			console.warn(`Unknown RowStatus value: ${apiStatus}, defaulting to Draft`);
			return RowStatus.Draft;
	}
}

export function getRowStatusDisplay(status: RowStatus): string {
	switch (status) {
		case RowStatus.Draft: return "Draft";
		case RowStatus.Complete: return "Complete";
		case RowStatus.Reviewed: return "Reviewed";
		case RowStatus.Approved: return "Approved";
		case RowStatus.Superseded: return "Superseded";
		case RowStatus.Imported: return "Imported";
		case RowStatus.Rejected: return "Rejected";
		default: return "Unknown";
	}
}

export function getRowStatusWorkflowLabel(status: RowStatus): string {
	if (status === RowStatus.Complete) {
		return "Submitted";
	}
	return getRowStatusDisplay(status);
}

export function isEditableRowStatus(status: RowStatus): boolean {
	return status === RowStatus.Draft;
}

/**
 * Workflow-oriented status codes used by drill-hole-data UI/store flow.
 * Kept separate from broader data-layer lifecycle values.
 */
export const WORKFLOW_ROW_STATUS = {
	Draft: 0,
	Submitted: 1,
	Reviewed: 2,
	Approved: 3,
	Rejected: 4,
} as const;

export type WorkflowRowStatusCode = typeof WORKFLOW_ROW_STATUS[keyof typeof WORKFLOW_ROW_STATUS];

export function getWorkflowRowStatusLabel(status: number | undefined | null): string {
	switch (status) {
		case WORKFLOW_ROW_STATUS.Draft: return "Draft";
		case WORKFLOW_ROW_STATUS.Submitted: return "Submitted";
		case WORKFLOW_ROW_STATUS.Reviewed: return "Reviewed";
		case WORKFLOW_ROW_STATUS.Approved: return "Approved";
		case WORKFLOW_ROW_STATUS.Rejected: return "Rejected";
		default: return "Draft";
	}
}
