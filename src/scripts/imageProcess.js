import readFile from "./resize-image/readFile";
import resizeImage from "./resize-image/resizeImage";
import { uploadFile, downloadFile } from "./cloudStorage";


export async function ImageProcess(imageURL,folderName) {
    const filePath = `${folderName}/${Date.now()}_${imageURL.name}`;
    const imageFromFile = await readFile(imageURL);
    const resizedImage = await resizeImage(imageFromFile, 240, 180);

    await uploadFile(resizedImage, filePath);
    const image = await downloadFile(filePath);
    // console.log(image);
    return image;

}