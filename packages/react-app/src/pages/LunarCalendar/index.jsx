import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import { Column } from './components'

export default function LunarCalendar({ ethereumProps, nftAppProps }) {
  const { route, setRoute } = nftAppProps
  return (
    <>
      <Row>
        <Col xs={24} md={5}>
          <div style={{ padding: '20px', fontSize: '20px' }}>Origins</div>
        </Col>
        <Col xs={24} md={10}>
          <div style={{ padding: '20px', fontSize: '25px', fontWeight: 300 }}>
            Talismoons come from the Moon
          </div>
        </Col>
      </Row>
      <Row
        style={{
          marginBottom: '140px'
        }}
      >
        <Col xs={24} md={5}>
          <div style={{ padding: '20px', fontSize: '20px' }}>Lunar Phases</div>
        </Col>
        <Col xs={24} md={10}>
          <div style={{ padding: '20px', fontSize: '25px', fontWeight: 300 }}>
            Talismoons come from the Moon
          </div>
        </Col>
      </Row>
      <Row
        gutter={[8, 24]}
        style={{
          paddingLeft: '85px',
          paddingRight: '85px',
          marginBottom: '80px'
        }}
      >
        <Column
          image='/lunarCalendar/lunarPhases/new_moon.svg'
          title='New Moon'
          description='New Begging, Virgninal'
        />
        <Column
          image='/lunarCalendar/lunarPhases/waxing_crescent.svg'
          title='Waxing Crescent'
          description='Youth, Open'
        />
        <Column
          image='/lunarCalendar/lunarPhases/first_quarter.svg'
          title='First Quarter'
          description='Surrounded by three concentric rings of mountains, uplifted by the colossal impact event that excavated it.'
        />
        <Column
          image='/lunarCalendar/lunarPhases/waxing_gibbous.svg'
          title='Waxing Gibbous'
          description='Exhuberance, excitement, fertile'
        />
      </Row>

      <Row
        gutter={[8, 24]}
        style={{
          paddingLeft: '85px',
          paddingRight: '85px',
          marginBottom: '80px'
        }}
      >
        <Column
          image='/lunarCalendar/lunarPhases/full_moon.svg'
          title='Full Moon'
          description='Pinnacle, peak, climax'
        />
        <Column
          image='/lunarCalendar/lunarPhases/waning_gibbous.svg'
          title='Waning Gibbous'
          description='The Day after, Reflection'
        />
        <Column
          image='/lunarCalendar/lunarPhases/last_quarter.svg'
          title='Last Quarter'
          description='Last Hurrah, Realization Dawning of the Mind'
        />
        <Column
          image='/lunarCalendar/lunarPhases/waxing_crescent.svg'
          title='Waning Crescent'
          description='Old, Wise, Calm, Enlightenment'
        />
      </Row>

      <Row>
        <Col xs={24} md={5}>
          <div style={{ padding: '20px', fontSize: '20px' }}>Origins</div>
        </Col>
        <Col xs={24} md={10}>
          <div style={{ padding: '20px', fontSize: '25px', fontWeight: 300 }}>
            Talismoons come from the Moon
          </div>
        </Col>
      </Row>
    </>
  )
}
