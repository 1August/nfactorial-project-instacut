export const Canvas = (props) => {
    const {
        refCanvas,
        refDownload,
        idx
    } = props

    return (
        <div className={'canvas'}>
            <a href={'#'} ref={el => refDownload.current[idx] = el} download={true}>
                <canvas ref={el => refCanvas.current[idx] = el}></canvas>
            </a>
        </div>
    )
}