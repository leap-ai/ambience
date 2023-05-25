import React, { useEffect, useState } from 'react';
import './Newtab.css';
import './Newtab.scss';

const Newtab = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    // Call API to fetch the image
    fetch('https://ambience-b5jiwzxz7-leap-ai.vercel.app/api/get-image')
      .then((response) => {
        console.log(response);
        return response.text();
      })
      .then((text) => {
        setImageUrl(text);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${imageUrl})`,
        height: '100vh',
        width: '100vw',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="time-container">
        <h1>{currentTime}</h1>
      </div>
    </div>
  );
};

export default Newtab;
