import React,{Component} from 'react'
import {Text} from 'react-native'

var RNFS = require('react-native-fs');

export default class Arquivo extends Component {
    constructor(props){
        super(props);

        this.state = {
            conteudo : 'nada ainda'
        }
    }

    readFile = async (filename,ean) => {
        var path = RNFS.ExternalStorageDirectoryPath + '/Download/' + filename;
        
        var content = await RNFS.readFile(path, 'ascii');
        var pos = content.indexOf(ean)
        this.setState({conteudo: content.substring(pos,pos+40)})
        //this.setState({conteudo: content})
        //alert(content.indexOf('mais'))
    }

    componentDidMount() {
        if(this.props.ean.length > 0)
        this.readFile('invent.txt',this.props.ean)
    }
    componentDidUpdate(){
        if(this.props.ean.length > 0)
        this.readFile('invent.txt',this.props.ean)
    }
    render(){
        return(
        <Text>{this.state.conteudo}</Text>
        )
    }
}