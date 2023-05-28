import RNFS from 'react-native-fs';
import moment from 'moment/moment';

const restAPI='https://intranet.mexamerik.com'
const rutaArchivo = RNFS.DocumentDirectoryPath + '/log.txt';
const hora = moment().format('YYYY-MM-DDTHH:MM:SS')


function writeline(line){
  RNFS.readFile(rutaArchivo, 'utf8')
  .then(content => {
    // Luego, escribimos el nuevo contenido al final del archivo
    return RNFS.appendFile(rutaArchivo, '\n' + line);
  })
  .then(() => {
    console.log('Archivo actualizado correctamente');
  })
  .catch(error => {
    writeFile(line)
  });


}

function writeFile(Content){

  RNFS.writeFile(rutaArchivo, Content, 'utf8')
  .then(() => {
    console.log('Archivo escrito con éxito!');
  })
  .catch(error => {
    console.error('Error al escribir el archivo: ', error);
  });

}

class Api{

    async login(number,versionapp,token){
  
        var url=restAPI+'/dreams/loginv2/'+number+'/'+token+'/'+versionapp
        const query = await fetch(url);
        const responseSize = query.headers.get('content-length') || '0';
        const line=hora+' '+url+' '+responseSize+'b'
        writeline(line)  
        const data = await query.json();
        return data;
      }

    async getCurrentravel(id_operador){
      var url=restAPI+"/travels/travel_current/"+id_operador
      //var url=restAPI+"/travels/travel_current/"+100257
        const query = await fetch(url);
        const responseSize = query.headers.get('content-length') || '0';
        const line=hora+' '+url+' '+responseSize+'b'
        writeline(line)  
        const data = await query.json();
        return data;
    } 
    async getruta(solicitud){
      var url=restAPI+"/travels/get_route/"+solicitud
      const query = await fetch(url);
      const responseSize = query.headers.get('content-length') || '0';
      const line=hora+' '+url+' '+responseSize+'b'
      writeline(line)  
      const data = await query.json();
      return data;
    }

    async getInfographics(solicitud){
      var url=restAPI+"/infographics/get_infographics/"+solicitud
      const query = await fetch(url);
      const responseSize = query.headers.get('content-length') || '0';
      const line=hora+' '+url+' '+responseSize+'b'
      writeline(line)  
      const data = await query.json();
      return data;
    }
   
    async gettravels(id_operador, options = {}){
      console.log(id_operador)
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
 
        };
        var url=restAPI+"/travels/travels/"+id_operador
        const query = await fetch(url,options);
        const responseSize = query.headers.get('content-length') || '0';
        const line=hora+' '+url+' '+responseSize+'b'
        writeline(line)  
        const data = await query.json();
        console.log(data)

        return data;
    } 

    async getcontacts(id_operador, options = {}){
      options.headers = 
      {
        'Content-Type': 'application/json',
        Accept: 'application/json',
  
      
      };
      var url=restAPI+"/travels/get_driver_cell/"+id_operador
      const query = await fetch(url,options);
      const responseSize = query.headers.get('content-length') || '0';
      const line=hora+' '+url+' '+responseSize+'b'
      writeline(line)  
      const data = await query.json();
      return data;
  } 
  async get_current_dream(id_operador,options={}){
    

    options.headers = 
    {
      'Content-Type': 'application/json',
      Accept: 'application/json', 
    };
    var url=restAPI+"/dreams/get_current_dream/"+id_operador
    const query = await fetch(url);
      
    const data = await query.json();
    
    return data;


  }
  async getNom87(id_operador, options = {}){
    options.headers = 
    {
      'Content-Type': 'application/json',
      Accept: 'application/json', 
    };
    var url=restAPI+"/dreams/nom87/"+id_operador
    const query = await fetch(url);
    const responseSize = query.headers.get('content-length') || '0';
    const line=hora+' '+url+' '+responseSize+'b'
    writeline(line)  
    const data = await query.json();
    return data;
  }

  async setDream(fecha_inicio,fecha_fin,id,coments,completed){
  var user =global.id_operador
  const response = await fetch(restAPI+'/dreams/insert_current_dream', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    "Accept": "*/*"
  },
  body: JSON.stringify({
    "start_date": fecha_inicio,
    "from_mexapp": true,
    "completed": completed,
    "activity": 1,
    "coments": coments,
    "id_dream": id,
    "driver": user,
    "end_date": fecha_fin,
     
  })
});
const responseSize = response.headers.get('content-length') || '0';
      const line=hora+' '+response.url+' '+responseSize+'b'
      
      writeline(line)  
return response
  }

  async New_Dream(fecha_inicio,fecha_fin){
    var user =global.id_operador
    const query = await fetch(restAPI+'/dreams/insert_dream_untimely', {
      method: 'POST',
      headers: {   
       'Content-Type': 'application/json',
       "Accept": "*/*"
      },
      body: JSON.stringify({
        "driver": user,
        "from_monitor": false,
        "from_date": fecha_inicio,
         "to_date": fecha_fin,
       
      }),
    });
    console.log(query.body)
    const responseSize = query.headers.get('content-length') || '0';
    const line=hora+' '+query.url+' '+responseSize+'b'
    writeline(line)  
    const data = await query.text()
    console.log(data)
    return data

  }
  async confirmar(solicitud,id_confirmacion,observation,datetime){

    const query= await fetch(restAPI+'/travels/confirmaciones/',{
      method: 'POST',
      headers: {   
        'Content-Type': 'application/json',
        "Accept": "*/*"
       },
       body: JSON.stringify({
        "id": solicitud,
        "id_confirmacion": id_confirmacion,
        "observation": observation,
        "datetime":datetime

       }),

    });
    console.log(query)
    const responseSize = query.headers.get('content-length') || '0';
    const line=hora+' '+query.url+' '+responseSize+'b'
    writeline(line)  

  
    
    return query

  }
  async setReport(solicitud,id_causa,observation){
    var user =global.id_operador

    const query= await fetch('http://mexapp.mexamerik.com/evidencias-erplogsys/api/SetReporte',{
      method: 'POST',
      headers: {   
        'Content-Type': 'application/json',
        "Accept": "*/*"
       },
       body: JSON.stringify({
        "id_user": user,
        "id_causa": id_causa,
        "solicitud": solicitud,
        "observacion": observation,

       }),
    });
    const responseSize = query.headers.get('content-length') || '0';
    const line=hora+' '+query.url+' '+responseSize+'b'
    writeline(line)  
    console.log(query)
    const data = await query.text()
    console.log(data)
    return data
  }

  async getliquidaciones(id_operador, options = {}){
    options.headers = 
    {
      'Content-Type': 'application/json',
      Accept: 'application/json', 
    };
    var url="https://app.mexamerik.com/MexApp_liquidaciones/api/liquidaciones/"+id_operador
    const query = await fetch(url,options);
    const data = await query.json();
    return data;

  }

  async getdepositos(id_operador, options = {}){
    options.headers = 
    {
      'Content-Type': 'application/json',
      Accept: 'application/json', 
    };
    var url="https://app.mexamerik.com/MexApp_liquidaciones/api/depositos/"+id_operador
    const query = await fetch(url,options);
    const responseSize = query.headers.get('content-length') || '0';
    const line=hora+' '+ url +' '+responseSize+'b'
    writeline(line)  
    const data = await query.json();
    return data;

  }
  async getliqdet(id_operador, options = {}){
    options.headers = 
    {
      'Content-Type': 'application/json',
      Accept: 'application/json', 
    };
    var url="https://app.mexamerik.com/MexApp_liquidaciones/api/liquidacionesdet/"+id_operador
    const query = await fetch(url,options);
    const responseSize = query.headers.get('content-length') || '0';
    const line=hora+' '+url+' '+responseSize+'b'
    writeline(line)  
    const data = await query.json();
    return data;

  }

  async getevidencias(id_operador, options = {}){

    options.headers = 
    {
      'Content-Type': 'application/json',
      Accept: 'application/json', 
    };
    
    var url='https://intranet.mexamerik.com/evidences/get/'+id_operador
    const query = await fetch(url,options);
    const responseSize = query.headers.get('content-length') || '0';
    const line=hora+' '+url+' '+responseSize+'b'
    writeline(line)  
    const data = await query.json();
    return data;

  }

  async getObservaciones(id, options = {}){

    options.headers = 
    {
      'Content-Type': 'application/json',
      Accept: 'application/json', 
    };
    
    var url='https://intranet.mexamerik.com/evidences/observations/'+id
    const query = await fetch(url,options);
    const responseSize = query.headers.get('content-length') || '0';
    const line=hora+' '+url+' '+responseSize+'b'
    writeline(line)  
    const data = await query.json();
    return data;

  }

  async getType(options = {}){

    options.headers = 
    {
      'Content-Type': 'application/json',
      Accept: 'application/json', 
    };
    
    var url='https://intranet.mexamerik.com/evidences/type'
    const query = await fetch(url,options);
    const responseSize = query.headers.get('content-length') || '0';
    const line=hora+' '+url+' '+responseSize+'b'
    writeline(line)  
    const data = await query.json();
    return data;
  }

  async setevidence(idoperado,lat,lon,base64,fecha,description,evidence_type ){
    var test={
      "driver_id":idoperado,
      "evidence_type":evidence_type,
      "lat":lat,
      "lon":lon,
      "attachedFile64":base64,
      "mexapp_datetime":fecha,
      "description":description

    }
    console.log(test)
  
    const query= await fetch('https://intranet.mexamerik.com/evidences/send',{
      method: 'POST',
      headers: {   
        'Content-Type': 'application/json',
        'Accept': 'application/json', 
       },
       body: JSON.stringify({
        "driver_id":idoperado,
      "evidence_type":evidence_type,
      "lat":lat,
      "lon":lon,
      "attachedFile64":base64,
      "mexapp_datetime":fecha,
      "description":description

       }),
    });
    const responseSize = query.headers.get('content-length') || '0';
    const line=hora+' '+query. url+' '+responseSize+'b'
    writeline(line)  

    return query;
  }

  
}


export default new Api();