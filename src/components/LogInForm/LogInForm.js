import React, { useState, useEffect } from "react";

import Container from "../UI/Container/Container";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import styles from "./LogInForm.module.css";

const LogInForm = (props) => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [userNameValidation, setUserNameValidation] = useState(true);
  const [passWordValidation, setPassWordValidation] = useState(true);
  const [formValidation, setFormValidation] = useState(false);

  useEffect(() => {
    let excuteTimerFunction = setTimeout(() => {
      console.log("useEffect!");
      setFormValidation(
        userName.trim().length > 5 && passWord.trim().length > 5
      );
    }, 500);
    return () => {
      // cleanup function
      clearTimeout(excuteTimerFunction);
      // console.log("CleanUp before any thing");
    };
  }, [userName, passWord]);

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
    // setFormValidation(
    //   event.target.value.trim().length > 5 && passWordValidation
    // );
  };

  const passWordChangeHandler = (event) => {
    setPassWord(event.target.value);
    // setFormValidation(
    //   event.target.value.trim().length > 5 && userNameValidation
    // );
  };

  const userNameBlurHandler = () => {
    setUserNameValidation(userName.trim().length > 5);
  };

  const passWordBlurHandler = () => {
    setPassWordValidation(passWord.trim().length > 5);
  };

  const formDataHandler = (event) => {
    event.preventDefault();
    props.afterEnteredData(userName, passWord);

    setUserName("");
    setPassWord("");
  };

  return (
    <main>
      <Container className={styles.container}>
        <Card className={styles.card}>
          <form className={styles.form} onSubmit={formDataHandler}>
            <div>
              <label htmlFor="userName">User Name</label>
              <input
                id="userName"
                type="text"
                onChange={userNameChangeHandler}
                onBlur={userNameBlurHandler}
                value={userName}
                className={userNameValidation ? "" : styles["not-valid"]}
                placeholder="At Least Six Character"
              />
            </div>
            <div>
              <label htmlFor="passWord">Password</label>
              <input
                id="passWord"
                type="password"
                onChange={passWordChangeHandler}
                onBlur={passWordBlurHandler}
                value={passWord}
                className={passWordValidation ? "" : styles["not-valid"]}
                placeholder="At Least Six Character"
              />
            </div>
            <div>
              <Button
                className={styles.btn}
                type={"submit"}
                disabled={!formValidation}
              >
                Log In
              </Button>
            </div>
          </form>
        </Card>
      </Container>
    </main>
  );
};

export default LogInForm;
