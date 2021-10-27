import React from 'react'

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
          @moontotemsnft
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
          Moon Totems are beautiful crypto talismans from the moon and
          discovered on the Ethereum blockchain.
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
          <div style={{ float: 'left', width: '25%' }}>
            <div
              style={{
                borderLeft: '1px solid #888',
                marginTop: '20px',
                paddingLeft: '15px'
              }}
            >
              <a
                href='https://instagram.com/moontotems'
                target='_blank'
                rel='noreferrer'
              >
                <div style={{ fontSize: '22px', fontWeight: 400 }}>
                  Instagram
                </div>
              </a>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                For visual stories and explorations into the art.
              </div>
              <a
                href='https://instagram.com/moontotems'
                target='_blank'
                rel='noreferrer'
              >
                <img
                  src='/home/icons/Logo-Instagram.svg'
                  alt='Moon Totems Instagram'
                />
              </a>
            </div>
          </div>
          <div style={{ float: 'left', width: '25%' }}>
            <div
              style={{
                borderLeft: '1px solid #888',
                marginTop: '20px',
                paddingLeft: '15px'
              }}
            >
              <a
                href='https://twitter.com/moontotemsnft'
                target='_blank'
                rel='noreferrer'
              >
                <div style={{ fontSize: '22px', fontWeight: 400 }}>Twitter</div>
              </a>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                For the latest announcements and updates.
              </div>
              <a
                href='https://twitter.com/moontotemsnft'
                target='_blank'
                rel='noreferrer'
              >
                <img
                  src='/home/icons/Logo-Twitter.svg'
                  alt='Moon Totems Twitter'
                />
              </a>
            </div>
          </div>
          <div style={{ float: 'left', width: '25%' }}>
            <div
              style={{
                borderLeft: '1px solid #888',
                marginTop: '20px',
                paddingLeft: '15px'
              }}
            >
              <a
                href='https://discord.gg/73vMqt7k7H'
                target='_blank'
                rel='noreferrer'
              >
                <div style={{ fontSize: '22px', fontWeight: 400 }}>Discord</div>
              </a>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                For connecting with the Moon Totem Community.
              </div>
              <a
                href='https://discord.gg/73vMqt7k7H'
                target='_blank'
                rel='noreferrer'
              >
                <img
                  src='/home/icons/Logo-Discord.svg'
                  alt='Moon Totems Discord'
                />
              </a>
            </div>
          </div>
          <div style={{ float: 'left', width: '25%' }}>
            <div
              style={{
                borderLeft: '1px solid #888',
                marginTop: '20px',
                paddingLeft: '15px'
              }}
            >
              <a
                href='https://github.com/moontotems'
                target='_blank'
                rel='noreferrer'
              >
                <div style={{ fontSize: '22px', fontWeight: 400 }}>Github</div>
              </a>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                For insights into the technology behind the project.
              </div>
              <a
                href='https://github.gg/moontotems'
                target='_blank'
                rel='noreferrer'
              >
                <img
                  src='/home/icons/Logo-Github.svg'
                  alt='Moon Totems Github'
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
