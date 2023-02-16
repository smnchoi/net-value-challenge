import React from "react";
import styled from "styled-components";
import ProductsPage from "./routes/ProductsPage";
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
      <ProductsPage />
      {/* <SignInPage /> */}
    </Root>
  );
}

export default App;
