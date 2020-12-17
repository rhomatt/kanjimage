import {useState, useEffect} from 'react';
import Button from './Button.js';
import Dropzone from './Dropzone.js';
import readInImage from '../logic/readInImage.js';
import {enlargeImage, recognize} from '../logic/processImage.js';

function Imagebox(){
    const [image, setImage] = useState({buff: null, base64: null}); // image metadata
    const [text, setText] = useState('');

    useEffect(() => {
        document.addEventListener('paste', readInImage(setImage));
    }, []);

    useEffect(() => {
        if(image.base64){
            setText('Loading...');

            recognize(image.base64)
                .then(text => {
                    console.log(text);
                    setText(text)
                });
        }
    }, [image]);

    const enlargeClick = async () => {
        if(!image.buff)
            return;
        var newimage = await enlargeImage(image.buff);
        console.log(newimage);
        setImage(newimage);
    };

    return(
        <>
        {image.base64 ? undefined : 'no image'}
        <Dropzone render={() => image.base64} setImage={(image) => setImage(image)}/>
        <Button clickHandler={enlargeClick} text="Enlarge by x2"/>
        {text}
        </>
    );
}

export default Imagebox;
