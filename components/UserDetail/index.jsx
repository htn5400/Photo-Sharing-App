import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

import axios from 'axios';

/**
 * Define UserDetail, a React component of CS142 Project 5.
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currUser: {},
    };
  }

  componentDidMount() {
    let url = "/user/" + this.props.match.params.userId;
    this._isMounted = true;
    axios.get(url)
      .then(response => {
        this.props.onNewView(response.data.first_name + " " + response.data.last_name); //topBar
        if (this._isMounted) {
          this.setState({currUser: response.data});
        }})
      .catch(error => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.userId !== this.props.match.params.userId ) {
      let url = "/user/" + this.props.match.params.userId;
      axios.get(url).then((response) => {
        this.props.onNewView(response.data.first_name + " " + response.data.last_name);
        if (this._isMounted) {
          this.setState({
            currUser: response.data
          });
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  render() {
    return (
      <div>
      <p>{this.state.currUser.first_name + " " + this.state.currUser.last_name}</p>
      <p>Location: {this.state.currUser.location} </p> 
      <p>Description: {this.state.currUser.description} </p>
      <p>Occupation: {this.state.currUser.occupation} </p>

      <Link to={"/photos/" + this.state.currUser._id}> See photos </Link>
      </div>
    );
  }
}

export default UserDetail;