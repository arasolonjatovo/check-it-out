import React from 'react';
import './inputText.css';

export default function InputText({ type, desc, value, onChange, icon }) {
  const inputStyle = {
    backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(icon)}")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '5px 50%',
    paddingLeft: '25px',
  };

  return (
    <div className="inputContainer">
      <input
        type={type}
        placeholder={desc}
        value={value}
        onChange={onChange}
        style={inputStyle}
      />
    </div>
  );
}
