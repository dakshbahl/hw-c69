import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'



export default class App extends React.Component{

  constructor(){
    super()
    this.state ={
      hasCameraPermissions: null,
      scanner:false,
      scannedData:"",
      buttonState:"normal"
    }
  }

  getCameraPermissions=async()=>{
    const{status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermissions:status == "granted",
      buttonState:"clicked",
      scanned:false
    })
  }

  handleBarCodeScanned=async({type, data})=>{
    this.setState({
      scanned:true,
      scannedData:data,
      buttonState:"normal"
    })
  }

  render(){

    const hasCameraPermissions = this.state.hasCameraPermissions
    const scanned = this.state.scanned
    const buttonState = this.state.buttonState

    if(buttonState === "clicked" && hasCameraPermissions){
      return(
        <BarCodeScanner
        onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
        style ={StyleSheet.absoluteFillObject}
        />
      )
    }
    else if(buttonState === "normal"){
      return(
        <View style ={styles.container}>
          <View>
             <Image source={require('./assets/barCodeIMG.png')} style ={styles.Img}/>
          </View>
          <Text style ={styles.headerText}>
           Bar Code Scanner
          </Text>
          <Text style ={styles.displayText}>
            {hasCameraPermissions === true?this.state.scannedData:"Please Request Camera Permission"}
          </Text>
          <TouchableOpacity onPress={()=>{
            this.getCameraPermissions()
          }}
           style={styles.scannedButton}
          >
            <Text  style ={styles.buttonText}>
             Scan Barcode
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

  displayText:{
    fontSize:15,
    textDecorationLine: "underline"

  },

  scannedButton:{
    backgroundColor:"grey",
    margin:10,
    padding:10
  },

  buttonText:{
    fontSize:15,
    textDecorationLine:"underline"
  },

  Img:{
    margin:20,
    
  },

  headerText:{
    fontSize:24,
    padding:10,
    fontWeight:"bold",
    fontFamily:"Times"
  }

})

















