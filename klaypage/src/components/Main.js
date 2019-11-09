import React from "react";
import Card from "./Card";
import "./../css/Main.css";

import axios from "axios";

class Main extends React.Component {
  state = {
    article: [],
    pnum: localStorage.getItem("pnum"),
    ptype: localStorage.getItem("ptype"),
    name: localStorage.getItem("name"),
    pubKey: localStorage.getItem("pubKey")
  };
  article = async () => {
    const {
      data: { article }
    } = await axios.get("http://localhost:4000/article");
    console.log(article);
    this.setState({ article });
  };

  Apply = async i => {
    const {
      data: { result }
    } = await axios.post("http://localhost:4000/apply", {
      params: {
        apubKey: this.state.pubKey,
        articleId: this.state.article[i].id,
        name: localStorage.getItem("pnum")
      }
    });
    // console.log(this.state.article[i].id + this.state.pnum);
    if (result === 1) {
      alert("지원되었습니다.");
    }
  };

  componentDidMount = () => {
    this.article();
    const pnum = localStorage.getItem("pnum");
    const name = localStorage.getItem("name");
    const ptype = localStorage.getItem("ptype");
    const pubKey = localStorage.getItem("pubKey");
    console.log("****************************");
    console.log("확인 pnum: ", pnum);
    console.log("확인 name: ", name);
    console.log("확인 ptype: ", ptype);
    console.log("확인 pubKey: ", pubKey);
    console.log("****************************");
  };

  render() {
    const { article } = this.state;
    return (
      <div className="Main">
        <input placeholder="검색하세요" />
        <button>검색</button>
        <p>최근 검색 내역</p>
        <p>신규 공고 내역</p>
        <table></table>
        <div className="newRecruit">
          {article.map(
            (
              {
                db_title,
                db_wtype,
                db_sdate,
                db_edate,
                db_stime,
                db_smin,
                db_etime,
                db_emin,
                db_money,
                db_address,
                db_description,
                db_img
              },
              i
            ) => (
              <Card
                db_title={db_title}
                db_wtype={db_wtype}
                db_sdate={db_sdate}
                db_edate={db_edate}
                db_stime={db_stime}
                db_smin={db_smin}
                db_etime={db_etime}
                db_emin={db_emin}
                db_money={db_money}
                db_address={db_address}
                db_description={db_description}
                db_img={db_img}
                Apply={() => {
                  this.Apply(i);
                }}
              />
            )
          )}
        </div>
      </div>
    );
  }
}

export default Main;
