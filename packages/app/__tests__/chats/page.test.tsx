import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "../../app/chats/page";
import Sidebar from "../../components/templates/Sidebar";
import MainChatArea from "../../components/templates/MainChatArea";

jest.mock("../../components/templates/Sidebar.tsx", () => {
  const MockSidebar = () => <div>Sidebar</div>;
  MockSidebar.displayName = "Sidebar";
  return MockSidebar;
});

jest.mock("../../components/templates/MainChatArea.tsx", () => {
  const MockMainChatArea = () => <div>MainChatArea</div>;
  MockMainChatArea.displayName = "MainChatArea";
  return MockMainChatArea;
});

describe("Chats", () => {
  it("renders Sidebar and MainChatArea", () => {
    const { getByText } = render(<Page />);

    expect(getByText("Sidebar")).toBeInTheDocument();
    expect(getByText("MainChatArea")).toBeInTheDocument();
  });
});
