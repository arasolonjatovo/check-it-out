import React from 'react'

import './inputText.css'

export default function InputText({ type, desc }) {
    return <input type={type} placeholder={desc}/>
}
