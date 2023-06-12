import { UploadedFile } from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
import { upload } from '../modules/contents/domain/repository/content.repository';
import { IError } from '../core/exceptions/error.exception';
import { v4 as uuid } from 'uuid';

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

export const uploadArchive = async (file: UploadedFile, extensionesValidas = ['mp4','mp3']): Promise<upload> => {

        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1]
        const temporalName = `${uuid()}.${extension}`;
        if(!extensionesValidas.includes( extension )){
            throw new IError(`La extensión ${extension} no es permitida, ${extensionesValidas}`);
        }
        try {
            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                resource_type: extension == "mp4" ? "video" : "auto",
            });
            return {
                originalName: file.name ,
                name: temporalName,
                url: result.secure_url,
                type: extension == "mp4" ? "video" : "audio",
                publicId: result.public_id
            }
        } catch (error) {
            throw new IError("Error al subir");
        }
}

export const deleteArchive = async (publicId: string) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, {resource_type: 'video'});
        console.log('====================================');
        console.log('Video eliminado:', result.result);
        console.log(publicId);
        console.log('====================================');
        return 'Video eliminado: '+ result.result;
      } catch (error) {
        throw new IError('Error al eliminar el video:', error.message);
      }
}