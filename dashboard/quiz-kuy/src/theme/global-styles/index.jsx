import { createStyles, makeStyles } from '@material-ui/core';
import { statuses } from './statuses';

const useStyles = makeStyles((theme) =>
  createStyles({
    '@global': {
      '.paper': {
        padding: theme.spacing(3),
        minHeight: '100vh',
      },
      '.paper-dense': {
        display: 'inline-block',
        padding: theme.spacing(3),
      },
      '.title': {
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
      },
      ...statuses(),
    },
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
