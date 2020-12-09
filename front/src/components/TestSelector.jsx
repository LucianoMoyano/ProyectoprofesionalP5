import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, fetchUser } from "../store/actionsCreators/userActions";
import { fetchSkills, getSkill } from "../store/actionsCreators/skillActions";
import {
  fetchTests,
  fetchSkillDate,
} from "../store/actionsCreators/testActions";


export default ({ history }) => {
  const dispatch = useDispatch();

  const { user, users } = useSelector((state) => state.usersReducer);
  const { userSkills } = useSelector((state) => state.skillReducer);
  const { testDate } = useSelector((state) => state.testReducer);

  const handleClick = (user, skill) => {
    dispatch(getSkill(skill)).then(() => dispatch(fetchSkillDate(user, skill)))
    ;
    history.push("/test/intro");
  };
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTests());
  }, []);

  return (
    <Fragment>
    
      <div className="users">
        {users.map((user) => {
          return (
            <button
              key={user.id}
              className="userButton btn-bgd-blue"
              onClick={() =>
                dispatch(fetchUser(user)).then(() =>
                  dispatch(fetchSkills(user))
                )
              }
            >
              {user.name}{" "}
            </button>
          );
        })}
      </div>
      {userSkills.skills && (
        <div className="skills">
          <p className="skillls-p">Skills disponibles para Test:</p>
          <div className="userSkills">
            {userSkills.skills.map((skills) => {
              return (
                <button
                  key={skills.id}
                  className="skillButton btn-bgd-pink"
                  onClick={() => handleClick(user.id, skills.id)}
                >
                  {skills.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </Fragment>
  );
};
