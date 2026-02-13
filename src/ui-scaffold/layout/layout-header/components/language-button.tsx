import type { LanguageType } from "#src/ui-scaffold/locales";

import type { ButtonProps, MenuProps } from "antd";
import { BasicButton } from "#src/ui-scaffold/components";
import { useLanguage } from "#src/ui-scaffold/hooks";
import { getLanguageItems } from "#src/ui-scaffold/layout/widgets/preferences/blocks/general/utils";
import { TranslationOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useRef } from "react";

export function LanguageButton({ ...restProps }: ButtonProps) {
	const { language, setLanguage } = useLanguage();
	const triggerRef = useRef<HTMLButtonElement>(null);

	const items: MenuProps["items"] = getLanguageItems();

	const onClick: MenuProps["onClick"] = ({ key }) => {
		setLanguage(key as LanguageType);
	};

	return (
		<Dropdown
			menu={{
				items,
				onClick,
				selectable: true,
				selectedKeys: [language],
			}}
			trigger={["click"]}
			arrow={false}
			placement="bottom"
		>
			<BasicButton
				ref={triggerRef}
				type="text"
				{...restProps}
			>
				<TranslationOutlined />
			</BasicButton>
		</Dropdown>
	);
}
