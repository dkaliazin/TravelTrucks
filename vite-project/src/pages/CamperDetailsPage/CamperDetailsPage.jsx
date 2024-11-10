import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './CamperDetailsPage.module.css';
import symbolDefs from '../../assets/symbol-defs.svg';

const CamperDetailsPage = () => {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [activeTab, setActiveTab] = useState('features');
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    date: '',
    comment: ''
  });
  const [isBooked, setIsBooked] = useState(false);
  useEffect(() => {
    const fetchCamper = async () => {
      try {
        const response =
          await axios.get(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`);
        setCamper(response.data);
      } catch (error) {
        console.error("Error fetching camper data:", error);
      }
    };

    fetchCamper();
  }, [id]);
  const handleTabClick = (tab) => {
    setActiveTab(tab); 
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  if (!camper) {
    return <p>Loading...</p>;
  }

  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => setIsBooked(false), 3000); // Resets the message after 3 seconds
  };
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
        <div key={index} className={styles.imageContainer}>
          <img className={styles.vehicleimage} src={image.original}
            alt={`${camper.name} ${index + 1}`} />
        </div>
      ))}
</div>
      <p className={styles.vehicledescription}>{camper.description}</p>

      {/*tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'features' ? styles.active : ''}`}
          onClick={() => handleTabClick('features')}
        >
          Features
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'reviews' ? styles.active : ''}`}
          onClick={() => handleTabClick('reviews')}
        >
          Reviews
        </button>
      </div>
      <div className={styles.linefeatures}></div>
      {/* features */}
      <div className={styles.tabContent}>
        {activeTab === 'features' && (
          <div className={styles.features}>
            <div className={styles.vehiclefeatures}>
          {camper.AC &&
            <span className={styles.feature}>
            <svg width="20" height="20" className={styles.buttonicon}>
                <use href={`${symbolDefs}#icon-AC`}></use>
            </svg>
            AC</span>}
          {camper.bathroom &&
            <span className={styles.feature}>
              <svg width="20" height="20" className={styles.buttonicon}>
                <use href={`${symbolDefs}#icon-Bathroom`}></use>
              </svg>
              Bathroom</span>}
          {camper.kitchen &&
            <span className={styles.feature}>
              <svg width="20" height="20" className={styles.buttonicon}>
                <use href={`${symbolDefs}#icon-Kitchen`}></use>
                </svg>
              Kitchen</span>}
          {camper.TV &&
            <span className={styles.feature}>
              <svg width="20" height="20" className={styles.buttonicon}>
                <use href={`${symbolDefs}#icon-TV`}></use>
                </svg>
              TV</span>}
          {camper.transmission &&
            <span className={styles.feature}>
              <svg width="20" height="20" className={styles.buttonicon}>
                <use href={`${symbolDefs}#icon-Automatic`}></use>
              </svg>
              {camper.transmission === 'automatic' ? 'Automatic' : 'Manual'}
            </span>}
        </div>
            <h3 className={styles.detailsheader}>Vehicle details</h3>
            <div className={styles.line}></div>
            <ul>
              <li>Form <span>{camper.form === 'alcove' ? 'Alcove'
                : camper.form === 'fullyIntegrated' ? 'Fully Integrated'
                  : camper.form === 'panelTruckVan' ? 'Panel Truck Van'
                    : camper.form}</span></li>
              <li>Length <span>{camper.length.replace(/(\d)(m)/, '$1 $2')}</span></li>
              <li>Width <span>{camper.width.replace(/(\d)(m)/, '$1 $2')}</span></li>
              <li>Height <span>{camper.height.replace(/(\d)(m)/, '$1 $2')}</span></li>
              <li>Tank <span>{camper.tank.replace(/(\d)(l)/, '$1 $2')}</span></li>
              <li>Consumption <span>{camper.consumption}</span></li>
            </ul>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className={styles.reviews}>
            {camper.reviews.map((review, index) => (
            <div key={index} className={styles.review}>
              <div className={styles.avatar}>
                {review.reviewer_name.charAt(0)}
              </div>
            <div className={styles.reviewContent}>
            <h3 className={styles.headercomment}>{review.reviewer_name}</h3>
            <div className={styles.rating}>
              {Array.from({ length: review.reviewer_rating }, (_, index) => (
                <svg
                  key={index}
                  width="16"
                  height="16"
                  className={styles.iconstar}
                  >
                    <use href={`${symbolDefs}#icon-star`}></use>
                </svg>
  ))}
            </div>
        <p className={styles.reviewcomment}>{review.comment}</p>
      </div>
    </div>
  ))}
</div>
        )}
      </div>
      {/* Booking Form */}
      <div className={styles.bookingFormContainer}>
        <h3>Book your campervan now</h3>
        <p>Stay connected! We are always ready to help you.</p>
        <form onSubmit={handleFormSubmit} className={styles.bookingForm}>
          <input
            type="text"
            name="name"
            placeholder="Name*"
            value={bookingData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={bookingData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="date"
            placeholder="Booking date*"
            value={bookingData.date}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="comment"
            placeholder="Comment"
            value={bookingData.comment}
            onChange={handleInputChange}
          ></textarea>
          <button type="submit" className={styles.submitButton}>Send</button>
        </form>
        {isBooked && <p className={styles.successMessage}>Successfully booked!</p>}
      </div>
    </div>
    
  );
};

export default CamperDetailsPage;
