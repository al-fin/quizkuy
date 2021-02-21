import React from 'react';
import { Grid } from '@material-ui/core';
import Chart from 'components/statistics/chart';
import InfoCount from 'components/statistics/info-count';
import EuroIcon from '@material-ui/icons/Euro';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

export default function Examples() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <InfoCount Icon={EuroIcon} title="Judul" count={250} />
        </Grid>
        <Grid item xs={4}>
          <InfoCount
            Icon={MonetizationOnIcon}
            title="Judul"
            count={250}
            isLoading={true}
          />
        </Grid>
        <Grid item xs={4}>
          <InfoCount title="Judul" count={250} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Chart
            type="Bar"
            title="Bar Chart"
            labels={['January', 'February', 'March', 'April', 'May']}
            data={[1000, 2000, 3000, 2000, 1000]}
          />
        </Grid>
        <Grid item xs={6}>
          <Chart
            type="Line"
            title="Line Chart"
            labels={['January', 'February', 'March', 'April', 'May']}
            data={[1000, 2000, 3000, 2000, 1000]}
          />
        </Grid>
        <Grid item xs={6}>
          <Chart
            type="Pie"
            title="Pie Chart"
            labels={['January', 'February', 'March']}
            data={[1000, 2000, 3000]}
          />
        </Grid>
        <Grid item xs={6}>
          <Chart
            type="Doughnut"
            title="Doughnut Chart"
            labels={['January', 'February', 'March']}
            data={[1000, 2000, 3000]}
          />
        </Grid>
      </Grid>
    </>
  );
}
