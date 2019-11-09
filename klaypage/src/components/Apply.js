import React from "react";
import "./../css/Card.css";

const Apply = ({
  db_articleId,
  db_title,
  db_wtype,
  db_name,
  createCon,
  rejectCon
}) => {
  return (
    <div className="Apply">
      {db_articleId}, {db_title}, {db_wtype},{db_name}
      <button onClick={createCon}>수락</button>
      <button onClick={rejectCon}>거절</button>
    </div>
  );
};

export default Apply;
