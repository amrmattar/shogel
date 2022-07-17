import React, { useState, useEffect, useRef } from 'react';
import Icon from '../lib/Icons';
import "./Progress.scss";

export default function Progress({ icon, name, handleClick }) {
  const [complete, setComplete] = useState(false);
  const [width, setWidth] = useState(0);
  const [color, setColor] = useState("#ed665f");
  useEffect(() => {
    if (name) {
      let timeout = setInterval(() => {
        setWidth(prev => {
          if (prev !== 100) return prev + 10;
          setComplete(true);
          setColor("#6cc08a");
          return prev;
        });
      }, 50);
      return () => clearInterval(timeout);
    }

  }, [name]);

  return (
    <div className="progress"  >
      <div className="progress__icon ">
        <Icon name={icon} width="50px" height="50px" opacity={complete ? 1 : 0.5} />
      </div>

      <div className="progress__content">

        <div className="progress__content__1" onClick={handleClick}>
          <p className="mb-0 progress__content__1__filename LT-receiveFileText" >
            {name}
          </p>
          <Icon className={complete ? "check " : "close "} name={complete ? "CLOSE" : "CLOSE"} width="20px" height="20px" />
        </div>
        <div className="progress__content__2" >
          <div className="progress__content__2__bar" style={{ width: `${width}%`, background: color }} />
        </div>
      </div>
    </div>
  );
}
