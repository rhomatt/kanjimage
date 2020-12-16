import {useState, useEffect} from 'react';

function Imagebox(){
    const [imageExists, setImageExists] = useState(false);

    const pasteHandler = (event) => {

    };

    useEffect(() => {
        document.addEventListener('paste', pasteHandler);
    });

    return(
        <>
            {imageExists ? undefined : 'no image'}
            <img/>
        </>
    );
}

export default Imagebox;
