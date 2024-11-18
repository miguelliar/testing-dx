import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { Provider } from "@/components/ui/provider";
import { ControlPanel } from "./ControlPanel";

describe("ControlPanel", () => {
  it("opens a control panel", async () => {
    render(
      <Provider>
        <ControlPanel />
      </Provider>
    );
    Provider;

    fireEvent.click(screen.getAllByRole("button")[0]);
    await screen.findByRole("heading");

    expect(screen.getByRole("heading")).toHaveTextContent("User List");
  });
});
