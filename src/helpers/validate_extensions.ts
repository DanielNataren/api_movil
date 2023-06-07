import { UploadedFile } from 'express-fileupload';
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import fs from "fs";
import { upload } from '../module/domain/repository/content.repository';

export const uploadArchive = (file: any, folder: string, extensionesValidas = ['png','jpg','jpeg','gif','mp4','mp3']) => {

    return new Promise(( resolve, reject ): upload | void =>{
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1];
        const temporalName = `${uuidv4()}.${extension}`;
        console.log(temporalName);
        if(!extensionesValidas.includes( extension )){
            return reject(`La extensión ${extension} no es permitida, ${extensionesValidas}`);
        }
        const uploadPath = path.join(__dirname, '../uploads',folder, temporalName);
        const urlPath = 'files/' + folder + temporalName;
        file.mv(uploadPath, function(err: any) {
            if (err) {
                return reject(undefined);
            }
            const data: upload = {
                originalName: file.name ,
                name: temporalName,
                url: ""+process.env.url_dev+urlPath,
            }
            return resolve(data);
        });
    });
}