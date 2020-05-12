import React, { useState, useEffect } from "react";
import { preloadScript } from "opentok-react";
import { Room } from "../Room/Room";
import "./App.css";

const fetchRoom = (name) => {
  return fetch(`/room/${name}`).then((res) => res.json());
};

function App() {
  const [credentials, setCredentials] = useState();

  useEffect(() => {
    const messageListener = (message) => {
      if (message.data.type === "game_info") {
        fetchRoom(message.data.data.gameId).then((cred) =>
          setCredentials(cred)
        );
        console.log("gameId:", message.data.data.gameId);
      }
    };
    window.addEventListener("message", messageListener);
    return () => {
      window.removeEventListener("message", messageListener);
    };
  }, []);

  return (
    <div className="app">
      <div className="container">
        {credentials && <Room credentials={credentials} />}
      </div>
      <iframe
        style={{
          width: "100%",
          height: "1545px",
        }}
        src="//g.securesocket.net/_Apps/LiveLobby/#/?catalogId=100006_1235091"
        frameborder="0"
      ></iframe>
    </div>
  );
}

export default preloadScript(App);
