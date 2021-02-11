import React,{Component} from 'react'
import { View, Text, FlatList, Button, ScrollView, StyleSheet} from 'react-native'
import { List, ListItem } from "react-native-elements"
import { NavigationActions } from 'react-navigation';
import axios from 'axios'

export default class Lista extends Component{
    static navigationOptions = {
        title: "Lista de itens"
    }
    constructor(props){
        super(props);
        this.state = {
            lista: this.props.navigation.state.params.lista,
            mat: this.props.navigation.state.params.mat,
            secao: this.props.navigation.state.params.secao,
            message: '',
            status: '',
            numero: this.props.navigation.state.params.numero,
            dbutton: false
        }
    }
    onAddList = props =>{
        this.setState({lista: []})

        this.props.navigation.navigate('Home')
    }
    enviaLista(matt,secc,list,number){
        
        this.setState({dbutton: true})
        axios.post('http://192.168.101.115/inventario/adiciona_itens.php',{ mat: matt, secao: secc, lista: list, numero: number})
        .then(response => {
            this.setState({ message: response.data.message, status: response.data.status});
            alert(`${this.state.message}`)
            //alert('pelo menos foi!')
            this.onAddList();
        })
        .catch(error => {
            alert(error);
        });
    }
    //_keyExtractor = (item, index) => item.id;

    render(){

        //const lista = this.props.navigation.state.params.lista;
        //this.setState({lista: lista})
        //const cod = this.props.navigation.state.params;
        //const { codbarra, qtd } = this.props.navigation.state.params;
        //const codbarra = lista.codbarra
        //alert(Object.keys(lista))
        if(this.state.lista){

            return(
                <View style={styles.container}>
                    <Text>Inventario: {this.state.numero} Quantidade: {this.state.lista.length}</Text>
                    <FlatList
                        data={this.state.lista}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) =>(
                            <View style={styles.item}>
                                <Text style={styles.title}>{item.desc}</Text>
                                <Text style={styles.title}>Quantidade: {item.qtd}</Text>
                                <Text style={styles.title}>Código: {item.codbarra}</Text>
                            </View>
                        )}
                    />
                    <Button
                        style={{position: 'absolute', bottom: 0, height: 60}}
                        disabled={this.state.dbutton}
                        onPress={()=>this.enviaLista(this.state.mat,this.state.secao,this.state.lista,this.state.numero)}
                        title="Enviar"
                    />
                </View>
            )
        }else{

            return(
                <Text>Nenhum item na lista</Text>
            )
        }
        
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 5,
    },
    item: {
      backgroundColor: '#D9DDDC',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 15,
    },
});