import './AboutPage.css'

import temp from '../../static/img/banner-bg.jpg'

export const AboutPage = props => {
    return(
        <div id={'aboutPage'} className={'aboutPage'}>
            <div className="about__aboutMe">
                <div className="about__avatar">
                    <img src={temp} alt="Avatar"/>
                </div>
                <div className="about__info">
                    <div className="about__mainInfo">
                        <h1>Maksat Kuanysh</h1>
                        <a
                            href={'https://www.instagram.com/iwa_tenshi/'}
                            target={'_blank'}
                            rel={'noreferrer'}
                        ><button>Follow</button></a>
                    </div>
                    <div className="about__accountInfo">
                        <p className={'about__postsNumb'}>
                            <span>5</span> posts
                        </p>
                        <p className="about__followers">
                            <span>150</span> followers
                        </p>
                        <p className="about__following">
                            <span>165</span> following
                        </p>
                    </div>
                    <div className="about__accountDesc">
                        <p>
                            Iwa_Tenshi <br/>
                            Maksat Kuanysh <br/>
                            👨🏻‍🎓 AITU'23 <br/>
                            08 ✈️ 01 <br/>
                            Git: <a href="https://github.com/1August" target={'_blank'} rel={'noreferrer'}>https://github.com/1August</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}