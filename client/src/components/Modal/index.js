import './Modal.css'

import closeIcon from '../../static/img/Close.png'
import {InputTextarea} from "../InputForm/InputTextarea"
import {Button} from "../../UI/Button"

import { Link } from "react-router-dom"

export const Modal = props => {
    const {
        setIsModalOpen,
        textarea,
        handleTextareaChange,
        textareaCounter,
        maxCharLength,
        setTextarea
    } = props

    return (
        <div id="modal">
            <div className="modal__close" onClick={() => setIsModalOpen(false)}>
                <img src={closeIcon} alt="Close"/>
            </div>
            <div className="dyn_container">
                <div className="modal__body">
                    <div className="modal__header">
                        <h4>Create InstaCut</h4>
                    </div>
                    <div className="modal__content">
                        <InputTextarea
                            textarea={textarea}
                            handleTextareaChange={handleTextareaChange}
                            textareaCounter={textareaCounter}
                            maxCharLength={maxCharLength}
                        />
                        <Link to={'create/step1'}>
                            <Button
                                // setTextarea={setTextarea}
                                // textarea={textarea}
                            >
                                Create
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}