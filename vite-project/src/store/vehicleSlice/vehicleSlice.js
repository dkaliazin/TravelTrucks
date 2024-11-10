import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Изменяем fetchVehicles для использования фильтров
export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async (filters) => {
    // Строим query параметры на основе фильтров
    let query = new URLSearchParams();

    // Если выбраны фильтры по оборудованию, добавляем их как отдельные параметры
    if (filters.location) query.append('location', filters.location);
    if (filters.AC) query.append('AC', 'true');
    if (filters.bathroom) query.append('bathroom', 'true');
    if (filters.kitchen) query.append('kitchen', 'true');
    if (filters.TV) query.append('TV', 'true');
    if (filters.radio) query.append('radio', 'true');
    if (filters.refrigerator) query.append('refrigerator', 'true');
    if (filters.microwave) query.append('microwave', 'true');
    if (filters.gas) query.append('gas', 'true');
    if (filters.water) query.append('water', 'true');

    const response = await axios.get(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers?${query.toString()}`);

    return response.data;
  }
);
const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: { list: [], loading: false, error: null }, // добавьте состояния загрузки и ошибок
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.list = action.payload.items;  // извлекаем массив из объекта
        state.loading = false;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  }
});

export default vehicleSlice.reducer;