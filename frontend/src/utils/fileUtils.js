export const validateFile = (file, options = {}) => {
    const {
        maxSize = 5 * 1024 * 1024, // 5MB
        allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
    } = options;

    if (file.size > maxSize) {
        throw new Error(
            `File size must be less than ${maxSize / 1024 / 1024}MB`
        );
    }

    if (!allowedTypes.includes(file.type)) {
        throw new Error("Only image files (JPEG, PNG, WebP, GIF) are allowed");
    }

    return true;
};

export const getFilePreview = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

export const compressImage = (file, quality = 0.8) => {
    return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(resolve, "image/jpeg", quality);
        };

        img.src = URL.createObjectURL(file);
    });
};

