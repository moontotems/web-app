import React, { useState, useEffect } from 'react'
import $ from 'jquery'
// https://www.npmjs.com/package/react-slick
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slide from './Slide'

export default function MySlider({
  slideContents,
  setCurrentSlideIndex,
  sliderRef,
  setSliderRef
}) {
  var maxDots = 3
  var transformXIntervalNext = -18
  var transformXIntervalPrev = 18

  const animateDots = (currentSlide, nextSlide) => {
    const slider = $('#dots')
    let transformCount = 0
    let totalCount = slider.find('.slick-dots li').length
    const swipingLeft = nextSlide < currentSlide
    const swipingRight = nextSlide > currentSlide
    if (totalCount > maxDots) {
      if (swipingRight) {
        // swiping right
        if (
          slider
            .find('ul.slick-dots li.dot-index-' + nextSlide)
            .hasClass('n-small-1')
        ) {
          const lastChildIsSmall = slider
            .find('ul.slick-dots li:last-child')
            .hasClass('n-small-1')
          if (!lastChildIsSmall) {
            transformCount = transformCount + transformXIntervalNext
            slider
              .find('ul.slick-dots li.dot-index-' + nextSlide)
              .removeClass('n-small-1')
            let nextSlidePlusOne = nextSlide + 1
            slider
              .find('ul.slick-dots li.dot-index-' + nextSlidePlusOne)
              .addClass('n-small-1')
            slider
              .find('ul.slick-dots')
              .css('transform', 'translateX(' + transformCount + 'px)')
            let pPointer = nextSlide - 3
            let pPointerMinusOne = pPointer - 1
            slider
              .find('ul.slick-dots li')
              .eq(pPointerMinusOne)
              .removeClass('p-small-1')
            slider.find('ul.slick-dots li').eq(pPointer).addClass('p-small-1')
          }
        }
      }
      if (swipingLeft) {
        // swiping left
        if (
          slider
            .find('ul.slick-dots li.dot-index-' + nextSlide)
            .hasClass('p-small-1')
        ) {
          // if it is not the first dot that is small
          if (
            !slider.find('ul.slick-dots li:first-child').hasClass('p-small-1')
          ) {
            transformCount = transformCount + transformXIntervalPrev
            slider
              .find('ul.slick-dots li.dot-index-' + nextSlide)
              .removeClass('p-small-1')
            let nextSlidePlusOne = nextSlide - 1
            slider
              .find('ul.slick-dots li.dot-index-' + nextSlidePlusOne)
              .addClass('p-small-1')
            slider
              .find('ul.slick-dots')
              .css('transform', 'translateX(' + transformCount + 'px)')
            let nPointer = currentSlide + 3
            let nPointerMinusOne = nPointer - 1
            slider
              .find('ul.slick-dots li')
              .eq(nPointer)
              .removeClass('n-small-1')
            slider
              .find('ul.slick-dots li')
              .eq(nPointerMinusOne)
              .addClass('n-small-1')
          }
        }
      }
    }
  }

  useEffect(() => {
    $(document).ready(function () {
      function setBoundries(slick, state) {
        if (state === 'default') {
          slick.find('ul.slick-dots li').eq(1).addClass('n-small-1')
        }
      }

      $('#dots')
        .find('ul.slick-dots li')
        .each(function (index) {
          $(this).addClass('dot-index-' + index)
        })
      $('#dots').find('ul.slick-dots').css('transform', 'translateX(0)')
      setBoundries($('#dots'), 'default')
    })
  }, [])

  useEffect(() => {
    document.onkeydown = e => {
      e.preventDefault()
      const LEFT_KEY = 37
      const RIGHT_KEY = 39

      if (e.which == LEFT_KEY) {
        sliderRef.slickPrev()
      }
      if (e.which == RIGHT_KEY) {
        sliderRef.slickNext()
      }
    }
  }, [sliderRef])

  const sliderSettings = {
    ref: slider => setSliderRef(slider),
    infinite: false,
    //initialSlide: 3,
    speed: 750,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    //appendDots: dots => $('#slickDots'),
    arrows: false,
    //nextArrow: null,
    //prevArrow: null,
    // https://react-slick.neostack.com/docs/api/#lazyLoad
    //lazyLoad: true,
    //onSwipe: () => console.log('onSwipe'),
    beforeChange: (current, next) => {
      setCurrentSlideIndex(next)
      animateDots(current, next)
    }
    //afterChange: current => {}
  }

  return (
    <Slider {...sliderSettings}>
      {slideContents.map((slideContent, index) => {
        return (
          <div key={`slide-${index}`} style={{ float: 'left', width: '50%' }}>
            <div style={{ position: 'relative' }}>
              <Slide image={slideContent.image} />
            </div>
          </div>
        )
      })}
    </Slider>
  )
}
