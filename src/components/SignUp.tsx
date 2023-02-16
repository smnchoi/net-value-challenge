import React, { FC, useState } from "react";
import styled from "styled-components";
import { Role } from "../utils/constant";
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

const Title = styled.body`
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const Detail = styled.body`
  text-align: left;
  margin-top: 26px;
  margin-left: 10px;
  margin-right: auto;
  font-size: 16px;
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const Box = styled.button<{ isSelected: boolean }>`
  width: 200px;
  height: 80px;
  background-color: ${({ isSelected }) =>
    isSelected ? "#ff0000" : " #cacaca"};
  border-radius: 10px;
  border: none;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? "#9d0303" : " #9c9a9a"};
  }

  body {
    font-size: 20px;
    font-weight: 600;
    color: #000000;
  }
`;

const SubmitButton = styled.button`
  background-color: #ff0000;
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
    background-color: #9d0303;
  }
`;

const ErrorMessage = styled.p<{ errorMessage: string }>`
  color: #d81e05;
  color: ${({ errorMessage }) => (errorMessage ? "#d81e05" : "white")};
  margin-bottom: 20px;
`;

interface SignInProps {
  handleSignUp: (username: string, password: string, role: Role) => void;
}

const SignUp: FC<SignInProps> = ({ handleSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState<Role>("Customer");

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

    handleSignUp(username, password, role);
  };

  return (
    <Root>
      <Form onSubmit={handleSubmit}>
        <Container>
          <Title>Sign Up</Title>
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

          <Detail>Select the role</Detail>
          <Row style={{ marginTop: 20 }}>
            <Box
              onClick={() => {
                setRole("Admin");
              }}
              isSelected={role === "Admin"}
            >
              <body>Admin</body>
            </Box>
            <Box
              onClick={() => {
                setRole("Customer");
              }}
              isSelected={role === "Customer"}
            >
              <body>Customer</body>
            </Box>
          </Row>

          <SubmitButton type="submit">Sign Up</SubmitButton>
        </Container>
      </Form>
    </Root>
  );
};

export default SignUp;
