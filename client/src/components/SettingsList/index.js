import './SettingsList.css'

import {NavLink} from "react-router-dom"

export const SettingsList = props => {
    const checkIsActive = ({isActive}) => (isActive && 'active') || ''

    return (
        <ul>
            <li><NavLink to="step1" className={checkIsActive}>Step 1</NavLink></li>
            <li><NavLink to="step2" className={checkIsActive}>Step 2</NavLink></li>
        </ul>
    )
}