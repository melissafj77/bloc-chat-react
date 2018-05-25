import React, {Component} from 'react';

class User extends Component {
   
    constructor(props){
        super(props);

        this.state={};

       this.signIn = this.signIn.bind(this);
       this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        });
    }
h
    signIn(){
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
    }

    logOut(){
        this.props.firebase.auth().signOut()
            
    }

    render(){
        return(
            <section className="user">
                <h3 className="user-name">Logged in as: {this.props.activeUser? this.props.activeUser : "Guest"}</h3>
                <button onClick={this.signIn}>Sign In</button>
                <button onClick={this.logOut}>Log Out</button>
            </section>
        )
    }
}

export default User;