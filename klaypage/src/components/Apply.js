import React from "react";
import "./../css/Card.css";

const Apply = ({ db_apubKey, id, db_opubKey, db_accept, createCon }) => {
  return (
    <div className="Apply">
      {db_apubKey}, {id}, {db_opubKey},{db_accept}
      <button onClick={createCon}>계약체결하기</button>
    </div>
  );
};

export default Apply;
