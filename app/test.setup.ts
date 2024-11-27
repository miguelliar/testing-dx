import { expect, afterEach, beforeEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import '@testing-library/jest-dom/vitest';

expect.extend(matchers);

// Mock fetch responses
const mockUsers = [
  { id: 1, name: "Will", about: "The author of this workshop", locale: "US" },
  { id: 2, name: "Diane", about: "Will's partner", locale: "US" }
]

const mockProfile = {
  id: 1,
  name: "Will",
  about: "The author of this workshop",
  locale: "US"
}

// Setup fetch mock
beforeEach(() => {
  global.fetch = vi.fn((url) =>
    Promise.resolve({
      json: () => Promise.resolve(
        url.includes('users.json') ? mockUsers : mockProfile
      )
    })
  ) as any
})

afterEach(() => {
  cleanup();
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
