import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
  class RO {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  (window as unknown as { ResizeObserver: typeof RO }).ResizeObserver = RO;
  (window as unknown as { IntersectionObserver: typeof RO }).IntersectionObserver =
    RO;
  window.scrollTo = () => undefined;
});

test("affiche la marque Memoria", () => {
  render(<App />);
  expect(screen.getAllByText(/MEMORIA/i).length).toBeGreaterThan(0);
});
