import React, { useState, useContext, useEffect } from 'react';
import { CropContext } from '../context/CropContext';
import CropRecommendationView from './CropRecommendationView';

export default function CropRecommendationContainer() {
  const { calculateCropSuitability, selectedCrop, setSelectedCrop } = useContext(CropContext);

  // Form states - Controlled components (useState)
  const [formData, setFormData] = useState({
    season: 'Kharif',
    soilType: 'Clayey',
    ph: '6.2',
    temp: '26',
    rain: '850'
  });

  const [errors, setErrors] = useState({});
  const [results, setResults] = useState([]);

  // Calculate suitability initial list on load
  useEffect(() => {
    const list = calculateCropSuitability(
      formData.season,
      formData.soilType,
      formData.ph,
      formData.temp,
      formData.rain
    );
    setResults(list);
  }, []);

  const validate = () => {
    const tempErrors = {};
    const phNum = parseFloat(formData.ph);
    const tempNum = parseFloat(formData.temp);
    const rainNum = parseFloat(formData.rain);

    if (isNaN(phNum) || phNum < 0 || phNum > 14) {
      tempErrors.ph = 'pH must be a decimal coefficient between 0 and 14.';
    }
    if (isNaN(tempNum) || tempNum < -10 || tempNum > 60) {
      tempErrors.temp = 'Enter a valid temperature between -10°C and 60°C.';
    }
    if (isNaN(rainNum) || rainNum < 0 || rainNum > 8000) {
      tempErrors.rain = 'Rainfall must be a positive integer in mm (0 to 8000).';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const suite = calculateCropSuitability(
        formData.season,
        formData.soilType,
        formData.ph,
        formData.temp,
        formData.rain
      );
      setResults(suite);
    }
  };

  const handleSelectCrop = (crop) => {
    setSelectedCrop(crop);
  };

  return (
    <CropRecommendationView
      formData={formData}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      results={results}
      onSelectCrop={handleSelectCrop}
      currentlySelectedId={selectedCrop?.id}
    />
  );
}
