import React from "react";
import "./../css/Card.css";

const Card = ({ db_title, db_date, db_money, db_address, db_img, Apply }) => {
  return (
    <div className="Card">
      <h4>업종</h4>
      <p>{db_title}</p>
      <h4>날짜</h4>
      <p>{db_date}</p>
      <h4>시급</h4>
      <p>{db_money}</p>
      <h4>주소</h4>
      <p>{db_address}</p>
      <img src={`http://localhost:4000/${db_img}`} alt="" />
      <button onClick={Apply}>지원하기</button>
    </div>
  );
};

export default Card;
