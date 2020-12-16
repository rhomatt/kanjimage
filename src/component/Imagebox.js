import {useState, useEffect} from 'react';
import Button from './Button.js';
import {enlargeImage} from '../logic/processImage.js'

function Imagebox(){
    const [image, setImage] = useState({blob: null, base64: null}); // image metadata

    const pasteHandler = (event) => {
        const items = event.clipboardData.items;

        var blob;
        for(var i = 0; i < items.length; i++){ // get the first image
            let item = items[i];
            console.log(item);
            if(item.type === 'image/png'){
                blob = item.getAsFile();
                break;
            }
        }

        // there is probably a better way to do this
        var reader = new FileReader();
        reader.onload = event => setImage({blob, base64: event.target.result});

        if(blob) // should be null if not an image
            reader.readAsDataURL(blob);

    };

    useEffect(() => {
        document.addEventListener('paste', pasteHandler);
    }, []);

    const clickHandler = () => {
        enlargeImage(image.blob);
        console.log("clicked");
    };

    return(
        <>
        {image.base64 ? undefined : 'no image'}
        <img src={image.base64} alt=''/>
        <Button clickHandler={clickHandler} text="replace me"/>
        </>
    );
}

export default Imagebox;
