import {useState, useEffect} from 'react';
import Button from './Button.js';
import {enlargeImage, recognize} from '../logic/processImage.js';

// here for reference. Delete later
// function Image(props){
//     return <img src={props.render()}/>
// }

function Imagebox(){
    const [image, setImage] = useState({buff: null, base64: null}); // image metadata
    const [text, setText] = useState('');

    const pasteHandler = (event) => {
        const items = event.clipboardData.items;

        var blob;
        for(var i = 0; i < items.length; i++){ // get the first image
            let item = items[i];
            //console.log(item);
            if(item.type === 'image/png'){
                blob = item.getAsFile();
                break;
            }
        }

        var reader = new FileReader();
        reader.onload = async event => {
            const buff = await blob.arrayBuffer();
            setImage({buff, base64: event.target.result})
        };

        if(blob) // should be null if not an image
            reader.readAsDataURL(blob);

    };

    useEffect(() => {
        document.addEventListener('paste', pasteHandler);
    }, []);

    useEffect(() => {
        if(image.base64)
            recognize(image.base64)
                .then(text => {
                    console.log(text);
                    setText(text)
                });
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
        <img src={image.base64} alt=''/>
        <Button clickHandler={enlargeClick} text="Enlarge"/>
        {text}
        </>
    );
}

export default Imagebox;
