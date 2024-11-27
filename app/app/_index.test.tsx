import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Index from './routes/_index';

describe('Index page', () => {
  it('toggles between light and dark mode when clicking the color mode button', () => {
    // Render the component within ChakraProvider
    render(
      <ChakraProvider value={defaultSystem}>
        <Index />
      </ChakraProvider>
    );

    // Find the color mode button
    const colorModeButton = screen.getByLabelText(/toggle color mode/i);

    // Get initial color mode
    const initialColorMode = document.documentElement.dataset.theme;

    // Click the button
    fireEvent.click(colorModeButton);

    // Check if color mode changed
    expect(document.documentElement.dataset.theme).not.toBe(initialColorMode);

    // Click again to toggle back
    fireEvent.click(colorModeButton);

    // Verify it returned to initial state
    expect(document.documentElement.dataset.theme).toBe(initialColorMode);
  });
});