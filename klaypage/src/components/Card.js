import React from "react";
import "./../css/Card.css";

const Card = ({
  db_title,
  db_wtype,
  db_sdate,
  db_edate,
  db_money,
  db_address,
  db_description,
  db_img,
  Apply
}) => {
  return (
    <div className="Card">
      <h4>상호명</h4>
      <p>{db_title}</p>
      <h4>업무</h4>
      <p>{db_wtype}</p>
      <h4>근무기간</h4>
      <p>
        {db_sdate}~{db_edate}
      </p>
      <h4>시급</h4>
      <p>{db_money}</p>
      <h4>주소</h4>
      <p>{db_address}</p>
      <h4>상세설명</h4>
      <p>{db_description}</p>
      <img src={`http://localhost:4000/${db_img}`} alt="" />
      <button onClick={Apply}>지원하기</button>
    </div>
  );
};

export default Card;
