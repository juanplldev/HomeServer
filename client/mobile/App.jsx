// Dependencies
import React, {useEffect} from "react";
import {StyleSheet, View, Button} from "react-native";
// Files
import {initBackupTask} from "./utils/handleTasks";
import {handleBackupUpload} from "./utils/handleBackupUpload";


export default function App()
{
    useEffect(() => {
        initBackupTask();
    }, []);
    
    return (
        <View style={styles.container}>
            <Button title="Backup" onPress={async () => await handleBackupUpload()}/>
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