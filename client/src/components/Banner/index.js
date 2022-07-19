import './Banner.css'
import addPostIcon from "../../static/img/Add.png";
import {Link} from "react-router-dom";
import {Button} from "../../UI/Button";

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
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consequatur, delectus
                            exercitationem expedita explicabo ipsa ipsam libero molestias neque, odio optio quam
                            quibusdam
                            ratione. Accusantium excepturi fuga illum officia saepe.
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