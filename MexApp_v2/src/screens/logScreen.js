import React, { useEffect, useState } from 'react';
import { View,Text, ScrollView } from 'react-native';
import RNFS from 'react-native-fs';

function LogScreen(){

    const rutaArchivo = RNFS.DocumentDirectoryPath + '/log.txt';
    const [textoLog,Setlog] = useState('')

    useEffect(() => 
    {
       help()

    }, [])

    const help=()=>{
        RNFS.readFile(rutaArchivo, 'utf8')
        .then(contenidoArchivo => {
            Setlog(contenidoArchivo)
          console.log('El contenido del archivo es: ', contenidoArchivo);
        })
        .catch(error => {
          console.error('Error al leer el archivo: ', error);
        });
    }

    return(

        <ScrollView>
            <Text>Archivo de log</Text>
            <Text>{textoLog}</Text>
        </ScrollView>
    )




}
export default LogScreen
