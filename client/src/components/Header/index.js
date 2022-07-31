import './Header.css'

import '../../static/css/fonts/Billabong/stylesheet.css'
import infoIcon from '../../static/img/information.png'
import aboutIcon from '../../static/img/icons8-decision-50.png'

import {Link} from "react-router-dom"

export const Header = props => {
    return (
        <header>
            <div className="container">
                <div className="header__logo">
                    <abbr title="Home page">
                        <Link to="/">
                            <h1>InstaCut</h1>
                        </Link>
                    </abbr>
                </div>
                <div className="header__links">
                    <ul>
                        <li className={'header__info'}>
                            <abbr title="How to use">
                                <Link to="info"><img src={infoIcon} alt="link"/></Link>
                            </abbr>
                        </li>
                        <li className={'header__about'}>
                            <abbr title="About creator">
                                <Link to="about"><img src={aboutIcon} alt="link"/></Link>
                            </abbr>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}