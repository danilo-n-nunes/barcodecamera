/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';
import {name as appName} from './app.json';
//import FetchExample from './FetchExample';
//import Requisitos from './Requisitos';

//import Routes from './src/components/routes'
import Inventario from './src/components/Inventario'
//import Page1 from './src/components/Page1'

AppRegistry.registerComponent(appName, () => Inventario);
