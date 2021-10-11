type MessageProp = {
    css: string,
    message: string
}

function Message(props: MessageProp) {
    return (<div className={props.css} >
        <div className="p-3 ms-3 border">
            <p className="small mb-0">{props.message}</p>
        </div>
    </div>)
}
export default Message;