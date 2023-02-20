import React, { FC } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authAtom } from "../atoms";
import logo from "../images/nowherehouse_logo.png";
import { theme } from "../theme";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.white};
`;

const Row = styled(Root)`
  background-color: ${theme.red};
  flex-direction: row;
  width: 100%;
  padding: 10px 20px 10px 20px;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
  color: white;
`;

const SingOut = styled(Link)`
  font-size: 30px;
  font-weight: 900;
  padding: 10px;
  color: white;

  &:hover {
    background-color: #880000a7;
    border-radius: 10px;
  }
`;

const GoToAdmin = styled(SingOut)`
  /*  */
`;

const GoTo = styled(SingOut)`
  font-size: 20px;
  font-weight: 500;
`;

const Logo = styled.img`
  width: auto;
  height: 80px;
  background-color: black;
`;

type HeaderProps = {};

const Header: FC<HeaderProps> = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const { isAuthenticated, user } = auth;
  const role = user?.role;
  const username = user?.username;

  const { pathname } = useLocation();
  console.log("pathname", pathname);

  const handleSignOut = () => {
    if (!window.confirm("Do you want to sign out?")) {
      return;
    }

    setAuth({
      isAuthenticated: false,
      user: null,
    });
  };

  const isAdmin = role === "Admin";

  return (
    <Root>
      <Row>
        <Title
          children={
            isAuthenticated
              ? `Hi ${username} #${role}`
              : "Welcome to noWherehouse"
          }
        />

        <Logo src={logo} />

        {isAuthenticated && (
          <SingOut children="Sign Out" to="../" onClick={handleSignOut} />
        )}
      </Row>

      {isAuthenticated && (
        <Row style={{ marginTop: 2 }}>
          <GoTo children="Products" to="../" />
          {isAdmin && <GoTo children="Admin" to="../admin" />}
          <GoTo children="Checkout" to="../checkout" />
        </Row>
      )}
    </Root>
  );
};

export default Header;
