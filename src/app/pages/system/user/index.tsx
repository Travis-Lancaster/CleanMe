import { BasicContent } from "#src/app/components/basic-content";

import { Input } from "antd";

export default function User() {
	return (
		<BasicContent>
			<h1>User</h1>
			<Input placeholder="Enter your username" />
		</BasicContent>
	);
}
