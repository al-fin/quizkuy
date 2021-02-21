import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    minHeight: '80vh',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  tableContainer: {
  },
  tablePaper: {
    borderRadius: 8,
    overflow: 'auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
  },
  tr: {
    transition: '0.25s ease-out',
    '&:nth-of-type(even)': {
      background: 'rgba(0,0,0,0.05)',
    },
    '&:hover': {
      background: 'rgba(0,0,0,0.15)',
    }
  },
  th: {
    padding: '10px 20px',
    fontWeight: 'bold',
    textAlign: 'left',
    background: theme.palette.primary.main,
    color: '#FFF',
    textTransform: 'uppercase'
  },
  td: {
    padding: '10px 20px',
  },
  addButton: {
    float: 'right',
  },
  'APPROVED': {
    padding: "4px 12px",
    borderRadius: 4,
    color: "rgba(27, 170, 86, 1)",
    background: "rgba(27, 170, 86, 0.2)",
  },
  'REVIEW': {
    padding: "4px 12px",
    borderRadius: 4,
    color: "rgb(230, 128, 43)",
    background: "rgba(230, 128, 43, 0.2)",
  },
  'REJECTED': {
    padding: "4px 12px",
    borderRadius: 4,
    color: "rgba(220, 0, 78, 1)",
    background: "rgba(220, 0, 78, 0.2)",
  },
  'INACTIVE': {
    padding: "4px 12px",
    borderRadius: 4,
    color: "rgba(220, 0, 78, 1)",
    background: "rgba(220, 0, 78, 0.2)",
  },
  'IN_PROCESS': {
    padding: "4px 12px",
    borderRadius: 4,
    color: "rgba(0,0,0, 0.5)",
    background: "rgba(0,0,0, 0.1)",
  },
}));
