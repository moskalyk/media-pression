import * as dotenv from "dotenv";

import { registerFaucet } from './main.js'
import { Fluence, kras } from '@fluencelabs/js-client'

import * as fs from 'fs';
import * as Jimp from 'jimp';
import * as J from 'jimp';

dotenv.config();

//@ts-ignore
import * as CryptoJS from 'crypto-js';

(async () => {

    const privateKeyArray = process.env.privkey!.split(',').map(Number).concat([
        138, 58, 155, 206, 90, 147, 127, 163,
        119, 66, 142, 188, 149, 35, 56, 48
    ]);

    const keyPair: any = {
        type: 'Ed25519',
        source: new Uint8Array(privateKeyArray)
    };

    try {
        await Fluence.connect(kras[1], {
            debug: { printParticleId: true },
            keyPair: keyPair
        });
    } catch (error) {
        console.error("Error connecting to Fluence network:", error);
    }

    console.log('connected ',(await Fluence.getClient().getPeerId()))

    registerFaucet({
        source: async (buffer: any) => {
            console.log(buffer)
            // Read the image file using Jimp
            const image = await Jimp.read(buffer);

            // Convert JSON to string
            const jsonString = JSON.stringify({msg: 'its on arrival'});

            // Encrypt the JSON string
            const encryptedData = CryptoJS.AES.encrypt(jsonString, 'encryption_key').toString();

            // Embed the encrypted data into the image
            image.bitmap.data.write(encryptedData, 0, 'ascii');

            // Save the output image
            const getBuffer: any = () => new Promise((res) => {
                image.getBuffer(J.MIME_PNG, async (buffer: any) => {
                    const uint8Array = new Uint8Array(buffer);
                    res(uint8Array)
                })
            })

            return await getBuffer()
        }
    })
})()