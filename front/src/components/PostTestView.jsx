import React from "react";
import { useHistory } from "react-router-dom";
import { confirmPost } from "../store/actionsCreators/testActions";
import {useDispatch} from "react-redux"

export default ({ test, user, skill, finalAnswers }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault()
    history.push("/");
    dispatch(confirmPost(false));
  };

  return (
    <div className="div-container">
        <div className="sub-container">
          <h1 className= "aprobado h1-end">
            Resultado: {finalAnswers.length}/10
          </h1>
          <p className="p-end">
            <strong>{user.name}</strong>, recordá que si queres volver a intentar el test de 
            {" " + skill.name} deberás esperar 1 semana.
          </p>
          <button
            onClick={(e) => handleClick(e)}
            className="btn-bgd-blue  btn-center"
            type="submit"
          >
            Volver a Home
          </button>
        </div>
      {/*)  : (
        <div className="sub-container">
          <h1 className={`${!test.status ? "desaprobado" : ""} h1-end`}>
            Test no superado
          </h1>
          <p className="p-end">
            No has conseguido la puntuacion necesaria para validar esta aptitud.
            Podrás intentarlo nuevamente en 24 hs.
          </p>

          <button
            onClick={(e) => handleClick(e)}
            className={`${!test.status ? "btn-bgd-pink" : ""} btn-center`}
            type="submit"
          >
            Volver a Home
          </button>
        </div>
      )} */}
    </div>
  );
};
