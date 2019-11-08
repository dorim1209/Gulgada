import React from "react";
import "./../css/Card.css";

const Apply = ({
  db_apubKey,
  id,
  db_opubKey,
  db_accept,
  createCon,
  rejectCon
}) => {
  return (
    <div className="Apply">
      {db_apubKey}, {id}, {db_opubKey},{db_accept}
      <button onClick={createCon}>수락</button>
      <button onClick={rejectCon}>거절</button>
    </div>
  );
};

export default Apply;
