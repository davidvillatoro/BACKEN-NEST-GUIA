



export const fileFilter =(req: Express.Request, file:Express.Multer.File, callback:Function) =>{

    //console.log({file});
    if( !file ) return callback(new Error('archovo vacio, File is empty'), false)

    const fileExptension  = file.mimetype.split('/')[1];
    const validExtensions = ['jpg', 'jpeg', 'png' , 'gif'];//validaciones permitidas

    if (validExtensions.includes( fileExptension)) { 
        return callback(null, true) // si el archivo es permitido y si viene pasa
    }
    

    callback( null, false);


}