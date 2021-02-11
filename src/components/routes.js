import App from '../../App'
import Requisitos from './Requisitos'
import Lista from './ListaItens'
import Inventario from "./Inventario"
import React,{ Component } from 'react'
import { View,Button,Text, TextInput, StyleSheet, ToastAndroid } from 'react-native'


export default class HomeScreen extends Component {
  static navigationOptions = {
    title: "Home"
  }
  constructor(props) {
    super(props);
    this.state = {
      texto: '',
      setext: '',
      numero: this.props.navigation.state.params.numero
    }
  }
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Entre com a Matricula</Text>
          <TextInput
              style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(texto)=>{this.setState({texto: texto})}}
              keyboardType={'numeric'}
              value={this.state.texto}
            />
          <Text>Entre com a Seção</Text>
          <TextInput
              style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(setext)=>{this.setState({setext: setext})}}
              keyboardType={'numeric'}
              value={this.state.setext}
            />
          <Text style={{paddingTop: 10}}>Começar a escanear</Text>
          <Button
            title="Iniciar"
            style={styles.button}
            onPress={() =>{
              //this.props.navigation.push({ mat: this.state.texto ,secao: this.state.setext })
              if(this.state.texto === '' || this.state.setext === ''){
                ToastAndroid.show('Formulario Incompleto!', ToastAndroid.SHORT);
              }else{
                this.props.navigation.navigate('Scanner',{mat: this.state.texto , secao: this.state.setext, numero: this.state.numero})
              }
            }}
          />

        </View>
      );
    }
}
  


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#2c3539',
    padding: 10,
    width:300,
    marginTop:16,
    color: "#ffffff",
  }
})

