
function Button(props){
    const {clickHandler, text} = props;

    return(
        <div>
        <button onClick={props.clickHandler}>
        {text}
        </button>
        </div>
    );
}

export default Button;
