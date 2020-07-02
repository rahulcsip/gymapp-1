/**
 * @format
 */
import 'react-native-gesture-handler';
import 'moment';
import 'moment/locale/en-in';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
