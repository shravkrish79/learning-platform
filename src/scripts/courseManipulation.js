import { ImageProcess } from "./imageProcess";
import { deleteFile, downloadFile, uploadFile } from "./cloudStorage";
import { updateDocument, createDocument } from "./fireStore";


let image;
let keepFile = true;
export async function courseManipulation({ form }, data, courseData) {

    const courseImageFolder = 'courseImages';
    const courseDocFileFolder = 'docFiles';
    const courseVideoFileFolder = 'videoFiles';


    if ((form.courseImage !== undefined) && (form.courseImage !== null)) {
        image = await ImageProcess(form.courseImage[0], courseImageFolder);
        keepFile = false;
    }
    else if (data === null) { image = form.courseImage }
    else { image = data.courseImage; }


    let docFileArray = [];
    if ((form.docFiles !== undefined) && (form.docFiles !== null)) {
        for (let i = 0; i < form.docFiles.length; i++) {
            const filePath = `${courseDocFileFolder}/${Date.now()}_${form.docFiles[i].name}`;
            await uploadFile(form.docFiles[i], filePath);
            const docFileURL = await downloadFile(filePath);
            docFileArray = [...docFileArray, docFileURL];
        }
    }
    else if (data == null) { docFileArray = form.docFiles }
    else { docFileArray = data.docFiles; }

    let videoFileArray = [];
    if ((form.videoFiles !== undefined) && (form.videoFiles !== null)) {
        for (let i = 0; i < form.videoFiles.length; i++) {
            const filePath = `${courseVideoFileFolder}/${Date.now()}_${form.videoFiles[i].name}`;
            await uploadFile(form.videoFiles[i], filePath);
            const videoFileURL = await downloadFile(filePath);
            videoFileArray = [...videoFileArray, videoFileURL];
        }
    }
    else if (data == null) { videoFileArray = form.videoFiles }
    else { videoFileArray = data.videoFiles; }

    const courseCollectionData = {
        "courseName": form.courseName,
        "courseDesc": form.courseDesc,
        "courseImage": image,
        "docFiles": docFileArray,
        "videoFiles": videoFileArray
    }
    if (data === null) {
        const result = await createDocument('course', courseCollectionData);
        const newContent = {id: result.id, ...form};
        const newCourseData = [...courseData, newContent];
        return newCourseData;
    }
    else {
        const clonedData = [...courseData];
        const itemIndex = clonedData.findIndex((item) => item.id === data.id);
        const imageURL = clonedData[itemIndex].courseImage;
        if (!keepFile) { deleteFile(imageURL); }
        await updateDocument('course', courseCollectionData, data.id);
        const newData = { id: data.id, ...courseCollectionData };
        clonedData[itemIndex] = newData;
        return (clonedData);
    }
}