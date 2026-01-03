import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'Nawfal - Frontend Web Developer'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom right, #000000, #1a1a1a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 'bold', marginBottom: 20 }}>
          Nawfal
        </div>
        <div style={{ fontSize: 36, color: '#a1a1aa' }}>
          Frontend Web Developer
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
