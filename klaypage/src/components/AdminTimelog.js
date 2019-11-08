import React from "react";
import Apply from "./Apply";
import axios from "axios";

class AdminTimelog extends React.Component {
  state = {
    apply: [],
    accept: ""
  };
  CurrentApp = async e => {
    const {
      data: { apply }
    } = await axios.post("http://localhost:4000/currentapp", {
      params: {
        pubKey: localStorage.getItem("pubKey")
      }
    });
    await this.setState({ apply });
  };
  componentDidMount = async () => {
    await this.CurrentApp();
    console.log("apply", this.state.apply[0].db_accept);
  };

  createCon = async i => {
    console.log(
      "this.state.apply[i].db_articleId",
      this.state.apply[i].db_articleId
    );
    console.log(this.state.apply[i].db_apubKey);
    console.log(this.state.apply[i].db_opubKey);
    console.log(this.state.apply[i].db_accept);
    console.log("this.state.apply[i]", this.state.apply[i]);

    // console.log(this.state.apply[i].db_accept);
    const {
      data: { result }
    } = await axios.post("http://localhost:4000/createcontract", {
      params: {
        apubKey: this.state.apply[i].db_apubKey,
        opubKey: this.state.apply[i].db_opubKey,
        articleId: this.state.apply[i].db_articleId
      }
    });

    console.log("result:", result);
    return alert(result);
  };
  rejectCon = async i => {
    console.log("rejectCon의 i", i);
    console.log(
      "this.state.apply[i].db_articleId",
      this.state.apply[i].db_articleId
    );
    console.log(this.state.apply[i].db_apubKey);
    console.log(this.state.apply[i].db_opubKey);
    console.log(this.state.apply[i].db_accept);
    console.log("this.state.apply[i]", this.state.apply[i]);

    // console.log(this.state.apply[i].db_accept);
    const {
      data: { result }
    } = await axios.post("http://localhost:4000/rejectcontract", {
      params: {
        apubKey: this.state.apply[i].db_apubKey,
        opubKey: this.state.apply[i].db_opubKey,
        articleId: this.state.apply[i].db_articleId
      }
    });

    console.log("result:", result);
    return alert(result);
  };

  getAccept = async i => {
    const {
      data: { result }
    } = await axios.post("http://localhost:4000/getaccept", {
      params: {
        apubKey: this.state.apply[i].db_apubKey,
        opubKey: this.state.apply[i].db_opubKey,
        articleId: this.state.apply[i].db_articleId
      }
    });

    console.log("result:", result);
    return alert(result);
  };
  rejectCon = async i => {
    console.log("rejectCon의 i", i);
    console.log(
      "this.state.apply[i].db_articleId",
      this.state.apply[i].db_articleId
    );
    console.log(this.state.apply[i].db_apubKey);
    console.log(this.state.apply[i].db_opubKey);
    console.log(this.state.apply[i].db_accept);
    console.log("this.state.apply[i]", this.state.apply[i]);

    // console.log(this.state.apply[i].db_accept);
    const {
      data: { result }
    } = await axios.post("http://localhost:4000/rejectcontract", {
      params: {
        apubKey: this.state.apply[i].db_apubKey,
        opubKey: this.state.apply[i].db_opubKey,
        articleId: this.state.apply[i].db_articleId
      }
    });

    console.log("result:", result);
    return alert(result);
  };

  render() {
    const { apply } = this.state;
    // console.log("apply", apply[0].db_accept);

    return apply.length === 0 ? (
      <>
        <div>올라간 공고가 없어요.</div>
      </>
    ) : !apply.db_accept ? ( // 계약 체결하면 없어져야 로직 짜기 db_accept로 하면 될듯
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
              rejectCon={() => {
                this.rejectCon(i);
              }}
            />
          ))}
        </div>
      </>
    ) : (
      <>
        <div>현재 대기중인 지원자가 없어요~</div>
      </>
    );
  }
}

export default AdminTimelog;
