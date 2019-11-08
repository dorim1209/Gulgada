import React from "react";
import Apply from "./Apply";
import axios from "axios";

const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651"); // cypress에서는 "https://api.cypress.klaytn.net:8651"를 사용하세요.
const fs = require("fs");
const contractAbi =
  '[{"constant":true,"inputs":[{"name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenId","type":"uint256"},{"indexed":false,"name":"paper","type":"string"},{"indexed":false,"name":"title","type":"string"},{"indexed":false,"name":"location","type":"string"},{"indexed":false,"name":"description","type":"string"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"PaperUploaded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"approved","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"operator","type":"address"},{"indexed":false,"name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"constant":false,"inputs":[{"name":"paper","type":"string"},{"name":"title","type":"string"},{"name":"location","type":"string"},{"name":"description","type":"string"}],"name":"uploadPaper","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tokenId","type":"uint256"},{"name":"to","type":"address"}],"name":"transferOwnership","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTotalPaperCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"getPaper","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address[]"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]';

// 1. 로그인된 유저키 받기
const walletInstance = caver.klay.accounts.privateKeyToAccount(
  "0x66aa1f198771c7861cf003a2ce442e49913b804659e0ebbbff58059de974fb66" // 컨트랙트를 배포하고자 하는 개인키를 입력하세요.
);
caver.klay.accounts.wallet.add(walletInstance);

// 고정된 컨트랙트 배포 주소
let contractAddress = "0x7941520f7b7fe70d258cac5f035e9d672449e3f3";

const contract = new caver.klay.Contract(
  JSON.parse(contractAbi),
  contractAddress,
  {
    from: caver.klay.accounts.wallet[0].address
  }
);

class AdminTimelog extends React.Component {
  state = {
    apply: []
  };
  CurrentApp = async e => {
    const {
      data: { apply }
    } = await axios.post("http://localhost:4000/currentapp", {
      params: {
        pubKey: localStorage.getItem("pubKey")
      }
    });
    this.setState({ apply });
  };
  componentDidMount = async () => {
    await this.CurrentApp();
    await console.log(this.state.apply.length);
  };

  uploadArticle = async () => {
    await contract.methods
      .uploadPaper("workerAddr", "time", "title", "location")
      .send({
        from: "0x5d6a6af8890ee4bba6f3e23138a03b8017c33c2f",
        gas: "5000000"
      }) //caver.klay.accounts.wallet[0].address
      .then(function(result) {
        console.log(result);
      });
    alert("성공");
  };
  createCon = async i => {
    alert(i);
    console.log(this.state.apply[i].db_accept);

    // this.setState(apply[i].db_accept:0)
  };
  render() {
    const { apply } = this.state;

    return this.state.apply.length === 0 ? (
      <>
        <div>올라간 공고가 없어요.</div>
      </>
    ) : !this.state.apply.db_accept ? (
      <>
        <div>
          {apply.map(({ db_apubKey, id, db_opubKey }, i) => (
            <Apply
              db_apubKey={db_apubKey}
              id={id}
              db_opubKey={db_opubKey}
              createCon={() => {
                this.createCon(i);
              }}
            />
          ))}
          <button onClick={this.uploadArticle}>트랜잭션 생성</button>
        </div>
      </>
    ) : (
      <>
        <div>현재 대기중인 지원자가 없어요~</div>
      </>
    );
    // return (
    //   <>
    //     if(!{this.state.apply.db_accept})
    //     {
    //       <div>
    // {apply.map(({ db_apubKey, id, db_opubKey }, i) => (
    //   <Apply
    //     db_apubKey={db_apubKey}
    //     id={id}
    //     db_opubKey={db_opubKey}
    //     createCon={() => {
    //       this.createCon(i);
    //     }}
    //   />
    // ))}
    // <button onClick={this.uploadArticle}>트랜잭션 생성</button>
    //       </div>
    //     }
    //   </>
    // );
  }
}

export default AdminTimelog;
