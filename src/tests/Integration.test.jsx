import { describe, test, expect, beforeAll } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('AgroIntel Full Integration Tests', () => {

  beforeAll(() => {
    // Clear localStorage to start fresh
    localStorage.clear();
  });

  test('walks through Public Landing -> Login page -> Dashboard Navigation Flow', async () => {
    render(<App />);

    // 1. Initial page load should be Public Landing page (shows AgroIntel brand title)
    expect(screen.getAllByText(/AGROINTEL/i)[0]).toBeDefined();
    expect(screen.getByText(/Smart Agricultural Expert Advisory System/i)).toBeDefined();

    // Find the login action button on landing page and click it
    const loginLink = screen.getByText(/Sign In Access/i);
    expect(loginLink).toBeDefined();
    fireEvent.click(loginLink);

    // 2. Now on Login View. Let's find inputs
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/farmer@agrointel.com/i)).toBeDefined();
    });

    const emailInput = screen.getByPlaceholderText(/farmer@agrointel.com/i);
    const passInput = screen.getByPlaceholderText(/••••••••/);
    const loginSubmit = screen.getByRole('button', { name: /Authenticate Operator/i });

    // Try submitting with an invalid/empty password to trigger checks
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.click(loginSubmit);
    await waitFor(() => {
      expect(screen.getByText(/Email address is required/i)).toBeDefined();
    });

    // Enter correct seed operator account credentials (stored in AuthContext)
    // farmer@agrointel.com / password123
    fireEvent.change(emailInput, { target: { value: 'farmer@agrointel.com' } });
    fireEvent.change(passInput, { target: { value: 'password123' } });

    // Submit credentials
    fireEvent.click(loginSubmit);

    // 3. Should authenticate and redirect to /dashboard overview!
    await waitFor(() => {
      // Check for welcome back operator text
      expect(screen.getByText(/WELCOME, Dr. Hari Prasad/i)).toBeDefined();
      // Should show the default focus crop
      expect(screen.getByText(/Active Focus Crop/i)).toBeDefined();
    });

    // Test sidebar links navigation trigger 
    const cropsAdvisoryLink = screen.getByText(/Crop Advisory/i);
    fireEvent.click(cropsAdvisoryLink);

    // Check loaded crop search inputs
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Search crop name/i)).toBeDefined();
    });
  });

});
