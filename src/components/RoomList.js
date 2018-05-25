
import React, { Component } from "react";

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName:""

    };
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  handleSubmit(e){
    e.preventDefault();
    this.createRoom(this.state.newRoomName);
  }

  handleChange(e){
    e.preventDefault();
    this.setState({newRoomName: e.target.value});
  }

  createRoom(newRoomName) {
    if (this.state.newRoomName === ''){
      alert('Please name the room');
    } else {
    this.roomsRef.push({
      name: newRoomName
    });
    this.setState({ newRoomName:''});
    }
  }

  render() {
    return (
      <section className='chat-rooms'>
        <form className="room-form"onSubmit={ e => this.handleSubmit(e)}>
          <label htmlFor="room-name">New Room</label>
          <input
            
            type="text"
            name="name"
            id="room-name"
            value={this.state.newRoomName}
            onChange={e =>this.handleChange(e)}
          />
          <input id="room-submit" type="submit" value="submit"/>
        </form>
        <ul className='rooms-list'>{ 
      this.state.rooms.map( (room, index) =>(
        <li key={room.key} onClick={ (e) => this.props.activeRoom(room)}>{room.name}</li>
      )
    )}
        </ul>
      </section>
    );
  }
}
      

export default RoomList;