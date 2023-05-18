const fs = require('fs');
const path = 'storage';
const { v4: uuidv4 } = require('uuid');

const uploadFile = async (req, res) => {
    try {
        const { base64, type } = req.body;
        const mimeTypesObj = {
            'image/jpeg': 'jpg',
            'image/png': 'png',
            'image/gif': 'gif',
            'image/tiff': 'tiff',
            'image/bmp': 'bmp',
            'image/webp': 'webp',
            'image/vnd.microsoft.icon': 'ico',
            'image/svg+xml': 'svg'
        }
        // add validation
        if (!type) return res.status(400).send({
            error: true,
            message: "file type is required.",
            response: null
        });
        const mimes = Object.keys(mimeTypesObj);
        if (!mimes.includes(type)) return res.status(400).send({
            error: true,
            message: `only ${mimes.join(', ')} are accept.`,
            response: null
        });
        if (!base64) return res.status(400).send({
            error: true,
            message: "file base64 string is required.",
            response: null
        });

        // check the path avalable in locally
        if (!fs.existsSync(path)) {
            console.log('Path not exist, Create a dir.');

            fs.mkdirSync(path, { recursive: true });
        }
        // in exist tupload the file
        const fileName = `${uuidv4()}.${mimeTypesObj[type]}`
        const bufferFile = Buffer.from(base64, 'base64');
        fs.writeFileSync(`${path}/${fileName}`, bufferFile);

        // create a url to access file
        return res.status(200).send({
            error: false,
            message: "file upload successfully",
            response: fileName
        });
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: error.message,
            response: 'image'
        });
    }
}

const streamFile = async (req, res) => {
    try {
        const { id } = req.params;
        const filePath = `${path}/${id}`
        // check the path avalable in locally
        if (!fs.existsSync(filePath)) {
            return res.status(404).send({
                error: true,
                message: `File not found`,
                response: null
            });
        }
        var readStream = fs.createReadStream(filePath);
        // We replaced all the event handlers with a simple call to readStream.pipe()
        readStream.pipe(res);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            error: true,
            message: error.message,
            response: 'image'
        });
    }
}

const deleteFile = async (req, res) => {
    try {
        const { id } = req.params;
        const filePath = `${path}/${id}`;
        const deleteStream = fs.unlink(filePath, (err) => {
            if (err) throw err;
            console.log('File deleted!');
        });
        return res.status(200).send({
            error: false,
            message: "file deleted successfully",
            response: deleteStream
        });
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: error.message,
            response: null
        });
    }
}

module.exports = { uploadFile, streamFile, deleteFile };