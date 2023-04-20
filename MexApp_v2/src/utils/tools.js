import RNFS from 'react-native-fs';


const rutaArchivo = RNFS.DocumentDirectoryPath + '/log.txt';
 
export default class Tools{

   writefilelog(Content){

    RNFS.writeFile(rutaArchivo, Content, 'utf8')
  .then(() => {
    console.log('Archivo escrito con éxito!');
  })
  .catch(error => {
    console.error('Error al escribir el archivo: ', error);
  });


  }

}