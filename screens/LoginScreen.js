import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  StyleSheet,
  Pressable,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  UIManager,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../src/App';
import {f} from '../assets/data/fonts';
import {color} from '../assets/data/colors';
import Snackbar from 'react-native-snackbar';
import { ScrollView } from 'react-native-gesture-handler';

const {height,width} = Dimensions.get('screen');
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useContext(AuthContext);

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const handleLogin = async () => {
    // Check if email exists in the database
    const isValidUser = email === 'ranbeersingh0520@gmail.com' && password === '1234';

    if (isValidUser) {
      const userData = {email};
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } else {
      Snackbar.show({
        text: 'The user is not registered',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? 'position' : "height"} style={styles.container}>
      <StatusBar backgroundColor={color.bg} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.wrapper}>
      <Text style={styles.indicator}>Email</Text>
      <TextInput
        onChangeText={setEmail}
        value={email}
        style={styles.inputField}
        keyboardType='email-address'
        autoCapitalize='none'
        selectionColor={'#7D7D7D'}
      />
      <Text style={styles.indicator}>Password</Text>
      <TextInput
        onChangeText={setPassword}
        value={password}
        style={styles.inputField}
        secureTextEntry={true}
        autoCapitalize='none'
        selectionColor={'#7D7D7D'}

      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </Pressable>
      </View>
      </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
 
  inputField: {
    borderWidth: 1,
    borderColor: color.accent,
    borderRadius: 10,
    height :43,
    width : '100%',
    color: '#fff',
    padding:12
  },
  button: {
    backgroundColor: color.accent,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    width : '100%'

  },
  buttonText: {
    fontFamily: f.m,
    fontWeight: 'bold',
    color: color.text,
    fontSize: 16,
    textAlign: 'center',
  },
  container: {flex: 1, backgroundColor: color.bg, padding: 16},
  indicator: {fontFamily: f.s, color: '#fff', marginBottom: 6,marginTop:6},
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    top : -40
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: color.bg,
  },
});

export default LoginScreen;
