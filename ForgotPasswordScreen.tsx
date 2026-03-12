/**
 * Forgot Password Screen
 * @format
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ForgotPasswordSvg from './img/forgot_password.svg';
import { ArrowLeft } from 'lucide-react-native';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  OTP: { phone: string };
  ForgotPassword: undefined;
};

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
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

// Illustration (forgot_password.svg: 300×292)
const ForgotPasswordIcon = ({ size = 180, opacity = 1 }) => (
  <SvgIcon
    SvgComponent={ForgotPasswordSvg}
    size={size}
    opacity={opacity}
    aspectRatio={300 / 292}
  />
);

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const [phone, setPhone] = useState('');

  const handleContinue = () => {
    if (!phone.trim()) return;
    navigation.navigate('OTP', { phone: phone.trim() });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={24} color="#190152" strokeWidth={2} />
          </TouchableOpacity>
        </View>
        {/* Illustration - Upper half */}
        <View style={styles.illustrationContainer}>
          <ForgotPasswordIcon size={280} />
        </View>

        {/* Content - Lower half */}
        <View style={styles.content}>
          <Text style={styles.title}>Forgot</Text>
          <Text style={styles.title}>Password?</Text>

          <Text style={styles.description}>
            Don't worry ! It happens. Please enter the phone number we will send
            the OTP in this phone number.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter the phone Number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 8,
  },
  backBtn: {
    padding: 8,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 0,
  },
  description: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
    marginTop: 16,
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000',
    marginBottom: 24,
    minHeight: 50,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  continueButton: {
    backgroundColor: '#FFB200',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
