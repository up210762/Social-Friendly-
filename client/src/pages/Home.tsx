import React, { useEffect, useState } from "react";
import { Carousel } from 'react-bootstrap';
import { User } from "./PerfilUsuario";
import { getManyUsers } from "../services/users";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';


const TinderCarousel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    getUsersInfo();
  }, [])

  const getUsersInfo = async () => {
    const sampleUsers = await getManyUsers();
    console.log(sampleUsers)
    setUsers(sampleUsers)
  }

  if (!users)
    return

  const handleLike = () => {
    console.log(`Usuario ${users[index].full_name} le gustó`);
    moveToNext();
  };

  const handleDislike = () => {
    console.log(`Usuario ${users[index].full_name} no le gustó`);
    moveToNext();
  };

  const moveToNext = () => {
    if (index < users.length - 1) {
      setIndex(index + 1);
    } else {
      console.log("No hay más usuarios.");
    }
  };

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <Carousel activeIndex={index} onSelect={handleSelect} interval={null} controls={false} indicators={false} className="w-50">
        {users.map(user => (
          <Carousel.Item key={user.id}>
            <div className="card mx-auto" style={{ width: '18rem' }}>
              <img src={user.urlPhoto?user.urlPhoto:`/public/avatar.png`} className="card-img-top" alt={user.full_name} />
              <div className="card-body text-center">
                <h5 className="card-title">{user.full_name}</h5>
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
