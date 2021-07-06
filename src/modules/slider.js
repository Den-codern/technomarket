import { $, hasClass, addClass, removeClass } from "../core/dom";
import $extendObj from "../core/utils";



export default class Slider {
    constructor(settings = {}) {

        this.def = {
            target: $('.slider'),
            arrowLeft: $('.arrow-left'),
            arrowRight: $('.arrow-right'),
            dotsWrapper: $('.dots-wrapper'),
            transition: {
                speed: 300,
                easing: ''

            },
            swipe: true,
            autoHeight: true
        }

        $extendObj(this.def, settings)

        this.init()

    }

    init = () => {
        const { def } = this
        console.log(def);


        const nowHTML = def.target.innerHTML
        def.target.innerHTML = `<div class="slider__inner">${nowHTML}</div>`


        this.curSlide = 0
        this.curLeft = 0
        this.allSlides = 0
        this.totalSlides = def.target.querySelectorAll('.slide').length
        this.sliderInner = def.target.querySelector('.slider__inner');


        const firstClone = def.target.querySelectorAll('.slide')[0].cloneNode(true)
        this.sliderInner.appendChild(firstClone)
        const lastClone = def.target.querySelectorAll('.slide')[this.totalSlides - 1].cloneNode(true)
        this.sliderInner.prepend(lastClone)

        this.curSlide++
        this.allSlides = def.target.querySelectorAll('.slide')
        this.slideW = parseInt(def.target.querySelectorAll('.slide')[0].offsetWidth);
        this.sliderInner.style.width = this.totalSlides * (623.3 * 2) + 40 + 'px'

        this.buildDots()
        this.initArrows()
        this.gotoSlide()
    }

    initArrows = () => {
        const { def } = this


        if (def.arrowLeft !== '') {
            def.arrowLeft.addEventListener('click', () => {
                if (!hasClass(def.target, 'isAnimating')) {

                    if (this.curSlide == 1) {

                        this.curSlide = this.totalSlides;

                        this.sliderInner.style.left = -this.curSlide * this.slideW + 'px';

                    }
                    this.curSlide--;
                    setTimeout(() => {
                        this.gotoSlide();
                    }, 20);
                }
            }, false);
        }

        if (def.arrowRight !== '') {
            def.arrowRight.addEventListener('click', () => {
                if (!hasClass(def.target, 'isAnimating')) {
                    if (this.curSlide == this.totalSlides) {
                        this.curSlide = 0;
                        this.sliderInner.style.left = -this.curSlide * this.slideW + 'px';

                    }
                    this.curSlide++;
                    setTimeout(() => {
                        this.gotoSlide();
                    }, 20);
                }
            }, false);
        }
    }



    buildDots = () => {
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('li')
            dot.setAttribute('data-slide', i + 1)

            this.def.dotsWrapper.appendChild(dot)
        }

        this.def.dotsWrapper.addEventListener('click', (e) => {
            if (e.target && e.target.nodeName == 'LI') {
                this.curSlide = e.target.dataset.slide
                this.gotoSlide()
            }
        }, false)
    }
    gotoSlide = () => {
        this.sliderInner.style.transition = 'left ' + this.def.transition.speed / 1000 + 's ' + this.def.transition.easing;
        this.sliderInner.style.left = -this.curSlide * this.slideW + 'px';
        addClass(this.def.target, 'isAnimating');
        setTimeout(() => {
            this.sliderInner.style.transition = '';
            removeClass(this.def.target, 'isAnimating');
        }, this.def.transition.speed);
    }

}
