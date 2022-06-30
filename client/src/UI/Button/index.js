import './Button.css'

export const Button = props => {
    const {
        children,
        // textarea,
        // setTextarea
    } = props

    return(
        <button
            // onClick={() => setTextarea(textarea)}
        >
            {children}
        </button>
    )
}