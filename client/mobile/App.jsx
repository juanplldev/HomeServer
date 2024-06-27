// Dependencies
import React, {useEffect} from "react";
import {StyleSheet, View, Button, Alert, Text} from "react-native";
// Files
import {initBackupTask} from "./utils/backgroundTasks";
import {handleBackup} from "./utils/handleBackup";


export default function App()
{
    useEffect(() => {
        console.log("restarted");
        
        initBackupTask();
    }, []);
    
    return (
        <View style={styles.container}>
            <Button title="Backup" onPress={handleBackup}/>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});