import './Header.css'

import addPostIcon from '../../static/img/Add.png'
import homeIcon from '../../static/img/Home.png'
import aboutIcon from '../../static/img/User.png'

import {Link} from "react-router-dom"

export const Header = props => {
    const {
        setIsModalOpen
    } = props

    // Handlers
    const handleOpenModalClick = e => {
        e.preventDefault()
        setIsModalOpen(true)
    }

    return(
        <header>
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <h1>InstaCut</h1>
                    </Link>
                </div>
                <div className="header__links">
                    <ul>
                        <li className={'header__home'}><Link to="/"><img src={homeIcon} alt="link"/></Link></li>
                        <li className={'header__addPost'}><Link to="#" onClick={handleOpenModalClick}><img src={addPostIcon} alt="link"/></Link></li>
                        <li className={'header__about'}><Link to="about"><img src={aboutIcon} alt="link"/></Link></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}