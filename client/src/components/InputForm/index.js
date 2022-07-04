import './InputForm.css'

import {Input} from "../../UI/Input"
import {Button} from "../../UI/Button"

import {Link} from "react-router-dom"

export const InputForm = ({...props}) => {
    const {
        submitBtnRef,
        tempCanvas,
        styles,
        handleStylesInputChange,
        handleCreate
    } = props

    const {
        width,
        bgColor,
        fontFamily,
        color,
        fontSize,
        padding
    } = styles

    return (
        <form>
            <div className="styleInputs">
                <div className="width">
                    <label htmlFor={'widthInput'}>Width (px)</label>
                    <Input type="number" id={'widthInput'} name={'width'} value={width} onChange={handleStylesInputChange} min={720} max={2160} step={10}/>
                    <Input type="range" name={'width'} value={width} onChange={handleStylesInputChange} min={720} max={2160} step={10} placeholder={'Width'}/>
                </div>
                <div className="bgColor">
                    <label htmlFor="bgColor">Background color</label>
                    <Input type="color" id={'bgColorInput'} value={bgColor} name={'bgColor'} onChange={handleStylesInputChange}/>
                </div>
                <div className="padding">
                    <label htmlFor="paddingInput">Padding (px)</label>
                    <Input type="number" id={'paddingInput'} name={'padding'} min={20} max={200} value={padding} onChange={handleStylesInputChange}/>
                    <Input type="range" name={'padding'} min={20} max={200} value={padding} onChange={handleStylesInputChange}/>
                </div>
                <div className="font">
                    <label htmlFor="fontInput">Font</label>
                    <select name="fontFamily" id="fontInput" value={fontFamily} onChange={handleStylesInputChange}>
                        <option value="sans-serif">Sans-Serif</option>
                        <option value="calibri">Calibri</option>
                        <option value="roboto">Roboto</option>
                        <option value="serif">Serif</option>
                    </select>
                </div>
                <div className="fontColor">
                    <label htmlFor="fontColorInput">Text color</label>
                    <Input type="color" id={'fontColorInput'} name={'color'} value={color} onChange={handleStylesInputChange}/>
                </div>
                <div className="fontSize">
                    <label htmlFor="fontSizeInput">Font size</label>
                    <Input type="number" id={'fontSizeInput'} name={'fontSize'} value={fontSize} onChange={handleStylesInputChange} min={14} max={72}/>
                    <Input type="range" name={'fontSize'} value={fontSize} onChange={handleStylesInputChange} min={14} max={72}/>
                </div>
            </div>
            <Link to={'/result'}>
                <Button
                    ref={submitBtnRef}
                    type={"submit"}
                    onClick={handleCreate}
                >
                    Create InstaCut
                </Button>
            </Link>
            <canvas
                id="tempCanvas"
                ref={tempCanvas}
            />
        </form>
    )
}