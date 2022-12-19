const BASE_API='https://tms.logsys.com.mx/tms/v1/'
const rest_v2='https://app.mexamerik.com/tms/api/v2.0'

class Api{
     
    async getOperador(id_Operador, options = {}){
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : ' Basic '+'YWRtaW46bTN4NG0zcjFr',
        
        };
        var url='https://'+BASE_API+'/tms/v1/drivers/'+id_Operador
        const query = await fetch(url,options);
        const data = await query.json();
        return data;
        
    
      }
    async getUnIdad(id_unidad,options = {}){
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : ' Basic '+'YWRtaW46bTN4NG0zcjFr',
        };
        var url='https://tms.logsys.com.mx/tms/v1/vehicles/'+id_unidad
        const query = await fetch(url,options);
        const data = await query.json();
        return data;
    
    
      }

      async getInst(id,options = {}){
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : ' Basic '+'YWRtaW46bTN4NG0zcjFr',
        };
        var url= rest_v2+'/instructions/shipment/'+id
        const query = await fetch(url,options);
        //const data = await query.json();
        return query;
      }

      async setevidencediesel(image,solicitud ){
        const query= await fetch(rest_v2+"/vehicles/dieselassignment/"+solicitud+"/evidence",{
          method: 'POST',
          headers: {   
            'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization' : ' Basic '+'YWRtaW46bTN4NG0zcjFr',
           },
           body: JSON.stringify({
            "image":image,
           }),
        });
        return query;
      }
      

      async getfuel(id_Operador,options = {}){
        const fecha = new Date();
        var month = ("0" + (fecha.getMonth() + 1)).slice(-2);
        var lastmonth=("0" + (fecha.getMonth()-1)).slice(-2);
        var date = ("0" + fecha.getDate()).slice(-2);
        var hora=("0" + fecha.getHours()).slice(-2);
        var minute=("0" + fecha.getMinutes()).slice(-2);

        var fechainicio=fecha.getFullYear()+'-'+lastmonth+'-'+date+'T'+hora+':'+minute+':'+'00'
        var fechaActual=fecha.getFullYear()+'-'+month+'-'+date+'T'+'23'+':'+'59'+':'+'00'
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : ' Basic '+'YWRtaW46bTN4NG0zcjFr',
        };
        var url= rest_v2+'/vehicles/dieselassignment/assignments?vehicles=-1&vendors=-1&drivers='+id_Operador+'&status=-1&vendor_type=-1&sort(-time)&from_time='+fechainicio+"&to_time="+fechaActual
        const query = await fetch(url,options);
        return query;
      }
}
export default new Api();

//