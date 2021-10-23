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
            description: 'Stimulating'
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/sea_of_fertility.jpeg',
            symbol: '/lunarOrigins/sea_of_fertility.svg',
            name: 'Sea of Fertility',
            nameLatin: 'Mare Fecunditatis',
            description: 'Creative & productive'
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/sea_of_tranquility.jpeg',
            symbol: '/lunarOrigins/sea_of_tranquility.svg',
            name: 'Sea of Tranquility',
            nameLatin: 'Mare Tranquillitatis',
            description: 'Calm'
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
            description: 'Voluptuous, Soft'
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/sea_of_islands.jpeg',
            symbol: '/lunarOrigins/sea_of_islands.svg',
            name: 'Sea of Islands',
            nameLatin: 'Mare Insularum',
            description: 'Independent'
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/lake_of_dreams.jpeg',
            symbol: '/lunarOrigins/lake_of_dreams.svg',
            name: 'Lake of Dreams',
            nameLatin: 'Lacus Somniorum',
            description: 'Imaginative, Visionary'
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
            description: `Surrounded by three concentric rings of mountains, uplifted by the
              colossal impact event that excavated it.`
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/peninsula_of_thunder.jpeg',
            symbol: '/lunarOrigins/peninsula_of_thunder.svg',
            name: 'Peninsula of Thunder',
            nameLatin: 'Peninsula Fulminum',
            description: `Surrounded by three concentric rings of mountains, uplifted by the
              colossal impact event that excavated it.`
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/bay_of_harmony.jpeg',
            symbol: '/lunarOrigins/bay_of_harmony.svg',
            name: 'Bay of Harmony',
            nameLatin: 'Sinus Concordiae',
            description: `Surrounded by three concentric rings of mountains, uplifted by the
              colossal impact event that excavated it.`
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
            description: `Surrounded by three concentric rings of mountains, uplifted by the
              colossal impact event that excavated it.`
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/bay_of_love.jpeg',
            symbol: '/lunarOrigins/bay_of_love.svg',
            name: 'Bay of Love',
            nameLatin: 'Sinus Amoris',
            description: `Surrounded by three concentric rings of mountains, uplifted by the
              colossal impact event that excavated it.`
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/lake_of_time.jpeg',
            symbol: '/lunarOrigins/lake_of_time.svg',
            name: 'Lake of Time',
            nameLatin: 'Lacus Temporis',
            description: `Surrounded by three concentric rings of mountains, uplifted by the
              colossal impact event that excavated it.`
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
            description: `Surrounded by three concentric rings of mountains, uplifted by the
              colossal impact event that excavated it.`
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/lake_of_hope.jpeg',
            symbol: '/lunarOrigins/lake_of_hope.svg',
            name: 'Lake of Hope',
            nameLatin: 'Lacus Spei',
            description: `Surrounded by three concentric rings of mountains, uplifted by the
              colossal impact event that excavated it.`
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/lake_of_softness.jpeg',
            symbol: '/lunarOrigins/lake_of_softness.svg',
            name: 'Lake of Softness',
            nameLatin: 'Lacus Lenitatis',
            description: `Surrounded by three concentric rings of mountains, uplifted by the
              colossal impact event that excavated it.`
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
            description: `Surrounded by three concentric rings of mountains, uplifted by the
              colossal impact event that excavated it.`
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/lake_of_forgetfulness.jpeg',
            symbol: '/lunarOrigins/lake_of_forgetfulness.svg',
            name: 'Lake of Forgetfulness',
            nameLatin: 'Lacus Oblivionis',
            description: `Surrounded by three concentric rings of mountains, uplifted by the
              colossal impact event that excavated it.`
          }}
        />
        <MoonColumn
          moon={{
            image: '/lunarOrigins/lake_of_luxury.jpeg',
            symbol: '/lunarOrigins/lake_of_luxury.svg',
            name: 'Lake of Luxury',
            nameLatin: 'Lacus Luxuriae',
            description: `Surrounded by three concentric rings of mountains, uplifted by the
              colossal impact event that excavated it.`
          }}
        />
        <Col xs={24} md={4} />
      </Row>
    </>
  )
}
