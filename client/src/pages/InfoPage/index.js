import './InfoPage.css'

import {Button} from "../../UI/Button";

import main from '../../static/img/samples/main.png'
import createModal from '../../static/img/samples/createModal.png'
import textSettings from '../../static/img/samples/textSettings.png'
import picSettings from '../../static/img/samples/pictureSettings.png'
import result from '../../static/img/samples/result.png'

export const InfoPage = props => {
    return(
        <div id={'infoPage'} className={'infoPage'}>
            <h2>InfoPage</h2>
            <ol>
                <li>
                    Get ready your text. Keep it in clipboard.
                </li>
                <li>
                    Click <Button>Create</Button> button on main page.
                </li>
                <li>
                    Paste your text into textarea and click <Button>Create</Button> again.
                </li>
                <li>
                    You will see 'Cut the text page'. You can click into text to make a cut for future description part of post. Black cursor will be shown.
                </li>
                <li>
                    Click <Button>Next step</Button>
                </li>
                <li>
                    You can choose size, font, colors of your future post.
                </li>
                <li>
                    Click <Button>Create InstaCut</Button>
                </li>
                <li>
                    You will see 'Preview' page. On left hand you could see future post pictures, on right side text of the post.
                </li>
                <li>
                    You can copy text by clicking button <a href="#">Copy text</a> or download pictures with button <a href="#">Download(n)</a>. Where 'n' is number of pages.'
                </li>
            </ol>
            <div className="infoPage__gallery">
                <img src={main} alt="Main page screen"/>
                <img src={createModal} alt="Create modal screen"/>
                <img src={textSettings} alt="Text settings screen"/>
                <img src={picSettings} alt="Picture settings screen"/>
                <img src={result} alt="Result page screen"/>
            </div>
        </div>
    )
}