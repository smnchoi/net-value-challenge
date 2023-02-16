import React, { FC, useState } from "react";
import styled from "styled-components";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { Role } from "../utils/constant";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  background-color: white;
  margin: 100px auto;
`;

const Text = styled.p`
  align-self: center;
  color: #707070;
  background-color: white;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
  margin-top: 20px;
`;

const CreateOne = styled.a`
  /* font-size: inherit;
  font-weight: inherit; */
  margin-left: 10px;
  color: #d81e05;
  &:hover {
    text-decoration: underline;
  }
`;

const SignInPage: FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  //! TODO: find users data then sign-in
  const handleSignIn = (username: string, password: string) => {
    //
  };

  //! TODO: create user and store at Recoil state
  const handleSignUp = (username: string, password: string, role: Role) => {
    //
  };

  return (
    <Root>
      {isSignIn ? (
        <>
          <SignIn handleSignIn={handleSignIn} />
          <Text>
            Don’t have an account?
            <CreateOne
              onClick={() => {
                setIsSignIn(false);
              }}
            >
              Create one
            </CreateOne>
          </Text>
        </>
      ) : (
        <SignUp handleSignUp={handleSignUp} />
      )}
    </Root>
  );
};

export default SignInPage;
