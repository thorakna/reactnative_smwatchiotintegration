import React, { useRef, useEffect, useState } from 'react';
import {StyleSheet, View, Text, StatusBar, Animated, Easing, TouchableOpacity, ScrollView, PermissionsAndroid} from 'react-native';

import contentShower from './src/components/contentShower';

const App: () => React$Node = () => {
  const animt = useRef(new Animated.Value(0)).current;
  const animt2 = useRef(new Animated.Value(0)).current;
  const animt3 = useRef(new Animated.Value(0)).current;
  const animle = useRef(new Animated.Value(0)).current;
  const animble = useRef(new Animated.Value(0)).current;

  const [isWelcome, setWelcome] = useState(true);
  const [isConnected, setConnected] = useState(false);
  const [rolebir, setRolebir] = useState(false);
  const [roleiki, setRoleiki] = useState(false);

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
      duration: 1000,
      easing: Easing.elastic(),
      useNativeDriver: true
    }).start();
    Animated.timing(animle, {
      toValue: 1,
      delay: 1500,
      duration: 500,
      useNativeDriver: true
    }).start();
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
  });

  const geriAl = () =>{
    Animated.timing(animt, {
      toValue: 0,
      delay: 800,
      duration: 500,
      useNativeDriver: true
    }).start(()=>{
      setWelcome(false);
      getir();
      setTimeout(()=>{
        setConnected(true);
      }, 2000);
    });
    Animated.timing(animt2, {
      toValue: 0,
      delay: 500,
      duration: 600,
      useNativeDriver: true
    }).start();
    Animated.timing(animt3, {
      toValue: 0,
      delay: 200,
      duration: 1000,
      easing: Easing.elastic(),
      useNativeDriver: true
    }).start();
    Animated.timing(animle, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();
  }



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
                geriAl();
              }} style={{borderRadius: 10, paddingHorizontal: 40, paddingVertical:15, backgroundColor:'black'}}>
                <Text style={styles.shadowlutext}>Start</Text>
              </TouchableOpacity>
            </View>
          :
            isConnected ? 
            <View style={styles.content}>
              <TouchableOpacity onPress={()=>{
                if(rolebir){
                  setRolebir(false);
                }else{
                  setRolebir(true);
                }
              }} style={{borderRadius: 10, paddingHorizontal: 40, paddingVertical:15, marginBottom:20, backgroundColor:rolebir ? 'red' : 'green'}}>
                <Text style={styles.shadowlutext}>{rolebir ? 'Röle 1 Kapa' : 'Röle 1 Aç'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{
                if(roleiki){
                  setRoleiki(false);
                }else{
                  setRoleiki(true);
                }
              }} style={{borderRadius: 10, paddingHorizontal: 40, paddingVertical:15, backgroundColor:roleiki ? 'red' : 'green'}}>
                <Text style={styles.shadowlutext}>{roleiki ? 'Röle 2 Kapa' : 'Röle 2 Aç'}</Text>
              </TouchableOpacity>
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
  }
});

export default App;
