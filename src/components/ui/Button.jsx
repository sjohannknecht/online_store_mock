import "./Button.css"

function Button({onClick, children, ...rest}) {
    return <button onClick={onClick} {...rest}>{children}</button>;
}

export default Button;