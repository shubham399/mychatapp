import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Message from './Components/Message'

// const selfMessage = "d-flex flex-row justify-content-end mb-4"
const otherMessage = "d-flex flex-row justify-content-start mb-4"

function App() {
  const [socket, setSocket] = useState<any>(null);
  const [message, setMessage] = useState<string[]>([
  ]);
  const [currentMessage, setcurrentMessage] = useState<string>("")
  //@ts-ignore
  useEffect(() => {
    const newSocket = io(`http://localhost:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
  //@ts-ignore
  useEffect(() => {
    if (socket) {
      socket.on("message", (incomingMessage: string) => {
        setMessage([...message, incomingMessage])
        console.log("New Message", message)
      })
    }
  }, []);
  function onMessageChange(e: any) {
    setcurrentMessage(e.target.value)
  }
  function handleForm(e: any) {
    e.preventDefault();
    setcurrentMessage("")
    e.target.value = null;
  }
  return (
    <section>
      <div className="container py-5">

        <div className="row d-flex justify-content-center">
          <div > {/* className="col-md-8 col-lg-6 col-xl-4" */}

            <div className="card" id="chat1">
              <div className="card-body">
                {message.map(m => {
                  return (<Message css={otherMessage} message={m} />)
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
