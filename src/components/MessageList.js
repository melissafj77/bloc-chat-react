import React, {Component} from "react";

class MessageList extends Component{
    constructor(props){
        super(props);

        this.state={
            messages:[],
            newContent:""            
        };

        this.messagesRef = this.props.firebase.database().ref("messages");
        this.createMessage = this.createMessage.bind(this);
    }

    componentDidMount() {
        this.messagesRef.on("child_added", snapshot => {
          const message = snapshot.val();
          message.key = snapshot.key;
          this.setState({ messages: this.state.messages.concat(message) });
        });
      }

      handleSubmit(e){
        e.preventDefault();
        this.createMessage(this.state.newContent);
      }
    
      handleChange(e){
        e.preventDefault();
        this.setState({newContent: e.target.value});
      }
    
      createMessage(newContent) {
        let user = null;
      if (this.props.activeUser) {
        user = this.props.activeUser;
      } else {
        user = "Guest";
      }
        if (this.state.newContent === ''){
        alert('Say something');
        } else {
          var date = new Date();
          this.messagesRef.push({
          username: user,
          content: this.state.newContent,
          roomId: this.props.activeRoom.name,
          sentAt: date.toLocaleTimeString()
        });
        this.setState({ newContent:''});
        }
      }

    render() {
        return (
          <div className="messages-list">
            
            <h2 className="current-room">Room: {this.props.activeRoom.name}</h2>
            
            <section className="messages-container">
              { this.state.messages.filter( (message)=> message.roomId === this.props.activeRoom.name ).map(
                (message, index) =>
                <section className="message-data"key={index}>
                  <h4 id="userName">{message.username}</h4>
                  <div className="timeStamp">
                    <span>{message.sentAt}</span>
                  </div>
                <p className="message-content">{message.content}</p>
                </section>
                
              )}
            </section>
            
            <section className="new-message">
              <form className="message-form"onSubmit={ e => this.handleSubmit(e)}>
                <textarea
                  maxLength="250"
                  placeholder="Type your message here"
                  name="message"
                  id="message-text"
                  value={this.state.newContent}
                  onChange={e =>this.handleChange(e)}
                />
                <input id="message-submit" type="submit" value="Send"/>
              </form>
            </section>
          
          </div>
        )
    }
  
}
  
  export default MessageList;  
