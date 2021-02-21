import React from 'react';
import { useStyles } from './styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import SyncIcon from '@material-ui/icons/Sync';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import './styles.css';

/*
  type : Bar | Line | Pie | Doughnut
*/
export default function Chart({
  type = 'Bar',
  title = null,
  subTitle = null,
  labels = [],
  data = [],
  onRefresh = null,
  isLoading = false,
  ...others
}) {
  const classes = useStyles();

  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: 'rgba(146, 49, 141, 0.2)',
        borderColor: 'rgba(146, 49, 141, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(146, 49, 141, 0.4)',
        hoverBorderColor: 'rgba(146, 49, 141, 1)',
      },
    ],
  };

  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(146, 49, 141, 0.4)',
        borderColor: 'rgba(146, 49, 141, 1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(146, 49, 141, 1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(146, 49, 141, 1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      },
    ],
  };

  const pieChartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#3CAEA3',
          '#8bc34a',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#3CAEA3',
          '#8bc34a',
        ],
      },
    ],
  };

  const doughnutChartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#3CAEA3',
          '#8bc34a',
          '#93328d',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#3CAEA3',
          '#8bc34a',
          '#93328d',
        ],
      },
    ],
  };

  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton onClick={onRefresh}>
              <SyncIcon
                style={{
                  animation: isLoading ? `spin 1s linear infinite` : null,
                }}
              />
            </IconButton>
          }
          title={<Typography variant="h6">{title}</Typography>}
          subheader={subTitle}
        />
        <Divider />
        <CardContent>
          {type == 'Bar' && <Bar data={barChartData} {...others} />}
          {type == 'Line' && <Line data={lineChartData} {...others} />}
          {type == 'Pie' && <Pie data={pieChartData} {...others} />}
          {type == 'Doughnut' && (
            <Doughnut data={doughnutChartData} {...others} />
          )}
        </CardContent>
      </Card>
    </>
  );
}
