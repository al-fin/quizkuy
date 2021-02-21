import { makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  container: {},
  title: {
    fontWeight: 'bold',
  },
  end: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  paperContainer: {
    height: `90vh`,
    overflow: 'auto',
  },
  soal: {
    overflow: 'hidden',
    marginBottom: theme.spacing(4),
  },
  soalRed: {
    overflow: 'hidden',
    marginBottom: theme.spacing(4),
    background: 'rgba(255,0,0,0.15)',
  },
  soalHeader: {
    padding: theme.spacing(2),
    background: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  soalHeaderRed: {
    padding: theme.spacing(2),
    background: red[400],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  soalHeaderGrey: {
    padding: theme.spacing(2),
    background: '#888',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  soalHeaderText: {
    fontWeight: 'bold',
    color: 'white',
  },
  soalHeaderBadge: {
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 6,
    fontSize: 24,
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
  },
  soalBody: {
    padding: theme.spacing(2),
  },
  mb4: {
    marginBottom: theme.spacing(4),
  },
}));
