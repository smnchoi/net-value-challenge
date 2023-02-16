import React from "react";
import styled from "styled-components";
import SignInPage from "./routes/SignInPage";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

function App() {
  return (
    <Root className="App">
      <SignInPage />
    </Root>
  );
}

export default App;
