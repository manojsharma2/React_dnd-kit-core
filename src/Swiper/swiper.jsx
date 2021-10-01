
import React, { useState,useRef } from "react";
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// import Swiper core and required modules
import SwiperCore, {
    Navigation,Thumbs
} from 'swiper';
import useStyles from './styles'

// install Swiper modules
SwiperCore.use([Navigation,Thumbs]);


export default function SwiperSlider() {
    const nextButtonRef = useRef(null)
    const previousButtonRef = useRef(null)
    const [activeIndex,setActiveIndex]=useState(0)
    const classes=useStyles()
    const photosToShow = [
        'https://picsum.photos/800/400?img=1',
        'https://picsum.photos/800/400?img=2',
        'https://picsum.photos/800/400?img=3',
        'https://picsum.photos/800/400?img=4',
        'https://picsum.photos/800/400?img=5',
        'https://picsum.photos/800/400?img=6',
        'https://picsum.photos/800/400?img=7',
        'https://picsum.photos/800/400?img=8',
        'https://picsum.photos/800/400?img=9',
        'https://picsum.photos/800/400?img=10',
        'https://picsum.photos/800/400?img=11',
        'https://picsum.photos/800/400?img=12',
        'https://picsum.photos/800/400?img=13',
        'https://picsum.photos/800/400?img=14',
        'https://picsum.photos/800/400?img=15',
        'https://picsum.photos/800/400?img=16',
        'https://picsum.photos/800/400?img=17',
        'https://picsum.photos/800/400?img=18',
        'https://picsum.photos/800/400?img=19',
        'https://picsum.photos/800/400?img=20',
        'https://picsum.photos/800/400?img=21',
        'https://picsum.photos/800/400?img=22',
        'https://picsum.photos/800/400?img=23',
        'https://picsum.photos/800/400?img=24',
        'https://picsum.photos/800/400?img=25',
        'https://picsum.photos/800/400?img=26',
        'https://picsum.photos/800/400?img=27',
        'https://picsum.photos/800/400?img=28',
        'https://picsum.photos/800/400?img=29',
        'https://picsum.photos/800/400?img=30',
        'https://picsum.photos/800/400?img=31',
        'https://picsum.photos/800/400?img=32',
        'https://picsum.photos/800/400?img=33',
        'https://picsum.photos/800/400?img=34',
        'https://picsum.photos/800/400?img=35',
        'https://picsum.photos/800/400?img=36',
        'https://picsum.photos/800/400?img=37',
        'https://picsum.photos/800/400?img=38',
        'https://picsum.photos/800/400?img=39',
        'https://picsum.photos/800/400?img=40',
        'https://picsum.photos/800/400?img=41',
        'https://picsum.photos/800/400?img=42',
        'https://picsum.photos/800/400?img=43',
        'https://picsum.photos/800/400?img=44',
        'https://picsum.photos/800/400?img=45',
        'https://picsum.photos/800/400?img=46',
        'https://picsum.photos/800/400?img=47',
        'https://picsum.photos/800/400?img=48',
        'https://picsum.photos/800/400?img=49',
        'https://picsum.photos/800/400?img=50',
        'https://picsum.photos/800/400?img=51',
        'https://picsum.photos/800/400?img=52',
        'https://picsum.photos/800/400?img=53',
        'https://picsum.photos/800/400?img=54',
        'https://picsum.photos/800/400?img=55',
        'https://picsum.photos/800/400?img=56',
        'https://picsum.photos/800/400?img=57',
        'https://picsum.photos/800/400?img=58',
        'https://picsum.photos/800/400?img=59',
        'https://picsum.photos/800/400?img=60',
        'https://picsum.photos/800/400?img=61',
        'https://picsum.photos/800/400?img=62',
        'https://picsum.photos/800/400?img=63',
        'https://picsum.photos/800/400?img=64',
        'https://picsum.photos/800/400?img=65',
        'https://picsum.photos/800/400?img=66',
        'https://picsum.photos/800/400?img=67',
        'https://picsum.photos/800/400?img=68',
        'https://picsum.photos/800/400?img=69',
        'https://picsum.photos/800/400?img=70',
        'https://picsum.photos/800/400?img=71',
        'https://picsum.photos/800/400?img=72',
        'https://picsum.photos/800/400?img=73',
        'https://picsum.photos/800/400?img=74',
        'https://picsum.photos/800/400?img=75',
        'https://picsum.photos/800/400?img=76',
        'https://picsum.photos/800/400?img=77',
        'https://picsum.photos/800/400?img=78',
        'https://picsum.photos/800/400?img=79',
        'https://picsum.photos/800/400?img=80',
        'https://picsum.photos/800/400?img=81',
        'https://picsum.photos/800/400?img=82',
        'https://picsum.photos/800/400?img=83',
        'https://picsum.photos/800/400?img=84',
        'https://picsum.photos/800/400?img=85',
        'https://picsum.photos/800/400?img=86',
        'https://picsum.photos/800/400?img=87',
        'https://picsum.photos/800/400?img=88',
        'https://picsum.photos/800/400?img=89',
        'https://picsum.photos/800/400?img=90',
        'https://picsum.photos/800/400?img=91',
        'https://picsum.photos/800/400?img=92',
        'https://picsum.photos/800/400?img=93',
        'https://picsum.photos/800/400?img=94',
        'https://picsum.photos/800/400?img=95',
        'https://picsum.photos/800/400?img=96',
        'https://picsum.photos/800/400?img=97',
        'https://picsum.photos/800/400?img=98',
        'https://picsum.photos/800/400?img=99',
        'https://picsum.photos/800/400?img=100',
        'https://picsum.photos/800/400?img=101',
        'https://picsum.photos/800/400?img=102',
        'https://picsum.photos/800/400?img=103',
        'https://picsum.photos/800/400?img=104',
        'https://picsum.photos/800/400?img=105',
        'https://picsum.photos/800/400?img=106',
        'https://picsum.photos/800/400?img=107',
        'https://picsum.photos/800/400?img=108',
        'https://picsum.photos/800/400?img=109',
        'https://picsum.photos/800/400?img=110',
        'https://picsum.photos/800/400?img=111',
        'https://picsum.photos/800/400?img=112',
        'https://picsum.photos/800/400?img=113',
        'https://picsum.photos/800/400?img=114',
        'https://picsum.photos/800/400?img=115',
        'https://picsum.photos/800/400?img=116',
        'https://picsum.photos/800/400?img=117',
        'https://picsum.photos/800/400?img=118',
        'https://picsum.photos/800/400?img=119',
        'https://picsum.photos/800/400?img=120',
        'https://picsum.photos/800/400?img=121',
        'https://picsum.photos/800/400?img=122',
        'https://picsum.photos/800/400?img=123',
        'https://picsum.photos/800/400?img=124',
        'https://picsum.photos/800/400?img=125',
        'https://picsum.photos/800/400?img=126',
        'https://picsum.photos/800/400?img=127',
        'https://picsum.photos/800/400?img=128',
        'https://picsum.photos/800/400?img=129',
        'https://picsum.photos/800/400?img=131',
        'https://picsum.photos/800/400?img=132',
        'https://picsum.photos/800/400?img=133',
        'https://picsum.photos/800/400?img=134',
        'https://picsum.photos/800/400?img=135',
        'https://picsum.photos/800/400?img=136',
        'https://picsum.photos/800/400?img=137',
        'https://picsum.photos/800/400?img=138',
        'https://picsum.photos/800/400?img=139',
        'https://picsum.photos/800/400?img=140',
        'https://picsum.photos/800/400?img=141',
        'https://picsum.photos/800/400?img=142',
        'https://picsum.photos/800/400?img=143',
        'https://picsum.photos/800/400?img=144',
        'https://picsum.photos/800/400?img=145',
        'https://picsum.photos/800/400?img=146',
        'https://picsum.photos/800/400?img=147',
        'https://picsum.photos/800/400?img=148',
        'https://picsum.photos/800/400?img=149',
        'https://picsum.photos/800/400?img=150',
    ];
    const activeIndexChange = (swiper) => {
        setActiveIndex(swiper.activeIndex-swiper.loopedSlides)
    }
    const onClick = (swiper) => {
        setActiveIndex(swiper.clickedIndex-swiper.loopedSlides)
        swiper.updateActiveIndex(swiper.clickedIndex);
        console.log('event', swiper.activeIndex)
    }


    return (
        <div className={classes.root}>

            <div className="divContainer">
                <div className="swiper-button-prev" ref={previousButtonRef}>
                    Prev
                </div>
                <div className="swiper-button-next" ref={nextButtonRef}>
                    Next
                </div>
                <img
                    width="400"
                    height="400"
                    src={photosToShow[activeIndex]}
                />
            </div>
            <Swiper  loop={true}
                    spaceBetween={10} freeMode={true}
                    watchSlidesProgress={true}
                    className="mySwiper"
                    onClick={onClick}
                    onActiveIndexChange={activeIndexChange}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = previousButtonRef.current
                        swiper.params.navigation.nextEl = nextButtonRef.current
                        swiper.navigation.init() // throws error here, navigation is undefined
                        swiper.navigation.update()
                    }}
                    slidesPerView={4}
                    loopedSlides={0}
                    navigation={{
                prevEl: previousButtonRef.current,
                nextEl: nextButtonRef.current,
            }}>
                {photosToShow.map((imageUrl,index)=>{
                    return (<SwiperSlide key={index}><img src={imageUrl} key={index}/></SwiperSlide>)
                })}
            </Swiper>
        </div>
    )
}