import React, { useState } from 'react'
import './Checkbox.css'

export default function Checkbox() {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <div className="container">
            <div className="round">
                <input type="checkbox" checked={isChecked} id="checkbox" onChange={(x) => setIsChecked(prev => !prev)} />
            </div>
        </div>
    )
}
