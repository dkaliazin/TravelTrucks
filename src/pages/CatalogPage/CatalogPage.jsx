import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicles } from '../../store/vehicleSlice/vehicleSlice';  
import FilterBox from '../../components/FilterBox/FilterBox'; 
import VehicleCard from '../../components/VehicleCard/VehicleCard';
import React, { useState, useEffect } from 'react';
import styles from './CatalogPage.module.css';
const CatalogPage = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector((state) => state.vehicles.list);  
  const loading = useSelector((state) => state.vehicles.loading);
  const error = useSelector((state) => state.vehicles.error);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    dispatch(fetchVehicles(filters));  
  }, [filters, dispatch]);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.catalogpage}>
      <FilterBox onFilter={handleFilter} />
      <div className={styles.vehiclelist}>
        {vehicles.length === 0 ? (
          <div>No vehicles available</div>
        ) : (
          vehicles.map(camper => (
            <VehicleCard key={camper.id} vehicle={camper} />
          ))
        )}
      </div>
    </div>
  );
};

export default CatalogPage;