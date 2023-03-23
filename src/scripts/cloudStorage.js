// Node modules
import { ref, getDownloadURL, deleteObject, uploadBytesResumable } from "firebase/storage";


// Project files
import { cloudStorage, } from "./firebaseSetup";

export async function uploadFile(file, filePath) {
    const reference = ref(cloudStorage, filePath);
    await uploadBytesResumable(reference, file)
    // uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //         const percent = Math.round(
    //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //         );
            // console.log(percent);
            // update progress
            // setPercent(percent);
    //     },
    //     (err) => {
    //         console.error(err);
    //         return err});
    //    await uploadTask;
    // return `File uploaded successfully to ${filePath}`;
    // return downloadURL;
}

export async function downloadFile(filePath) {
    const reference = ref(cloudStorage, filePath);
    const result = await getDownloadURL(reference);

    return result;
}

export async function deleteFile(imageURL) {
    const splitImageData = imageURL.split(/%2F(.*?)\?alt/);
    const folderName = splitImageData[0].split('/')[7];
    const imageName = (splitImageData[1].replace("%20", " "));
    const filePath = folderName + '/' + imageName;
    const reference = ref(cloudStorage, filePath);
    deleteObject(reference).then(() => {
        console.log('Image deleted from cloud storage!');
        return 1;
    })
        .catch((err) => {
            console.log(err);
            return 0;
        });
}


// export async function uploadResumableFile(file, filePath) {
//     const reference = ref(cloudStorage, filePath);
//     const uploadTask = await uploadBytesResumable(reference, file);
//     await uploadTask;
//     uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//             const percent = Math.round(
//                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//             );

//             // update progress
//             // setPercent(percent);
//             // return `File uploaded successfully to ${filePath}`
//         },
//         (err) => console.log(err),
//         async () => {
//             // download url
//             await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//                 console.log(url);
//                 return url;
//             });
//         }
//     );
// }