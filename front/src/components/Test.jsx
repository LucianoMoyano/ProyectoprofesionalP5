import React, { useEffect, useState } from "react";
import { useBeforeunload } from "react-beforeunload";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../store/actionsCreators/questionActions";
import {
  getAnswers,
  addUserAnswers,
  removeUserAnswers,
} from "../store/actionsCreators/answersActions";
import { sendTest } from "../store/actionsCreators/testActions";
import { Prompt } from "react-router-dom";
import { LinearProgress } from "@material-ui/core/";
import PostTestView from "./PostTestView";
import Timer from "./Timer";
import moment from "moment";
moment().format();

/* moment().diff(moment().add(7, 'days')._d.toString(), "days") */
let contador = 1;
export default function Test({ history }) {
  const dispatch = useDispatch();

  //-------------------------------------------ESTADOS LOCALES--------------------------------------//

  const [questionId, setQuestionId] = useState(""); //ID DE LA PREGUNTA ACTUAL
  const [puntero, setPuntero] = useState(0); //SELECTOR PREGUNTAS
  const [userSelectedAnswer, setUserSelectedAnswer] = useState("false"); //RESPUESTA ELEGIDA POR EL USUARIO
  const [arrayFinal, setArrayFinal] = useState([]); //ARRAY RESPUESTAS POSIBLES QUE SE VA A MAPEAR
  const [finalAnswers, setFinalAnswers] = useState([]); //ARRAY RESPUESTAS DEL USUARIO FILTRADO
  const [btnState, setBtnState] = useState(true); //HANDLER PARA EL DISABLE DEL BOTON
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [selectedAnswer2, setSelectedAnswer2] = useState(0);

  //[...questionAnswers, objetoNuevo]
  //-------------------------------------------ESTADOS REDUX--------------------------------------//

  const { testQuestions } = useSelector((state) => state.questionReducer); //TODAS LAS PREGUNTAS
  const { testAnswers, userAnswers } = useSelector(
    (state) => state.answersReducer
  ); //TODAS LAS RESPUESTAS
  const { selectedSkill } = useSelector((state) => state.skillReducer); //EL SKILL DEL TEST
  const { user } = useSelector((state) => state.usersReducer); //USUARIO QUE REALIZA EL TEST
  const { test, testPosted, minutes, seconds } = useSelector(
    (state) => state.testReducer
  ); //TEST QUE SE ENVIÖ

  //-------------------------------------------FUNCIONES--------------------------------------//

  //Función para elegir una respuesta incorrecta sin repetir
  function selectRandomAnswer(falseAnswers) {
    var index = Math.floor(Math.random() * falseAnswers.length);
    var item = falseAnswers[index];
    falseAnswers.splice(index, 1);
    return item;
  }

  //Función para hacer un array sólo con las respuestas a renderizar y darle un orden aleatorio
  function mergeAndSortAnswers(trueAnswer, falseAnswers) {
    const finalArrayToSort = [
      selectRandomAnswer(falseAnswers),
      selectRandomAnswer(falseAnswers),
      trueAnswer[0],
    ];

    setArrayFinal(finalArrayToSort.sort(() => Math.random() - 0.5));
  }

  const buscarPregunta = (e) => {
    e && e.preventDefault();
    dispatch(addUserAnswers([...userAnswers, userSelectedAnswer]));
    setPuntero(puntero + 1);
    testQuestions[contador] && setQuestionId(testQuestions[contador].id);
    setQuestionAnswers([
      ...questionAnswers,
      {
        questionId: questionId,
        answerId: selectedAnswer2,
      },
    ]);
    contador++;
  };

  //Funcion que maneja la selección de respuesta
  const handleChange = (input) => {
    setUserSelectedAnswer(input.value);
    setSelectedAnswer2(input.id);
    setBtnState(false);
  };

  //Funcion submitea test
  const submitTest = () => {
    dispatch(
      sendTest(
        {
          status: null,
          userId: user.id,
          skillId: selectedSkill.id,
          availableAt: moment().add(1, "minute")._d.toString(),
        },
        userAnswers
      )
    ).then(() => {
      contador = 1;
      setPuntero(0);
      setUserSelectedAnswer("");
    });
  };

  //-------------------------------------------USE EFFECTS--------------------------------------//
  //UseEffect tipo willUnmount para postear test incompletos
  window.onpopstate = function (event) {
    submitTest();
    history.push("/");
  };

  window.onbeforeunload = () => {
    submitTest();
    history.push("/");
  };

  //UseEffect tipo Update para manejar la skill a evaluar y traer preguntas correspondientes
  useEffect(() => {
    if (selectedSkill.id) {
      dispatch(getQuestions(selectedSkill.id)).then((questions) => {
        setQuestionId(questions.payload[0].id);
        dispatch(getAnswers(testQuestions[0].id)); //testQuestions[puntero].id
      });
    }
  }, [selectedSkill, selectedSkill.id]);

  //UseEffect tipo Update para traer respuestas relacionadas a la pregunta actual
  useEffect(() => {
    if (questionId !== "") {
      setUserSelectedAnswer("false");
      dispatch(getAnswers(questionId));
    }
  }, [questionId]);

  //UseEffect tipo Update para seleccionar y aleatorizar las respuestas que se van a mostrar
  useEffect(() => {
    mergeAndSortAnswers(
      testAnswers.filter((answer) => answer.value === true),
      testAnswers.filter((answer) => answer.value === false)
    );
  }, [testAnswers]);

  //Seteo el boton a disabled cada vez que se cambia de pregunta
  useEffect(() => {
    setBtnState(true);
  }, [userAnswers]);

  useEffect(() => {
    dispatch(removeUserAnswers());
    !selectedSkill.name && history.push("/")
  }, []);

  useEffect(() => {
    setFinalAnswers([...userAnswers.filter((ans) => ans === "true")]);

    if (puntero == 10) {
      dispatch(
        sendTest(
          {
            status: null,
            userId: user.id,
            skillId: selectedSkill.id,
            availableAt: moment().add(60, "seconds")._d.toString(),
          },
          userAnswers,
          {
            userAnswers: questionAnswers,
          }
        )
      ).then(() => {
        contador = 1;
        setPuntero(0);
        setUserSelectedAnswer("");
      });

      if (contador == 11) {
        submitTest();
      }
    }
  }, [puntero]);

  //----------------------------------------------------------------------------------------------//
  return (
    <div className="bgtest">
      {testQuestions[0] ? (
        <div>
          {/* <Prompt
            when={puntero < 10}
            message="Al salir de la página tu test no pasará la validación"
          /> */}
          {userAnswers.length < 10 ? (
            <div className="test-container">
              <h1 className="test-h1">
                {testQuestions[puntero]
                  ? testQuestions[puntero].question
                  : null}
              </h1>
              <form
                className="answers-container"
                type="text"
                action=""
                onSubmit={buscarPregunta}
              >
                {arrayFinal[2] &&
                  arrayFinal.map((ans) => {
                    return (
                      <label className="answer" key={ans.id}>
                        <input
                          name="answer"
                          value={ans.value}
                          id={ans.id}
                          type="radio"
                          onChange={(e) => handleChange(e.target)}
                        />
                        {ans.answer}
                      </label>
                    );
                  })}
                <LinearProgress
                  variant="determinate"
                  value={puntero * 11.1111}
                />
                {
                  <div className="footer">
                    <p className="text">Pregunta {puntero + 1} de 10</p>
                    <div className="test-timer" style={{ fontSize: "1rem" }}>
                      <i className="far fa-clock"></i>
                      <Timer
                        buscarPregunta={buscarPregunta}
                        initialSeconds={seconds}
                        initialMinutes={minutes}
                        puntero={puntero}
                        history={history}
                      />{" "}
                    </div>
                    <button
                      className={`btn ${btnState ? "disabled" : "btn-active"}`}
                      type="submit"
                      disabled={btnState ? "true" : ""}
                    >
                      {userAnswers.length <= 8 ? `Siguiente` : `Finalizar Test`}
                    </button>
                  </div>
                }
              </form>
            </div>
          ) : (
            <div>
              {!testPosted ? (
                <div className="loader">
                  <p className="loader-text">
                    Estamos procesando tus respuestas...
                  </p>
                  <img
                    className="loader-img"
                    src={
                      "https://imgbum-rebranding.jobscdn.com/postulantes-assets/skins/bumeran/postulantes-desktop/img/balls.svg"
                    }
                  ></img>
                </div>
              ) : (
                <PostTestView
                  test={test}
                  user={user}
                  skill={selectedSkill}
                  finalAnswers={finalAnswers}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="loader">
          <img
            src={
              "https://imgbum-rebranding.jobscdn.com/postulantes-assets/skins/bumeran/postulantes-desktop/img/balls.svg"
            }
          ></img>
        </div>
      )}
    </div>
  );
}
