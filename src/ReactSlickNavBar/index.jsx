import React, {Component, useEffect, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.scss'
export default function AsNavFor()  {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);

    useEffect(() => {

        setNav1(slider1);
        setNav2(slider2);

    });
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
    };
    const slidesData = [
        {
            id: 1,
            title: 'repellendus id ullam',
            label: 'Dolorem officiis temporibus.'
        }, {
            id: 2,
            title: 'excepturi consequatur est',
            label: 'Officia non provident dolor esse et neque.'
        }, {
            id: 3,
            title: 'eius doloribus blanditiis',
            label: 'Ut recusandae vel vitae molestiae id soluta.'
        }, {
            id: 4,
            title: 'nihil voluptates delectus',
            label: 'Qui vel consequatur recusandae illo repellendus.'
        }, {
            id: 5,
            title: 'nemo dolorem necessitatibus',
            label: 'Placeat odit velit itaque voluptatem.'
        },  {
            id: 6,
            title: 'dolorem quibusdam quasi',
            label: 'Adipisci officiis repudiandae.'
        },
        {
            id: 7,
            title: 'dolorem quibusdam quasi',
            label: 'Adipisci officiis repudiandae.'
        },
        {
            id: 8,
            title: 'dolorem quibusdam quasi',
            label: 'Adipisci officiis repudiandae.'
        },
        {
            id: 9,
            title: 'dolorem quibusdam quasi',
            label: 'Adipisci officiis repudiandae.'
        },
        {
            id: 10,
            title: 'dolorem quibusdam quasi',
            label: 'Adipisci officiis repudiandae.'
        },
        {
            id: 11,
            title: 'dolorem quibusdam quasi',
            label: 'Adipisci officiis repudiandae.'
        },
        {
            id: 12,
            title: 'dolorem quibusdam quasi',
            label: 'Adipisci officiis repudiandae.'
        },
        {
            id: 13,
            title: 'dolorem quibusdam quasi',
            label: 'Adipisci officiis repudiandae.'
        },
        {
            id: 14,
            title: 'dolorem quibusdam quasi',
            label: 'Adipisci officiis repudiandae.'
        },
        {
            id: 15,
            title: 'dolorem quibusdam quasi',
            label: 'Adipisci officiis repudiandae.'
        },
        {
            id: 16,
            title: 'dolorem quibusdam quasi',
            label: 'Adipisci officiis repudiandae.'
        },
        {
            id: 17,
            title: 'dolorem quibusdam quasi',
            label: 'Adipisci officiis repudiandae.'
        },
        {
            id: 18,
            title: 'dolorem quibusdam quasi',
            label: 'Adipisci officiis repudiandae.'
        },
        {
            id: 19,
            title: 'dolorem quibusdam quasi',
            label: 'Adipisci officiis repudiandae.'
        },
        {
            id: 20,
            title: 'dolorem quibusdam quasi',
            label: 'Adipisci officiis repudiandae.'
        },
    ];
    const settingsThumbs = {
        className: "center",
        infinite: true,
        asNavFor: '.slider-for',
        dots: false,
        centerMode: true,
        swipeToSlide: true,
        focusOnSelect: true,
        slidesToShow:7
    };
        return (
           <div>
               <h2>Slider Syncing (AsNavFor)</h2>
               <Slider
                   asNavFor={nav2}
                  ref={slider => (setSlider1(slider))}
                   {...settings}
               >
                   {slidesData.map((slide) =>

                       <div className="slick-slide" key={slide.id}>
                           <img className="slick-slide-image" src={`https://picsum.photos/800/400?img=${slide.id}`}  alt={slide.id}/>
                       </div>

                   )}
               </Slider>
               <div className="thumbnail-slider-wrap">
                   <Slider
                       {...settingsThumbs}
                       asNavFor={nav1}
                       ref={slider => (setSlider2(slider))}>
                   {slidesData.map((slide) =>

                       <div className="slick-slide" key={slide.id}>
                           <img className="slick-slide-image" src={`https://picsum.photos/800/400?img=${slide.id}`}  alt={slide.id}/>
                       </div>

                   )}
               </Slider>
               </div>
           </div>
        );
}
