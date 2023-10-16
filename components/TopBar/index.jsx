import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

import "./styles.css";
import axios from 'axios';

/**
 * Define TopBar, a React component of CS142 Project 5.
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      version: ""
    };
  }

  componentDidMount() {
    let url = "/test/info";
    axios.get(url).then((res) => {
      this.setState({
        version: res.data.__v
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar>
          <Typography variant="h5" color="inherit"> Huong&apos;s App</Typography>
          <Typography variant="h5" color="inherit" marginLeft="auto">
            {this.props.content}.version {this.state.version}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;