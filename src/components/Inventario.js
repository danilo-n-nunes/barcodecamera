import App from '../../App'
import Requisitos from './Requisitos'
import ModalQt from './Modal'
import Lista from './ListaItens'
import HomeScreen from './routes'
import React,{Component} from 'react'
import { View, Button, Text, TextInput, StyleSheet, ToastAndroid} from 'react-native'
import axios from 'axios'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

class Inventario extends Component {
    static navigationOptions = {
        title: "Inventario"
    }

    constructor(props) {
        super(props);
        this.state = {
            inv: '',
            modal: false
        }
    }

    verificaInventario(numero){
        axios.post('http://192.168.101.115/inventario/verifica_inventario.php',{numero})
        .then(response => {
            //this.setState({ descricao: response.data.descricao, status: response.data.status});
            //alert(`${this.state.descricao}`)
            //ToastAndroid.show(`${this.state.descricao}`, ToastAndroid.SHORT);
            //alert('pelo menos foi!')
            switch(response.data.retorno){
                case 'nn':
                    ToastAndroid.show('Inventario não encontrado!', ToastAndroid.SHORT);
                    break

                case 'in':
                    ToastAndroid.show('Inventario inativo!', ToastAndroid.SHORT);
                    break

                default:
                    ToastAndroid.show('Inventario encontrado e ativo!', ToastAndroid.SHORT);
                    this.props.navigation.navigate('Home',{numero: this.state.inv})
            }
            /*
            if(response.data.retorno === 'nn'){
                ToastAndroid.show('Inventario não encontrado ou inativo!', ToastAndroid.SHORT);
            }else{
                if(response.data.retorno === 'in'){

                }
                ToastAndroid.show('Inventario encontrado!', ToastAndroid.SHORT);
                this.props.navigation.navigate('Home',{numero: this.state.inv})
            }
            */
        })
        .catch(error => {
            alert(error);
        })
    }
    render() {
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Entre com o numero do Inventario</Text>
                <TextInput
                    style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(inv)=>{this.setState({inv: inv})}}
                    keyboardType={'numeric'}
                    value={this.state.inv}                
                />
                <Button
                    title="Entrar"
                    style={styles.button}
                    onPress={() =>{
                    //this.props.navigation.push({ mat: this.state.texto ,secao: this.state.setext })
                    this.verificaInventario(this.state.inv);
                    /*
                        if(this.state.texto === ''){
                            ToastAndroid.show('Formulario Incompleto!', ToastAndroid.SHORT);
                        }else{
                            this.props.navigation.navigate('Home',{numero: this.state.inv})
                        }*/
                    }}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: '#2c3539',
      padding: 20,
      width:300,
      marginTop:16,
      color: "#ffffff",
    }  
})

const appNavi = createStackNavigator({
    Inventario: {
        screen: Inventario
    },
    Home: {
        screen: HomeScreen
    },
    Scanner:{
        screen: App
    },
    Lista:{
        screen: Lista
    }
    
  })
  
  const AppCont = createAppContainer(appNavi);
  
  export default class Routes extends Component{
    render(){
        return <AppCont/>
    }
  }

  //const AppCont = createAppContainer(appNavi);