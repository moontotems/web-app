import React from 'react'

export default function Section({ ethereumProps, nftAppProps }) {
  return (
    <div style={{ height: 'auto', overflow: 'hidden' }}>
      <div
        style={{
          padding: '25px',
          fontSize: '20px'
        }}
      >
        Team
      </div>
      <div style={{ width: '100%' }}>
        <div
          style={{
            float: 'left',
            width: '40%',
            marginLeft: '10%',
            textAlign: 'center'
          }}
        >
          <img
            src={
              'https://moontotems.blob.core.windows.net/totems/base/jpeg/2048/moontotems_g1_base_2048_475.jpg'
            }
            style={{
              width: '100%'
            }}
          />
          <div style={{ fontSize: '29px', fontWeight: 600 }}>Gittan Clouds</div>
          <div style={{ fontSize: '27px', fontWeight: 400 }}>
            Ethereal Developer
          </div>
          <a
            href='https://github.com/moontotems'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src='/icons/Logo-Github.svg'
              alt='Moon Totems Github'
              width='50'
              style={{ marginTop: '15px', color: 'white' }}
            />
          </a>
        </div>

        <div
          style={{
            float: 'left',
            width: '40%',
            marginRight: '10%',
            textAlign: 'center'
          }}
        >
          <img
            src={
              'https://moontotems.blob.core.windows.net/totems/base/jpeg/2048/moontotems_g1_base_2048_8996.jpg'
            }
            style={{
              width: '100%'
            }}
          />
          <div style={{ fontSize: '29px', fontWeight: 600 }}>
            Flotsam Theamy
          </div>
          <div style={{ fontSize: '27px', fontWeight: 400 }}>
            Creative Medium
          </div>
          <a
            href='https://instagram.com/moontotems'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src='/icons/Logo-Instagram.svg'
              alt='Moon Totems Instagram'
              width='50'
              style={{ marginTop: '15px', color: 'white' }}
            />
          </a>
        </div>
      </div>
    </div>
  )
}
