import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
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

export default function App() {
  const [socket, setSocket] = useState<any>(null);
  const [userName, setUserName] = useState<string>("")
  const [message, setMessage] = useState<UserMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("")
  //@ts-ignore
  useEffect(() => {
    //@ts-ignore
    const newSocket = io(REACT_APP_BACKEND_HOST || "https://my-chat-app-007.herokuapp.com/");
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


  // function onMessageChange(e: any) {
  //   console.log("Message Change", e.target)
  //   setcurrentMessage(e.target.value)
  // }
  function handleForm(e: any) {
    // e.preventDefault();
    console.log("Handle Form called", currentMessage)
    if (currentMessage && currentMessage !== "") {
      let userMessage: UserMessage = {
        id: uuidv4(),
        userName: userName,
        message: currentMessage,
        timeStamp: new Date()
      }
      socket.emit("message", userMessage)
      setMessage([...message.slice(-10), userMessage])
      setCurrentMessage("")
      e.target.value = null;
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {message.map(m => {
          let css = m.userName === userName
          return (<Message key={m.id} align={css} message={m.message} userName={m.userName} />)
        })}
      </ScrollView>
      <View style={styles.bottomView}>
        <TextInput style={styles.textBox} autoFocus={true} onSubmitEditing={handleForm} onChangeText={setCurrentMessage} value={currentMessage}
          placeholder="Enter the Message"
        />
        <Button
          title="Send Message"
          onPress={handleForm}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomView: {
    width: '100%',
    height: 50,
    flex: 1,
    flexDirection: "row",
    // backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  textBox: {
    backgroundColor: "#dedede",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginStart: "5%",
    // maxWidth: '50%',
    alignSelf: 'flex-start',
    //maxWidth: 500,
    //padding: 14,

    //alignItems:"center",
    borderRadius: 20,
  },
});
