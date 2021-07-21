import React, { useEffect } from 'react';
import './button.scss';

export default function Button({ type, onClick, className, children }) {
  useEffect(() => {

  }, []);

  return (
    <button type="button" onClick={onClick} className={`button ${type} ${className}`}>{children}</button>
  );
};
