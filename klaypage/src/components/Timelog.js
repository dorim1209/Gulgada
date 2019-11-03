import React from "react";
import axios from "axios";

class Timelog extends React.Component {
  state = {
    go: "",
    leave: "",
    timelog: ""
  };
  Timelog = async e => {
    const {
      data: { result }
    } = await axios.post("http://localhost:4000/timelog", {
      params: {
        pnum: localStorage.getItem("pnum"),
        name: localStorage.getItem("name"),
        go: this.state.go,
        leave: this.state.leave,
        timelog: this.state.timelog
      }
    });

    console.log(result);
    return alert(result);
  };
  gobuttonChange = async e => {
    await this.setState({
      go: 1,
      leave: "",
      timelog: Date()
    });
    await console.log("go", this.state.go);
    await console.log("leave", this.state.leave);
    await console.log("timelog : ", this.state.timelog);
    await this.Timelog();
  };
  leavebuttonChange = async e => {
    await this.setState({
      go: "",
      leave: 1,
      timelog: Date()
    });
    await console.log("go", this.state.go);
    await console.log("leave", this.state.leave);
    await console.log("timelog", this.state.timelog);
    await this.Timelog();
  };
  render() {
    console.log(this.state.go);

    return this.state.go === 1 ? (
      <div>
        <button type="button" onClick={this.leavebuttonChange}>
          퇴근
        </button>
        <p>{this.state.timelog} 출근했습니다.</p>
      </div>
    ) : this.state.leave === 1 ? (
      <div>
        <button type="button" onClick={this.gobuttonChange}>
          출근
        </button>
        <p>{this.state.timelog} 퇴근했습니다.</p>
      </div>
    ) : (
      <div>
        <button type="button" onClick={this.gobuttonChange}>
          출근
        </button>
        <button type="button" onClick={this.leavebuttonChange}>
          퇴근
        </button>
      </div>
    );
  }
}

export default Timelog;
