import {
  render,
  screen,
  queryByAttribute,
  cleanup,
} from "@testing-library/react";
import SearchResult from "./SearchResult";
import { MemoryRouter } from "react-router-dom";

// const searchParams = { "q": "badminton", "cat" : "normal"};
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual("react-router-dom"),
//   useSearchParams: () => [searchParams]
// }))

// afterAll(cleanup);

// This is the section where we mock `fetch`
// const unmockedFetch = global.fetch

// beforeAll(() => {
//   global.fetch = () =>
//     Promise.resolve({
//       json: () => Promise.resolve([]),
//     })
// })

// afterAll(() => {
//   global.fetch = unmockedFetch
// })

describe("Search Result Component", () => {
  it("Mock async when fetching data, success", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: "id" }],
    });
  });
});
