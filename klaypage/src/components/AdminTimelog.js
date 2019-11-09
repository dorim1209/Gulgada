import React from "react";
import Apply from "./Apply";
import axios from "axios";

class AdminTimelog extends React.Component {
  state = {
    applyList: []
  };
  CurrentApp = async e => {
    const {
      data: { applyList }
    } = await axios.post("http://localhost:4000/createcontract", {
      params: {
        pnum: localStorage.getItem("pnum")
      }
    });
    await this.setState({ applyList });
  };
  componentDidMount = async () => {
    await this.CurrentApp();
    console.log("applyList", this.state.applyList);
  };

  createCon = async i => {
    console.log(
      "this.state.applyList[i].db_articleId",
      this.state.applyList[i].db_articleId
    );
    console.log(this.state.applyList[i].db_apubKey);
    console.log(this.state.applyList[i].db_opubKey);
    console.log(this.state.applyList[i].db_accept);
    console.log("this.state.applyList[i]", this.state.applyList[i]);

    // console.log(this.state.applyList[i].db_accept);
    const {
      data: { result }
    } = await axios.post("http://localhost:4000/createcontract/approve", {
      params: {
        apubKey: this.state.applyList[i].db_apubKey,
        opubKey: this.state.applyList[i].db_opubKey,
        articleId: this.state.applyList[i].db_articleId
      }
    });

    console.log("result:", result);
    return alert(result);
  };
  rejectCon = async i => {
    console.log(
      "this.state.applyList[i].db_articleId",
      this.state.applyList[i].db_articleId
    );
    console.log(this.state.applyList[i].db_apubKey);
    console.log(this.state.applyList[i].db_opubKey);
    console.log(this.state.applyList[i].db_accept);
    console.log("this.state.applyList[i]", this.state.applyList[i]);

    // console.log(this.state.applyList[i].db_accept);
    const {
      data: { result }
    } = await axios.post("http://localhost:4000/createcontract/deny", {
      params: {
        apubKey: this.state.applyList[i].db_apubKey,
        opubKey: this.state.applyList[i].db_opubKey,
        articleId: this.state.applyList[i].db_articleId
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
  // rejectCon = async i => {
  //   console.log("rejectCon의 i", i);
  //   console.log(
  //     "this.state.apply[i].db_articleId",
  //     this.state.apply[i].db_articleId
  //   );
  //   console.log(this.state.apply[i].db_apubKey);
  //   console.log(this.state.apply[i].db_opubKey);
  //   console.log(this.state.apply[i].db_accept);
  //   console.log("this.state.apply[i]", this.state.apply[i]);

  //   // console.log(this.state.apply[i].db_accept);
  //   const {
  //     data: { result }
  //   } = await axios.post("http://localhost:4000/rejectcontract", {
  //     params: {
  //       apubKey: this.state.apply[i].db_apubKey,
  //       opubKey: this.state.apply[i].db_opubKey,
  //       articleId: this.state.apply[i].db_articleId
  //     }
  //   });

  //   console.log("result:", result);
  //   return alert(result);
  // };

  render() {
    const { applyList } = this.state;
    // console.log("applyList", applyList[0].db_accept);

    return applyList.length === 0 ? (
      <>
        <div>올라간 공고가 없어요.</div>
      </>
    ) : (
      <>
        <div>
          {applyList.map(({ db_articleId, db_title, db_wtype, db_name }, i) => (
            <Apply
              db_articleId={db_articleId}
              db_title={db_title}
              db_wtype={db_wtype}
              db_name={db_name}
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
    );
  }
}

export default AdminTimelog;
