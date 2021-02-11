//This is an example code to Scan QR code//
import React, { Component } from 'react';
//import react in our code.
import { Text, View, Linking, TouchableHighlight, PermissionsAndroid, Platform, StyleSheet, TextInput, ToastAndroid, Modal } from 'react-native';
// import all basic components
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
//import { bold } from 'ansi-colors';
import  Matricula from './src/components/Matricula'
//import ModalQt from './src/components/Modal'
import axios from 'axios'
import NetInfo from "@react-native-community/netinfo";
import Arquivo from './src/components/Arquivo'

var RNFS = require('react-native-fs');
export default class App extends Component {
  static navigationOptions = {
    title: "Scanner"
  }

  constructor(props) {
    super(props);
    this.state = {
      //variable to hold the qr value
      descricao: '',
      qtext: '',
      qrvalue: '',
      opneScanner: false,
      lista: [],
      mat: this.props.navigation.state.params.mat, 
      secao: this.props.navigation.state.params.secao,
      numero: this.props.navigation.state.params.numero,
      modal: false,
      focus: true,
      qtfocus: false
    };
  }
  edita = () =>{
    this.setState({ean: this.state.text})
    ToastAndroid.show(`${this.state.descricao}`, ToastAndroid.SHORT);
    //alert(this.state.ean)
    this.setState({descricao: <Arquivo ean={this.state.ean} />})
  }
  conectado = () => {
    NetInfo.fetch().then(state => {
      //console.log("Connection type", state.type);
      //console.log("Is connected?", state.isConnected);
      ToastAndroid.show(`Conectado? ${state.isConnected}, Tipo ${state.type}`, ToastAndroid.SHORT);
      if(state.isConnected){
        this.setState({connected: 'conectado'})
      }else{
        this.setState({connected: 'disconected'})
      }
    });
    console.log(this.state.connected);
  }

  getDescItem(qrv){
      axios.post('http://192.168.101.115/inventario/desc_item.php',{item: qrv})
      .then(response => {
          this.setState({ descricao: response.data.descricao, status: response.data.status});
          //alert(`${this.state.descricao}`)
          ToastAndroid.show(`${this.state.descricao}`, ToastAndroid.SHORT);
          //alert('pelo menos foi!')
      })
      .catch(error => {
          alert(error);
      })
    
  }
  
  onAddItem = () => {
    if(this.state.qrvalue == '' || this.state.qtext == ''){
      ToastAndroid.show('Formulario incompleto.', ToastAndroid.SHORT);
    }else{
      this.setState(state => {
        this.state.lista.push({codbarra: this.state.qrvalue, qtd: this.state.qtext, desc: this.state.descricao});
        //this.state.qt.push(this.state.qtext);
        //this.state.lista.push(this.state.qrvalue)
        alert(`Código adicionado: \n ${this.state.lista[this.state.lista.length - 1].codbarra} \n
                Quantidade: ${this.state.lista[this.state.lista.length - 1].qtd}`);
        //alert(this.state.lista)
        //alert(`Quantidade: ${this.state.text}`)
        return{
          setext: '',
          qrvalue: '',
          qtext: '',
          descricao: '',
          connected: '',
          modal: false,
          focus: true,
          qtfocus: false
        }
      })
      
    }
  }
  onOpenlink() {
    //Function to open URL, If scanned 
    Linking.openURL(this.state.qrvalue);
    //Linking used to open the URL in any browser that you have installed
  }
  
  onBarcodeScan(qrvalue) {
    //called after te successful scanning of QRCode/Barcode
    this.setState({ qrvalue: qrvalue });
    this.setState({ opneScanner: false });
    //this.getDescItem(qrvalue);
    
    //var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    //saveAs(blob, "hello world.txt");
  }
  addedItem = () => {
    this.onAddItem
    ToastAndroid.show('Lista Preenchida.', ToastAndroid.SHORT);
    
  }
  complete(qrvalue){
    this.getDescItem(qrvalue);
    this.setState({modal: true})
  }

  onOpneScanner() {
    var that =this;
    //To Start Scanning
    if(Platform.OS === 'android'){
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,{
              'title': 'CameraExample App Camera Permission',
              'message': 'CameraExample App needs access to your camera '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If CAMERA Permission is granted
            that.setState({ qrvalue: '' });
            that.setState({ opneScanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err",err);
          console.warn(err);
        }
      }
      //Calling the camera permission function
      requestCameraPermission();
    }else{
      that.setState({ qrvalue: '' });
      that.setState({ opneScanner: true });
    }    
  }
  render() {
    let displayModal;
    //const mat = () =>this.setState(this.state.lista.push({mat: this.props.navigation.state.params}));
    /*
    if(this.state.modal){
      return(
        
     )
    }*/
    //If qrvalue is set then return this view
    if (!this.state.opneScanner) {
      return (
        
        <View style={styles.container}>
          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
           <View style={styles.container}>
            <Text>Código: {this.state.qrvalue}</Text>
            <Text>Quantidade: {this.state.qtext}</Text>
            <Text style={styles.padd}>Entre com a quantidade:</Text>
                <TextInput
                  style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
                  autoFocus={true}
                  onChangeText={(qtext) => this.setState({qtext})}
                  value={this.state.qtext ? this.state.qtext : ''}
                  keyboardType={'numeric'}
                />
                <TouchableHighlight
                  onPress={this.onAddItem}
                  style={styles.button}>
                    <Text style={{color: '#FFFFFF', fontSize: 12}}>
                      Add a Lista
                    </Text>
                </TouchableHighlight>
          </View>
        </Modal>
            <Text style={styles.heading}>Entre com o codigo de barras</Text>
            <Text>Inventario: {this.state.numero}</Text>
            <Matricula matricula={this.state.mat} />
            <Text>Seção: {this.state.secao}</Text>
            
            <Text style={styles.padd}>Codigo de Barras</Text>
            <TextInput
              style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
              autoFocus={this.state.focus}
              onChangeText={(qrvalue)=>{
                this.setState({qrvalue})
                if(qrvalue.length == 13){
                  this.complete(qrvalue);
                  this.setState({focus: false, qtfocus: true})
                }
              }}
              value={this.state.qrvalue ? this.state.qrvalue : ''}
              keyboardType={'numeric'}
            />
            <Text style={styles.simpleText}>{this.state.descricao ? 'Produto Escaneado: \n'+this.state.descricao : ''}</Text>
            {this.state.qrvalue.includes("http") ? 
              <TouchableHighlight
                onPress={() => this.onOpenlink()}
                style={styles.button}>
                  <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Open Link</Text>
              </TouchableHighlight>
              : null
            }
            <TouchableHighlight
              onPress={() => this.onOpneScanner()}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                Escanear
                </Text>
            </TouchableHighlight>
            
            <TouchableHighlight
              onPress={() =>{
                if(this.state.lista.length > 0){
                  this.props.navigation.navigate('Lista',{lista: this.state.lista, mat: this.state.mat, secao: this.state.secao,numero: this.state.numero})
                }else{
                  ToastAndroid.show('Erro: Lista Vazia!', ToastAndroid.LONG);
                }
              }}
              style={styles.button}>
                <Text style={{color: '#FFFFFF', fontSize: 12}}>
                 Exibir Lista
                </Text>
            </TouchableHighlight>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <CameraKitCameraScreen
          showFrame={false}
          //Show/hide scan frame
          scanBarcode={true}
          //Can restrict for the QR Code only
          laserColor={'blue'}
          //Color can be of your choice
          frameColor={'yellow'}
          //If frame is visible then frame color
          colorForScannerFrame={'black'}
          //Scanner Frame color
          onReadCode={event =>
            this.onBarcodeScan(event.nativeEvent.codeStringValue)
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2c3539',
    padding: 10,
    width:300,
    marginTop:16
  },
  heading: { 
    color: 'black', 
    fontSize: 24, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 30 
  },
  simpleText: { 
    color: 'black', 
    fontSize: 20, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 10
  },
  padd:{
    paddingTop: 15
  },
  matric:{
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10,
  }
});