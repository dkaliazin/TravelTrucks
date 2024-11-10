import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import styles from './FilterBox.module.css';
import symbolDefs from '../../assets/symbol-defs.svg';

const FilterBox = ({ onFilter }) => {
  const [selectedEquipment, setSelectedEquipment] = useState([]); 
  const [selectedType, setSelectedType] = useState(''); 
  const [locations, setLocations] = useState([]); 
  const [error, setError] = useState(null); 
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    vehicleEquipment: [],
    vehicleType: ''
  });

  const vehicleEquipment = ['AC', 'Automatic', 'Kitchen', 'TV', 'Bathroom']; 
  const vehicleType = ['Van', 'Fully Integrated', 'Alcove']; 

  // Toggle equipment selection
  const toggleEquipment = (equipment) => {
    setSelectedEquipment((prevSelected) =>
      prevSelected.includes(equipment)
        ? prevSelected.filter((item) => item !== equipment) 
        : [...prevSelected, equipment] 
    );
  };

  // Select vehicle type
  const selectType = (type) => {
    setSelectedType(type === selectedType ? '' : type); 
  };

  // Fetch locations from API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers');
        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data.items)) {
          const uniqueLocations = [...new Set(response.data.items.map(camper => camper.location))];
          setLocations(uniqueLocations); 
        } else {
          console.error("Unexpected data structure:", response.data);
          setError("Unexpected data format from the API.");
        }
      } catch (error) {
        setError("Error fetching locations.");
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  // Handle filter change
  const handleLocationChange = (e) => {
    console.log("Location selected:", e.target.value);
    setSelectedFilters((prevState) => ({ ...prevState, location: e.target.value }));
  };

  // Memoize the filter object to avoid unnecessary recalculations
  const memoizedFilters = useMemo(() => {
    const formMapping = {
      'Van': 'panelTruck',
      'Fully Integrated': 'fullyIntegrated',
      'Alcove': 'alcove'
    };

    const filters = {
      location: selectedFilters.location,
      AC: selectedEquipment.includes('AC'),
      bathroom: selectedEquipment.includes('Bathroom'),
      kitchen: selectedEquipment.includes('Kitchen'),
      TV: selectedEquipment.includes('TV'),
      radio: selectedEquipment.includes('Radio'),
      refrigerator: selectedEquipment.includes('Refrigerator'),
      microwave: selectedEquipment.includes('Microwave'),
      gas: selectedEquipment.includes('Gas'),
      water: selectedEquipment.includes('Water'),
      transmission: selectedEquipment.includes('Automatic') ? 'automatic' : 'manual',
      form: formMapping[selectedType] || '',
    };

    //console.log("Generated Filters:", filters); 
    return filters;
  }, [selectedFilters, selectedEquipment, selectedType]); 


  const handleSearch = () => {
    //console.log("Applying filters:", memoizedFilters);  
    onFilter(memoizedFilters); 
  };

  return (
    <div className={styles.filterbox}>
      
      <div className={styles.locationbox}>
        <svg width="20" height="20" className={styles.locationicon}>
          <use href={`${symbolDefs}#icon-location`}></use>
        </svg>
        <label className={styles.locationlabel}>Location</label>
        <select
          className={styles.select}
          value={selectedFilters.location}
          onChange={handleLocationChange}
        >
          <option value="">City</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
        {error && <div className="error">{error}</div>}
      </div>

      <div className={styles.equipmentbox}>
        <h3 className={styles.velicleheader}>Vehicle Equipment</h3>
        <div className={styles.buttonbox}>
          {vehicleEquipment.map((equipment) => (
            <button
              key={equipment}
              onClick={() => toggleEquipment(equipment)}
              className={selectedEquipment.includes(equipment) ? styles.active : ''}
            >
              <svg width="32" height="32" className={styles.buttonicon}>
                <use href={`${symbolDefs}#icon-${equipment}`}></use>
              </svg>
              {equipment}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.typebox}>
        <h3 className={styles.velicleheader}>Vehicle Type</h3>
        <div className={styles.buttonbox}>
          {vehicleType.map((type) => (
            <button
              key={type}
              onClick={() => selectType(type)}
              className={selectedType === type ? styles.active : ''}
            >
              <svg width="32" height="32" className={styles.buttonicon}>
                <use href={`${symbolDefs}#icon-${type}`}></use>
              </svg>
              {type}
            </button>
          ))}
        </div>
      </div>
      
      <button className={styles.searchbutton} onClick={handleSearch}>Search</button>
    </div>
  );
};

export default FilterBox;
