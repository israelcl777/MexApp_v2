const BASE_API='tms.logsys.com.mx'

class Api{
     
    async getOperador(id_Operador, options = {}){
        options.headers = 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization : ' Basic '+'YWRtaW46bTN4NG0zcjFr',
        
        };
        var url='http://'+BASE_API+'/tms/v1/drivers/'+id_Operador
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
        var url='http://tms.logsys.com.mx/tms/v1/vehicles/'+id_unidad
        const query = await fetch(url,options);
        const data = await query.json();
        return data;
    
    
      }
}
export default new Api();