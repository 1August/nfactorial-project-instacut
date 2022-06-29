import './InputForm.css'

export const InputForm = ({...props}) => {
    const {
        handleFormSubmit,
        textarea,
        handleTextareaChange,
        textareaCounter,
        maxCharLength,
        submitBtnRef,
        tempCanvas,
        styles,
        handleStylesInputChange
    } = props

    const {
        width,
        bgColor,
        bgOpacity,
        fontFamily,
        color,
        fontSize,
        padding
    } = styles

    return (
        <form onSubmit={handleFormSubmit}>
            <textarea
                value={textarea}
                onChange={handleTextareaChange}
                name="userInput"
                id="userInput"
                cols="30" rows="10"
                placeholder={'Write your text here...'}
            />
            <span className={'textareaCounter'}>{textareaCounter} / {maxCharLength}</span>
            <div className="styleInputs">
                <div className="width">
                    <label htmlFor={'widthInput'}>Width</label>
                    <input type="number" id={'widthInput'} name={'width'} value={width} onChange={handleStylesInputChange} min={720} max={2160} step={10}/>
                    <input type="range" name={'width'} value={width} onChange={handleStylesInputChange} min={720} max={2160} step={10} placeholder={'Width'}/>
                </div>
                <div className="bgColor">
                    <label htmlFor="bgColor">Background color</label>
                    <input type="color" id={'bgColorInput'} value={bgColor} name={'bgColor'} onChange={handleStylesInputChange}/>
                </div>
                <div className="bgOpacity">
                    <label htmlFor="bgOpacity">Background opacity</label>
                {/*    <input type="number" id={'bgOpacityInput'} name={'bgOpacity'} value={bgOpacity} onChange={handleStylesInputChange} min={0} max={100} step={5}/>*/}
                {/*    <input type="range" value={bgOpacity} name={'bgOpacity'} onChange={handleStylesInputChange} min={0} max={100} step={5}/>*/}
                </div>
                <div className="padding">
                    <label htmlFor="paddingInput">Padding</label>
                    <input type="number" id={'paddingInput'} name={'padding'} min={20} max={200} value={padding} onChange={handleStylesInputChange}/>
                    <input type="range" name={'padding'} min={20} max={200} value={padding} onChange={handleStylesInputChange}/>
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
                    <input type="color" id={'fontColorInput'} name={'color'} value={color} onChange={handleStylesInputChange}/>
                </div>
                <div className="textAlign">
                    <label htmlFor=''>Text align</label>
                </div>
                <div className="fontSize">
                    <label htmlFor="fontSizeInput">Font size</label>
                    <input type="number" id={'fontSizeInput'} name={'fontSize'} value={fontSize} onChange={handleStylesInputChange} min={14} max={72}/>
                    <input type="range" name={'fontSize'} value={fontSize} onChange={handleStylesInputChange} min={14} max={72}/>
                </div>
            </div>
            <button ref={submitBtnRef} type={"submit"}>Create InstaCut</button>
            <canvas
                id="tempCanvas"
                ref={tempCanvas}
            />
        </form>
    )
}