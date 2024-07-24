export const getPublicIdFromUrl = (url) => {
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const folder = urlParts[urlParts.length - 2];
    const publicId = `${folder}/${fileName.split('.')[0]}`;
    return publicId;
};