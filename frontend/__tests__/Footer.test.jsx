import { render, screen } from "@testing-library/react";
import Footer from "@/app/components/Footer";

describe("Footer", () => {
  it('should contain the text "Phone:"', () => {
    render(<Footer />);

    const myElem = screen.getByText(/Phone:/i);
    expect(myElem).toBeInTheDocument();
  });
});
