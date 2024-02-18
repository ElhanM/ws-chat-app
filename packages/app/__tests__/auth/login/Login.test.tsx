import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import Page from "@/app/auth/login/page";
import currentUserReducer from "@/lib/features/users/currentUserSlice";

jest.mock("@apollo/client", () => ({
  ...jest.requireActual("@apollo/client"),
  createHttpLink: () => () => {},
}));

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Login", () => {
  it("renders a section", () => {
    const store = configureStore({
      reducer: {
        currentUser: currentUserReducer,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <Page />
      </Provider>
    );

    const section = container.querySelector("section");

    expect(section).toBeInTheDocument();
  });
});
