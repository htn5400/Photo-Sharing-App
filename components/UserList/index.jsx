import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import axios from 'axios';

/**
 * Define UserList, a React component of CS142 Project 5.
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allUsers: [],
    };
  }

  componentDidMount(){
    let url = "/user/list";
    axios.get(url)
      .then(response => {
        this.setState({allUsers: response.data}); 
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Typography variant="body1">
          List of Users
        </Typography>

        <List > 
          {this.state.allUsers.map(user => (
            <ListItem key={user._id}> 
              <ListItemText>
                <Link to={"/users/" + user._id}>{user.first_name + " " + user.last_name}</Link>
              </ListItemText>
            </ListItem>
            )
          )}   
        </List> 
      </div>
    );
  }
}

export default UserList;
