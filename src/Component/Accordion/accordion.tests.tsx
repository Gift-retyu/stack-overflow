import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import UserAccordion from "./index";

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

  it("expands and collapses on click", () => {
    render(<UserAccordion user={user} onFollow={mockFollow} onBlock={mockBlock} />);

    const summary = screen.getByRole("button");
    fireEvent.click(summary);
    expect(screen.getByText("Block")).toBeVisible();

    fireEvent.click(summary);
    expect(screen.queryByText("Block")).toBeNull();
  });

  it("does not expand when blocked", () => {
    const blockedUser = { ...user, isBlocked: true };
    render(<UserAccordion user={blockedUser} onFollow={mockFollow} onBlock={mockBlock} />);

    const summary = screen.getByRole("button");
    fireEvent.click(summary);
    expect(screen.queryByText("Block")).toBeNull();
  });
});
