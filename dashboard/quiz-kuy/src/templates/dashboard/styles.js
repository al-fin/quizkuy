import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 265;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    background: '#FFF',
    color: theme.palette.primary.main,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: `0 1px 1px rgba(0, 0, 0, 0.02), 
    0 2px 2px rgba(0, 0, 0, 0.02), 
    0 4px 4px rgba(0, 0, 0, 0.02), 
    0 8px 8px rgba(0, 0, 0, 0.02),
    0 16px 16px rgba(0, 0, 0, 0.02)`,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    background: theme.palette.primary.main,
    color: '#FFF',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: theme.palette.primary.main,
    color: '#FFF',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 57,
    [theme.breakpoints.up('sm')]: {
      width: 57,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: `calc(100% - ${drawerWidth}px)`,
    overflow: 'auto',
    background: 'rgba(0,0,0,0.075)',
    minHeight: '100vh',
  },
  chip: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'right',
    textTransform: 'uppercase',
    background: theme.palette.primary.main,
    padding: '3px 12px',
    borderRadius: 4,
  },
  icon: {
    color: '#FFF',
  },
  nested: {
    paddingLeft: theme.spacing(9),
  },
  logo: {
    height: 70,
  },
  title: {
    fontWeight: 900,
  },
  textLight: {
    fontWeight: 300,
  },
  dashedDivider: {
    border: 'none',
    borderBottom: '4px dashed rgba(255,255,255,0.25)',
    marginBottom: 6,
  },
}));
