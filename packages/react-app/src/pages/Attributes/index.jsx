import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import { MoonColumn } from './components'

export default function AttributesPage({ ethereumProps, nftAppProps }) {
  const { route, setRoute } = nftAppProps

  const cardStyles = {
    container: {
      width: '20%',
      backgroundColor: 'rgb(0,0,0, 0.6)'
    },
    title: {
      marginTop: '10px',
      padding: '10px',
      fontSize: '20px'
    },
    content: {
      padding: '10px',
      paddingBottom: '30px',
      fontSize: '16px'
    }
  }
  return (
    <>
      <Row>
        <Col xs={24} md={5}>
          <div style={{ padding: '20px', fontSize: '20px' }}>
            Characteristics
          </div>
        </Col>
        <Col xs={24} md={10}>
          <div style={{ padding: '20px', fontSize: '25px', fontWeight: 300 }}>
            Unique DNA combination of attributes
          </div>
        </Col>
      </Row>
      <div></div>
      <Row
        style={{
          background:
            'url(/attributes/talismoons_attributes.jpg) no-repeat center center fixed',
          backgroundSize: 'cover',
          paddingTop: '40%',
          paddingBottom: '40%'
        }}
      >
        <div style={{ float: 'left', width: '100%' }}>
          <div
            style={{
              float: 'left',
              ...cardStyles.container
              //marginTop: '40%'
            }}
          >
            <img
              src='/attributes/talismonns_attributes_eyes.jpg'
              style={{ width: '100%' }}
            />
            <div style={{ ...cardStyles.title }}>Eyes</div>
            <div style={{ ...cardStyles.content }}>
              Eyes are the window to the soul. Totem eyes have different shapes.
              In rare cases Totems can have asymmetrical or even multicolor
              eyes.
            </div>
          </div>
          <div
            style={{
              float: 'right',
              ...cardStyles.container
              //marginTop: '40%'
            }}
          >
            <img
              src='/attributes/talismoons_attributes_materiality.jpg'
              style={{ width: '100%' }}
            />
            <div style={{ ...cardStyles.title }}>Materiality</div>
            <div style={{ ...cardStyles.content }}>
              Eyes are the window to the soul. Totem eyes have different shapes.
              In rare cases Totems can have asymmetrical or even multicolor
              eyes.
            </div>
          </div>
        </div>
        <div style={{ float: 'left', width: '100%' }}>
          <div
            style={{
              float: 'left',
              ...cardStyles.container
            }}
          >
            <img
              src='/attributes/talismonns_attributes_child_moons.jpg'
              style={{ width: '100%' }}
            />
            <div style={{ ...cardStyles.title }}>Child Moon</div>
            <div style={{ ...cardStyles.content }}>
              Eyes are the window to the soul. In rare cases Totems can have
              asymmetrical or even multicolor eyes.
            </div>
          </div>
          <div
            style={{
              float: 'right',
              ...cardStyles.container
            }}
          >
            <img
              src='/attributes/talismoons_attributes_complexity.jpg'
              style={{ width: '100%' }}
            />
            <div style={{ ...cardStyles.title }}>Complexity</div>
            <div style={{ ...cardStyles.content }}>
              Eyes are the window to the soul. In rare cases Totems can have
              asymmetrical or even multicolor eyes.
            </div>
          </div>
        </div>
      </Row>
    </>
  )
}
