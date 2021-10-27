import React, { useEffect } from 'react'
import { Row, Col } from 'antd'
import { MoonColumn } from './components'

export default function LunarOrigins({ ethereumProps, nftAppProps }) {
  // scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Row>
        <Col xs={2} md={5} />
        <Col xs={24} md={19}>
          <img
            src='/moontotems_origin_map_full.jpg'
            style={{ float: 'right', width: '100%', marginBottom: '80px' }}
          />
        </Col>
      </Row>
      <Row gutter={[8, 24]}>
        <Col xs={24} md={5}>
          <div style={{ padding: '20px', fontSize: '20px' }}>Lunar Origins</div>
        </Col>
        <MoonColumn
          moon={{
            image: '/lunarOrigins/sea_of_rains.jpeg',
            symbol: '/lunarOrigins/bay_of_success.svg',
            name: 'Sea of Rains',
            nameLatin: 'Mare Imbrium',
            description: ''
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/sea_of_fertility.jpeg',
            symbol: '/lunarOrigins/sea_of_fertility.svg',
            name: 'Sea of Fertility',
            nameLatin: 'Mare Fecunditatis',
            description: ''
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/sea_of_tranquility.jpeg',
            symbol: '/lunarOrigins/sea_of_tranquility.svg',
            name: 'Sea of Tranquility',
            nameLatin: 'Mare Tranquillitatis',
            description: ''
          }}
        />
        <Col xs={24} md={4} />
      </Row>

      <Row gutter={[8, 24]}>
        <Col xs={24} md={5}></Col>
        <MoonColumn
          moon={{
            image: '/lunarOrigins/sea_of_clouds.jpeg',
            symbol: '/lunarOrigins/sea_of_clouds.svg',
            name: 'Sea of Clouds',
            nameLatin: 'Mare Nubium',
            description: ''
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/sea_of_islands.jpeg',
            symbol: '/lunarOrigins/sea_of_islands.svg',
            name: 'Sea of Islands',
            nameLatin: 'Mare Insularum',
            description: ''
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/lake_of_dreams.jpeg',
            symbol: '/lunarOrigins/lake_of_dreams.svg',
            name: 'Lake of Dreams',
            nameLatin: 'Lacus Somniorum',
            description: ''
          }}
        />
        <Col xs={24} md={4} />
      </Row>

      <Row gutter={[8, 24]}>
        <Col xs={24} md={5}></Col>
        <MoonColumn
          moon={{
            image: '/lunarOrigins/bay_of_rainbows.jpeg',
            symbol: '/lunarOrigins/bay_of_rainbows.svg',
            name: 'Bay of Rainbows',
            nameLatin: 'Sinus Iridum',
            description: ''
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/peninsula_of_thunder.jpeg',
            symbol: '/lunarOrigins/peninsula_of_thunder.svg',
            name: 'Peninsula of Thunder',
            nameLatin: 'Peninsula Fulminum',
            description: ''
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/bay_of_harmony.jpeg',
            symbol: '/lunarOrigins/bay_of_harmony.svg',
            name: 'Bay of Harmony',
            nameLatin: 'Sinus Concordiae',
            description: ''
          }}
        />
        <Col xs={24} md={4} />
      </Row>

      <Row gutter={[8, 24]}>
        <Col xs={24} md={5}></Col>
        <MoonColumn
          moon={{
            image: '/lunarOrigins/bay_of_success.jpeg',
            symbol: '/lunarOrigins/bay_of_success.svg',
            name: 'Bay of Success',
            nameLatin: 'Sinus Successus',
            description: ''
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/bay_of_love.jpeg',
            symbol: '/lunarOrigins/bay_of_love.svg',
            name: 'Bay of Love',
            nameLatin: 'Sinus Amoris',
            description: ''
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/lake_of_time.jpeg',
            symbol: '/lunarOrigins/lake_of_time.svg',
            name: 'Lake of Time',
            nameLatin: 'Lacus Temporis',
            description: ''
          }}
        />
        <Col xs={24} md={4} />
      </Row>

      <Row gutter={[8, 24]}>
        <Col xs={24} md={5}></Col>
        <MoonColumn
          moon={{
            image: '/lunarOrigins/lake_of_happiness.jpeg',
            symbol: '/lunarOrigins/lake_of_happiness.svg',
            name: 'Lake of Happiness',
            nameLatin: 'Lacus Felicitatis',
            description: ''
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/lake_of_hope.jpeg',
            symbol: '/lunarOrigins/lake_of_hope.svg',
            name: 'Lake of Hope',
            nameLatin: 'Lacus Spei',
            description: ''
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/lake_of_softness.jpeg',
            symbol: '/lunarOrigins/lake_of_softness.svg',
            name: 'Lake of Softness',
            nameLatin: 'Lacus Lenitatis',
            description: ''
          }}
        />
        <Col xs={24} md={4} />
      </Row>

      <Row gutter={[8, 24]}>
        <Col xs={24} md={5}></Col>
        <MoonColumn
          moon={{
            image: '/lunarOrigins/lake_of_perserverance.jpeg',
            symbol: '/lunarOrigins/lake_of_perserverance.svg',
            name: 'Lake of Perseverance',
            nameLatin: 'Lacus Perseverantiae',
            description: ''
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/lake_of_forgetfulness.jpeg',
            symbol: '/lunarOrigins/lake_of_forgetfulness.svg',
            name: 'Lake of Forgetfulness',
            nameLatin: 'Lacus Oblivionis',
            description: ''
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/lake_of_luxury.jpeg',
            symbol: '/lunarOrigins/lake_of_luxury.svg',
            name: 'Lake of Luxury',
            nameLatin: 'Lacus Luxuriae',
            description: ''
          }}
        />
        <Col xs={24} md={4} />
      </Row>
    </>
  )
}
