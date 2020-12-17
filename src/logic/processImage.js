import Tesseract from 'tesseract.js'
import Jimp from 'jimp';

export async function enlargeImage(buffer){
    try{
        var image = await Jimp.read(buffer);
        console.log(image);
        image.resize(Jimp.AUTO, 1080, Jimp.RESIZE_BICUBIC);
        //var uri = image.write("./temp", error => console.error(error));
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

