import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import Message from './Components/Message'
//@ts-ignore
import * as rug from 'random-username-generator'

type UserMessage = {
  id: string,
  message: string,
  userName: string,
  timeStamp: Date
}
const { REACT_APP_BACKEND_HOST } = process.env
function App() {
  const [socket, setSocket] = useState<any>(null);
  const [userName, setUserName] = useState<string>("")
  const [message, setMessage] = useState<UserMessage[]>([]);
  const [currentMessage, setcurrentMessage] = useState<string>("")
  //@ts-ignore
  useEffect(() => {
    //@ts-ignore
    const newSocket = io(REACT_APP_BACKEND_HOST);
    setUserName(rug.generate())
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
  //@ts-ignore
  useEffect(() => {
    if (socket)
      socket.on("message", (incomingMessage: UserMessage) => {
        setMessage([...message.slice(-10), incomingMessage])
      })
  }, [socket, message]);


  function onMessageChange(e: any) {
    setcurrentMessage(e.target.value)
  }
  function handleForm(e: any) {
    e.preventDefault();
    if (currentMessage && currentMessage !== "") {
      let userMessage: UserMessage = {
        id: uuidv4(),
        userName: userName,
        message: currentMessage,
        timeStamp: new Date()
      }
      socket.emit("message", userMessage)
      setMessage([...message.slice(-10), userMessage])
      setcurrentMessage("")
      e.target.value = null;
    }
  }
  return (
    <section>
      <div className="container py-5 dark">

        <div className="row d-flex justify-content-center">
          <div > {/* className="col-md-8 col-lg-6 col-xl-4" */}

            <div className="card" id="chat1">
              <div className="card-body overflow-auto">
                {message.map(m => {
                  let css = m.userName === userName
                  return (<Message key={m.id} align={css} message={m.message} userName={m.userName} />)
                })}
                {/* <Message css={selfMessage} message="I Sent this" /> */}
                <div className="form-outline" >
                  <form className="form-inline" onSubmit={handleForm}>
                    <div className="form-group">
                      <input className="form-control" id="textAreaExample" placeholder="Type your message here" value={currentMessage} onChange={onMessageChange} />
                      <input className="btn btn-primary mb-2" type="submit" value="Send" />

                    </div>
                  </form>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section >
  );
}

export default App;
