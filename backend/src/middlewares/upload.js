import multer from "multer";

const storage = multer.memoryStorage();

// Allow all file types
const fileFilter = (req, file, cb) => {
    // You can add restrictions here if needed
    // For example, limit file types or sizes
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB limit
    },
});

export { upload };
