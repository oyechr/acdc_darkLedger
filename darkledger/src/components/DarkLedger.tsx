import React, { FC, use, useEffect, useState } from 'react'
import './DarkLedger.css'
import { IDarkLedgerProps } from './types'
import { AdvancedMarker, APIProvider, Map, MapCameraChangedEvent, Marker, Pin } from '@vis.gl/react-google-maps'

export const DarkLedger: FC<IDarkLedgerProps> = (props) => {
  const [loading, setLoading] = useState(true)
  const [villainPosition, setVillainPosition] = useState({ lat: 0, lng: 0 })
  const [targetPosition, setTargetPosition] = useState({ lat: 0, lng: 0 })
  const [error, setError] = useState(null);

  const getPositions = async () => {
    try {
      const villainResponse = await fetch('https://darkledgerstorage.blob.core.windows.net/position/coordinates.json');
      if (!villainResponse.ok) {
        throw new Error(`Failed to fetch villain coordinates: ${villainResponse.statusText}`);
      }
      const villainData = await villainResponse.json();

      const targetResponse = await fetch('https://darkledgerstorage.blob.core.windows.net/position/position.json');
      if (!targetResponse.ok) {
        throw new Error(`Failed to fetch target positions: ${targetResponse.statusText}`);
      }
      const targetData = await targetResponse.json();

      console.log({ villainData, targetData });
      setTargetPosition(targetData);
      setVillainPosition(villainData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching positions:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPositions()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      getPositions()
    }, 11000)
    return () => clearInterval(interval)
  }, [])

  const VillainMarker = () => (
    <AdvancedMarker position={villainPosition}>
      <img
        src='https://ik.imagekit.io/hpapi/voldemort.jpg'
        alt='villain'
        style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid #000' }}
      />
    </AdvancedMarker>
  )

  const TargetMarker = () => (
    <AdvancedMarker position={targetPosition}>
      <div className='targetDiv'>
        <img src='https://ik.imagekit.io/hpapi/harry.jpg' alt='target' className='target' />
        <div className='pulse'></div>
        <div style={{ textAlign: 'center', marginTop: '8px', color: '#000', fontWeight: 'bold' }}>Harry Potter</div>
      </div>
    </AdvancedMarker>
  )

  if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <div
        style={{
          height: '100vh',
          width: '100%'
        }}
      >
        <header>
          <p>
            <strong>Logged in as:</strong> Lord Voldemort
          </p>
          <p>
            <strong>Target:</strong> Harry Potter
          </p>
        </header>
        <APIProvider
          apiKey={'AIzaSyCVob_fs-zku-rc9G7R1dBYk82LXe0IbpI'}
          onLoad={() => console.log('Maps API has loaded.')}
        >
          <Map
            defaultZoom={15}
            mapId='ba44130e3947cd5c'
            defaultCenter={villainPosition}
            streetViewControl={false}
            mapTypeControl={false}
            onCameraChanged={(ev: MapCameraChangedEvent) =>
              console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
            }
          >
            <TargetMarker />
            <VillainMarker />
          </Map>
        </APIProvider>
        <footer>
          <p>
            <strong>Reward:</strong> 1 MBTC (Magic BITCOIN)
          </p>
          <p style={{ fontSize: '12px' }}>powered by DarkLedger © 2025</p>
        </footer>
      </div>
    )
  }
}

export * from './types'
