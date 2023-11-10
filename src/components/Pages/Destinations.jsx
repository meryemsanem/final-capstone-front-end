import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import './Destinations.css';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate();

  const swiperConfig = {
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  };

  const handleSpecificPage = (id) => {
    navigate(`/destinations/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://127.0.0.1:4000/api/v1/destinations',
        );
        const data = await response.json();
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="page-container">
      <div className="container-destination">
        <h1 className="page-title">LATEST RESORTS</h1>
        <p className="page-title1">Please choose your favorite Resort</p>
        {destinations && destinations.length > 0 ? (
          <Swiper
            navigation
            modules={[Navigation]}
            className="mySwiper"
            spaceBetween={swiperConfig.spaceBetween}
            slidesPerView={swiperConfig.slidesPerView}
            breakpoints={swiperConfig.breakpoints}
          >
            {destinations.map((destination) => (
              <SwiperSlide key={destination.id}>
                <div
                  className="destination-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSpecificPage(destination.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSpecificPage(destination.id);
                    }
                  }}
                >
                  <img src={destination.image_url} alt={destination.name} />
                  <div className="card-bottom">
                    <h2>{destination.city_name}</h2>
                    <h3>{destination.name}</h3>
                    <p>{destination.description}</p>
                    <div className="social-group">
                      <span className="social-icon">
                        <i className="fa fa-twitter" />
                      </span>
                      <span className="social-icon">
                        <i className="fa fa-linkedin" />
                      </span>
                      <span className="social-icon">
                        <i className="fa fa-github" />
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>No destinations available.</p>
        )}
      </div>
    </div>
  );
};

export default Destinations;
