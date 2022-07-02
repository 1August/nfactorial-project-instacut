import './Banner.css'

export const Banner = props => {
    return(
        <div id="banner">
            <div className="banner__bgFilter">
                <div className="container">
                    <div className="banner__info">
                        <h1>Automate creating your Instagram post.</h1>
                        <h4>Easy tool to create fast post with dividing text and pictures.</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consequatur, delectus
                            exercitationem expedita explicabo ipsa ipsam libero molestias neque, odio optio quam quibusdam
                            ratione. Accusantium excepturi fuga illum officia saepe.
                        </p>
                        <p className={'banner__helper'}>Click <span>+</span> icon to start</p>
                    </div>
                </div>
            </div>
        </div>
    )
}