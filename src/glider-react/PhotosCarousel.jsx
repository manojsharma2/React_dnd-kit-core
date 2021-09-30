import React from "react";
import Glider from "react-glider";

const defaultConfig = {
    duration: 0.75,
    slidesToShow: 1,
    slidesToScroll: 1,
    scrollLock: true,
    itemWidth: undefined
};

const PhotosCarousel = (props) => {
    const {
        children,
        onSlideChange = slide => null,
        initialSlideIdx = 5,
        currentSlideIdx,
        className = "",
        config: customConfig = {},
        style
    }=props
    const carouselRef = React.useRef(null);

    const config = React.useMemo(() => {
        return Object.assign({}, defaultConfig, customConfig);
    }, [customConfig]);

    React.useEffect(() => {
        const glider = carouselRef.current;
        if(glider!=null){
            if (glider.slide !== currentSlideIdx) {
                glider.scrollItem(currentSlideIdx);
            }
        }

    }, [currentSlideIdx]);

    const slides = children.map((item) => <div key={item.key}>{item}</div>);

    return (
        <div className={className}>
            <Glider
                ref={carouselRef}
                draggable
                hasArrows
                slidesToShow={config.slidesToShow}
                slidesToScroll={config.slidesToScroll}
                duration={config.duration}
                scrollLock={config.scrollLock}
                itemWidth={config.itemWidth}
                onSlideVisible={(context) => onSlideChange(context.detail.slide)}
                scrollToSlide={initialSlideIdx}
            >
                {slides}
            </Glider>
        </div>
    );
};

export default PhotosCarousel;
