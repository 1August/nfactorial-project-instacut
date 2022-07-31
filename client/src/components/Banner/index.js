import './Banner.css'
import {Link} from "react-router-dom";
import {Button} from "../../UI/Button";

import infoIcon from '../../static/img/information.png'

export const Banner = props => {
    const {
        setIsModalOpen
    } = props

    // Handlers
    const handleOpenModalClick = e => {
        e.preventDefault()
        setIsModalOpen(true)
    }

    return (
        <div id="banner">
            <div className="banner__bgFilter">
                <div className="container">
                    <div className="banner__info">
                        <h1>Automate creating your Instagram post.</h1>
                        <h4>Easy tool to create fast post with dividing text and pictures.</h4>
                        <p>
                            Click <img src={infoIcon} alt="Info Icon"/> to see how to use.
                        </p>
                        <Link to="#" onClick={handleOpenModalClick}>
                            <Button>Create</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}