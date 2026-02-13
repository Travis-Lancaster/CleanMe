import type { ReactNode } from "react";
import { useGlobalStore } from "#src/app/store/global";
import { usePreferencesStore } from "#src/app/store/preferences";

import { cn } from "#src/app/utils/cn";
import { Spin } from "antd";
import { createUseStyles } from "react-jss";
import { useSpinDelay } from "spin-delay";

export interface GlobalSpinProps {
	className?: string
	children: ReactNode
}

const useStyles = createUseStyles({
	rootSpin: {
		"height": "100%",
		"& .ant-spin-container": {
			height: "100%",
		},
		"& .ant-spin-spinning": {
			maxHeight: "100% !important",
		},
	},
});

export function GlobalSpin({ children, className }: GlobalSpinProps) {
	const classes = useStyles();
	const spinning = useGlobalStore(state => state.globalSpin);
	/**
	 * Interface return time is too short, page may flicker, use useSpinDelay to optimize Spin
	 *
	 * @see https://github.com/ant-design/ant-design/issues/51828
	 */
	const loading = useSpinDelay(spinning, { delay: 500, minDuration: 200 });
	const transitionLoading = usePreferencesStore(state => state.transitionLoading);

	if (!transitionLoading) {
		return children;
	};

	return (
		<Spin
			delay={300}
			spinning={loading}
			wrapperClassName={cn(classes.rootSpin, className)}
		>
			{children}
		</Spin>
	);
}
