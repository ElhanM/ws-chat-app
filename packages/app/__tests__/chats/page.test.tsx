import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Page from "../../app/chats/page";

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
