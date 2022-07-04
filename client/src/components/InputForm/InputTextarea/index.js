import './InputTextarea.css'

import {Textarea} from "../../../UI/Textarea"

export const InputTextarea = props => {
    const {
        textarea,
        handleTextareaChange,
        textareaCounter,
        maxCharLength
    } = props

    return(
        <>
            <Textarea
                textarea={textarea}
                handleTextareaChange={handleTextareaChange}
                name="userInput"
                id="userInput"
                placeholder={'Write your text here...'}
            />
            <span className={'textareaCounter'}>{textareaCounter} / {maxCharLength}</span>
        </>
    )
}