import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import UserAccordion, { User as user } from "../Component/Accordion";

describe("UserAccordion", () => {
  const mockFollow = jest.fn();
  const mockBlock = jest.fn();

  const user = {
    user_id: 1,
    display_name: "Test User",
    profile_image: "https://test.com/image.jpg",
    reputation: 100,
    isBlocked: false,
    isFollowing: false,
  };

  beforeEach(() => {
    mockFollow.mockClear();
    mockBlock.mockClear();
  });

  it("renders user information", () => {
    render(<UserAccordion user={user} onFollow={mockFollow} onBlock={mockBlock} />);

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("follow button works", () => {
    render(<UserAccordion user={user} onFollow={mockFollow} onBlock={mockBlock} />);

    const button = screen.getByText("Follow");
    fireEvent.click(button);

    expect(mockFollow).toHaveBeenCalledWith(user.user_id);
  });

  it("block button works", () => {
    render(<UserAccordion user={user} onFollow={mockFollow} onBlock={mockBlock} />);

    const button = screen.getByText("Block");
    fireEvent.click(button);

    expect(mockBlock).toHaveBeenCalledWith(user.user_id);
  });


});
