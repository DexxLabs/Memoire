import React, { useState, useEffect, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import { View } from 'react-native';
import { color } from '../assets/data/colors';
import Note from '../screens/Note';

// Auth Context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkLoginStatus = async () => {
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser){
      setUser(JSON.parse(storedUser));
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Auth Stack (For Login)
const AuthStack = createStackNavigator();
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
  </AuthStack.Navigator>
);

// App Stack (For Logged-in Users)
const AppStack = createStackNavigator();
const AppNavigator = () => (
  <AppStack.Navigator screenOptions={{ headerShown: false }}>
    <AppStack.Screen name="Main" component={MainScreen} />
    <AppStack.Screen name="Note" component={Note}/>
  </AppStack.Navigator>
);

// Root Navigator (Decides which stack to show)
const RootNavigator = () => {
  const { user } = useContext(AuthContext);
  return user ? <AppNavigator /> : <AuthNavigator />;
};

// App Component
export default function App() {
  return (
    <View style={{flex:1,backgroundColor:color.bg}}>
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
    </View>
  );
}
