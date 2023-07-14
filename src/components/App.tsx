import React from "react";
import { Box, Grid, SelectChangeEvent, Theme, Typography } from "@mui/material";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import Header from "./Header";
import TableInfo from "./TableInfo";
import { CaseType, CountryData } from "../utils/util";
import Map from "./Map";
// import "leaflet/dist/leaflet.css";
import InfoBoxContainer from "./InfoBoxContainer";
import { cloneDeep } from "lodash";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const [countries, setCountries] = React.useState<CountryData[]>();
  const [selectValue, setSelectValue] = React.useState<string>("WW");
  const [currCountry, setCurrCountry] = React.useState<CountryData>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error>();
  const [mapCenter, setMapCenter] = React.useState({
    lat: 20,
    lng: 60,
  });
  const [currCaseType, setCurrCaseType] = React.useState(CaseType.cases);

  const fetchData = async () => {
    try {
      const worldData = await fetch("https://disease.sh/v3/covid-19/all")
        .then((res) => res.json())
        .then((res) => [
          {
            id: "WW",
            name: "Worldwide",
            cases: res.cases,
            recovered: res.recovered,
            deaths: res.deaths,
            todayCases: res.todayCases,
            todayRecovered: res.todayRecovered,
            todayDeaths: res.todayDeaths,
            countryInfo: {
              lat: 20,
              long: 60,
            },
          },
        ]);
      const countriesData = await fetch("https://disease.sh/v3/covid-19/countries?yesterday=true")
        .then((res) => res.json())
        .then((res) =>
          res.map((res: any) => ({
            id: res.countryInfo.iso2,
            name: res.country,
            cases: res.cases,
            recovered: res.recovered,
            deaths: res.deaths,
            todayCases: res.todayCases,
            todayRecovered: res.todayRecovered,
            todayDeaths: res.todayDeaths,
            countryInfo: res.countryInfo,
          }))
        );
      const data: CountryData[] = [...worldData, ...countriesData];
      return data;
    } catch (error) {
      setError(error as Error);
    }
  };

  React.useEffect(() => {
    setLoading(true);
    fetchData()
      .then((data) => {
        setCurrCountry(data?.[0]);
        setCountries(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCountryChange = (e: SelectChangeEvent) => {
    setSelectValue(e.target.value);
    const selectedCountry = countries?.find((c) => c.id === e.target.value);
    setCurrCountry(selectedCountry);
    setMapCenter({
      lat: selectedCountry?.countryInfo?.lat,
      lng: selectedCountry?.countryInfo?.long,
    });
  };

  if (loading) {
    return <Typography>Loading....</Typography>;
  }

  if (error) {
    return <Typography>{error.message}</Typography>;
  }

  return (
    <Box className={clsx("root", classes.root)}>
      <Grid container className="container" justifyContent={"space-around"}>
        <Grid item xs={12} lg={7} className="item-stats">
          <Header
            selectValue={selectValue}
            handleCountryChange={handleCountryChange}
            countries={countries}
          />
          {currCountry && (
            <InfoBoxContainer currCountry={currCountry} setCaseType={setCurrCaseType} />
          )}
          <Map center={mapCenter} countries={countries} caseType={currCaseType} />
        </Grid>
        <Grid item xs={12} lg={4} className="item-table">
          {countries && <TableInfo countries={cloneDeep(countries)} />}
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
