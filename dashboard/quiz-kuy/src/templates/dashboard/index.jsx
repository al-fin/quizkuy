import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory, useLocation } from 'react-router-dom';
import { useStyles } from './styles.js';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { sidebar_navigation } from './sidebar-navigation';
import Routes from 'routes/dashboard-routes';
import Cookies from 'js-cookie';
import LogoJeparaTV from 'images/jeparatv.png';
import { color } from 'theme';
import Logo from 'images/logo.png';

export default function DashboardTemplate() {
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');

  const [open, setOpen] = React.useState(window.innerWidth > 400);
  const classes = useStyles();

  React.useEffect(() => {
    const token = Cookies.get('token');
    if (!token || typeof profile == 'undefined') {
      handleLogout();
    }
    // eslint-disable-next-line
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('profile');
    Cookies.remove('token');
    history.push('/login');
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <div
            style={{
              flexGrow: 1,
            }}
          >
            <div>
              <img alt="logo" src={LogoJeparaTV} style={{ height: '48px' }} />
            </div>
          </div>

          {window.innerWidth > 400 && (
            <>
              <div
                style={{ marginLeft: 15, marginRight: 15, textAlign: 'right' }}
              >
                <Typography
                  variant="h6"
                  noWrap
                  style={{
                    textAlign: 'right',
                    fontWeight: 'bold',
                    lineHeight: '1.1em',
                    color: 'black',
                  }}
                >
                  {profile.nama}
                </Typography>
                <Typography variant="caption" noWrap className={classes.chip}>
                  GURU
                </Typography>
              </div>
              <Avatar onClick={handleClick} style={{ cursor: 'pointer' }} />

              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Grid container alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.title}>
                Quiz<span className={classes.textLight}>Kuy</span>
              </Typography>
              <Typography
                variant="body2"
                className={classes.textLight}
                style={{
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                DASHBOARD GURU
              </Typography>
            </Grid>
          </Grid>

          <IconButton onClick={handleDrawerClose} className={classes.icon}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>

        <div className={classes.dashedDivider}></div>

        <List style={{ padding: open ? 15 : 0 }}>
          {sidebar_navigation.map((nav, key) => {
            const Icon = nav.icon;
            const isActive =
              location.pathname === '/dashboard' ||
              location.pathname === '/dashboard/'
                ? location.pathname === nav.path
                : location.pathname.includes(nav.path) &&
                  nav.path !== '/dashboard';

            return (
              <ListItem
                dense
                key={key}
                button
                onClick={() => {
                  if (typeof nav.beforeRedirect === 'function') {
                    nav.beforeRedirect();
                  }
                  history.push(nav.path);
                }}
                style={{
                  color: open && isActive ? color.primary : '#FFF',
                  background:
                    open && isActive
                      ? '#FFF'
                      : isActive
                      ? 'rgba(255,255,255,0.25)'
                      : null,
                  boxShadow:
                    open && isActive
                      ? '0px 2px 8px 1px rgba(0,0,0,0.15)'
                      : null,
                  borderRadius: open ? 8 : 0,
                  marginBottom: 8,
                }}
              >
                <ListItemIcon>
                  <Icon
                    style={{
                      color: open && isActive ? color.primary : 'white',
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={nav.label} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes />
      </main>
    </div>
  );
}
