import React, { useState } from "react";
import { Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const sampleUsers = [
  { id: 1, name: 'Usuario 1', description: 'Descripción del usuario 1' },
  { id: 2, name: 'Usuario 2', description: 'Descripción del usuario 2' },
  { id: 3, name: 'Usuario 3', description: 'Descripción del usuario 3' },
];

const TinderCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const handleLike = () => {
    console.log(`Usuario ${sampleUsers[index].name} le gustó`);
    moveToNext();
  };

  const handleDislike = () => {
    console.log(`Usuario ${sampleUsers[index].name} no le gustó`);
    moveToNext();
  };

  const moveToNext = () => {
    if (index < sampleUsers.length - 1) {
      setIndex(index + 1);
    } else {
      console.log("No hay más usuarios.");
    }
  };

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <Carousel activeIndex={index} onSelect={handleSelect} interval={null} controls={false} indicators={false} className="w-50">
        {sampleUsers.map(user => (
          <Carousel.Item key={user.id}>
            <div className="card mx-auto" style={{ width: '18rem' }}>
              <img src={`https://via.placeholder.com/150`} className="card-img-top" alt={user.name} />
              <div className="card-body text-center">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.description}</p>
                <div className="mt-3">
                  <button className="btn btn-danger me-3" onClick={handleDislike}>
                    <FontAwesomeIcon icon={faThumbsDown} />
                  </button>
                  <button className="btn btn-success" onClick={handleLike}>
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </button>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default TinderCarousel;
