import React, { useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios'

import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { Typography, IconButton} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { server } from "../../redux/constants";
import { useStyles, StyledAppbar, StyledToolbar, StyledDrawer, StyledImgProfileClosed, StyledImgProfileOpened, StyledMain, StyledAppBarDiv, StyledMainDiv, StyledCard } from './styles.js';


const LayoutApp = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [response, setResponse] = '';

  const handleDrawerOpen = () => {
    (open ? setOpen(false) : setOpen(true));
  };

  // Function that store the user id returned from the parseJWT function in the component state
  const getData = async id => {
    await axios
      .get('http://localhost:8080/profile/id/' + id)
      .then(response => {
        document.getElementById('avatars').src =
          'http://localhost:8080/images/' + response.data.avatars
        // profile.setAttribute("src",);
      })
      .catch(error => {
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
      <div className='text-center'>
        <Link to="/profile">
        {
          open ? 
                  <StyledImgProfileOpened 
                    id="avatars"
                    src={ values.file_obj != null ? values.file_obj : 'http://localhost:8080/images/user.png'}
                  /> : 
                  <StyledImgProfileClosed 
                    id="avatars"
                    src={ values.file_obj != null ? values.file_obj : 'http://localhost:8080/images/user.png'}
                  />
        }
        </Link>
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
              <IconButton className="m-3" row href="/home">
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
          {children} 
          <Typography paragraph className="" style={{visibility:'hidden', lineHeight: '.001rem', fontSize: '.1rem'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consequat ante nec sapien efficitur tincidunt. Curabitur elit est, feugiat vitae erat in, mollis fringilla odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque eget semper leo, eu pulvinar odio. Nunc vel pharetra turpis. Vestibulum iaculis blandit dolor, id luctus dolor varius quis. Sed augue purus, mollis ut metus eget, maximus faucibus risus. Maecenas vel molestie orci. Morbi vestibulum imperdiet dapibus.
          </Typography> 
        </StyledCard> 
      </StyledMain>
    </div>
  );
}

export default LayoutApp;
