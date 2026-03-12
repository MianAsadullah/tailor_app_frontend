/**
 * Splash Screen Component
 * @format
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SewingMachineSvg from './img/sewing-machine.svg';
import Courier2Svg from './img/courier2.svg';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
};

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

// Reusable SVG Icon Component
interface SvgIconProps {
  SvgComponent: React.ComponentType<{ width: number; height: number }>;
  size: number;
  opacity?: number;
  aspectRatio: number;
}

const SvgIcon = ({
  SvgComponent,
  size,
  opacity = 1,
  aspectRatio,
}: SvgIconProps) => {
  const calculatedHeight = size / aspectRatio;
  return (
    <View style={{ width: size, height: calculatedHeight, opacity }}>
      <SvgComponent width={size} height={calculatedHeight} />
    </View>
  );
};

// Sewing machine icon component
const SewingMachineIcon = ({ size = 60, opacity = 1 }) => (
  <SvgIcon
    SvgComponent={SewingMachineSvg}
    size={size}
    opacity={opacity}
    aspectRatio={314 / 300}
  />
);

// Courier logo component (courier2.svg: 292×157)
const CourierLogo = ({ size = 60, opacity = 1 }) => (
  <SvgIcon
    SvgComponent={Courier2Svg}
    size={size}
    opacity={opacity}
    aspectRatio={292 / 157}
  />
);

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    // Navigate to Login screen after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.borderContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <View style={styles.logoRow}>
            <CourierLogo size={300} />
          </View>
        </View>
        <View style={styles.backgroundMachineContainer}>
          <SewingMachineIcon size={680} opacity={1} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  borderContainer: {
    flex: 1,
    width: width,
    height: height,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: '#FFFFFF',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  logoContainer: {
    position: 'absolute',
    top: '28%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundMachineContainer: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});

export default SplashScreen;
