import React, { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authAtom } from "../atoms";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: red;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
  color: white;
`;

const SingOut = styled(Link)`
  font-size: 2rem;
  font-weight: 900;
  color: white;
  padding: 20px;

  &:hover {
    background-color: #880000a7;
    border-radius: 20px;
  }
`;

type HeaderProps = {};

const Header: FC<HeaderProps> = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const { isAuthenticated, user } = auth;
  const role = user?.role;
  const username = user?.username;

  const handleSignOut = () => {
    if (!window.confirm("Do you want to sign out?")) {
      return;
    }

    setAuth({
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <Root>
      <Title
        children={
          isAuthenticated
            ? `Hi ${username} #${role}`
            : "Welcome to Nowherehouse"
        }
      />
      {isAuthenticated && (
        <SingOut children="Sign Out" to="../" onClick={handleSignOut} />
      )}
    </Root>
  );
};

export default Header;
