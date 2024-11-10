
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './CamperDetailsPage.module.css';
import symbolDefs from '../../assets/symbol-defs.svg';
const CamperDetailsPage = () => {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);

  useEffect(() => {
    const fetchCamper = async () => {
      try {
        const response = await axios.get(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`);
        setCamper(response.data);
      } catch (error) {
        console.error("Error fetching camper data:", error);
      }
    };

    fetchCamper();
  }, [id]);

  if (!camper) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.camperdetailspage}>
      <h2 className={styles.vehiclename}>{camper.name}</h2>
      <div className={styles.ratingbox}>
          <span className={styles.rating}>
            <svg width="16" height="16" className={styles.iconstar}>
              <use href={`${symbolDefs}#icon-star`}></use>
            </svg>
            {camper.rating} 
          </span>
          <span className={styles.reviewcount}>({camper.reviews.length} Reviews)</span>
          <span className={styles.vehiclelocation}>
            <svg width="16" height="16" className={styles.locationicon}>
              <use href={`${symbolDefs}#icon-location`}></use>
            </svg>
            {camper.location}
          </span>
      </div>
      <p className={styles.vehicleprice}>€{camper.price}.00</p>
      


      <div className={styles.gallery}>
        {camper.gallery.map((image, index) => (

          <img  className={styles.vehicleimage}  key={index} src={image.original} alt={`${camper.name} ${index + 1}`} />

        ))}
      </div>
      <p className={styles.vehicledescription}>{camper.description}</p>

      <div className={styles.reviews}>
        <h2>Reviews</h2>
        {camper.reviews.map((review, index) => (
          <div key={index} className={styles.review}>
            <h3>{review.reviewer_name}</h3>
            <p>Rating: {review.reviewer_rating}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CamperDetailsPage;
