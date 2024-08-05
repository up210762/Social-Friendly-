const fs = require('fs').promises;

export const getImage = async () => {
    return;
}

export const createFolder = async (mainPath: string, folderName: string) => {
    await fs.mkdir(mainPath, { recursive: true });
    console.log('Carpeta creada con éxito: ', mainPath)
}

export const uploadImage = async (mainPath: string, image: string) => {
    await fs.writeFile(mainPath, image)
    console.log('Imagen subida!')
}