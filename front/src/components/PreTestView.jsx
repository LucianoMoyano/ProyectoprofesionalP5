import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import moment from 'moment';
import WarningTest from "../components/WarningTest";
moment().format(); 

export default ({ history }) => {
  //LOCAL STATE
  const [open, setOpen] = useState(false);

  //REDUX STATE
  const { selectedSkill } = useSelector((state) => state.skillReducer);
  const { user, users } = useSelector((state) => state.usersReducer);
  const { testDate } = useSelector((state) => state.testReducer);
 

  const handleClose = () => {
    history.push(`/tests/${selectedSkill.name}`);
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  // console.log(" moment lalal ", moment(testDate).diff(moment(), "days"))
  console.log(moment(testDate).diff(moment(), "seconds"), 'Tiempo de la linea 41')

  return (
    <div
      className="modalPre"
      open={open}
      onClose={handleClose}
      disableBackdropClick
    >
      {
         moment(testDate).diff(moment(), "seconds") > 0 ? <WarningTest user={user} skill={selectedSkill}  testDate={testDate}/>:  (
        <div className="divModalPre">
          <div>
            <h1>Bienvenid@ {user.name} </h1>
            <h3>
              Te encuentras a un paso de validar tus habilidades. De esta forma,
              demuestras tus conocimientos y aumentas el interés de tus futuros
              empleadores.
            </h3>
            <ul className="listado">
              <li>
                {" "}
                <i className="fa fa-check-square-o" aria-hidden="true">
                  {" "}
                </i>
                El test consiste en 10 preguntas multiple choice.
              </li>
              <li>
                <i className="fa fa-refresh" aria-hidden="true"></i>
                Si realizas el mismo test varias veces, se guardará únicamente tu último resultado. 
              </li>
              <li>
                {" "}
                <i className="fa fa-clock-o" aria-hidden="true"></i>Contarás con
                30 segundos para responder cada pregunta.
              </li>
              <li>
                <i className="fa fa-times-circle-o" aria-hidden="true"></i>En
                caso de no poder responder alguna de las preguntas correctamente
                o no cumplir con el tiempo estipulado, la validación será
                rechazada y podrás volver a intentarlo en 24hs.
              </li>
            </ul>
            <div className="footer margin-btn">
              <button
                className="btn-bgd-blue"
                onClick={() => history.push("/")}
              >
                Volver a Home
              </button>

              <button className="btn-bgd-pink" onClick={handleClose}>
                Iniciar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
