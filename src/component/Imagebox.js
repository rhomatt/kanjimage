import {useState, useEffect} from 'react';
import Button from './Button.js';
import RangeSlider from './RangeSlider.js';
import SearchOptions from './SearchOptions.js';
import Dropzone from './Dropzone.js';
import handleFiles from '../logic/handleFiles.js';
import PI from '../logic/processImage.js';

function Imagebox(){
    const [image, setImage] = useState({buff: null, base64: null}); // image metadata
    const [text, setText] = useState('');
    const [threshold, setThreshold] = useState(128); // threshold amount for black/white
    const [saturation, setSaturation] = useState(50); // saturation amount

    const handlePaste = (event) =>{
        const items = event.clipboardData.items;
        console.log(items);
        handleFiles(items, setImage);
    }

    useEffect(() => {
        document.addEventListener('paste', handlePaste);
    }, []);

    useEffect(() => {
        if(image.base64){
            setText('Loading...');

            PI.recognize(image.base64)
                .then(text => {
                    console.log(text);
                    setText(text)
                });
        }
    }, [image]);

    const enlargeClick = async () => {
        if(!image.buff)
            return;
        var newimage = await PI.enlargeImage(image.buff);
        setImage(newimage);
    };

    const blurClick = async () => {
        if(!image.buff)
            return;
        var newimage = await PI.blur(image.buff, true);
        setImage(newimage);
    }

    const thresholdClick = async () => {
        const image = document.getElementById("image");
        var newimage = await PI.threshold(image, threshold);
        setImage(newimage);
    }

    const thresholdSlide= (event) => {
        setThreshold(parseInt(event.target.value));
    }

    const saturationClick = async () => {
        if(!image.buff)
            return;
        var newimage = await PI.saturate(image.buff, saturation);
        setImage(newimage);
    }

    const saturationSlide = (event) => {
        setSaturation(parseInt(event.target.value));
        console.log(saturation);
    }

    const greyscaleClick = async () => {
        if(!image.buff)
            return;
        var newimage = await PI.greyscale(image.buff);
        setImage(newimage);
    }

    const invertClick = async () => {
        if(!image.buff)
            return;
        var newimage = await PI.invert(image.buff);
        setImage(newimage);
    }

    return(
        <>
        {image.base64 ? undefined : 'no image'}
        <Dropzone render={() => image.base64} setImage={(image) => setImage(image)}/>

        <Button clickHandler={enlargeClick} text="Enlarge by x2"/>

        <Button clickHandler={blurClick} text="Gausian blur"/>

        <RangeSlider min={0} max={255} value={threshold} slideHandler={thresholdSlide}/>
        <Button clickHandler={thresholdClick} text="threshold"/>

        <RangeSlider min={0} max={100} value={saturation} slideHandler={saturationSlide}/>
        <Button clickHandler={saturationClick} text="saturation"/>

        <Button clickHandler={greyscaleClick} text="greyscale"/>

        <Button clickHandler={invertClick} text="invert"/>

        {text}
        <SearchOptions text={text}/>
        </>
    );
}

export default Imagebox;
