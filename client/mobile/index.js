/**
 * @format
 */

import {AppRegistry} from 'react-native';
import BackgroundFetch from "react-native-background-fetch";
import notifee from "@notifee/react-native";
import App from './App';
import {name as appName} from './app.json';
import {backupHeadlessTask} from "./utils/handleTasks";

notifee.onBackgroundEvent(async ({type, detail}) => {
    return;
});

AppRegistry.registerComponent(appName, () => App);
BackgroundFetch.registerHeadlessTask(backupHeadlessTask);