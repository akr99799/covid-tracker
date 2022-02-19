import React from 'react'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import { CaseType } from '../utils/util'
interface Props {
  title: string
  todayData: string
  totalData: string
  color: string
  caseType: CaseType
  setCaseType: any
}

const InfoBox: React.FC<Props> = ({
  todayData,
  totalData,
  title,
  color,
  caseType,
  setCaseType,
}) => {
  return (
    <Card>
      <CardActionArea onClick={() => setCaseType(caseType)}>
        <CardContent>
          <Typography variant={'body2'} color={'textSecondary'}>
            {title}
          </Typography>
          <Typography variant={'h5'} color={color}>
            +{todayData}
          </Typography>
          <Typography variant={'caption'} color={'textSecondary'}>
            {totalData} Total
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default InfoBox
