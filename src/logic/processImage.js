import Tesseract from 'tesseract.js'
import Jimp from 'jimp';
const Lena = require('lena.js');

var processImage = {};

// increase image size
// double size for now. work on resizing by a factor later
processImage["enlargeImage"] = async function(buffer){
    try{
        var image = await Jimp.read(buffer);
        const fx = image.bitmap.width * 2,
            fy = image.bitmap.height * 2;
        console.log(image);
        image.resize(fx, fy, Jimp.RESIZE_BICUBIC);
        //var uri = image.write("./temp", error => console.error(error));
        const base64 = await image.getBase64Async(Jimp.AUTO);
        const buff = await image.getBufferAsync(Jimp.AUTO);

        return {buff, base64};
    }
    catch(error){
        console.error(error);
    }
}

processImage["blur"] = async function(buffer, gaussian){
    const radius = 1;
    try{
        var image = await Jimp.read(buffer);
        if(gaussian)
            image.gaussian(radius);
        else
            image.blur(radius);

        const base64 = await image.getBase64Async(Jimp.AUTO);
        const buff = await image.getBufferAsync(Jimp.AUTO);

        return {buff, base64};
    }
    catch(error){
        console.error(error);
    }
}

// must be passed a document element
// there is probably a better way to do this
processImage["threshold"] = async function(element, amt=128){
    var canvas = document.createElement("canvas");
    console.log(canvas);
    const filter = (pixels) => Lena["thresholding"](pixels, amt);

    Lena.filterImage(canvas, filter, element);
    const base64 = canvas.toDataURL("image/png");

    // if I don't wrap this thing in a promise it refuses to work
    const blobber = new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            console.log(1, blob);
            resolve(blob);
        });
    });

    const blob = await blobber;

    console.log(2, blob);
    const buff = await blob.arrayBuffer();

    return {buff, base64};
}

processImage["saturate"] = async function(buffer, amt=50){
    try{
        var image = await Jimp.read(buffer);
        image.color([
            { apply: 'saturate', params: [amt]}
        ]);
        const base64 = await image.getBase64Async(Jimp.AUTO);
        const buff = await image.getBufferAsync(Jimp.AUTO);

        return {buff, base64};
    }
    catch(error){
        console.error(error);
    }
}

processImage["greyscale"] = async function(buffer){
    try{
        var image = await Jimp.read(buffer);
        image.greyscale();
        const base64 = await image.getBase64Async(Jimp.AUTO);
        const buff = await image.getBufferAsync(Jimp.AUTO);

        return {buff, base64};
    }
    catch(error){
        console.error(error);
    }
}


processImage["invert"] = async function(buffer){
    try{
        var image = await Jimp.read(buffer);
        image.invert();
        const base64 = await image.getBase64Async(Jimp.AUTO);
        const buff = await image.getBufferAsync(Jimp.AUTO);

        return {buff, base64};
    }
    catch(error){
        console.error(error);
    }
}

processImage["recognize"] = async function(base64){
    console.log('processing...');
    var data = await Tesseract.recognize(base64, 'jpn');
    var text = data.data.text;
    text = text.replace(/\s+/g, '');
    return text;
}

export default processImage;
