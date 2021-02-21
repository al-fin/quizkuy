import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ErrorIllustration from 'images/error.svg';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogTitle = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}))(MuiDialogTitle);

const DialogContent = withStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(4),
    borderRadius: 16,
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: { borderRadius: 15 },

  img: {
    width: '70%',
    display: 'block',
    margin: '0 auto',
  },
  button: {
    padding: theme.spacing(2),
    borderRadius: 15,
    textTransform: 'none',
  },
  title: {
    fontWeight: 600,
    color: '#141818',
    textAlign: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  desc: {
    fontWeight: 300,
    color: '#999999',
    textAlign: 'center',
  },
}));

export default function ErrorDialog(props) {
  const { error, setError } = props;
  const classes = useStyles();

  const handleClose = () => {
    setError({
      ...error,
      open: false,
    });
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
        open={error.open}
        TransitionComponent={Transition}
        classes={{
          root: classes.root,
          paper: classes.paper,
        }}
      >
        <DialogTitle>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <img
            src={ErrorIllustration}
            alt="error illustration"
            className={classes.img}
          />
          <Typography variant="h6" className={classes.title}>
            Ooops.. Error !
          </Typography>
          <Typography variant="body1" className={classes.desc}>
            {typeof error.message == 'string' ? error.message : 'No Message'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            disableElevation
            className={classes.button}
            onClick={handleClose}
          >
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
