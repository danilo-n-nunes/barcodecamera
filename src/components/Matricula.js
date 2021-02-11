import React from 'react'
import {Text} from 'react-native'

function Matricula(props) {
    return <Text>Matricula, {props.matricula || "Indefinida"}</Text>;
  }

export default Matricula;