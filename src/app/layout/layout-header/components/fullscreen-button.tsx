import type { FullscreenButtonProps } from "#src/app/components";

import { FullscreenButton as FullscreenButtonComponent } from "#src/app/components";
import { RiFullscreenExitLine, RiFullscreenLine } from "#src/app/icons";

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
