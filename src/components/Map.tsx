import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { CaseType, showDataOnMap } from '../utils/util'
import { CountryData } from '../utils/util'

interface Props {
  center: Record<string, any>
  zoom?: number
  countries?: CountryData[]
  caseType: CaseType
}

const useStyle = makeStyles(() => ({
  mapLeaflet: {
    width: '100%',
    height: '50vh',
  },
}))

const Map: React.FC<Props> = ({ center, countries, caseType, zoom }) => {
  const classes = useStyle()
  const [map, setMap] = React.useState<any>()
  if (map) {
    map?.flyTo(center)
  }
  return (
    <Box className={'map'}>
      <MapContainer
        center={center}
        zoom={5}
        scrollWheelZoom={false}
        whenCreated={setMap}
        className={classes.mapLeaflet}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {countries ? showDataOnMap(countries!, caseType) : null}
      </MapContainer>
    </Box>
  )
}

export default Map
