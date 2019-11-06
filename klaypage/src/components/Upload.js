import React, { Component } from "react";
import axios from "axios";

class Upload extends Component {
  state = {
    title: "",
    wtype: "",
    sdate: "",
    edate: "",
    money: "",
    address: "",
    description: "",
    pubKey: "",
    img: null
  };
  Upload = async e => {
    const formData = new FormData();
    await this.setState({
      pubKey: localStorage.getItem("pubKey")
    });
    await console.log("this.state.pubKey", this.state.pubKey);
    formData.append("file", this.state.img);
    formData.append("title", this.state.title);
    formData.append("wtype", this.state.wtype);
    formData.append("sdate", this.state.sdate);
    formData.append("edate", this.state.edate);
    formData.append("money", this.state.money);
    formData.append("address", this.state.address);
    formData.append("description", this.state.description);
    formData.append("pubKey", this.state.pubKey);

    const {
      data: { result }
    } = await axios.post("http://localhost:4000/upload", formData);
    if (result) {
      // this.setState({
      //   pubKey: localStorage.getItem("pubKey")
      // });
      return alert(`${result}`);
    }
  };
  imgChange = e => {
    console.log("e.target.files[0]: ", e.target.files[0]);

    this.setState({
      img: e.target.files[0]
    });
  };
  titleChange = e => {
    this.setState({
      title: e.target.value
    });
  };
  wtypeChange = e => {
    this.setState({
      wtype: e.target.value
    });
  };
  sdateChange = e => {
    this.setState({
      sdate: e.target.value
    });
  };
  edateChange = e => {
    this.setState({
      edate: e.target.value
    });
  };
  moneyChange = e => {
    this.setState({
      money: e.target.value
    });
  };
  addressChange = e => {
    this.setState({
      address: e.target.value
    });
  };
  descriptionChange = e => {
    this.setState({
      description: e.target.value
    });
  };

  render() {
    return (
      <div className="Upload">
        <input type="file" onChange={this.imgChange} />
        <p>상호명</p>
        <input
          type="text"
          name=""
          id=""
          placeholder="상호명"
          value={this.state.title}
          onChange={this.titleChange}
        />
        <p>업무</p>
        <input
          type="text"
          name=""
          id=""
          placeholder="간단한 업무소개를 적어주세요"
          value={this.state.wtype}
          onChange={this.wtypeChange}
        />
        <p>근무 시작 날짜</p>
        <input
          type="text"
          name=""
          id=""
          placeholder="근무 시작 날짜"
          value={this.state.sdate}
          onChange={this.sdateChange}
        />
        <p>근무 마치는 날짜</p>
        <input
          type="text"
          name=""
          id=""
          placeholder="근무 마치는 날짜"
          value={this.state.edate}
          onChange={this.edateChange}
        />
        <p>시급</p>
        <input
          type="text"
          name=""
          id=""
          placeholder="시급"
          value={this.state.money}
          onChange={this.moneyChange}
        />
        <p>주소</p>
        <input
          type="text"
          name=""
          id=""
          placeholder="주소"
          value={this.state.address}
          onChange={this.addressChange}
        />
        <p>설명</p>
        <input
          type="text"
          name=""
          id=""
          placeholder="업무에 관한 자세한 설명을 적어주세요"
          value={this.state.description}
          onChange={this.descriptionChange}
        />
        <button onClick={this.Upload}>공고올리기</button>
      </div>
    );
  }
}

export default Upload;
