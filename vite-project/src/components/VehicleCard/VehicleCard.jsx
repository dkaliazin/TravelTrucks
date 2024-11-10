import React from 'react';
import styles from './VehicleCard.module.css';
import { ReactSVG } from 'react-svg';

const VehicleCard = ({ vehicle }) => {
  const truncateDescription = (description, maxLength = 70) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };
  return (
    <div className={styles.vehiclecard}>
      <img src={vehicle.gallery[0].thumb} alt={vehicle.name} className={styles.vehicleimage} />
      <div className={styles.vehicleinfo}>
        <div className={styles.namepricebox}>
          <h2 className={styles.vehiclename}>{vehicle.name}</h2>
          <p className={styles.vehicleprice}>€{vehicle.price}</p>
          <svg id="icon-star" width='24' height='20' className={styles.icon}>
            <use href="../../assets/symbol-defs.svg#icon-star"></use>
          </svg>
        </div>
        
        <p className={styles.vehiclelocation}>{vehicle.location}</p>
        
         <p className={styles.vehicledescription}>{truncateDescription(vehicle.description)}</p>
        <div className={styles.vehiclefeatures}>
          {vehicle.AC && <span className={styles.feature}>AC</span>}
          {vehicle.bathroom && <span className={styles.feature}>Bathroom</span>}
          {vehicle.kitchen && <span className={styles.feature}>Kitchen</span>}
          {vehicle.TV && <span className={styles.feature}>TV</span>}
          {vehicle.transmission &&
            <span className={styles.feature}>
              {vehicle.transmission === 'automatic' ? 'Automatic' : 'Manual'}
            </span>}
        </div>
        <button className={styles.showmorebtn}>Show more</button>
      </div>
    </div>
  );
};

export default VehicleCard;