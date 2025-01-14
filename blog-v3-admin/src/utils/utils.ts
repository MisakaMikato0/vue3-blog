export function deepClone(obj: any) {
  const objClone = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object") {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        //判断ojb子元素是否为对象，如果是，递归复制
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepClone(obj[key]);
        } else {
          //如果不是，简单复制
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}

/**
 * 图片压缩并转换（仅 PNG 转换为 JPEG，其他格式保持不变）
 * @param {File} file 图片文件
 * @param {number} size 目标压缩大小（KB），可能会略大于目标
 * @param {number} quality 初始质量（0-1）
 * @param {number} maxTime 最大压缩次数
 * @returns {Promise<Blob>} 压缩后的图片 Blob
 */
export const imageConversion = async (
  file: File,
  size = 800,
  quality = 1,
  maxTime = 3
): Promise<Blob> => {
  // 将 DataURL 转换为 Blob
  const dataURLToBlob = (dataURL: string, mimeType: string): Blob => {
    const [header, base64] = dataURL.split(",");
    const binary = atob(base64);
    const len = binary.length;
    const u8arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      u8arr[i] = binary.charCodeAt(i);
    }
    return new Blob([u8arr], { type: mimeType });
  };

  // 如果是 GIF 格式，直接返回 Blob
  if (file.type === "image/gif") {
    return file;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const image = new Image();
      image.src = e.target?.result as string;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context is not supported"));
          return;
        }

        // 设置画布大小
        const { width, height } = image;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, 0, 0, width, height);

        // 判断文件格式
        let mimeType = file.type;
        if (file.type === "image/png") {
          mimeType = "image/jpeg"; // 将 PNG 转换为 JPEG
        }

        let compressedDataURL = canvas.toDataURL(mimeType, quality);

        // 压缩逻辑
        while (maxTime > 0) {
          const currentSize = Math.round(compressedDataURL.length / 1024); // KB
          if (currentSize > size && quality > 0.1) {
            maxTime--;
            quality = Math.max(0.1, quality - 0.1); // 每次降低质量但不低于0.1
            compressedDataURL = canvas.toDataURL(mimeType, quality);
          } else {
            break;
          }
        }

        // 转换为 Blob
        resolve(dataURLToBlob(compressedDataURL, mimeType));
      };

      image.onerror = () => {
        reject(new Error("Failed to load image"));
      };
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
};


