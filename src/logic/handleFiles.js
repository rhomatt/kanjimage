
const handleFiles = (items, setImage) => {
    var blob;
    for(var i = 0; i < items.length; i++){ // get the first image
        let item = items[i];
        console.log(item);
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
}

export default handleFiles;
