/**
 * TailorMe App
 * @format
 */

import React, { useState } from 'react';
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
import NotificationScreen from './NotificationScreen';

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
  Notification: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenStatusBarConfig: Record<
  keyof RootStackParamList,
  { barStyle: 'dark-content' | 'light-content'; backgroundColor: string }
> = {
  Splash: { barStyle: 'dark-content', backgroundColor: '#FFFFFF' },
  Login: { barStyle: 'dark-content', backgroundColor: '#FFFFFF' },
  SignUp: { barStyle: 'dark-content', backgroundColor: '#FFFFFF' },
  OTP: { barStyle: 'light-content', backgroundColor: '#FFB200' },
  ForgotPassword: { barStyle: 'dark-content', backgroundColor: '#F6F6F6' },
  Home: { barStyle: 'light-content', backgroundColor: '#FFB200' },
  EditProfile: { barStyle: 'light-content', backgroundColor: '#FFB200' },
  ProductDetails: { barStyle: 'dark-content', backgroundColor: '#FFFFFF' },
  TailorProfile: { barStyle: 'light-content', backgroundColor: '#FFB200' },
  Payment: { barStyle: 'dark-content', backgroundColor: '#FFFFFF' },
  Summary: { barStyle: 'dark-content', backgroundColor: '#FFFFFF' },
  Notification: { barStyle: 'light-content', backgroundColor: '#FFB200' },
};

function App() {
  const [statusBarStyle, setStatusBarStyle] = useState<'dark-content' | 'light-content'>('dark-content');
  const [statusBarBg, setStatusBarBg] = useState('#FFFFFF');

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={statusBarStyle} backgroundColor={statusBarBg} translucent={false} />
      <NavigationContainer
        onStateChange={(state) => {
          const routeName = state?.routes[state.index]?.name as keyof RootStackParamList | undefined;
          if (routeName && screenStatusBarConfig[routeName]) {
            setStatusBarStyle(screenStatusBarConfig[routeName].barStyle);
            setStatusBarBg(screenStatusBarConfig[routeName].backgroundColor);
          }
        }}
      >
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animationEnabled: true,
            animationTypeForReplace: 'pop',
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                },
              };
            },
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 500,
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 500,
                },
              },
            },
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
          <Stack.Screen name="Notification" component={NotificationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
