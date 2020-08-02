import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Button } from '@material-ui/core';
import LayoutApp from '../../../../layouts/LayoutApp';
import { server } from "../../../../redux/constants";

const ProfilePage = (props) => {
  const [profile,setProfile] = useState({})

  // Function that store the user id returned from the parseJWT function in the component state
  const getData = async id => {
    await axios
      .get('http://localhost:8080/profile/id/' + id)
      .then(response => {
        document.getElementById('avatarsProfile').src =
          'http://localhost:8080/images/' + response.data.avatars
        // profile.setAttribute("src",);
        setProfile(response);
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

  const showPreviewImage = values => {
    return (
      <div class="text-center">
        <img
          alt=''
          id="avatarsProfile"
          src={
            values.file_obj != null
              ? values.file_obj
              : 'http://localhost:8080/images/user.png'
          }
          class="profile-user-img img-fluid img-circle"
          width={100}
        />
      </div>
    );
  };


  // Retrieve the user id and get user data
  useEffect(() => {
    let { id } = parseJwt()
    getData(id)
  })

  return (
    <LayoutApp>
      <div className="m-4">
        {showPreviewImage(getData(parseJwt()))}
      </div>
      <Button href="/profile/update">Editar Perfil</Button>
    </LayoutApp>
    );
}

export default ProfilePage;
