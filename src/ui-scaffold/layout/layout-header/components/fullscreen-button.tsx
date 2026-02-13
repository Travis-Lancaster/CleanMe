import type { FullscreenButtonProps } from "#src/ui-scaffold/components";

import { FullscreenButton as FullscreenButtonComponent } from "#src/ui-scaffold/components";
import { RiFullscreenExitLine, RiFullscreenLine } from "#src/ui-scaffold/icons";

export function FullscreenButton({ target, ...restProps }: FullscreenButtonProps) {
	return (
		<FullscreenButtonComponent
			{...restProps}
			target={target}
			fullscreenExitIcon={<RiFullscreenExitLine />}
			fullscreenIcon={<RiFullscreenLine />}
		/>
	);
}
