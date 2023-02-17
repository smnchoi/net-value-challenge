import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { usersAtom } from "../atoms";
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

const Title = styled.p`
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const Detail = styled.p`
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
    isSelected ? "#ff0000" : " #e8e8e8"};
  border-radius: 10px;
  border: none;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? "#9d0303" : " #9c9a9a"};
  }

  p {
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

const GoToSignInButton = styled(SubmitButton)`
  background-color: #000000;

  &:hover {
    background-color: #565656;
  }
`;

const ErrorMessage = styled.p`
  color: #d81e05;
  margin-bottom: 20px;
`;

interface SignInProps {
  setIsSignIn: (signIn: boolean) => void;
}

type FormData = {
  username: string;
  password: string;
};

const SignUp: FC<SignInProps> = ({ setIsSignIn }) => {
  const [role, setRole] = useState<Role>("Customer");
  const [users, setUser] = useRecoilState(usersAtom);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<FormData>();

  const handleSignUp = async (usernameNpassword: FormData) => {
    await new Promise((r) => setTimeout(r, 1000));

    console.log("data", usernameNpassword);

    const { username, password } = usernameNpassword;

    const alreadyExisted = users
      .map((user) => user.username)
      .includes(username);

    if (alreadyExisted) {
      alert("User already exists");
      setValue("username", "");
      setValue("password", "");
      return;
    }

    alert("User is created! Please Sign-In");

    //* create user and store at Recoil state
    setUser((otherUsers) => [
      ...otherUsers,
      {
        username,
        password,
        role,
      },
    ]);
    setIsSignIn(true);

    console.log("users", users);
  };

  return (
    <Root>
      <Form onSubmit={handleSubmit(handleSignUp)}>
        <Container>
          <Title>Sign Up</Title>
          <ErrorMessage>
            {errors.username && errors.username.message}
            <br />
            {errors.password && errors.password.message}
          </ErrorMessage>
          <Input
            type="text"
            placeholder="Username"
            aria-invalid={
              !isDirty ? undefined : errors.username ? "true" : "false"
            }
            {...register("username", {
              required: "Username is required",
              pattern: {
                value: /^[a-z0-9]+$/,
                message:
                  "Please use only lowercase letters and numbers for username.",
              },
            })}
          />
          <Input
            style={{ marginTop: 10 }}
            type="password"
            placeholder="Password"
            aria-invalid={
              !isDirty ? undefined : errors.password ? "true" : "false"
            }
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Please use at least 6 characters for password.",
              },
            })}
          />

          <Detail>Select the role</Detail>
          <Row style={{ marginTop: 20 }}>
            <Box
              onClick={() => {
                setRole("Admin");
              }}
              isSelected={role === "Admin"}
            >
              <p>Admin</p>
            </Box>
            <Box
              onClick={() => {
                setRole("Customer");
              }}
              isSelected={role === "Customer"}
            >
              <p>Customer</p>
            </Box>
          </Row>

          <SubmitButton type="submit" disabled={isSubmitting}>
            Confirm Sign Up
          </SubmitButton>
          <GoToSignInButton
            type="submit"
            disabled={isSubmitting}
            onClick={() => {
              setIsSignIn(true);
            }}
          >
            Go to Sign-In
          </GoToSignInButton>
        </Container>
      </Form>
    </Root>
  );
};

export default SignUp;
