import type { NotificationItem } from "#src/app/layout/widgets/notification/types";
import { request } from "#src/app/utils/request";

export function fetchNotifications() {
	return request
		.get("notifications")
		.json<ApiResponse<NotificationItem[]>>();
}
