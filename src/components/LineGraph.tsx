import React from 'react'
import { Box } from '@mui/material'
import { CaseDataType, CaseType, formatLineData } from '../utils/util'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

interface Props {}

export type DataByDay = {
  cases: Record<string, number>
  deaths: Record<string, number>
  recovered: Record<string, number>
}

const LineGraph: React.FC<Props> = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
  const [data, setData] = React.useState<CaseDataType[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=60')
        .then((res) => res.json())
        .then((data: DataByDay) => {
          setData(formatLineData(data, CaseType.cases))
        })
    }
    fetchData()
  }, [])

  const options = {
    responsive: true,
  }

  const formatData = {
    labels: data?.map((value) => value.x),
    datasets: [
      {
        label: 'Covid-Data',
        data: data?.map((value) => value.y),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }
  // console.log(data);

  return (
    <Box>{!!data.length && <Line data={formatData} options={options} />}</Box>
  )
}

export default LineGraph
