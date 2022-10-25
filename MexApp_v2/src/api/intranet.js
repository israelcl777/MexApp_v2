const restAPI='https://intranet.mexamerik.com'

class Api{

    async login(number,versionapp,token){
  
        var url=restAPI+'/dreams/loginv2/'+number+'/'+token+'/'+versionapp
        const query = await fetch(url);
        const data = await query.json();
        return data;
      }

    async getCurrentravel(id_operador){
      var url=restAPI+"/travels/travel_current/"+id_operador
      //var url=restAPI+"/travels/travel_current/"+100257
        const query = await fetch(url);
        const data = await query.json();
        return data;
    } 
    async getruta(solicitud){
      var url=restAPI+"/travels/get_route/"+solicitud
      const query = await fetch(url);
      const data = await query.json();
      return data;
    }

    async getInfographics(solicitud){
      var url=restAPI+"/infographics/get_infographics/"+solicitud
      const query = await fetch(url);
      const data = await query.json();
      return data;
    }
   
    async gettravels(id_operador, options = {}){
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
 
        };
        var url=restAPI+"/travels/travels/"+id_operador
        const query = await fetch(url,options);
        console.log(query)
        const data = await query.json();
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
      console.log(query)
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
    const data = await query.text()
    console.log(data)
    return data

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
  
    console.log(query)
    const data = await query.text()
    console.log(data)
    return data

  }
  
}
export default new Api();