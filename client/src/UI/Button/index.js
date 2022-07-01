import './Button.css'

export const Button = props => {
    const {
        children,
        ...etc
    } = props

    return(
        <button
            {...etc}
        >
            {children}
        </button>
    )
}