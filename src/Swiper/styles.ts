import { makeStyles, Theme } from '@material-ui/core'

const SwiperGlobalStyle = makeStyles<Theme>(
    (theme: Theme) => ({
        root: {
            width: '100%',
            height: 'auto',
            position: 'relative',
            '& .swiper-button-disabled': {
                opacity: '0.35',
                cursor: 'auto',
                pointerEvents: 'none',
            },
        },
        '@global': {
            '.swiper-container': {
                marginLeft: 'auto',
                marginRight: 'auto',
                position: 'relative',
                overflow: 'hidden',
                listStyle: 'none',
                padding: '0',
                zIndex: '1',
            },
            '.swiper-container-vertical > .swiper-wrapper': {
                flexDirection: 'column',
            },
            '.swiper-wrapper': {
                position: 'relative',
                width: '100%',
                height: '100%',
                zIndex: '1',
                display: 'flex',
                transitionProperty: 'transform',
                boxSizing: 'content-box',
            },
            '.swiper-container-android .swiper-slide, .swiper-wrapper': {
                transform: 'translate3d(0px, 0, 0)',
            },
            '.swiper-container-multirow > .swiper-wrapper': {
                flexWrap: 'wrap',
            },
            '.swiper-container-multirow-column > .swiper-wrapper': {
                flexWrap: 'wrap',
                flexDirection: 'column',
            },
            '.swiper-container-free-mode > .swiper-wrapper': {
                transitionTimingFunction: 'ease-out',
                margin: '0 auto',
            },
            '.swiper-container-pointer-events': {
                touchAction: 'pan-y',
            },
            '.swiper-container-pointer-events.swiper-container-vertical': {
                touchAction: 'pan-x',
            },
            '.swiper-slide-invisible-blank': {
                visibility: 'hidden',
            },
            '.swiper-container-autoheight, .swiper-container-autoheight .swiper-slide': {
                height: 'auto',
            },
            '.swiper-container-autoheight .swiper-wrapper': {
                alignItems: 'flex-start',
                transitionProperty: 'transform, height',
            },
            '.swiper-container-3d': {
                perspective: '1200px',
            },
            '.swiper-container-3d .swiper-wrapper, .swiper-container-3d .swiper-slide, .swiper-container-3d .swiper-slide-shadow-left, .swiper-container-3d .swiper-slide-shadow-right, .swiper-container-3d .swiper-slide-shadow-top, .swiper-container-3d .swiper-slide-shadow-bottom, .swiper-container-3d .swiper-cube-shadow': {
                transformStyle: 'preserve-3d',
            },
            '.swiper-container-3d .swiper-slide-shadow-left, .swiper-container-3d .swiper-slide-shadow-right, .swiper-container-3d .swiper-slide-shadow-top, .swiper-container-3d .swiper-slide-shadow-bottom': {
                position: 'absolute',
                left: '0',
                top: '0',
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: '10',
            },
            '.swiper-container-3d .swiper-slide-shadow-left': {
                backgroundImage:
                    'linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))',
            },
            '.swiper-container-3d .swiper-slide-shadow-right': {
                backgroundImage:
                    'linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))',
            },
            '.swiper-container-3d .swiper-slide-shadow-top': {
                backgroundImage:
                    'linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))',
            },
            '.swiper-container-3d .swiper-slide-shadow-bottom': {
                backgroundImage:
                    'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))',
            },
            '.swiper-container-css-mode > .swiper-wrapper': {
                overflow: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
            },
            '.swiper-container-css-mode > .swiper-wrapper::-webkit-scrollbar': {
                display: 'none',
            },
            '.swiper-container-css-mode > .swiper-wrapper > .swiper-slide': {
                scrollSnapAlign: 'start start',
            },
            '.swiper-container-horizontal.swiper-container-css-mode > .swiper-wrapper': {
                scrollSnapType: 'x mandatory',
            },
            '.swiper-container-vertical.swiper-container-css-mode > .swiper-wrapper': {
                scrollSnapType: 'y mandatory',
            },
            '.swiper-button-prev, .swiper-button-next': {
                position: 'absolute',
                top: '50%',
                width: 'calc(var(--edit-photo-navigation-size) / 44 * 27)',
                height: 'var(--edit-photo-navigation-size)',
                marginTop: 'calc(0px - (var(--edit-photo-navigation-size) / 2))',
                zIndex: '10',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
            },
            '.swiper-button-prev.swiper-button-disabled, .swiper-button-next.swiper-button-disabled': {
                opacity: '0.35',
                cursor: 'auto',
                pointerEvents: 'none',
            },
            '.swiper-button-prev:after, .swiper-button-next:after': {
                fontFamily: 'edit-photo-icons',
                fontSize: 'var(--edit-photo-navigation-size)',
                textTransform: 'none',
                letterSpacing: '0',
                fallbacks: [
                    {
                        textTransform: 'none !important',
                    },
                ],
                fontVariant: 'initial',
                lineHeight: '1',
            },
            '.swiper-button-prev, .swiper-rtl .swiper-button-next': {
                left: '10px',
                right: 'auto',
            },
            '.swiper-button-prev:after, .swiper-rtl .swiper-button-next:after': {
                content: "'prev'",
            },
            '.swiper-button-next, .swiper-rtl .swiper-button-prev': {
                right: '10px',
                left: 'auto',
            },
            '.swiper-button-next:after, .swiper-rtl .swiper-button-prev:after': {
                content: "'next'",
            },
            '.swiper-button-lock': {
                display: 'none',
            },
            '.swiper': {
                width: '100%',
                height: '300px',
                fallbacks: [
                    {
                        height: '100%',
                    },
                    {
                        width: '100%',
                    },
                ],
                marginLeft: 'auto',
                marginRight: 'auto',
            },
            '.swiper-slide': {
                flexShrink: '0',
                width: '100%',
                height: '100%',
                position: 'relative',
                transitionProperty: 'transform',
                textAlign: 'center',
                fontSize: '18px',
                background: '#fff',
                display: 'flex',
                fallbacks: [
                    {
                        display: '-webkit-flex',
                    },
                    {
                        display: '-ms-flexbox',
                    },
                    {
                        display: '-webkit-box',
                    },
                ],
                webkitBoxPack: 'center',
                msFlexPack: 'center',
                webkitJustifyContent: 'center',
                justifyContent: 'center',
                webkitBoxAlign: 'center',
                msFlexAlign: 'center',
                webkitAlignItems: 'center',
                alignItems: 'center',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '2px solid #FFFFFF',
            },
            '.swiper-slide img': {
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
            },
            '.thumbnail-Swiper': {
                boxSizing: 'border-box',
                padding: '0px 40px',
                height: '88px',
            },
            '.thumbnail-Swiper .swiper-slide': {
                width: '116px',
                height: '100%',
                overflow: 'hidden',
                boxSizing: 'border-box',
            },
            '.thumbnail-Swiper .swiper-slide-thumb-active': {
                opacity: '1',
            },
            '.swiper-slide-active': {
                border: '2px solid #FF4500',
            },
        },
    }),
    {
        index: 999,
    },
)

export default SwiperGlobalStyle
