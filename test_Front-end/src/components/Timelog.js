import React from "react";
import axios from "axios";
import TotalTimelog from "./totalTimelog";

class Timelog extends React.Component {

  state = {
    resultFlag: '1',
    timeLog: "",
    milliTime: ""
  };

  componentWillMount = async () => {
    await this.startTimelog();
  }

  Timelog = async () => {
    const {
      data: { result }
    } = await axios.post("http://localhost:4000/timelog", {
      params: {
        pnum: localStorage.getItem("pnum"),
        name: localStorage.getItem("name"),
        resultFlag: this.state.resultFlag,
        timeLog: this.state.timeLog,
        milliTime: this.state.milliTime
      }
    });
    if (this.state.resultFlag === '1') {
      this.setState({ resultFlag: '0' })
    } else {
      this.setState({ resultFlag: '1' })
    }
    console.log(result);
    return alert(result);
  };

  startTimelog = async () => {
    const {
      data: { result }
    } = await axios.post("http://localhost:4000/startTimelog", {
      params: {
        pnum: localStorage.getItem("pnum")
      }
    });
    console.log('안녕');
    console.log(result);

    if (result === '1') {
      this.setState({ resultFlag: '0' })
    } else {
      this.setState({ resultFlag: '1' })
    }
    /* await this.setState({ resultFlag: result }) */
  };


  TimeButtonChange = async () => {
    const date = new Date()
    await this.setState({
      timeLog: date.toLocaleString(),
      milliTime: date.getTime()
    });
    await this.Timelog();
  };
  render() {
    return (
      <>
        {(this.state.resultFlag === '0' ? <button onClick={this.TimeButtonChange}>퇴근</button> : <button onClick={this.TimeButtonChange}>출근</button>)}
        < TotalTimelog />
      </>
    )
  }
}

export default Timelog;
