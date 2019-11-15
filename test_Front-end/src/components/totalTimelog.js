import React from "react";
import axios from "axios";

class Timelog extends React.Component {

  state = {
    totalTime: ''
  };

  componentWillMount = async () => {
    await this.Timelog();
  }

  Timelog = async () => {
    const {
      data: { result }
    } = await axios.post("http://localhost:4000/totalTimelog", {
      params: {
        pnum: localStorage.getItem("pnum"),
      }
    });
    this.setState({ totalTime: result })
  };
  render() {
    return (<p>총 일한 시간 : {this.state.totalTime}</p>)
  }
}

export default Timelog;
