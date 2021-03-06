import React, { Component } from 'react'
import {connect} from 'refnux'

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Vibration,
} from 'react-native'

import Camera from 'react-native-camera'

import addToken from '../action/add-token'

export default connect((state, dispatch) => {
  const {navigator} = state

  // setTimeout(()=>{
  //   Vibration.vibrate()
  //   navigator.pop()
  //   dispatch(addToken('otpauth://totp/Example:amy@google.com?secret=JBSWY3DKEHPK3PXP&issuer=Example'))
  // }, 1000)

  // we keep track of the first onBarCodeRead since
  // we get flooded with such callbacks.
  var onceIsEnough = false

  return (
    <Camera
      style={{flex:1, alignItems: 'center'}}
      onBarCodeRead={(ev) => {
        if (onceIsEnough) {
          return
        }
        onceIsEnough = true
        const url = ev.data
        Vibration.vibrate()
        navigator.pop()
        dispatch(addToken(url))
      }} >
      <View style={{
              flex:1,
              alignItems:'center',
              justifyContent:'center',
              backgroundColor:'transparent'
            }}>
        <View style={{
                height: 300,
                width: 300,
                borderWidth: 1,
                borderColor: '#ffd500',
                backgroundColor: 'transparent'
              }}/>
      </View>
    </Camera>
  )

})
