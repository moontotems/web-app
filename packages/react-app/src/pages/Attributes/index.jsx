import React, { useEffect } from 'react'
import { Row, Col } from 'antd'

export default function AttributesPage({ ethereumProps, nftAppProps }) {
  // scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const cardStyles = {
    wrapper: {
      position: 'absolute',
      width: '350px',
      padding: '15px'
    },
    container: {
      backgroundColor: 'rgb(0,0,0, 0.6)'
    },
    title: {
      marginTop: '10px',
      padding: '10px',
      fontSize: '20px'
    },
    content: {
      height: '130px',
      padding: '10px',
      paddingBottom: '30px',
      fontSize: '16px'
    }
  }
  return (
    <>
      <Row>
        <Col xs={24} md={5}>
          <div style={{ padding: '40px', fontSize: '20px' }}>
            Characteristics
          </div>
        </Col>
        <Col xs={24} md={10}>
          <div style={{ padding: '40px', fontSize: '27px', fontWeight: 300 }}>
            Unique DNA combination of attributes
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <img
            src='/attributes/moon_totems_attributes.jpg'
            style={{ float: 'right', width: '100%' }}
          />

          <div
            style={{
              ...cardStyles.wrapper,
              bottom: 500,
              left: 0
            }}
          >
            <div
              style={{
                ...cardStyles.container
              }}
            >
              <img
                src='/attributes/moon_totems_attributes_eyes.jpg'
                style={{ width: '100%' }}
              />
              <div style={{ ...cardStyles.title }}>Eyes</div>
              <div style={{ ...cardStyles.content }}>
                Eyes are the window to the soul. Moon Totems eyes have different
                shapes. In rare cases Moon Totems can have asymmetrical or even
                multicolor eyes.
              </div>
            </div>
          </div>

          <div
            style={{
              ...cardStyles.wrapper,
              bottom: 500,
              right: 0
            }}
          >
            <div
              style={{
                ...cardStyles.container
              }}
            >
              <img
                src='/attributes/moon_totems_attributes_complexity.jpg'
                style={{ width: '100%' }}
              />
              <div style={{ ...cardStyles.title }}>Complexity</div>
              <div style={{ ...cardStyles.content }}>
                Each Moon Totem is a One-of-a-Kind.
              </div>
            </div>
          </div>

          <div
            style={{
              ...cardStyles.wrapper,
              bottom: 'calc(500px - 510px)',
              left: 0
            }}
          >
            <div
              style={{
                ...cardStyles.container
              }}
            >
              <img
                src='/attributes/moon_totems_attributes_child_moons.jpeg'
                style={{ width: '100%' }}
              />
              <div style={{ ...cardStyles.title }}>Child Moon</div>
              <div style={{ ...cardStyles.content }}>
                Each Totem has a small child Totem.
              </div>
            </div>
          </div>

          <div
            style={{
              ...cardStyles.wrapper,
              bottom: 'calc(500px - 510px)',
              right: 0
            }}
          >
            <div
              style={{
                ...cardStyles.container
              }}
            >
              <img
                src='/attributes/moon_totems_attributes_materiality.jpg'
                style={{ width: '100%' }}
              />
              <div style={{ ...cardStyles.title }}>Texture </div>
              <div style={{ ...cardStyles.content }}>
                Totems have different textures. Some are smooth, some have
                embossed or perforated patterns.
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}
