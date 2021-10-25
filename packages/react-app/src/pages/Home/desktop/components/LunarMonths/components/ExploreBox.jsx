import React from 'react'
import { ArrowRight32, ArrowLeft32 } from '@carbon/icons-react'

export default function ExploreBox({ sliderRef, currentSlideIndex }) {
  if (currentSlideIndex === 0) {
    return (
      <div
        className='explore-box'
        style={{
          position: 'absolute',
          bottom: 150,
          right: 0,
          height: '150px',
          width: '350px',
          marginTop: '20%',
          padding: '15px',
          cursor: 'pointer'
        }}
      >
        <div
          onClick={() => sliderRef.slickNext()}
          style={{
            position: 'relative',
            height: '100%',
            width: '100%'
          }}
        >
          <div
            style={{
              width: '100%',
              fontSize: '17px',
              lineHeight: '28px'
            }}
          >
            Explore the characteristics of the Lunar Months
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0
            }}
          >
            <ArrowRight32 style={{ color: '#00FF74' }} />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <div
          className='explore-box'
          style={{
            position: 'absolute',
            bottom: 150,
            right: 175,
            height: '150px',
            width: '175px',
            marginTop: '20%',
            padding: '15px',
            cursor: 'pointer'
          }}
        >
          <div
            onClick={() => sliderRef.slickPrev()}
            style={{
              position: 'relative',
              height: '100%',
              width: '100%'
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0
              }}
            >
              <ArrowLeft32 style={{ color: '#fff' }} />
            </div>
          </div>
        </div>
        <div
          className='explore-box'
          style={{
            position: 'absolute',
            bottom: 150,
            right: 0,
            height: '150px',
            width: '175px',
            marginTop: '20%',
            padding: '15px',
            cursor: 'pointer'
          }}
        >
          <div
            onClick={() => sliderRef.slickNext()}
            style={{
              position: 'relative',
              height: '100%',
              width: '100%'
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0
              }}
            >
              <ArrowRight32 style={{ color: '#fff' }} />
            </div>
          </div>
        </div>
      </>
    )
  }
}
