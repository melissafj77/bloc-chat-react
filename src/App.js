import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList  from './components/RoomList'
import MessageList from './components/MessageList'
import User from  './components/User.js'

// Initialize Firebase
 var config = {
  apiKey: "AIzaSyDX9m5ck6Opy7Zwk3PfWCnpZt5L7Z_bj-Y",
  authDomain: "bloc-chat-react-melissa.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-melissa.firebaseio.com",
  projectId: "bloc-chat-react-melissa",
  storageBucket: "bloc-chat-react-melissa.appspot.com",
  messagingSenderId: "835566979935"
};
firebase.initializeApp(config);

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      activeRoom:{},
      activeUser: ''
    }

    this.activeRoom =this.activeRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }
    activeRoom(room){
      this.setState({ activeRoom: room });
    }
  
    
    setUser(user){
             if (user !== null){
                this.setState({ activeUser: user.displayName});
              }else {
                this.setState({ activeUser: null});
              }
          }
  

  
  render() {
    return (
      <div className="App">
        <div className="side">
        <h1>Bloc Chat</h1>
        <section className="user">
          <User 
          firebase={firebase}
          setUser = {this.setUser}
          activeUser = {this.state.activeUser}
          />
          </section>
          <section className="rooms">
          <RoomList
            firebase={firebase}
            activeRoom= {this.activeRoom}           
          /> 
          </section>
          
        </div>
        <section className="messageList">
      <MessageList
        firebase= { firebase }
        activeRoom= { this.state.activeRoom }
        />
      </section>
    </div>
    );
  }
}

export default App;
