import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    minHeight: '80vh',
  },
  tab: {
    textTransform: 'uppercase',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  tableContainer: {},
  tablePaper: {
    borderRadius: 8,
    overflow: 'auto',
  },
}));
