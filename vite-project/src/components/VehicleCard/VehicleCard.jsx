import React from 'react';
import styles from './VehicleCard.module.css';
import { ReactSVG } from 'react-svg';
import symbolDefs from '../../assets/symbol-defs.svg';
import { useNavigate } from 'react-router-dom';
const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();

  const handleShowMore = () => {
    navigate(`/catalog/${vehicle.id}`);
  };
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
          <div className={styles.pricebox}>
          <p className={styles.vehicleprice}>€{vehicle.price}.00</p>
          <svg width="24" height="20" className={styles.iconheart}>
            <use href={`${symbolDefs}#icon-heart`}></use>
            </svg>
          </div>
        </div>
        <div className={styles.ratingbox}>
          <span className={styles.rating}>
            <svg width="16" height="16" className={styles.iconstar}>
              <use href={`${symbolDefs}#icon-star`}></use>
            </svg>
            {vehicle.rating} 
          </span>
          <span className={styles.reviewcount}>({vehicle.reviews.length} Reviews)</span>
          <span className={styles.vehiclelocation}>
            <svg width="16" height="16" className={styles.locationicon}>
              <use href={`${symbolDefs}#icon-location`}></use>
            </svg>
            {vehicle.location}
          </span>
        </div>
        
        
         <p className={styles.vehicledescription}>{truncateDescription(vehicle.description)}</p>
        <div className={styles.vehiclefeatures}>
          {vehicle.AC &&
            <span className={styles.feature}>
            <svg width="20" height="20" className={styles.buttonicon}>
                <use href={`${symbolDefs}#icon-AC`}></use>
            </svg>
            AC</span>}
          {vehicle.bathroom &&
            <span className={styles.feature}>
              <svg width="20" height="20" className={styles.buttonicon}>
                <use href={`${symbolDefs}#icon-Bathroom`}></use>
              </svg>
              Bathroom</span>}
          {vehicle.kitchen &&
            <span className={styles.feature}>
              <svg width="20" height="20" className={styles.buttonicon}>
                <use href={`${symbolDefs}#icon-Kitchen`}></use>
                </svg>
              Kitchen</span>}
          {vehicle.TV &&
            <span className={styles.feature}>
              <svg width="20" height="20" className={styles.buttonicon}>
                <use href={`${symbolDefs}#icon-TV`}></use>
                </svg>
              TV</span>}
          {vehicle.transmission &&
            <span className={styles.feature}>
              <svg width="20" height="20" className={styles.buttonicon}>
                <use href={`${symbolDefs}#icon-Automatic`}></use>
              </svg>
              {vehicle.transmission === 'automatic' ? 'Automatic' : 'Manual'}
            </span>}
        </div>
        <button className={styles.showmorebtn} onClick={handleShowMore}>Show more</button>
      </div>
    </div>
  );
};

export default VehicleCard;