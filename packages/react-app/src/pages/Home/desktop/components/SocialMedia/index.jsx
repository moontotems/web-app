import React from 'react'
import { Row, Col } from 'antd'

export default function Section({ ethereumProps, nftAppProps }) {
  return (
    <>
      <div
        style={{
          marginTop: '2%',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            float: 'left',
            width: '25%',
            padding: '25px',
            fontSize: '20px'
          }}
        >
          What are Talismoons?
        </div>
        <div
          style={{
            float: 'left',
            width: '40%',
            padding: '20px',
            fontSize: '27px',
            fontWeight: 300,
            lineHeight: '35px'
          }}
        >
          Talismoons are beautiful crypto talismans from the moon and discovered
          on the Ethereum blockchain.
        </div>
      </div>
      <div
        style={{
          marginTop: '2%',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            float: 'left',
            width: '25%',
            padding: '25px',
            fontSize: '20px'
          }}
        />
        <div
          style={{
            float: 'left',
            width: '70%',
            padding: '20px',
            fontSize: '27px',
            fontWeight: 300,
            lineHeight: '23px'
          }}
        >
          <div style={{ float: 'left', width: '33%' }}>
            <div
              style={{
                borderLeft: '1px solid #888',
                marginTop: '20px',
                paddingLeft: '15px'
              }}
            >
              <div style={{ fontSize: '22px', fontWeight: 400 }}>Instagram</div>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                For visual stories and explorations into the art.
              </div>
              <img
                src='/home/icons/Logo-Instagram.svg'
                alt='Talismoons Instagram'
              />
            </div>
          </div>
          <div style={{ float: 'left', width: '33%' }}>
            <div
              style={{
                borderLeft: '1px solid #888',
                marginTop: '20px',
                paddingLeft: '15px'
              }}
            >
              <div style={{ fontSize: '22px', fontWeight: 400 }}>Twitter</div>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                For the latest announcements and updates.
              </div>
              <img
                src='/home/icons/Logo-Twitter.svg'
                alt='Talismoons Twitter'
              />
            </div>
          </div>
          <div style={{ float: 'left', width: '33%' }}>
            <div
              style={{
                borderLeft: '1px solid #888',
                marginTop: '20px',
                paddingLeft: '15px'
              }}
            >
              <div style={{ fontSize: '22px', fontWeight: 400 }}>Discord</div>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                For connecting with the Talismoon Community.
              </div>
              <img
                src='/home/icons/Logo-Discord.svg'
                alt='Talismoons Discord'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
