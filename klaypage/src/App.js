import React from 'react';
import Header from './components/Header'
import Main from './components/Main'
import Login from './components/Login'
import Join from './components/Join'
import Mypage from './components/Mypage';
import Upload from './components/Upload'

import './css/App.css'

class App extends React.Component {
  state = {
    MainMode: true,
    LoginMode: false,
    JoinMode: false,
    MypageMode: false,
    UploadMode: false
  }
  MainMode = () => {
    this.setState({ MainMode: true, LoginMode: false, JoinMode: false, MypageMode: false, UploadMode: false })
  }
  LoginMode = (e) => {
    this.setState({ MainMode: false, LoginMode: true, JoinMode: false, MypageMode: false, UploadMode: false })
  }
  JoinMode = () => {
    this.setState({ MainMode: false, LoginMode: false, JoinMode: true, MypageMode: false, UploadMode: false })
  }
  MypageMode = () => {
    this.setState({ MainMode: false, LoginMode: false, JoinMode: false, MypageMode: true, UploadMode: false })
  }
  UploadMode = () => {
    this.setState({ MainMode: false, LoginMode: false, JoinMode: false, MypageMode: false, UploadMode: true })
  }
  LogoutMode = () => {
    localStorage.clear()
  }
  render() {
    const { MainMode, LoginMode, JoinMode, MypageMode, UploadMode } = this.state
    return (
      <div className="App" >
        <Header MainMode={this.MainMode} LoginMode={this.LoginMode} JoinMode={this.JoinMode} LogoutMode={this.LogoutMode} MypageMode={this.MypageMode} UploadMode={this.UploadMode} />
        {MainMode ? <Main /> : LoginMode ? < Login /> : JoinMode ? <Join /> : MypageMode ? <Mypage /> : UploadMode ? <Upload /> : <Main />}
      </div>
    );
  }
}

export default App;
