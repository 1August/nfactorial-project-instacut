import {Textarea} from "../../../UI/Textarea";
import {Button} from "../../../UI/Button";
import {useRef} from "react";

export const TextCutter = props => {
    const {
        refTextPart
    } = props

    const handleTextPartChange = e => {
        console.log(e.target.selectionStart)
        console.log(e.target.selectionEnd)
    }

    const handleTextareaCaretChangeClick = e => {
        console.log(e.target.selectionStart)
        console.log(e.target.selectionEnd)
    }

    const caretHelperRef = useRef(null)

    const tempValue = '111111111111111111111111111111111'

    function getCaretCoordinates() {
        let x = 0, y = 0;
        const isSupported = typeof window.getSelection !== "undefined";
        if (isSupported) {
            const selection = window.getSelection();
            // console.log('selection', selection)

            if (selection.rangeCount !== 0) {
                const range = selection.getRangeAt(0).cloneRange();
                // console.log('range', range)
                range.collapse(true);
                const rect = range.getClientRects()[0];
                // console.log('rects', rect)
                if (rect) {
                    x = rect.left;
                    y = rect.top;
                }
            }
        }
        return { x, y };
    }

    const toggleTooltip = e => {
        console.log('EVENT', +e.clientX - +e.target.offsetLeft)


        // if (contenteditable.contains(event.target)) {
            const { x, y } = getCaretCoordinates();
            // caretHelperRef.current.setAttribute("aria-hidden", "false");
            // caretHelperRef.current.setAttribute(
            //     "style",
            //     `display: inline-block; left: ${x - 32}px; top: ${y - 36}px`
            // );
            caretHelperRef.current.style.display = 'inline-block'
            caretHelperRef.current.style.left = `${x - 32}px`
            caretHelperRef.current.style.top = `${y - 36}px`
        // }
        // else {
        //     tooltip.setAttribute("aria-hidden", "true");
        //     tooltip.setAttribute("style", "display: none;");
        // }
    }

    return(
        <div className={'textCutter'}>
            <div className="textPart">
                <Textarea
                    // value={refTextPart.current || ''}
                    // value={tempValue}
                    onKeyDown={toggleTooltip}
                    onClick={toggleTooltip}
                    name="toTextArea"
                    // id="userInput"
                    placeholder={'Edit your text here...'}
                />
                {/*className={'withCaretHelper'}*/}
                {/*data-caret-helper-text={'Cut text here'}*/}

                <div className="caretHelper" ref={caretHelperRef}>
                    Cut text here
                </div>
            </div>
            <Button>Next step</Button>
        </div>
    )
}