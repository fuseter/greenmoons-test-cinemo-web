import React from 'react'
import { Grid } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'

export default function Loading() {
  return (
    <Grid container spacing={3}>
      {Array.from(new Array(12)).map((data, index) => (
        <Grid key={index} item xs={12} sm={6} md={3}>
          <Skeleton variant="rectangular" width={270} height={270} style={{ borderRadius: 15 }} />
        </Grid>
      ))}
    </Grid>
  )
}
