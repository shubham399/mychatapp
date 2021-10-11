type MessageProp = {
    align: boolean,
    message: string,
    userName: string
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
        return (<div className={css} >
            <div className="p-3 ms-3 border">
                <p className="small mb-0">{props.message}</p>
            </div>
            <div style={style} className="rounded-circle p-3 ms-3 border">
                <p className="small mb-0">{props.userName}</p>
            </div>
        </div>)
    }
    else {
        return (<div className={css} >
            <div style={style} className="rounded-circle p-3 ms-3 border">
                <p className="small mb-0" >{props.userName}</p>
            </div>
            <div className="p-3 ms-3 border">
                <p className="small mb-0">{props.message}</p>
            </div>
        </div>)
    }
}
export default Message;