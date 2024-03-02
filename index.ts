import * as fs from 'fs';
import * as Jimp from 'jimp';
//@ts-ignore
import * as CryptoJS from 'crypto-js';

// Function to encode JSON into an image
async function encodeImageWithJSON(imagePath: string, jsonPayload: object, outputImagePath: string): Promise<void> {
  try {
    // Read the image file using Jimp
    const image = await Jimp.read(imagePath);

    // Convert JSON to string
    const jsonString = JSON.stringify(jsonPayload);

    // Encrypt the JSON string
    const encryptedData = CryptoJS.AES.encrypt(jsonString, 'encryption_key').toString();

    // Embed the encrypted data into the image
    image.bitmap.data.write(encryptedData, 0, 'ascii');

    // Save the output image
    await image.writeAsync(outputImagePath);

    console.log('Steganography complete. Image saved:', outputImagePath);
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

// Function to decode JSON from an image
async function decodeImageToJSON(imagePath: string): Promise<void> {
  try {
    // Read the image file using Jimp
    const image = await Jimp.read(imagePath);

    // Extract the embedded data from the image
    const encryptedData = image.bitmap.data.toString('ascii');

    // Decrypt the data
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, 'encryption_key').toString(CryptoJS.enc.Utf8);

    // Parse the decrypted JSON
    const decodedJSON = JSON.parse(decryptedData);

    console.log('Decoded JSON:', decodedJSON);
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

// Example usage for encoding
const imagePath = './water.png';
const jsonPayload = { key: 'value', secret: 'hidden message' };
const outputImagePath = './water.steg.png';

(async () => {
    await encodeImageWithJSON(imagePath, jsonPayload, outputImagePath);
    await decodeImageToJSON(outputImagePath);
})()

// Example usage for decoding
// const encodedImagePath = 'path/to/your/output/image_encoded.jpg';

