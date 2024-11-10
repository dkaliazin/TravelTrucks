import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CamperDetailsPage = () => {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCamperDetails = async () => {
      try {
        const response = await axios.get(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`);
        setCamper(response.data);
      } catch (error) {
        console.error("Error fetching camper details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCamperDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!camper) return <div>Camper not found</div>;

  return (
    <div>
      <h1>{camper.name}</h1>
      <p>Location: {camper.location}</p>
      <p>Price: €{camper.price}</p>
      <p>{camper.description}</p>
    </div>
  );
};

export default CamperDetailsPage;