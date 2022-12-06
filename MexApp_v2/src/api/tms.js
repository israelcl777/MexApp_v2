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
}
export default new Api();