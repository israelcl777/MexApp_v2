import React,{Component} from "react";
import { FlatList} from 'react-native';
import Separator from'../componets/separator'
import Evidencia from '../componets/evidencia'
import Layout from '../componets/viajeslist_layout'
import Empty from '../componets/empty'



class EvidenciasList extends Component{

    keyExtractor = item => item.id
    renderEmtpy=()=><Empty text="ningun resultado coincide con la busqueda  :("></Empty>
    itemseparator=()=><Separator  color='#eaeaea' ></Separator>
    renderItem=({item})=>{
        return(
<Evidencia {...item}></Evidencia>
        )
    }
    render(){

        return(

            <Layout>
        
            <FlatList
             keyExtractor={this.keyExtractor}
             data={this.props.items}
             ListEmptyComponent={this.renderEmtpy}
             ItemSeparatorComponent={this.itemseparator}
             renderItem={this.renderItem}/>
             </Layout>
           
        )

    }


}


export default EvidenciasList

