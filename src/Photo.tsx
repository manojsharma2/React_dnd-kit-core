import React, {forwardRef} from 'react';
import LazyLoad from "react-lazyload";

export const Photo = forwardRef(({url, index, faded, style, ...props}: any, ref: React.LegacyRef<HTMLDivElement> | undefined) => {
		const inlineStyles = {
				opacity: faded ? '0.2' : '1',
				transformOrigin: '0 0',
				height: index === 0 ? 410 : 200,
				gridRowStart: index === 0 ? 'span 2' : null,
				gridColumnStart: index === 0 ? 'span 2' : null,
				// backgroundImage: `url("${url}")`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			backgroundColor: 'grey',
				overflow: 'hidden',
				...style,
		};
		
		return (
      
			<div ref={ref} style={inlineStyles} {...props}>
				<LazyLoad height={200}>
          <img
            src={url}
            style={{ width: "100%", maxWidth: "100%" }}
            alt="newIma"
          />
      </LazyLoad>
        </div>
    );
});
