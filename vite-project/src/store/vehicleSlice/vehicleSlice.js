import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async (filters) => {
    try {
      const response = await axios.get('https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers');
      const vehicles = Array.isArray(response.data) ? response.data : response.data.items;

      if (!vehicles || vehicles.length === 0) {
        throw new Error("Data not found.");
      }


  const filteredData = vehicles.filter((item) => {
  const itemLocation = item.location.toLowerCase().trim();
  const filterLocation = filters.location ? filters.location.toLowerCase().trim() : '';
  console.log('Filtering with location:', filterLocation, 'on item location:', itemLocation);

  const matchesLocation = !filterLocation || itemLocation.includes(filterLocation);
  console.log('Location match:', matchesLocation);

  const matchesTransmission = !filters.transmission || item.transmission === filters.transmission;
  console.log('Transmission match:', matchesTransmission);

  const matchesForm = !filters.form || item.form === filters.form;
  console.log('Form match:', matchesForm);

  const equipmentFilters = [
    { key: 'AC', value: filters.AC },
    { key: 'bathroom', value: filters.bathroom },
    { key: 'kitchen', value: filters.kitchen },
    { key: 'TV', value: filters.TV },
    { key: 'radio', value: filters.radio },
    { key: 'refrigerator', value: filters.refrigerator },
    { key: 'microwave', value: filters.microwave },
    { key: 'gas', value: filters.gas },
    { key: 'water', value: filters.water }
  ];

  const matchesEquipment = equipmentFilters.every(({ key, value }) => {
    return value ? item[key] === true : true;
  });
  
  console.log('Equipment match:', matchesEquipment);

  return matchesLocation && matchesTransmission && matchesForm && matchesEquipment;
});

console.log('Filtered Data:', filteredData);
      return filteredData;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error("Data not found.");
      }
      throw error;
    }
  }
);

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.list = action.payload;  
        state.loading = false;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  }
});

export default vehicleSlice.reducer;
