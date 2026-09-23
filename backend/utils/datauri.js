import path from "path";

const getDataUri = (file) => {
    const extName = path.extname(file.originalname).toLowerCase();

    return {
        content: `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        extName
    };
};

export default getDataUri;