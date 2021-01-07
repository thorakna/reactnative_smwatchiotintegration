import React, { useRef, useEffect, useState } from 'react';
import {StyleSheet, View, Text, StatusBar, Animated, Easing, TouchableOpacity, ScrollView, PermissionsAndroid, Image, BackHandler} from 'react-native';
import Wol from 'react-native-wol';
import RNBluetoothClassic, { BluetoothEventType, BluetoothDevice } from 'react-native-bluetooth-classic';
import contentShower from './src/components/contentShower';

const App: () => React$Node = () => {
  const animt = useRef(new Animated.Value(0)).current;
  const animt2 = useRef(new Animated.Value(0)).current;
  const animt3 = useRef(new Animated.Value(0)).current;
  const animle = useRef(new Animated.Value(0)).current;
  const animble = useRef(new Animated.Value(0)).current;

  const [isWelcome, setWelcome] = useState(true);
  const [isConnected, setConnected] = useState(false);
  const [isChooser, setChooser] = useState(true);
  const [isPage, setPage] = useState(false);
  const [rolebir, setRolebir] = useState(false);
  const [roleiki, setRoleiki] = useState(false);

  const [wolwait, setWolwait] = useState('#3a86fa');

  const getir = () => {
    Animated.timing(animt, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
    Animated.timing(animt2, {
      toValue: 1,
      delay: 200,
      duration: 600,
      useNativeDriver: true
    }).start();
    Animated.timing(animt3, {
      toValue: 1,
      delay: 500,
      duration: 700,
      easing: Easing.elastic(),
      useNativeDriver: true
    }).start();
    Animated.timing(animle, {
      toValue: 1,
      delay: 1200,
      duration: 500,
      useNativeDriver: true
    }).start();
  }

  const geriAl = () =>{
    let prom = new Promise ((resolve, reject) => {
      Animated.timing(animt, {
        toValue: 0,
        delay: 400,
        duration: 500,
        useNativeDriver: true
      }).start(()=>{
        getir();
        resolve(true);
      });
      Animated.timing(animt2, {
        toValue: 0,
        delay: 200,
        duration: 500,
        useNativeDriver: true
      }).start();
      Animated.timing(animt3, {
        toValue: 0,
        delay:200,
        duration: 500,
        easing: Easing.elastic(),
        useNativeDriver: true
      }).start();
      Animated.timing(animle, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start();
    });
    return prom;
  }

  const sendCommand = async (komut) => {
    try {
      var command = await RNBluetoothClassic.writeToDevice('00:20:10:08:E3:02', komut);
      if(command){
        console.log(komut+' komutu yollandı!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connect = async (device) => {
    try {
      let connection = await device.isConnected();
      if (!connection) {
        let connectionOptions = {
          CONNECTOR_TYPE: 'rfcomm',
          SECURE_SOCKET: false,
          DELIMITER: '\n'
        };
        connection = await device.connect(connectionOptions);
        console.log(connection ? 'Connected!' : 'Cant be connected!');
        device.onDataReceived((data) => {
          console.log(data);
        });
        sendCommand('ses');
      }
      setConnected(connection);
    } catch (error) {
      // Handle error accordingly
      console.log(error);
      setConnected(false);
    }
  }

  const roomBul = async () => {
    var enabled = await RNBluetoothClassic.isBluetoothEnabled();
    if(enabled){
      try {
        var devices = await RNBluetoothClassic.getBondedDevices();
        for(i in devices){
          var device = devices[i];
          if(device.bonded && device.name == 'HC-06'){
            console.log('HC-06 Device Id: '+device.id);
            await connect(device);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }else{
      RNBluetoothClassic.requestBluetoothEnabled().then(()=> roomBul);
    }
  }

  useEffect(()=>{
    getir();
    Animated.loop(
      Animated.sequence([
        Animated.timing(animble, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(animble, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        })
      ]),
    ).start();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      ()=>{
        if(isChooser){
          BackHandler.exitApp();
        }else{
          geriAl().then(()=>{
            setChooser(true);
          });
        }
        return true;
      }
    );

    return () => {
      backHandler.remove();
    }
  });



  return (
    <>
      <StatusBar backgroundColor={'white'} barStyle="light-content" />
      <View style={styles.smbody}>
        <Animated.View style={[styles.smfaceA, {transform:[{scale: animt}], backgroundColor:'#00458f'}]}></Animated.View>
        <Animated.View style={[styles.smfaceA, {transform:[{scale: animt2}], backgroundColor:'#005cbf'}]}></Animated.View>
        <Animated.View style={[styles.smfaceA, {transform:[{scale: animt3}], backgroundColor:'#007aff',}]}></Animated.View>
        <Animated.View style={[styles.smfaceA, {opacity: animle}]}>
          {isWelcome ? 
            <View style={styles.content}>
              <Text style={[styles.shadowlutext, {fontSize:30}]}>Onur YAŞAR</Text>
              <Text style={[styles.shadowlutext, {fontSize:12, marginBottom: 15}]}>Smartwatch IOT Integration App</Text>
              <TouchableOpacity onPress={()=>{
                geriAl().then(()=>{
                  setWelcome(false);
                });
              }} style={{borderRadius: 10, paddingHorizontal: 40, paddingVertical:15, backgroundColor:'black'}}>
                <Text style={styles.shadowlutext}>Start</Text>
              </TouchableOpacity>
            </View>
          :
            isChooser ? 
            <View style={[styles.content, {flexDirection:'row'}]}>
              <TouchableOpacity onPress={()=>{
                geriAl().then(()=>{
                  setChooser(false);
                  setPage('room');
                  roomBul();
                });
              }} style={{borderRadius: 10, paddingHorizontal: 10, paddingVertical:5, marginEnd: 20, backgroundColor:'#3a86fa'}}>
                <Image style={styles.roleimage} source={require('./src/images/room.png')} />
                <Text style={[styles.shadowlutext, {fontSize:15, textAlign:'center'}]}>Room</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{
                geriAl().then(()=>{
                  setChooser(false);
                  setPage('computer');
                });
              }} style={{borderRadius: 10, paddingHorizontal: 10, paddingVertical:5, backgroundColor:'#3a86fa'}}>
                <Image style={styles.roleimage} source={require('./src/images/computer.png')} />
                <Text style={[styles.shadowlutext, {fontSize:15, textAlign:'center'}]}>Computer</Text>
              </TouchableOpacity>
            </View>
            :
            isPage == 'computer' ? 
            <View style={styles.content}>
              <Text style={[styles.shadowlutext, {fontSize:20, marginBottom: 15}]}>Computer Control</Text>
              <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={()=>{
                Wol.send("192.168.0.100", "D8:50:E6:4E:55:34", (res, msg) => {
                  if(res){
                    setWolwait('#009944');
                    
                  }else{
                    setWolwait('#cf000f');
                  }
                  setTimeout(()=>{setWolwait('#3a86fa')}, 1000);
                });
              }} style={{borderRadius: 120, paddingHorizontal: 10, paddingVertical:5, backgroundColor:wolwait}}>
                <Image style={styles.roleimage} source={require('./src/images/power.png')} />
              </TouchableOpacity>
              </View>
            </View>
            :
            isPage == 'room' && isConnected ? 
            <View style={styles.content}>
              <Text style={[styles.shadowlutext, {fontSize:20, marginBottom: 15}]}>Room Control</Text>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>{
                  sendCommand('rbir');
                  if(rolebir){
                    setRolebir(false);
                  }else{
                    setRolebir(true);
                  }
                }} style={{borderRadius: 10, paddingHorizontal: 10, paddingVertical:5, marginEnd: 20, backgroundColor:'#3a86fa'}}>
                  <Image style={styles.roleimage} source={rolebir ? require('./src/images/bulbon.png') : require('./src/images/bulboff.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                  sendCommand('riki');
                  if(roleiki){
                    setRoleiki(false);
                  }else{
                    setRoleiki(true);
                  }
                }} style={{borderRadius: 10, paddingHorizontal: 10, paddingVertical:5, backgroundColor:'#3a86fa'}}>
                  <Image style={styles.roleimage} source={roleiki ? require('./src/images/ledon.png') : require('./src/images/ledoff.png')} />
                </TouchableOpacity>
              </View>
            </View>
            :
            <View style={styles.content}>
              <Animated.Image style={[styles.bleimage, {opacity:animble}]} source={require('./src/images/bluetooth.png')} />
            </View>
          }
        </Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  smbody:{
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    backgroundColor:'black'
  },
  smfaceA:{
    position:'absolute',
    width:'100%',
    height:400,
    borderRadius:200,
    alignItems:'center',
    justifyContent:'center'
  },
  content:{
    width:'80%',
    height:'50%',
    backgroundColor: '#005cbf',
    borderRadius:20,
    paddingVertical:20,
    alignItems:'center',
    justifyContent:'center'
  },
  shadowlutext:{
    color:'white',
    textShadowColor:'rgba(0, 0, 0, 0.5)',
    textShadowRadius:5,
    textShadowOffset:{width: 2, height: 2}
  },
  bleimage:{
    width:100,
    height:100,
    resizeMode:'contain'
  },
  roleimage:{
    width:100,
    height:100,
    resizeMode:'contain'
  }
});

export default App;
