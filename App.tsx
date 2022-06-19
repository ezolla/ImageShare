import React, { useState } from 'react'
import styled from 'styled-components/native'
import { StatusBar } from 'expo-status-bar'
import { Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'

import logo from './assets/logo.png'

export default function App() {
  const [selectedImage, setSelectedImage] = useState<Record<
    string,
    any
  > | null>(null)

  const openImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!')
      return
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    if (pickerResult.cancelled) {
      return
    }

    setSelectedImage({ localUri: pickerResult.uri })
  }

  const openShareDialog = async () => {
    if (Platform.OS === 'web') {
      alert(`Uh oh, sharing isn't available on your platform`)
      return
    }

    await Sharing.shareAsync(selectedImage?.localUri)
  }

  if (selectedImage) {
    return (
      <Container>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={{ width: 300, height: 300, resizeMode: 'contain' }}
        />
        <Button onPress={openShareDialog}>
          <ButtonText>Share this photo</ButtonText>
        </Button>
      </Container>
    )
  }

  return (
    <Container>
      <Image source={logo} style={{ width: 305, height: 159 }} />
      <Message>
        To share a photo from your phone with a friend, just press the button
        below!
      </Message>
      <Button onPress={openImagePicker}>
        <ButtonText>Pick a photo</ButtonText>
      </Button>
      <StatusBar style='auto' />
    </Container>
  )
}

const Container = styled(View)`
  flex: 1;
  background: white;
  align-items: center;
  justify-content: center;
`

const Message = styled(Text)`
  font-size: 18px;
  color: #888888;
`

const Button = styled(TouchableOpacity)`
  background: blue;
  padding: 20px;
  border-radius: 5px;
`

const ButtonText = styled(Text)`
  font-size: 20px;
  color: white;
`
