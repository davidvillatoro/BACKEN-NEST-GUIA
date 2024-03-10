import {v4 as uuid } from "uuid";



export const fileNamer =(req: Express.Request, file:Express.Multer.File, callback:Function) =>{

    //console.log({file});
    if( !file ) return callback(new Error('archovo vacio, File is empty'), false)

    const fileExptension  = file.mimetype.split('/')[1];
    //const validExtensions = ['jpg', 'jpeg', 'png' , 'gif'];

    const fileName = `${uuid()}.${fileExptension}`;

    callback( null, fileName);


}