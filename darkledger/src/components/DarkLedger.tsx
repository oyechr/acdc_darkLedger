import React, { FC } from 'react'
import './DarkLedger.css'
import { IDarkLedgerProps } from './types'
import { AdvancedMarker, APIProvider, Map, MapCameraChangedEvent, Marker, Pin } from '@vis.gl/react-google-maps'

export const DarkLedger: FC<IDarkLedgerProps> = (props) => {
  console.log(props)
  const position = { lat: 59.9762408, lng: 10.6570546 }

  const CustomizedMarker = () => (
    <AdvancedMarker position={position}>
      <Pin background={'tomato'} glyphColor={'#000'} borderColor={'#000'} />
    </AdvancedMarker>
  )

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <APIProvider
        apiKey={'AIzaSyCVob_fs-zku-rc9G7R1dBYk82LXe0IbpI'}
        onLoad={() => console.log('Maps API has loaded.')}
      >
        <Map
          defaultZoom={13}
          mapId='ba44130e3947cd5c'
          defaultCenter={position}
          streetViewControl={false}
          mapTypeControl={false}
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
          }
        >
          <CustomizedMarker />
        </Map>
      </APIProvider>
    </div>
  )
}

export * from './types'
