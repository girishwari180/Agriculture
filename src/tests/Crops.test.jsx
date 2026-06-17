import { describe, test, expect, vi } from 'vitest';
import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CropContext, CropProvider } from '../context/CropContext';

// Stub helper component to test Context functions directly
function SuitabilityTestHelper({ season, soil, ph, temp, rain }) {
  const { calculateCropSuitability, selectedCrop, setSelectedCrop } = useContext(CropContext);
  const suiteResult = calculateCropSuitability(season, soil, ph, temp, rain);

  return (
    <div>
      <h3 data-testid="active-crop-name">{selectedCrop?.name}</h3>
      <div data-testid="results-count">{suiteResult.length}</div>
      <div data-testid="winner-crop">{suiteResult[0]?.name}</div>
      <div data-testid="winner-score">{suiteResult[0]?.suitabilityScore}</div>
      <button data-testid="adjust-focus" onClick={() => setSelectedCrop(suiteResult[0])}>
        Change Focus
      </button>
    </div>
  );
}

describe('AgroIntel Crop Recommendation Engine Unit Tests', () => {

  test('correctly maps Kharif crops with optimal Clayey soil and high rainfall', () => {
    render(
      <CropProvider>
        <SuitabilityTestHelper
          season="Kharif"
          soil="Clayey"
          ph="6.2"
          temp="26"
          rain="1400"
        />
      </CropProvider>
    );

    // Rice is Kharif, Clayey, phMin/Max 5.5-6.5, temp 21-37. It should be the winner!
    expect(screen.getByTestId('results-count').textContent).toBe('11'); // 11 crops total in CROPS_DATA
    expect(screen.getByTestId('winner-crop').textContent).toBe('Rice');
    
    const scoreVal = parseInt(screen.getByTestId('winner-score').textContent);
    expect(scoreVal).toBeGreaterThanOrEqual(80); // highly suited
  });

  test('correctly maps Rabi crops like Wheat with Loamy soil and winter temperature', () => {
    render(
      <CropProvider>
        <SuitabilityTestHelper
          season="Rabi"
          soil="Loamy"
          ph="6.5"
          temp="18"
          rain="500"
        />
      </CropProvider>
    );

    // Wheat is optimal here
    expect(screen.getByTestId('winner-crop').textContent).toBe('Wheat');
    const scoreVal = parseInt(screen.getByTestId('winner-score').textContent);
    expect(scoreVal).toBeGreaterThanOrEqual(80);
  });

  test('toggles the active crop focus globally on state setter actions', () => {
    render(
      <CropProvider>
        <SuitabilityTestHelper
          season="Zaid"
          soil="Sandy"
          ph="6.5"
          temp="28"
          rain="450"
        />
      </CropProvider>
    );

    // Watermelon thrives in Sandy Zaid elements
    expect(screen.getByTestId('winner-crop').textContent).toBe('Watermelon');
    
    // Default initial grain is Rice
    expect(screen.getByTestId('active-crop-name').textContent).toBe('Rice');

    // Click trigger to mutate active focus state
    fireEvent.click(screen.getByTestId('adjust-focus'));

    // Check it successfully mutated
    expect(screen.getByTestId('active-crop-name').textContent).toBe('Watermelon');
  });

});
