import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ControlPanel } from './ControlPanel'
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

describe('ControlPanel', () => {
  it('renders the control buttons', () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <ControlPanel />
      </ChakraProvider>)
    expect(screen.getByRole('button', { name: /users/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /profile/i })).toBeInTheDocument()
  })

  it('loads and displays users when user list mode is selected', async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <ControlPanel />
      </ChakraProvider>)

    // Click the users button
    const usersButton = screen.getByRole('button', { name: /users/i })
    await userEvent.click(usersButton)

    // Wait for users to load
    await waitFor(() => {
      expect(screen.getByText('Will')).toBe
      expect(screen.getByText('Diane')).toBeInTheDocument()
    })
  })

  it('loads and displays profile when profile mode is selected', async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <ControlPanel />
      </ChakraProvider>)

    // Click the profile button
    const profileButton = screen.getByRole('button', { name: /profile/i })
    await userEvent.click(profileButton)

    // Wait for profile to load
    await waitFor(() => {
      expect(screen.getByText('Will')).toBeInTheDocument()
      expect(screen.getByText('The author of this workshop')).toBeInTheDocument()
    })
  })

  it('enables profile editing when edit button is clicked', async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <ControlPanel />
      </ChakraProvider>)

    // Switch to profile mode
    const profileButton = screen.getByRole('button', { name: /profile/i })
    await userEvent.click(profileButton)


    // Wait for profile to load
    await waitFor(() => {
      expect(screen.getByText('Will')).toBeInTheDocument()
      expect(screen.getByText('The author of this workshop')).toBeInTheDocument()
    })

    // Wait for profile to load and click edit
    await waitFor(() => {
      // const editButton = screen.getByRole('button', { name: /edit profile/i })
      const editButton = screen.getByTestId('button-edit-profile');
      fireEvent.click(editButton)
    })

    // Check if inputs are present
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /about/i })).toBeInTheDocument()
    // expect(screen.getByRole('combobox')).toBeInTheDocument() // for locale select
  })

  it('updates profile when changes are saved', async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <ControlPanel />
      </ChakraProvider>)

    // Switch to profile mode and wait for load
    const profileButton = screen.getByRole('button', { name: /profile/i });
    await userEvent.click(profileButton);

    // Wait for the edit button to be available
    const editButton = await screen.findByRole('button', { name: /edit profile/i });
    await userEvent.click(editButton);

    // Make changes
    const nameInput = screen.getByRole('textbox', { name: /name/i })
    await userEvent.clear(nameInput)
    await userEvent.type(nameInput, 'William')

    // Save changes
    const saveButton = screen.getByRole('button', { name: /save changes/i })
    fireEvent.click(saveButton)

    // Verify changes are displayed
    expect(screen.getByText('William')).toBeInTheDocument()
  })

  it('reverts changes when cancel is clicked', async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <ControlPanel />
      </ChakraProvider>)

    // Switch to profile mode and wait for load
    const profileButton = screen.getByRole('button', { name: /profile/i })
    await userEvent.click(profileButton)

    // Click edit button
    await waitFor(() => {
      const editButton = screen.getByRole('button', { name: /edit profile/i })
      fireEvent.click(editButton)
    })

    // Make changes
    const nameInput = screen.getByRole('textbox', { name: /name/i })
    await userEvent.clear(nameInput)
    await userEvent.type(nameInput, 'William')

    // Cancel changes
    const cancelButton = screen.getByRole('button', { name: /cancel editing/i })
    fireEvent.click(cancelButton)

    // Verify original value is displayed
    expect(screen.getByText('Will')).toBeInTheDocument()
  })

  it.skip('changes locale when a new country is selected', async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <ControlPanel />
      </ChakraProvider>)

    // Switch to profile mode and wait for load
    const profileButton = screen.getByRole('button', { name: /profile/i })
    await userEvent.click(profileButton)

    // Click edit button
    await waitFor(() => {
      const editButton = screen.getByRole('button', { name: /edit profile/i })
      fireEvent.click(editButton)
    })

    // Change locale
    const localeSelect = screen.getByRole('combobox')
    await userEvent.selectOptions(localeSelect, 'Spain')

    // Save changes
    const saveButton = screen.getByRole('button', { name: /save changes/i })
    fireEvent.click(saveButton)

    // Verify new locale is displayed
    expect(screen.getByText('ES')).toBeInTheDocument()
  })
})