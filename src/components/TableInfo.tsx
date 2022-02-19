import React from 'react'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import LineGraph from './LineGraph'
import { CountryData, sortData } from '../utils/util'

interface Props {
  countries: CountryData[]
}

const useStyle = makeStyles(() => ({
  tableContainer: {
    overflow: 'auto',
    maxHeight: '40vh',
  },
}))

const TableInfo: React.FC<Props> = ({ countries }) => {
  const sortedCountries = sortData(countries)
  const classes = useStyle()
  return (
    <Card>
      <CardHeader title={'Live Cases by Country'} />
      <CardContent>
        <TableContainer
          component={Paper}
          className={clsx('table-container', classes.tableContainer)}
        >
          <Table>
            <TableBody>
              {sortedCountries.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.cases}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box className={'box-container'}>
          <Box className={'box-header'}>
            <Typography
              color={'textSecondary'}
              variant={'h5'}
              marginTop={2}
              gutterBottom
            >
              Worldwide new cases
            </Typography>
          </Box>
          <Box className={'box-content'}>
            <LineGraph />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TableInfo
