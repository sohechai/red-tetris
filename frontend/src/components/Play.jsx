import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/tetris-logo.svg';
import { GooCursor } from '../utils/cursor'; // Assurez-vous que le chemin est correct

const Play = () => {
  let navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/room`);
  };

  useEffect(() => {
    const cursorEl = document.querySelector('.cursor');
    if (cursorEl) {
      new GooCursor(cursorEl);
    }
  }, []);

  return (
    <div className="parent-container">
      <img alt="Tetris Logo" className="logo" src={logo} id="play-logo" />
      <button onClick={handleClick}>PLAY</button>

      <div className="cursor">
        <div className="cursor__inner">
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="gooey">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -7"
                result="gooey"
              />
              <feMorphology in="gooey" operator="dilate" radius="2" result="outline" />
              <feComposite in="outline" in2="gooey" operator="out" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Play;
