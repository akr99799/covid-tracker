import React from 'react'
import { Grid } from '@mui/material'
import InfoBox from './InfoBox'
import { CaseType, CountryData } from '../utils/util'

interface Props {
  currCountry: CountryData
  setCaseType: any
}

const InfoBoxContainer: React.FC<Props> = ({ currCountry, setCaseType }) => {
  return (
    <Grid container xs={12} justifyContent={'space-between'}>
      <Grid item xs={12} md={3} mb={2}>
        <InfoBox
          title={'Coronavirus Cases'}
          caseType={CaseType.cases}
          todayData={currCountry?.todayCases ?? ''}
          totalData={currCountry?.cases ?? ''}
          color={'red'}
          setCaseType={setCaseType}
        />
      </Grid>
      <Grid item xs={12} md={3} mb={2}>
        <InfoBox
          title={'Recovered'}
          caseType={CaseType.recovered}
          todayData={currCountry?.todayRecovered ?? ''}
          totalData={currCountry?.recovered ?? ''}
          color={'green'}
          setCaseType={setCaseType}
        />
      </Grid>
      <Grid item xs={12} md={3} mb={2}>
        <InfoBox
          title={'Deaths'}
          caseType={CaseType.deaths}
          todayData={currCountry?.todayDeaths ?? ''}
          totalData={currCountry?.deaths ?? ''}
          color={'red'}
          setCaseType={setCaseType}
        />
      </Grid>
    </Grid>
  )
}

export default InfoBoxContainer
