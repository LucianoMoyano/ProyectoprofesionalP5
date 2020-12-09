import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
moment().format();

export default ({ user, skill, testDate }) => {

  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/");
    dispatch(confirmPost(false));
  };

  return (
          
    <div className="div-container">
      <div className="sub-container">
        <h1>
      <strong>{user.name}</strong>, podes volver a realizar el test el {" " + moment(testDate).lang("es").format("LL") + " " + "a las" + " " + moment(testDate).lang("es").format("LT")}.
        </h1>
        <button
          onClick={(e) => handleClick(e)}
          className="btn-bgd-blue  btn-center"
          type="submit"
        >
          Volver a Home
        </button>
      </div>
    </div>
  );
};
