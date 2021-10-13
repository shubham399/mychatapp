import React from 'react';
import { View, Text, StyleSheet } from "react-native"

type MessageProp = {
    align: boolean,
    message: string,
    userName: string,
    timeStamp?: Date
}
const selfMessage = "d-flex flex-row justify-content-end mb-4 cardboard"
const otherMessage = "d-flex flex-row justify-content-start mb-4 cardboard"
function Message(props: MessageProp) {
    let style = {
        // position: "absolute",
        width: "75px",
        height: "75px",
        overflow: "hidden",
        text: "center"

    }
    let css = props.align ? selfMessage : otherMessage
    if (props.align) {
        return (<View style={styles.sent} >
            <Text style={styles.sentText}>{props.message}</Text>
        </View >
        )
    }
    else {
        return (<View style={styles.recieved} >
            {/* <View>
                <Text >{props.userName}</Text>
            </View> */}
            <Text style={styles.recievedText}>{props.message}</Text>

        </View>)
    }
}

const styles = StyleSheet.create({
    sent: {
        backgroundColor: "#0078fe",
        padding: 10,
        marginLeft: '45%',
        borderRadius: 5,
        //marginBottom: 15,
        marginTop: 5,
        marginRight: "5%",
        // maxWidth: '50%',
        alignSelf: 'flex-end',
        //maxWidth: 500,
        borderRadius: 20,
    },
    sentText: { fontSize: 16, color: "#fff" },
    recieved: {
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
    recievedText: { fontSize: 16, color: "#000", justifyContent: "center" }
});

export default Message;