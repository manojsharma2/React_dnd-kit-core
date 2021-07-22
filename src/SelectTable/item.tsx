import React, { useEffect } from 'react';
import classNames from 'classnames';
import { DraggableSyntheticListeners } from '@dnd-kit/core';
import { Transform } from '@dnd-kit/utilities';

import { Handle } from './Handle';

import styles from './Item.module.scss';
// import LazyLoad from 'react-lazyload';
export interface Props {
	showMoreBtn?: boolean;
	newLength?: number;
	showMoreHandler?: any;
	className?: string;
	dragOverlay?: boolean;
	color?: string;
	disabled?: boolean;
	dragging?: boolean;
	handle?: boolean;
	height?: number;
	index?: number;
	fadeIn?: boolean;
	transform?: Transform | null;
	listeners?: DraggableSyntheticListeners;
	sorting?: boolean;
	style?: React.CSSProperties;
	transition?: string;
	wrapperStyle?: React.CSSProperties;
	value: React.ReactNode;
	renderItem?(args: {
		dragOverlay: boolean;
		dragging: boolean;
		sorting: boolean;
		index: number | undefined;
		fadeIn: boolean;
		listeners: DraggableSyntheticListeners;
		ref: React.Ref<HTMLElement>;
		style: React.CSSProperties | undefined;
		transform: Props['transform'];
		transition: Props['transition'];
		value: Props['value'];
	}): React.ReactElement;
}

export const Item = React.memo(
	React.forwardRef<HTMLDivElement, Props>(
		(
			{
				showMoreBtn,
				newLength,
				showMoreHandler,
				className,
				color,
				dragOverlay,
				dragging,
				disabled,
				fadeIn,
				handle,
				height,
				index,
				listeners,
				renderItem,
				sorting,
				style,
				transition,
				transform,
				value,
				wrapperStyle,
				...props
			},
			ref
		) => {
			useEffect(() => {
				if (!dragOverlay) {
					return;
				}

				document.body.style.cursor = 'grabbing';

				return () => {
					document.body.style.cursor = '';
				};
			}, [dragOverlay]);

			return renderItem ? (
				renderItem({
					dragOverlay: Boolean(dragOverlay),
					dragging: Boolean(dragging),
					sorting: Boolean(sorting),
					index,
					fadeIn: Boolean(fadeIn),
					listeners,
					ref,
					style,
					transform,
					transition,
					value,
				})
			) : (
				<div
					className={`draggbleItem ${classNames(
						className,
						styles.Wrapper,
						fadeIn && styles.fadeIn,
						sorting && styles.sorting,
						dragOverlay && styles.dragOverlay
					)}`}
					style={
						{
							...wrapperStyle,
							transition,
							'--translate-x': transform
								? `${Math.round(transform.x)}px`
								: undefined,
							'--translate-y': transform
								? `${Math.round(transform.y)}px`
								: undefined,
							'--scale-x': transform?.scaleX
								? `${transform.scaleX}`
								: undefined,
							'--scale-y': transform?.scaleY
								? `${transform.scaleY}`
								: undefined,
							'--index': index,
						} as React.CSSProperties
					}
					ref={ref}
				>
					<div
						className={classNames(
							styles.Item,
							dragging && styles.dragging,
							handle && styles.withHandle,
							dragOverlay && styles.dragOverlay,
							disabled && styles.disabled,
						)}
						tabIndex={!handle ? 0 : undefined}
							style={{
								...style,
								width: '100%',
								height: '100%',
								backgroundImage: `url(https://picsum.photos/1920/1080?random=${value})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								backgroundRepeat: "no-repeat",}}
						data-cypress="draggable-item"
						{...(!handle ? listeners : undefined)}
						{...props}
					>
						{/* <LazyLoad style={{ width: '100%', height: '100%' }}> */}
						{/* <div style={{

						}} role="img" aria-label="new images" data-cypress="draggable-item"> */}

						{/* </div> */}
						{handle ? <Handle {...listeners} /> : null}
						{(newLength === index) && showMoreBtn ? <button className={styles.BtnCaptions} onClick={showMoreHandler}><b>30 +</b><br />showMore</button> : null}
						{/* </LazyLoad> */}
					</div>
				</div >
			);
		}
	)
);