
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

  createRoom(newRoomName){
    this.roomsRef.push({
      name: newRoomName
    });
  }

  render() {
    return (
      <div>
        {this.state.rooms.map((room, key) => (
          <div key={room.key}>
            <h1>{room.name}</h1>
          </div>
        ))}
        <form onSubmit={ e => this.handleSubmit(e)}>
          <label htmlFor="room-name">New Room</label>
          <input
            type="text"
            name="name"
            id="room-name"
            value={this.state.newRoomName}
            onChange={e =>this.handleChange(e)}
          />
          <input type="submit" value="submit"/>
        </form>
      </div>
    );
  }
}

export default RoomList;