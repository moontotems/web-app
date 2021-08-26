import React from 'react'
import { Col, Button } from 'antd'

export default function Creature({
  imagePath,
  key,
  id,
  name1,
  name2,
  characteristic1,
  characteristic2,
  characteristic3,
  element,
  family,
  generation,
  showAdoptButton
}) {
  const adopt = () => {
    console.log('now adopt:')
    console.log({ this: this })
    let creature = this.props
    delete creature.showAdoptButton
    console.log({ creature })
  }

  return (
    <>
      <div
        style={{
          minHeight: 104
        }}
      >
        <img src={imagePath} width='100%' />
        <div
          style={{
            fontWeight: 700,
            fontSize: '36px'
          }}
        >
          #{id}
        </div>
        <div
          style={{
            margin: '10px 0',
            padding: '10px 0',
            fontWeight: 200,
            fontSize: 16,
            lineHeight: '2.12 em'
          }}
        >
          &quot;{`${name1} ${name2}`}&quot;
          <div style={{ fontSize: 12 }}>
            {characteristic1}, {characteristic2}, {characteristic3}
          </div>
          <div>{element}</div>
          <div>Family: {family}</div>
          <div>Generation: {generation}</div>
        </div>
        {showAdoptButton && <Button onClick={() => adopt()}>Adopt</Button>}
      </div>
    </>
  )
}
