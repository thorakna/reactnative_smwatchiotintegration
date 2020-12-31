import React, { useRef, useEffect } from 'react';
import {StyleSheet, View, Text, StatusBar, Animated, Easing, TouchableOpacity} from 'react-native';

const App: () => React$Node = () => {
  const animt = useRef(new Animated.Value(0)).current;
  const animt2 = useRef(new Animated.Value(0)).current;
  const animt3 = useRef(new Animated.Value(0)).current;
  const animle = useRef(new Animated.Value(0)).current;

  useEffect(()=>{
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
  }, [animt, animt2, animt3, animle]);
  return (
    <>
      <StatusBar backgroundColor={'white'} barStyle="light-content" />
      <View style={styles.smbody}>
        <Animated.View style={[styles.smfaceA, {transform:[{scale: animt}], backgroundColor:'#00458f'}]}></Animated.View>
        <Animated.View style={[styles.smfaceA, {transform:[{scale: animt2}], backgroundColor:'#005cbf'}]}></Animated.View>
        <Animated.View style={[styles.smfaceA, {transform:[{scale: animt3}], backgroundColor:'#007aff',}]}></Animated.View>
        <Animated.View style={[styles.smfaceA, {opacity: animle}]}>
          <Text style={[styles.shadowlutext, {fontSize:40}]}>Onur YAŞAR</Text>
          <Text style={[styles.shadowlutext, {fontSize:15, marginBottom: 20}]}>Smartwatch IOT Integration App</Text>
          <TouchableOpacity onPress={()=>{}} android_ripple={true} style={{borderRadius: 10, paddingHorizontal: 40, paddingVertical:15, backgroundColor:'black'}}>
            <Text style={styles.shadowlutext}>Start</Text>
          </TouchableOpacity>
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
  },
  smfaceA:{
    position:'absolute',
    width:'100%',
    height:400,
    borderRadius:200,
    alignItems:'center',
    justifyContent:'center'
  },
  shadowlutext:{
    color:'white',
    textShadowColor:'rgba(0, 0, 0, 0.5)',
    textShadowRadius:5,
    textShadowOffset:{width: 2, height: 2}
  }
});

export default App;
