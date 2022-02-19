import React from 'react'
import { Box, Grid, SelectChangeEvent, Theme, Typography } from '@mui/material'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import Header from './Header'
import TableInfo from './TableInfo'
import { CaseType, CountryData } from '../utils/util'
import Map from './Map'
// import "leaflet/dist/leaflet.css";
import InfoBoxContainer from './InfoBoxContainer'
import { cloneDeep } from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
}))

function App() {
  const classes = useStyles()
  const [countries, setCountries] = React.useState<CountryData[]>()
  const [selectValue, setSelectValue] = React.useState<string>('WW')
  const [currCountry, setCurrCountry] = React.useState<CountryData>()
  const [loading, setLoading] = React.useState(false)
  const [mapCenter, setMapCenter] = React.useState({
    lat: 20,
    lng: 60,
  })
  const [currCaseType, setCurrCaseType] = React.useState(CaseType.cases)

  React.useEffect(() => {
    setLoading(true)
    async function getAllData() {
      await fetch('https://disease.sh/v3/covid-19/all')
        .then((res) => res.json())
        .then((r) => {
          setCurrCountry({
            id: 'WW',
            name: 'Worldwide',
            cases: r.cases,
            recovered: r.recovered,
            deaths: r.deaths,
            todayCases: r.todayCases,
            todayRecovered: r.todayRecovered,
            todayDeaths: r.todayDeaths,
          })
          setCountries([
            {
              id: 'WW',
              name: 'Worldwide',
              cases: r.cases,
              recovered: r.recovered,
              deaths: r.deaths,
              todayCases: r.todayCases,
              todayRecovered: r.todayRecovered,
              todayDeaths: r.todayDeaths,
              countryInfo: {
                lat: 20,
                long: 60,
              },
            },
          ])
          setLoading(false)
        })
    }
    async function getData() {
      await fetch('https://disease.sh/v3/covid-19/countries?yesterday=true')
        .then((res) => res.json())
        .then((res) => {
          const countryData: CountryData[] = res.map((r: any) => ({
            id: r.countryInfo.iso2,
            name: r.country,
            cases: r.cases,
            recovered: r.recovered,
            deaths: r.deaths,
            todayCases: r.todayCases,
            todayRecovered: r.todayRecovered,
            todayDeaths: r.todayDeaths,
            countryInfo: r.countryInfo,
          }))
          setCountries((prev) => [...(prev ?? []), ...countryData])
        })
    }
    try {
      getAllData().then()
      getData().then()
    } catch (err) {}
  }, [])

  const handleCountryChange = (e: SelectChangeEvent) => {
    setSelectValue(e.target.value)
    setCurrCountry(countries?.find((c) => c.id === e.target.value))
    setMapCenter({
      lat: countries?.find((c) => c.id === e.target.value)?.countryInfo?.lat,
      lng: countries?.find((c) => c.id === e.target.value)?.countryInfo?.long,
    })
  }

  if (loading) {
    return <Typography>Loading....</Typography>
  }

  return (
    <Box className={clsx('root', classes.root)}>
      <Grid
        container
        xs={12}
        className="container"
        justifyContent={'space-around'}
      >
        <Grid item xs={7} className="item-stats">
          <Header
            selectValue={selectValue}
            handleCountryChange={handleCountryChange}
            countries={countries}
          />
          {currCountry && (
            <InfoBoxContainer
              currCountry={currCountry}
              setCaseType={setCurrCaseType}
            />
          )}
          <Map
            center={mapCenter}
            countries={countries}
            caseType={currCaseType}
          />
        </Grid>
        <Grid item xs={4} className="item-table">
          {countries && <TableInfo countries={cloneDeep(countries)} />}
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
