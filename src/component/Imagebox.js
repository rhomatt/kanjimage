import {useState, useEffect} from 'react';

function Imagebox(){
    const [image, setImage] = useState(null);

    const pasteHandler = (event) => {
            const items = event.clipboardData.items;

            var blob = null;
            for(var i = 0; i < items.length; i++){ // get the first image
                let item = items[i];
                console.log(item);
                if(item.type === 'image/png'){
                    blob = item.getAsFile();
                    break;
                }
            }

        var reader = new FileReader();
        reader.onload = (event) => {
            let result = event.target.result
            console.log(result);
            setImage(result);
        };

        if(blob) // should be null if not an image
            reader.readAsDataURL(blob);

    };

    useEffect(() => {
        document.addEventListener('paste', pasteHandler);
    }, []);

    return(
        <>
        {image ? undefined : 'no image'}
        <img src={image}/>
        </>
    );
}

export default Imagebox;
