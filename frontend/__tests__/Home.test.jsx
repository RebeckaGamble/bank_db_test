import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it('should contain the text "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nesciunt quas qui iusto quae excepturi voluptate, cumque molestias earum ipsum."', () => {
    render(<Home />);

    const myElem = screen.getByText(
      /Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nesciunt quas qui iusto quae excepturi voluptate, cumque molestias earum ipsum./i
    );
    expect(myElem).toBeInTheDocument();
  });

  it("should have a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: "Lorem ipsum dolor sit.",
    });

    expect(heading).toBeInTheDocument();
  });
});
