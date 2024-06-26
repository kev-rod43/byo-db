
import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TocIcon from '@mui/icons-material/Toc';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout'; 
import AuthService from '../../utils/auth'



const drawerWidth = 240;

const pages = [
  { name: 'Home', icon: <HomeIcon />, route: '/' },
  { name: 'Collections', icon: <TocIcon />, route: '/collections' },
  { name: 'Charts', icon: <ShowChartIcon />, route: '/charts' }
  
];


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

// Component return

export default function NavDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const isLoggedIn = AuthService.loggedIn();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" noWrap component="div">
            B.Y.O-DB
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        {isLoggedIn && (
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/user')}>
              <ListItemIcon><AccountCircleIcon/></ListItemIcon>
                <ListItemText primary={'User'} />
            </ListItemButton>
          </ListItem>
        )}
          {pages.map((page) => (
            <ListItem key={page.name} disablePadding sx={isLoggedIn? {}:{display: "none"}}>
              <ListItemButton onClick={() => navigate(page.route)}>
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.name} />
              </ListItemButton>
            </ListItem>
          ))}
          {isLoggedIn && (
        <ListItem key="logOut" disablePadding>
        <ListItemButton onClick={() => AuthService.logout()}>
          <ListItemIcon><LogoutIcon/></ListItemIcon>
          <ListItemText primary={"Sign Out"} />
        </ListItemButton>
      </ListItem>
      )}
        </List>
      </Drawer>



      {/* Main app render output.  */}
      <Main open={open}>
        <DrawerHeader />
        <Outlet/>
      </Main>
      
     
    </Box>
  );
}