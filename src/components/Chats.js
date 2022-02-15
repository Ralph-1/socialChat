import React from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from '../firebase';

const Chats = () => {
  const history = useHistory()

  async function handleLogout() {
    await auth.signOut()
    history.push("/")
  }

  return (
    <div className="chats-page">
      <div className="logo-tab">
        Unichat
      </div>
      <div onClick={handleLogout} className="logout-tab">
        Logout
      </div>

      <ChatEngine
        height='calc(100vh - 66px)'
        projectID='af39f0ce-b4d7-42ff-b65c-6434d8dd257e'
        userName='.'
        userSecret='.'
      />
    </div>
  )
};


export default Chats;
