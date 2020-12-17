
function RangeSlider(props){
    const {min, max, value, slideHandler} = props;
    return(
        <>
        <input className="slider" type="range" min={min} max={max} onInput={slideHandler}/>
        {value}
        </>
    );
}

export default RangeSlider;
