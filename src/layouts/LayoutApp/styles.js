import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Card, Drawer} from '@material-ui/core';

export const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

export const StyledAppbar = styled(AppBar)`
  box-shadow: none;
`

export const StyledToolbar = styled(Toolbar)`
  background-color: #0D0D0D;
`
export const StyledDrawer = styled(Drawer)`
  div{
    border: none;
  }

  .bottomDrawer{
    position: relative;
    height: 100%;
    width: 100%;
    background-color: #F2F2F2;
  }
`
export const StyledImgProfileClosed = styled.img`
  margin-top: 100%;
  margin-left: 25%;
  height: 8vh;
  border-radius: 50%;
`
export const StyledImgProfileOpened = styled.img`
  margin-top: 7%;
  margin-left: 25%;
  height: 20vh;
  border-radius: 50%;
`

export const StyledMain = styled.main`
  position: relative;
  z-index: 1;

  .bottomMain{
    position: fixed;
    background-color: #F2F2F2;
    width: 100%;
    height: 100%;
  }
`
export const StyledAppBarDiv = styled.div`
  /* position: fixed; */
  top: 0;
  height: 33.5vh;
  width: 100%;
  background-color: #0D0D0D;
`

export const StyledMainDiv = styled.div`
  position: fixed;
  z-index: 2;
  height: 25vh;
  width: 100%;
  margin-bottom: 5vh;
  background-color: #0D0D0D;
`

export const StyledCard = styled(Card)`
  position: relative;
  z-index: 3;
  top: 15vh;
  display: block;
  will-change: inherit;
  min-height: 80vh;
  margin-bottom: 2rem; 
`