import React,{Component} from "react";
import { FlatList} from 'react-native';
import Separator from'../componets/separator'
import Layout from '../componets/viajeslist_layout'
import Empty from '../componets/empty'
import Deposito from '../componets/deposito'



class EventList extends Component{
    

    keyExtractor = item => item.id
    renderEmtpy=()=><Empty text="ningun resultado coincide con la busqueda  :("></Empty>
    itemseparator=()=><Separator  color='#eaeaea' ></Separator>
    renderItem=({item})=>{
        return(
<Deposito {...item}></Deposito>
        )
    }
    render(){
        console.log(this.props.events)

        return(
            

            <Layout>
            
        
            <FlatList
             keyExtractor={this.keyExtractor}
             data={this.props.depositos}
             ListEmptyComponent={this.renderEmtpy}
             ItemSeparatorComponent={this.itemseparator}
             renderItem={this.renderItem}/>
             </Layout>
           
        )

    }


}


export default EventList

