import React from "react";
import clsx from "clsx";
import { Box, FormControl, MenuItem, Select, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CountryData } from "../utils/util";

interface Props {
    selectValue: string;
    handleCountryChange: (e: any) => void;
    countries: CountryData[] | undefined;
}

const useStyles = makeStyles((theme: Theme) => ({
    header: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: theme.spacing(6),
        alignItems: "center",
        flexWrap: "wrap",
    },
}));

const Header: React.FC<Props> = ({ selectValue, handleCountryChange, countries }) => {
    const classes = useStyles();
    return (
        <Box className={clsx("header", classes.header)}>
            <Box>
                <Typography variant={"h4"}>COVID Tracker</Typography>
            </Box>
            <Box>
                <FormControl>
                    <Select
                        id="country-dropdown"
                        value={selectValue}
                        onChange={handleCountryChange}
                        variant={"outlined"}
                    >
                        {countries?.map((c) => (
                            <MenuItem key={c.id} value={c.id}>
                                {c.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
};

export default Header;
