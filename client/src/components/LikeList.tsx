import React, { useState, useEffect } from 'react';
import { getLikes } from '../services/like'; // Asegúrate de que esta ruta sea correcta
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

interface Like {
  id: number;
  full_name: string;
  fecha_like: string;
}

const LikesList: React.FC = () => {
  const [likes, setLikes] = useState<Like[]>([]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const data = await getLikes();
        if (typeof data === 'object')
          setLikes(data);
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    fetchLikes();
  }, []);

  return (
    <>
      <style>{`
        .likes-list {
          position: absolute;
          top: 40px; /* Ajusta según la altura de tu navbar */
          right: 10px; /* Ajusta la posición según necesites */
          width: 350px; /* Ajusta el ancho según necesites */
          background: Gray;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          z-index: 1000;
          max-height: 300px; 
          overflow-y: auto; 
        }

        .list-group {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .list-group-item {
          padding: 10px;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s, color 0.3s;
          display: flex;
          align-items: center;
          color: #fff; /* Color del texto */
        }

        .list-group-item:hover {
          background-color: #f8f9fa;
        }

        .like-icon {
          color: #007bff; /* Color inicial del icono */
          margin-right: 10px;
          transition: color 0.3s;
        }

        .list-group-item:hover .like-icon {
          color: gray; /* Color del icono al pasar el mouse */
        }

        .text-muted {
          color: black; /* Color del texto de la fecha */
        }
      `}</style>

      <div className="likes-list">
        {likes.length === 0 ? (
          <p style={{ padding: '10px', textAlign: 'center', color: '#333' }}>No tienes likes aún.</p>
        ) : (
          <ul className="list-group">
            {likes.map(like => (
              <li key={like.id} className="list-group-item">
                <FontAwesomeIcon icon={faHeart} className="like-icon" />
                <div>
                  <strong>{like.full_name}</strong>
                  <div className="text-muted">
                    {new Date(like.fecha_like).toLocaleDateString()} - {new Date(like.fecha_like).toLocaleTimeString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default LikesList;
