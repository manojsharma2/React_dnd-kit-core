import * as React from 'react'
import * as ReactDOM from 'react-dom'
import SwiperSlider from "./Swiper/swiper";
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { create } from 'jss';

export default class AppWebComponent extends HTMLElement {
    constructor() {
        super();
        console.log('constructor');
    }

    connectedCallback() {
        const mountPoint = document.createElement('span');
        this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
        const jss = create({
            ...jssPreset(),
            insertionPoint: mountPoint
        });

        ReactDOM.render( <StylesProvider jss={jss}><SwiperSlider/></StylesProvider>, mountPoint);
    }
}
window.customElements.define('app-web-component', AppWebComponent);