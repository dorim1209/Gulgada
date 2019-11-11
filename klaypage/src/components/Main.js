import React from "react";
import Card from "./Card";
import "./../css/Main.css";

import axios from "axios";

class Main extends React.Component {
  state = {
    article: [],
    pnum: localStorage.getItem("pnum")
  };
  article = async () => {
    const {
      data: { article }
    } = await axios.get("http://localhost:4000/article");
    console.log(article);
    this.setState({ article });
  };
  Apply = async i => {
    // const {
    //   data: { result }
    // } = await axios.post("http://localhost:4000/apply", {
    //   params: {
    //     name: this.state.name,
    //     pnum: this.state.pnum,
    //     ptype: this.state.ptype,
    //     birth: this.state.birth,
    //     applyno: this.state.article.id + this.state.pnum
    //   }
    // });
    console.log(this.state.article[i].id + this.state.pnum);
    // console.log(this.state.pnum);
  };

  componentDidMount = () => {
    this.article();
    const pnum = localStorage.getItem("pnum");
    const name = localStorage.getItem("name");
    console.log("****************************");
    console.log("확인 pnum: ", pnum);
    console.log("확인 name: ", name);
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
            ({ db_title, db_date, db_money, db_address, db_img }) => (
              <Card
                db_title={db_title}
                db_date={db_date}
                db_money={db_money}
                db_address={db_address}
                db_img={db_img}
              />
            )
          )}
        </div>
      </div>
    );
  }
}

export default Main;
