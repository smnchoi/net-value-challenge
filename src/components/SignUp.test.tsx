import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import SignUp from "./SignUp";

const _setMode = jest.fn();
_setMode.mockReturnValue(null);

describe("Sign Up Component", () => {
  test("Render sign up forms", () => {
    render(
      <RecoilRoot>
        <SignUp setMode={_setMode} />
      </RecoilRoot>
    );

    expect(screen.getByText("Confirm Sign Up")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  test("Call setMode function when forms are submitted", async () => {
    render(
      <RecoilRoot>
        <SignUp setMode={_setMode} />
      </RecoilRoot>
    );

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const customerButton = screen.getByText("Customer");
    const submitButton = screen.getByText("Confirm Sign Up");

    fireEvent.change(usernameInput, { target: { value: "newuser" } });
    fireEvent.change(passwordInput, { target: { value: "newpassword" } });
    fireEvent.click(customerButton);
    fireEvent.click(submitButton);

    await waitFor(() => expect(_setMode).toHaveBeenCalled());
  });
});
