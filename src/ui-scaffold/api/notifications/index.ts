import type { NotificationItem } from "#src/ui-scaffold/layout/widgets/notification/types";
import { request } from "#src/ui-scaffold/utils/request";

export function fetchNotifications() {
	return request
		.get("notifications")
		.json<ApiResponse<NotificationItem[]>>();
}
