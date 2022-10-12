import React,{Component} from "react";
import { FlatList} from 'react-native';
import Separator from'../componets/separator'
import Contacts from '../componets/contacts'
import Layout from '../componets/viajeslist_layout'
import Empty from '../componets/empty'



class ContactList extends Component{

    keyExtractor = item => item.name
    renderEmtpy=()=><Empty text="ningun resultado coincide con la busqueda  :("></Empty>
    itemseparator=()=><Separator  color='#eaeaea' ></Separator>
    renderItem=({item})=>{
        return(
<Contacts {...item}></Contacts>
        )
    }
    render(){

        return(

            <Layout>
        
            <FlatList
             keyExtractor={this.keyExtractor}
             data={this.props.contacts}
             ListEmptyComponent={this.renderEmtpy}
             ItemSeparatorComponent={this.itemseparator}
             renderItem={this.renderItem}/>
             </Layout>
           
        )

    }


}


export default ContactList

