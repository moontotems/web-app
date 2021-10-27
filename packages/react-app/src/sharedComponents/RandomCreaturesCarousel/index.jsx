import React from 'react'
import Slider from './components/Slider'

export default function RandomCreaturesCarousel({
  ethereumProps,
  nftAppProps,
  slideDirectionLeft
}) {
  return (
    <Slider
      ethereumProps={ethereumProps}
      nftAppProps={nftAppProps}
      slideDirectionLeft={slideDirectionLeft}
    />
  )
}
