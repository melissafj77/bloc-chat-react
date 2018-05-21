import React, {Component} from "react";

class MessageList extends Component{
    constructor(props){
        super(props);

        this.state={
            messages:[]
            
        };

        this.messagesRef = this.props.firebase.database().ref("messages");
    }

    componentDidMount() {
        this.messagesRef.on("child_added", snapshot => {
          const message = snapshot.val();
          message.key = snapshot.key;
          this.setState({ messages: this.state.messages.concat(message) });
        });
      }

    render() {
        return (
          <div className="messages-list">
            <h2>Room: {this.props.activeRoom.name}</h2>
            <section className="messages-container">
              
                 { this.state.messages.filter( (message)=> message.roomId === this.props.activeRoom.name ).map(
                  (message, index) =>
                  <div className="message">
                    <div className="user-data">
                      <h4 id="userName">{message.username}</h4>
                      <p className="message-content"key={message.key}>{message.content}</p>
                    </div>
  
                    <span className="timeStamp">{message.sentAt}</span>
                  </div>
  
              )}
              </section>
          </div>
        )
    }
  
}
  
  export default MessageList;  
