import React, { forwardRef } from "react";
import cx from "classnames";

import styles from "./List.module.scss";

export interface Props {
	children: React.ReactNode;
	columns?: number;
	style?: React.CSSProperties;
	horizontal?: boolean;
}

export const List = forwardRef<any, Props>(
	({ children, columns = 1, horizontal, style }: Props, ref) => {
		return (
			<div
				ref={ref}
				style={
					{
						...style,
						"--columns": columns
					} as React.CSSProperties
				}
				className={cx({
					[styles.List]: true
				})}
			>
				{children}
			</div>
		);
	}
);
