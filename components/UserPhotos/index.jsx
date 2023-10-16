import React from "react";
import {
  List,
  ListItem,
  Card
} from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import axios from 'axios';

/**
 * Define UserPhotos, a React component of CS142 Project 5.
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currPhotos: [],
    };
  }

  componentDidMount() {
    let url = "/photosOfUser/" + this.props.match.params.userId;
    this._isMounted = true;
    axios.get(url).then((res) => {
      if (this._isMounted) {
        this.setState({
          currPhotos: res.data
        });
      }
    }).catch((error) => {
      console.log(error);
    });

    //for top bar
    axios.get("/user/" + this.props.match.params.userId).then((res) => {
      this.props.onNewView("Photos of " + res.data.first_name + " " + res.data.last_name);
    }).catch((error) => {
      console.log(error);
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.userId !== this.props.match.params.userId){
      let url = "/photosOfUser/" + this.props.match.params.userId;
      axios.get(url).then((res) => {
        if (this._isMounted) {
          this.setState({
            currPhotos: res.data
          });
        }
      }).catch((error) => {
        console.log(error);
      });

      //for top bar
      axios.get("/user/" + this.props.match.params.userId).then((res) => {
        this.props.onNewView("Photos of " + res.data.first_name + " " + res.data.last_name);
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
        <List className="flexcontainer"> 
          
          {this.state.currPhotos ? this.state.currPhotos.map(photo =>  (
            <Card key={photo._id}>
            <ListItem >
              <Card><p>Photo posted: {(new Date(photo.date_time)).toString()}</p></Card>
              <img src={"images/" + photo.file_name} width="100" height="100"/>

              <List>
              {photo.comments? photo.comments.map(comment => (
                <Card key={comment._id}>
                <ListItem >
                  <p>Comment posted: {(new Date(comment.date_time)).toString()}</p>
                  <p>Comment: {comment.comment}</p>
                  <Link to={"/users/" + comment.user._id}>Commenter: {comment.user.first_name + " " + comment.user.last_name}</Link>
                </ListItem>
                </Card>
                )
              )
                : <div/>}
              </List> 
              
            </ListItem> 
            </Card>
            )
          ) 
          : <div/>}    
        </List> 
    );
  }
}



export default UserPhotos;