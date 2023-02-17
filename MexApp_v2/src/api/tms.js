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
        var url='https://tms.logsys.com.mx/tms/v1/drivers/'+id_Operador
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
      async getliquidations(id_Operador,from_time, to_time, options = {}){
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : ' Basic '+'YWRtaW46bTN4NG0zcjFr',
        };
        //http://192.168.1.162:9096/liquidations/api/liquidations?start=0&end=1000&from_time=2023-02-01T06:00:00.000Z&to_time=2023-02-08T05:59:00.000Z
        var url='http://192.168.1.162:9096/liquidations/api/liquidations?start=0&end=1000&driver_id='+id_Operador+'&from_time='+from_time+"&to_time="+to_time
        console.log(url)
        const query = await fetch(url,options);
        const data = await query.json();
       
        return data;
      

      }
      async getliqdet(id, options = {}){
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : ' Basic '+'YWRtaW46bTN4NG0zcjFr',
        };
        //
        var url='http://192.168.1.162:9096/liquidations/api/liquidations/'+id
        const query = await fetch(url,options);
        const data = await query.json(); 
        return data;
      

      }
      async getgasto(id_Operador,from_time, to_time, options = {}){
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : ' Basic '+'YWRtaW46bTN4NG0zcjFr',
        };
        //http://192.168.1.162:9096/liquidations/api/outgoings?start=0&end=1000&driver_id=2&from_time=2023-02-01T06%3A00%3A00.000Z&to_time=2023-02-16T05%3A59%3A00.000Z
        var url='http://192.168.1.162:9096/liquidations/api/outgoings?start=0&end=1000&driver_id='+id_Operador+'&from_time='+from_time+"&to_time="+to_time
        console.log(url)
        const query = await fetch(url,options);
        const data = await query.json();
       
        return data;
      

      }
      async getdepositos(id_Operador,from_time, to_time, options = {}){
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : ' Basic '+'YWRtaW46bTN4NG0zcjFr',
        };
        //http://192.168.1.162:9096/liquidations/api/deposits?start=0&end=1000&driver_id=2&from_time=2023-02-01T06%3A00%3A00.000Z&to_time=2023-02-16T05%3A59%3A00.000Z
        var url='http://192.168.1.162:9096/liquidations/api/deposits?start=0&end=1000&driver_id='+id_Operador+'&from_time='+from_time+"&to_time="+to_time
        console.log(url)
        const query = await fetch(url,options);
        const data = await query.json();
       
        return data;
      

      }

      async getfuel(id_Operador,options = {}){
        const fecha = new Date();
        var month = ("0" + (fecha.getMonth() + 1)).slice(-2);
        var lastmonth=("0" + (fecha.getMonth()-2)).slice(-2);
        var añopast=fecha.getFullYear()
        if(lastmonth<=0){
          lastmonth=12
          añopast=fecha.getFullYear()-1

        }
        var date = ("0" + fecha.getDate()).slice(-2);
        var hora=("0" + fecha.getHours()).slice(-2);
        var minute=("0" + fecha.getMinutes()).slice(-2);

        var fechainicio=añopast+'-'+lastmonth+'-'+date+'T'+'00'+':'+'00'+':'+'00'
        var fechaActual=fecha.getFullYear()+'-'+month+'-'+date+'T'+'23'+':'+'59'+':'+'00'
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : ' Basic '+'YWRtaW46bTN4NG0zcjFr',
        };
        var url= rest_v2+'/vehicles/dieselassignment/assignments?vehicles=-1&vendors=-1&drivers='+id_Operador+'&status=-1&vendor_type=-1&sort(-time)&from_time='+fechainicio+"&to_time="+fechaActual
        console.log(url)
        const query = await fetch(url,options);
        return query;
      }
}
export default new Api();

//