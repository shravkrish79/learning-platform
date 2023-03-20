export default async function readFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
  
    const result = await new Promise((resolve) => {
      reader.onload = (event) => resolve(event.target.result);
    });
  
    return result;
  }