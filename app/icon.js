import { ImageResponse } from 'next/og'
 
// Image metadata
export const size = {
  width: 256,
  height: 256,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00629B',
          borderRadius: '50%',
          fontWeight: 'bold',
          border: '16px solid #00629B',
        }}
      >
        <div style={{ fontSize: 60, lineHeight: 1 }}>IEEE</div>
        <div style={{ fontSize: 36, marginTop: 5 }}>RUET SB</div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
