import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {},
  title: {
    fontWeight: 'bold',
  },
  end: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  soalContainer: {
    height: '90vh',
    overflow: 'auto',
  },
  soal: {
    overflow: 'hidden',
    marginBottom: theme.spacing(4),
  },
  soalHeader: {
    padding: theme.spacing(2),
    background: theme.palette.primary.main,
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
}));
