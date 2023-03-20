export default async function resizeImage(imageSource, width, height) {
    const canvas = document.createElement("canvas");
    const image = await loadImage(imageSource);
    const newSize = proportionalScaling(image, width, height); // 240, 129
  
    canvas.width = newSize.width;
    canvas.height = newSize.height;
    canvas.getContext("2d").drawImage(image, 0, 0, newSize.width, newSize.height);
  
    return await canvasToPNGBlob(canvas);
  }
  
  async function loadImage(image) {
    const result = new Image();
    result.src = image;
  
    await new Promise((resolve) => (result.onload = resolve));
  
    return result;
  }
  
  function proportionalScaling(image, width, height) {
    let newWidth = image.width;
    let newHeight = image.height;
  
    if (newWidth > newHeight) {
      newHeight *= width / newWidth;
      newWidth = width;
    } else {
      newWidth *= height / newHeight;
      newHeight = height;
    }
  
    return { width: newWidth, height: newHeight };
  }
  
  async function canvasToPNGBlob(canvas) {
    const canvasToDataURL = canvas.toDataURL("image/png");
    const DataURLToBlob = await fetch(canvasToDataURL);
    const result = await DataURLToBlob.blob();
  
    return result;
  }
  