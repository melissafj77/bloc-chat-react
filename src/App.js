import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList  from './components/RoomList'

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
  render() {
    return (
      <div className="App">
       <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
