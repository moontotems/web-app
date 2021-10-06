import React from 'react'

export default function Slide2({ ethereumProps, nftAppProps }) {
  return (
    <>
      <img
        src='/home/TALISMOON_CARD_SQUARE_03963.jpg'
        style={{ float: 'left', height: '80vh' }}
      />
      <div
        style={{
          position: 'absolute',
          top: '10vh',
          right: '5%',
          height: '150px',
          width: '350px',
          padding: '15px',
          fontSize: '25px',
          fontWeight: '300',
          lineHeight: '35px'
        }}
      >
        Every Talismoon has a unique name, title and personality traits.
      </div>
    </>
  )
}
