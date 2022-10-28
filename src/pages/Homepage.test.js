import { render, screen, queryByAttribute  } from "@testing-library/react";
import Homepage from "./Homepage";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Homepage component", () => {
  it("Should appears search engine text", () => {
    render(<Homepage />);
    const outputEl = screen.getByText("Search Engine", { exact: false });
    expect(outputEl).toBeInTheDocument();
  });
  it("Should appears input element", () => {
    const getById = queryByAttribute.bind(null, 'id');
    const outputEl = getById(render(<Homepage />).container, 'search');
    expect(outputEl).toBeInTheDocument();
  });
  it("Should appears select option element", () => {
    const getById = queryByAttribute.bind(null, 'id');
    const outputEl = getById(render(<Homepage />).container, 'search_category');
    expect(outputEl).toBeInTheDocument();
  });
});
