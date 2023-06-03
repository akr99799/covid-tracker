import { DataByDay } from "../components/LineGraph";
import { CircleMarker, Popup } from "react-leaflet";
import { CardContent, Table, TableCell, TableRow, Typography } from "@mui/material";

export enum CaseType {
    cases = "cases",
    deaths = "deaths",
    recovered = "recovered",
}
export type CaseDataType = {
    x: string;
    y: number;
};
export type CountryData = {
    id: string;
    name: string;
    cases: string;
    recovered: string;
    deaths: string;
    todayCases: string;
    todayRecovered: string;
    todayDeaths: string;
    countryInfo?: any | undefined;
};

const casesTypeColors: Record<string, any> = {
    cases: {
        hex: "#e87979",
        multiplier: 0.008,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 0.004,
    },
    deaths: {
        hex: "#e30706",
        multiplier: 0.01,
    },
};

export const sortData = (data: CountryData[]) => {
    return data.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const formatLineData = (data: DataByDay, caseType: CaseType): CaseDataType[] => {
    return Object.keys(data[caseType]).map((date) => {
        return {
            x: date,
            y: data[caseType][date],
        };
    });
};

export const showDataOnMap = (data: CountryData[], caseType: CaseType) =>
    data
        .filter((d) => d.id !== "WW")
        .map((country) => (
            <CircleMarker
                center={[country.countryInfo.lat, country.countryInfo.long]}
                pathOptions={{
                    color: casesTypeColors[caseType].hex,
                    fillColor: casesTypeColors[caseType].hex,
                    fillOpacity: 0.4,
                    radius:
                        Math.sqrt(country[caseType] as unknown as number) *
                        casesTypeColors[caseType].multiplier,
                }}
            >
                <Popup>
                    <CardContent>
                        <Table>
                            <TableRow>
                                <TableCell>Country:</TableCell>
                                <TableCell>{country.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography>{caseType.toUpperCase()}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color={"textSecondary"} variant={"body1"}>
                                        {country[caseType]}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </Table>
                    </CardContent>
                </Popup>
            </CircleMarker>
        ));
