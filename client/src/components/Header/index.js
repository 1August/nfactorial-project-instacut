import './Header.css'

import addPostIcon from '../../static/img/Add.png'
import homeIcon from '../../static/img/Home.png'
import aboutIcon from '../../static/img/User.png'

export const Header = (props) => {
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
                    <a href="/">
                        <h1>InstaCut</h1>
                    </a>
                </div>
                <div className="header__links">
                    <ul>
                        <li className={'header__home'}><a href="/"><img src={homeIcon} alt="link"/></a></li>
                        <li className={'header__addPost'}><a href="#" onClick={handleOpenModalClick}><img src={addPostIcon} alt="link"/></a></li>
                        <li className={'header__about'}><a href="#"><img src={aboutIcon} alt="link"/></a></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}