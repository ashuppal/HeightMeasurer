import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [height, setHeight] = useState(0);
  const [measuring, setMeasuring] = useState(false);

  useEffect(() => {
    Accelerometer.setUpdateInterval(1000);
  }, []);

  const startMeasuring = () => {
    setMeasuring(true);
    Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });
  };

  const stopMeasuring = () => {
    setMeasuring(false);
    Accelerometer.removeAllListeners();
    const g = 9.81; // Earth's gravity in m/s²
    const time = Math.sqrt((2 * Math.abs(data.z)) / g);
    const heightInMeters = 0.5 * g * Math.pow(time, 2);
    setHeight(heightInMeters.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode='cover'
        source={require('./assets/height.jpg')}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Height Measurer</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={measuring ? stopMeasuring : startMeasuring}
          >
            <Text style={styles.buttonText}>{measuring ? 'Stop' : 'Start'}</Text>
          </TouchableOpacity>
          {!measuring && height > 0 && (
            <Text style={styles.result}>Height: {height} meters</Text>
          )}
        </View>
        <View style={styles.footer}>
          <Text style={styles.instructions}>
            Move your phone and measure the height.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
  
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  instructions: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#1e88e5',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  result: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: 'rgba(244, 67, 54, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    width: '100%',
  },
});
