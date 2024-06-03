import { render, screen } from "@testing-library/react";
import Hero from "@/app/components/Hero";

describe("Hero", () => {
  it("should have a heading", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", {
      // name: /Lorem\.js!/i,
      name: "Where Your Financial Goals Take Flight",
    });

    expect(heading).toBeInTheDocument();
  });
});
