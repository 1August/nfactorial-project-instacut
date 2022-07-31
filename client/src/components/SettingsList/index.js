import './SettingsList.css'

import {NavLink} from "react-router-dom"

export const SettingsList = props => {
    const checkIsActive = ({isActive}) => (isActive && 'active') || ''

    return (
        <ul>
            <li><NavLink to="step1" className={checkIsActive}>Cut the text</NavLink></li>
            <li><NavLink to="step2" className={checkIsActive}>Picture settings</NavLink></li>
        </ul>
    )
}