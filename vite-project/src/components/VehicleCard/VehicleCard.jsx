import React from 'react';
import styles from './VehicleCard.module.css';
const VehicleCard = ({ vehicle }) => {
  return (
    <div className={styles.vehiclecard}>
      <img src={vehicle.gallery[0].thumb} alt={vehicle.name} className={styles.vehicleimage} />
      <div className="vehicle-info">
        <h2 className="vehicle-name">{vehicle.name}</h2>
        <p className="vehicle-location">{vehicle.location}</p>
        <p className="vehicle-price">€{vehicle.price}</p>
        <p className="vehicle-description">{vehicle.description}</p>
        <div className="vehicle-features">
          {vehicle.AC && <span className="feature">AC</span>}
          {vehicle.bathroom && <span className="feature">Bathroom</span>}
          {vehicle.kitchen && <span className="feature">Kitchen</span>}
          {vehicle.TV && <span className="feature">TV</span>}
          {vehicle.microwave && <span className="feature">Microwave</span>}
        </div>
        <button className="show-more">Show more</button>
      </div>
    </div>
  );
};

export default VehicleCard;