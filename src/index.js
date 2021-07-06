import { $ } from './core/dom';
import './index.scss';
import 'animate.css'
import Slider from './modules/slider';
import mixitup from 'mixitup'


const sliderSettings = {
    arrowLeft: $('.slider__left'),
    arrowRight: $('.slider__right'),
    dotsWrapper: $('.slider__dots')
}


new Slider(sliderSettings)

mixitup($('.tabcontent__inner'), {
    load: {
        filter: $('.tab-delivery')
    }
})



