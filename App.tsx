/**
 * TailorMe App
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import OTPScreen from './OTPScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import HomeScreen from './HomeScreen';
import EditProfileScreen from './EditProfileScreen';
import ProductDetailsScreen from './ProductDetailsScreen';
import TailorProfileScreen from './TailorProfileScreen';
import PaymentScreen from './PaymentScreen';
import SummaryScreen from './SummaryScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  OTP: { phone: string };
  ForgotPassword: undefined;
  Home: undefined;
  EditProfile: undefined;
  ProductDetails: undefined;
  TailorProfile: { tailorId?: string; tailorName?: string };
  Payment: {
    items: Array<{ id: string; name: string; price: number; qty: number }>;
  };
  Summary: {
    items: Array<{ id: string; name: string; price: number; qty: number }>;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#E0F7EF" 
        translucent={false}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="OTP" component={OTPScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
          <Stack.Screen name="TailorProfile" component={TailorProfileScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="Summary" component={SummaryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
