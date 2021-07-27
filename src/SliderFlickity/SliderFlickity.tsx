import React from "react";
import Flickity from "react-flickity-component";
import "flickity/dist/flickity.min.css";
import './flickity.scss'
import "flickity-as-nav-for";

export default function SliderFlickity() {
    const flickityOptions = {
        asNavFor: ".carousel-main",
        contain: true,
        pageDots: false,
        arrowShape:
            "M100,47.564v4.632c0,3.014-2.532,5.609-5.546,5.609H27.382l21.273,21.2   c1.03,1.028,1.595,2.33,1.595,3.791c0,1.464-0.564,2.836-1.595,3.863l-3.273,3.275c-1.029,1.027-2.4,1.594-3.863,1.594   c-1.464,0-2.836-0.565-3.865-1.594L1.595,53.877C0.561,52.845-0.004,51.467,0,49.995c-0.004-1.464,0.561-2.84,1.595-3.874   l36.059-36.056c1.029-1.029,2.402-1.594,3.865-1.594s2.834,0.569,3.863,1.598l3.273,3.275c1.03,1.032,1.595,2.416,1.595,3.88   c0,1.463-0.564,2.858-1.595,3.887L27.619,42.192h66.916l-0.156-0.034C97.393,42.159,100,44.553,100,47.564"
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

    return (
        <div className="App">
            <Flickity
                className="carousel-main"
            >
                {slidesData.map((slide:any) =>

                    <div className="carousel-cell" key={slide.id}>
                        <img className="slick-slide-image" src={`https://picsum.photos/800/400?img=${slide.id}`}  alt={slide.id}/>
                    </div>

                )}
            </Flickity>

            <Flickity
                className={'carousel-nav'}
                options={flickityOptions}
            >
                {slidesData.map((slide:any) =>

                    <div className="carousel-cell" key={slide.id}>
                        <img className="slick-slide-image" src={`https://picsum.photos/800/400?img=${slide.id}`}  alt={slide.id}/>
                    </div>

                )}
            </Flickity>
        </div>
    );
}
