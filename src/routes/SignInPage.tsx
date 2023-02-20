import React, { FC, useState } from "react";
import styled from "styled-components";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

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

export type Mode = "Sign-in" | "Sign-up";

const SignInPage: FC = () => {
  const [mode, setMode] = useState<Mode>("Sign-in");

  return (
    <Root>
      {mode === "Sign-in" ? (
        <>
          <SignIn />
          <Text>
            Don’t have an account?
            <CreateOne
              onClick={() => {
                setMode("Sign-up");
              }}
            >
              Create one
            </CreateOne>
          </Text>
        </>
      ) : (
        <SignUp setMode={setMode} />
      )}
    </Root>
  );
};

export default SignInPage;
