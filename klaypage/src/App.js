import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/Login";
import Join from "./components/Join";
import Mypage from "./components/Mypage";
import Upload from "./components/Upload";
import Timelog from "./components/Timelog";

import "./css/App.css";

class App extends React.Component {
  state = {
    MainMode: true,
    LoginMode: false,
    JoinMode: false,
    MypageMode: false,
    UploadMode: false,
    TimelogMode: false
  };
  MainMode = () => {
    this.setState({
      MainMode: true,
      LoginMode: false,
      JoinMode: false,
      MypageMode: false,
      UploadMode: false,
      TimelogMode: false
    });
  };
  LoginMode = e => {
    this.setState({
      MainMode: false,
      LoginMode: true,
      JoinMode: false,
      MypageMode: false,
      UploadMode: false,
      TimelogMode: false
    });
  };
  JoinMode = () => {
    this.setState({
      MainMode: false,
      LoginMode: false,
      JoinMode: true,
      MypageMode: false,
      UploadMode: false,
      TimelogMode: false
    });
  };
  MypageMode = () => {
    this.setState({
      MainMode: false,
      LoginMode: false,
      JoinMode: false,
      MypageMode: true,
      UploadMode: false,
      TimelogMode: false
    });
  };
  UploadMode = () => {
    this.setState({
      MainMode: false,
      LoginMode: false,
      JoinMode: false,
      MypageMode: false,
      UploadMode: true,
      TimelogMode: false
    });
  };
  TimelogMode = () => {
    this.setState({
      MainMode: false,
      LoginMode: false,
      JoinMode: false,
      MypageMode: false,
      UploadMode: false,
      TimelogMode: true
    });
  };
  LogoutMode = () => {
    localStorage.clear();
  };
  render() {
    const {
      MainMode,
      LoginMode,
      JoinMode,
      MypageMode,
      UploadMode,
      TimelogMode
    } = this.state;
    return (
      <div className="App">
        <Header
          MainMode={this.MainMode}
          LoginMode={this.LoginMode}
          JoinMode={this.JoinMode}
          LogoutMode={this.LogoutMode}
          MypageMode={this.MypageMode}
          UploadMode={this.UploadMode}
          TimelogMode={this.TimelogMode}
        />
        {MainMode ? (
          <Main />
        ) : LoginMode ? (
          <Login />
        ) : JoinMode ? (
          <Join />
        ) : MypageMode ? (
          <Mypage />
        ) : UploadMode ? (
          <Upload />
        ) : TimelogMode ? (
          <Timelog />
        ) : (
          <Main />
        )}
      </div>
    );
  }
}

export default App;
