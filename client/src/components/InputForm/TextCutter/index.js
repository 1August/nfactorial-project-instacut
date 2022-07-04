import './TextCutter.css'

import {Textarea} from "../../../UI/Textarea"
import {Button} from "../../../UI/Button"

import {useRef} from "react"
import {Link} from "react-router-dom"

export const TextCutter = props => {
    const {
        textPart,
        divideTexts,
        textPartCopy,
        picturePartCopy
    } = props

    // const textareaVal = typeof textPart

    const caretHelperRef = useRef(null)
    const toggleTooltip = e => {
        const text = textPart.join('. ') + '. '
        divideTexts(textPartCopy.substring(0, e.target.selectionEnd).split(/[.?!]/), (textPartCopy.substring(e.target.selectionEnd, text.length) + picturePartCopy).split(/[.?!]/))

        caretHelperRef.current.style.opacity = '1'
        caretHelperRef.current.style.left = `${e.pageX}px`
        caretHelperRef.current.style.top = `${e.pageY}px`
    }

    const handleTextareaScroll = e => {
        caretHelperRef.current.style.opacity = '0'
        caretHelperRef.current.style.left = `calc(100% + 1000rem)`
        caretHelperRef.current.style.top = `calc(100% + 1000rem)`
    }

    return(
        <div className={'textCutter'}>
            <h1>Put cursor(caret) where to cut.</h1>
            <div className="textPart">
                <Textarea
                    value={textPartCopy}
                    onClick={toggleTooltip}
                    name="toTextArea"
                    placeholder={'Edit your text here...'}
                    onScroll={handleTextareaScroll}
                    // translate={false}
                    spellCheck={false}
                />
                <div
                    className="caretHelper"
                    ref={caretHelperRef}
                >
                    Cut text here
                </div>
            </div>
            <Link to={'/create/step2'}>
                <Button>
                    Next step
                </Button>
            </Link>
        </div>
    )
}