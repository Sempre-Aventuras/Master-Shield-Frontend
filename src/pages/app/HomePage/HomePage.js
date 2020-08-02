import React, { useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios'
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Card , Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { server } from "../../../redux/constants";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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

const StyledAppbar = styled(AppBar)`
  box-shadow: none;
`

const StyledToolbar = styled(Toolbar)`
  background-color: #0D0D0D;
`
const StyledDrawer = styled(Drawer)`
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
const StyledImgProfileClosed = styled.img`
  margin-top: 100%;
  margin-left: 25%;
  height: 8vh;
`
const StyledImgProfileOpened = styled.img`
  margin-top: 10%;
  margin-left: 25%;
  height: 20vh;
`

const StyledMain = styled.main`
  position: relative;
  z-index: 1;

  .bottomMain{
    position: fixed;
    background-color: #F2F2F2;
    width: 100%;
    height: 100%;
  }
`
const StyledAppBarDiv = styled.div`
  /* position: fixed; */
  top: 0;
  height: 33.5vh;
  width: 100%;
  background-color: #0D0D0D;
`
const StyledMainDiv = styled.div`
  position: fixed;
  z-index: 2;
  height: 25vh;
  width: 100%;
  margin-bottom: 5vh;
  background-color: #0D0D0D;
`
const StyledCard = styled(Card)`
  position: relative;
  z-index: 3;
  top: 15vh;
  display: block;
  will-change: inherit;
  min-height: 80vh;
`

const HomePage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    (open ? setOpen(false) : setOpen(true));
  };

  // Function that store the user id returned from the parseJWT function in the component state
  const getData = async id => {
    await axios
      .get('http://localhost:8080/profile/id/' + id)
      .then(response => {
        console.log(response.data)
        document.getElementById('avatars').src =
          'http://localhost:8080/images/' + response.data.avatars
        // profile.setAttribute("src",);
        this.setState({ response: response.data })
      })
      .catch(error => {
        // this.setState({ error_message: error.message })
      })
  }

  // Parsing JWT to JSON
  const parseJwt = () => {
    let token = localStorage.getItem(server.TOKEN_KEY)
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )

    return JSON.parse(jsonPayload)
  }

  // Retrieve the user id and get user data
  useEffect(() => {
    let { id } = parseJwt()
    getData(id)
  })

  const showPreviewImage = values => {
    return (
      <div class='text-center'>
        {
          open ? 
                  <StyledImgProfileOpened 
                    id='avatars'
                    src={ values.file_obj != null ? values.file_obj : 'http://localhost:8080/images/user.png'}
                  /> : 
                  <StyledImgProfileClosed 
                    id='avatars'
                    src={ values.file_obj != null ? values.file_obj : 'http://localhost:8080/images/user.png'}
                  />
        }
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <StyledAppbar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className="mr-2"
          >
            <FontAwesomeIcon icon="bars" />
          </IconButton>
          <Typography variant="h6" noWrap>
            Master Shield
          </Typography>
        </StyledToolbar>
      </StyledAppbar>
      <StyledDrawer
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
        <StyledAppBarDiv>
          {showPreviewImage(getData(parseJwt()))}
        </StyledAppBarDiv>
        <div className="bottomDrawer">
          <Grid container>
              <IconButton className="m-3" row onClick={''}>
                <FontAwesomeIcon className="ml-1" icon="home" />
                <Typography className="ml-3">Início</Typography>
              </IconButton>
              <IconButton className="m-3" row onClick={''}>
                <FontAwesomeIcon className="ml-1" icon="street-view" />
                <Typography className="ml-3">Personagens</Typography>
              </IconButton>
              <IconButton className="m-3" row onClick={''}>
                <FontAwesomeIcon icon="dragon" />
                <Typography className="ml-3">Monstros</Typography>
              </IconButton>
              <IconButton className="m-3" row onClick={''}>
                <FontAwesomeIcon className="ml-1" icon="shield-alt" />
                <Typography className="ml-3">Equipamentos</Typography>
              </IconButton>
          </Grid>


        </div>
      </StyledDrawer>
      <StyledMain>
        <StyledMainDiv/>
        <div className="bottomMain"/>
          <StyledCard className="mx-4 shadow">
            <Typography paragraph className="m-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consequat ante nec sapien efficitur tincidunt. Curabitur elit est, feugiat vitae erat in, mollis fringilla odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque eget semper leo, eu pulvinar odio. Nunc vel pharetra turpis. Vestibulum iaculis blandit dolor, id luctus dolor varius quis. Sed augue purus, mollis ut metus eget, maximus faucibus risus. Maecenas vel molestie orci. Morbi vestibulum imperdiet dapibus.
            </Typography>
          </StyledCard>        
      </StyledMain>
    </div>
  );
}

export default HomePage;
