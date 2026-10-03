export async function imagesToDataUrls(formData: FormData) {
  const imageFiles = formData.getAll("images");
  const images: string[] = [];

  for (const imageFile of imageFiles) {
    if (imageFile instanceof File && imageFile.size > 0) {
      const buffer = await imageFile.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      const mimeType = imageFile.type || "image/jpeg";
      images.push(`data:${mimeType};base64,${base64}`);
    }
  }

  return images;
}
