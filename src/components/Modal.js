import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, StyleSheet,TextInput} from 'react-native';

class ModalQt extends Component {
  constructor(props){
      super(props);
      this.state = {
        modalVisible: this.props.modal,
        nome: this.props.nome,
        qtext: ''
      };
  }
  

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.container}>
          <Text style={styles.padd}>{this.state.nome}</Text>
                <Text style={styles.padd}>Entre com a quantidade:</Text>
                <TextInput
                style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(qtext) => this.setState({qtext})}
                value={this.state.qtext ? this.state.qtext : ''}
                keyboardType={'numeric'}
                />
                <TouchableHighlight
                    onPress={()=>setState({mat: '222'})}
                    style={styles.button}>
                    <Text style={{color: '#FFFFFF', fontSize: 12}}>
                   Enviar
                    </Text>
                </TouchableHighlight>

              <TouchableHighlight
                style={styles.button}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={{color: '#FFFFFF', fontSize: 12}}>
                   Cancelar
                </Text>
              </TouchableHighlight>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
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
})
export default ModalQt