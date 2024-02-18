import React from "react";
import { render } from "@testing-library/react";
import Page from "../app/page";
import { redirect } from "next/navigation";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Home", () => {
  it("redirects to /chats when rendered", () => {
    render(<Page />);
    expect(redirect).toHaveBeenCalledWith("/chats");
  });
});
