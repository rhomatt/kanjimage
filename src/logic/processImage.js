import Tesseract from 'tesseract.js'
import Jimp from 'jimp';

// increase image size
// double size for now. work on resizing by a factor later
export async function enlargeImage(buffer){
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

export async function blur(buffer, gaussian){
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

export async function recognize(base64){
    console.log('processing...');
    var data = await Tesseract.recognize(base64, 'jpn');
    console.log(data);
    console.log(data.data.text);
    return data.data.text;
}

