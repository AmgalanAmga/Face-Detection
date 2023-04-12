export const convertIntoObject = async (base64: string) => {
  return await fetch(base64)
    .then((res) => res.blob())
    .then((blob) => {
      const file = new File([blob], "captured", { type: "image/jpeg" });
      return file;
    });
};
