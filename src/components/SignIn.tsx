import React, { FC, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { authAtom, usersAtom } from "../atoms";
import { theme } from "../theme";
import { validatePassword, validateUsername } from "../utils/validator";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 600px;
`;

const Form = styled.form`
  align-self: center;
  background-color: #ffffff;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  width: 100%;
  border-radius: 10px;
  max-width: 600px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 20px 20px 20px;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const Input = styled.input`
  padding: 14px;
  margin-bottom: 10px;
  width: 90%;
  font-size: 16px;
  border: 1px solid #b5b5b5;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #000000;
  }
`;

const SubmitButton = styled.button`
  background-color: ${theme.red};
  border: none;
  color: #fff;
  padding: 14px;
  font-size: 16px;
  border-radius: 4px;
  width: 100%;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${theme.redHover};
  }
`;

const ErrorMessage = styled.p<{ errorMessage: string }>`
  color: #d81e05;
  color: ${({ errorMessage }) => (errorMessage ? "#d81e05" : "white")};
  margin-bottom: 20px;
`;

const SignIn: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const users = useRecoilValue(usersAtom);
  const setAuth = useSetRecoilState(authAtom);
  // console.log("users", users);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidUsername = validateUsername(username);
    if (!isValidUsername) {
      setErrorMessage(
        "Please use only lowercase letters and numbers for username"
      );
      return;
    }

    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      setErrorMessage("Please use at least 6 characters for password");
      return;
    }

    handleSignIn();
  };

  const handleSignIn = () => {
    const isExisted = users.map((item) => item.username).includes(username);
    //* User is not existed
    if (!isExisted) {
      window.alert("There is no user");
      return;
    }

    const user = users.find((user) => user.username === username);
    //* Incorrect password
    if (user?.password !== password) {
      window.alert("Password is not correct");
      return;
    }

    //* Proceed sign-in
    setAuth({
      isAuthenticated: true,
      user,
    });
  };

  return (
    <Root>
      <Form onSubmit={handleSubmit}>
        <Container>
          <Title>Please Sign-In to proceed</Title>
          <ErrorMessage errorMessage={errorMessage}>
            {errorMessage || "_"}
          </ErrorMessage>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            style={{ marginTop: 10 }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <SubmitButton type="submit">Sign In</SubmitButton>
        </Container>
      </Form>
    </Root>
  );
};

export default SignIn;
