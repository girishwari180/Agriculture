import { describe, test, expect } from 'vitest';
import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CropContext, CropProvider } from '../context/CropContext';

function FertilizerTestHelper({ cropId, stage, n, p, k }) {
  const { updateFertilizer, advisorState } = useContext(CropContext);
  
  return (
    <div>
      <h3 data-testid="prescription">{advisorState.fertilizerAdvice?.recommendation}</h3>
      <div data-testid="quantity">{advisorState.fertilizerAdvice?.quantity}</div>
      <p data-testid="reason">{advisorState.fertilizerAdvice?.reason}</p>
      <button 
        data-testid="recalc-btn" 
        onClick={() => updateFertilizer(cropId, stage, n, p, k)}
      >
        Update Feed Formula
      </button>
    </div>
  );
}

describe('AgroIntel Fertility Optimizer Unit Tests', () => {

  test('detects nitrogen deficiencies and recommends ammonium nitrate / urea supplementations', () => {
    render(
      <CropProvider>
        <FertilizerTestHelper
          cropId="rice"
          stage="Vegetative"
          n="5" // extreme nitrogen deficit (ideal: 40)
          p="20" // optimal (ideal: 20)
          k="20" // optimal (ideal: 20)
        />
      </CropProvider>
    );

    // Initial advisory from context baseline
    expect(screen.getByTestId('prescription').textContent).toContain('Urea');

    // Fire event recalculate for Rice at Vegetative stage N=5
    fireEvent.click(screen.getByTestId('recalc-btn'));

    // Verify recommendations
    expect(screen.getByTestId('prescription').textContent).toContain('Ammonium');
    expect(screen.getByTestId('reason').textContent).toContain('Nitrogen deficit found');
  });

  test('reports balanced compound feeding when core N-P-K levels align perfectly with growth stage', () => {
    // Rice seedling stage targets 30-15-15, we provide 30-15-15
    render(
      <CropProvider>
        <FertilizerTestHelper
          cropId="rice"
          stage="Seedling"
          n="35"
          p="18"
          k="18"
        />
      </CropProvider>
    );

    fireEvent.click(screen.getByTestId('recalc-btn'));

    // Should recommend standard complex mixes
    expect(screen.getByTestId('prescription').textContent).toContain('Balanced N-P-K Complex');
    expect(screen.getByTestId('reason').textContent).toContain('Nutrient index matches the ideal');
  });

});
