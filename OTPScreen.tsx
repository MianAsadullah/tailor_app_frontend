/**
 * OTP Verification Screen
 * @format
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Otp1Svg from './img/otp1.svg';
import { ArrowLeft } from 'lucide-react-native';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  OTP: { phone: string };
  Home: undefined;
};

type OTPScreenRouteProp = RouteProp<RootStackParamList, 'OTP'>;
type OTPScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OTP'
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

// OTP illustration (otp1.svg: 258×307)
const Otp1Icon = ({ size = 140, opacity = 1 }) => (
  <SvgIcon
    SvgComponent={Otp1Svg}
    size={size}
    opacity={opacity}
    aspectRatio={258 / 307}
  />
);

const OTPScreen = () => {
  const navigation = useNavigation<OTPScreenNavigationProp>();
  const route = useRoute<OTPScreenRouteProp>();
  const phone = route.params?.phone || '';

  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Format phone for display (e.g. +91-8976500001)
  const displayPhone = phone
    ? phone.startsWith('+')
      ? phone
      : `+91-${phone}`
    : '+91-8976500001';

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} Sec`;
  };

  const handleOtpChange = (value: string, index: number) => {
    const digit = value.replace(/[^0-9]/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const code = otp.join('');
    console.log('OTP submitted:', code);
    navigation.navigate('Home');
  };

  const handleResend = () => {
    if (!canResend) return;
    console.log('Resend OTP to:', phone);
    setTimer(120);
    setCanResend(false);
    setOtp(['', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header - White section with back + logo */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={24} color="#190152" strokeWidth={2} />
          </TouchableOpacity>
        </View>
        <Otp1Icon size={220} />
      </View>

      {/* Content - Mint green section */}
      <View style={styles.content}>
        <Text style={styles.title}>OTP VERIFICATION</Text>
        <Text style={styles.instruction}>
          Enter the OTP sent to -{' '}
          <Text style={styles.phoneBold}>{displayPhone}</Text>
        </Text>

        <View style={styles.otpRow}>
          {[0, 1, 2, 3].map(index => (
            <TextInput
              key={index}
              ref={el => {
                inputRefs.current[index] = el;
              }}
              style={styles.otpInput}
              value={otp[index]}
              onChangeText={value => handleOtpChange(value, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        <Text style={styles.timer}>{formatTime(timer)}</Text>

        <Text style={styles.resendText}>
          Don't receive code?{' '}
          <Text
            style={[styles.resendLink, !canResend && styles.resendDisabled]}
            onPress={handleResend}
          >
            Re-send
          </Text>
        </Text>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFB200',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
  },
  headerRow: {
    position: 'absolute',
    top: 48,
    left: 24,
    zIndex: 1,
  },
  backBtn: {
    padding: 8,
  },
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  instruction: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 24,
  },
  phoneBold: {
    fontWeight: 'bold',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  otpInput: {
    width: 54,
    height: 54,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  timer: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 16,
  },
  resendText: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 32,
  },
  resendLink: {
    fontWeight: 'bold',
    color: '#000000',
  },
  resendDisabled: {
    color: '#999999',
  },
  submitButton: {
    backgroundColor: '#FFB200',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OTPScreen;
