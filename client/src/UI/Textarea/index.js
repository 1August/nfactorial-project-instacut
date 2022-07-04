import './Textarea.css'

export const Textarea = props => {
    const {
        textarea,
        handleTextareaChange,
        ...etc
    } = props

    return(
        <textarea
            value={textarea}
            onChange={handleTextareaChange}
            {...etc}
        />
    )
}