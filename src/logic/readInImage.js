
const readInImage = (setImage) => {
    return (event) => {
        const items = event.clipboardData.items;

        var blob;
        for(var i = 0; i < items.length; i++){ // get the first image
            let item = items[i];
            if(item.type.match(/image\/.*/)){
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
}

export default readInImage;
