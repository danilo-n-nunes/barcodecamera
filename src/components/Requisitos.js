import React, {Component} from 'react';
import {View, Text} from 'react-native'
import axios from 'axios';


export default class Requisitos extends Component{

    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
            imageURL: '',
            status: '',
            message: ''
        }
      }

    componentDidMount() {
        let cod = ['7896090703609','7702018072392','7506309857961']
        let qt = ['12','32','20']
        axios.post('http://192.168.101.115/inventario/adiciona_itens.php',{codigo: cod,qtd: qt,mat: '000'})
        .then(response => {
            this.setState({ message: response.data.message, status: response.data.status});
            alert(`${this.state.message}`)
        })
        .catch(error => {
            alert(error);
        });
    }
    render(){
        return(
            <View>
                <Text>{this.state.message}</Text>
            </View>
        );
    }
}

    