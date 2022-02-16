/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, useStsate } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";

import { auth } from '../firebase';
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [Loading, setLoading] = useState(true);

  async function getFile(url) {
    let response = await fetch(url);
    let data = await response.blob();
    return new File([data], "test.jpg", { type: 'image/jpeg' });
  }

  useEffect(() => {
    if(!user) {
      history.push('/');
      return;
    };

    axios.get('https://api.chatengine.io/users/me', {
      headers: {
        "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
        "user-name": user.email,
        "user-secret": user.uid,
      }
    })
    .then(() => {
      setLoading(false);
    })
    .catch(e => {
      let formdata = new FormData()
      formdata.append('email', user.email)
      formdata.append('username', user.email)
      formdata.append('secret', user.uid)

      getFile(user.photoURL)
      .then(avatar => {
        formdata.append('avatar', avatar, avatar.name)

        axios.post(
          'https://api.chatengine.io/users/',
          formdata,
          { headers: { "private-key":  process.env.REACT_APP_CHAT_ENGINE_KEY }}
        )
        .then(() => setLoading(false))
        .catch(e => console.log('e', e.response))
      })
    })

  }, [user, history]);

  async function handleLogout() {
    await auth.signOut()
    history.push("/")
  }

  if (!user || Loading) return 'Loading...';

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>
          SocialChat
        </div>

        <div onClick={handleLogout} className='logout-tab'>
          Logout
        </div>
      </div>

      <ChatEngine
        height='calc(100vh - 66px)'
        projectID={ process.env.REACT_APP_CHAT_ENGINE_ID }
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  )
};


export default Chats;
/* eslint-enable no-unused-vars */
