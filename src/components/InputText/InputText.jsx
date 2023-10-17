import React from 'react'

import './inputText.css'

export default function InputText({ type, desc, value, onChange}) {
    return <input type={type} placeholder={desc} value={value} onChange={onChange}/>
}
