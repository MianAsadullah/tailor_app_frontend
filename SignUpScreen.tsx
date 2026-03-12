/**
 * Sign Up Screen Component
 * @format
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Courier2Svg from './img/courier2.svg';
// import { ArrowLeft } from 'lucide-react-native';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
};

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
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

// Courier logo component (courier2.svg: 292×157)
const CourierLogo = ({ size = 60, opacity = 1 }) => (
  <SvgIcon
    SvgComponent={Courier2Svg}
    size={size}
    opacity={opacity}
    aspectRatio={292 / 157}
  />
);

const SignUpScreen = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    panNumber: '',
    address: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateAccount = () => {
    console.log('Create account:', formData);
    // Navigate to login after successful signup
    navigation.navigate('Login');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
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
        <View style={styles.header}>
          <Text style={styles.title}>Sign up!</Text>
          <Text style={styles.instruction}>
            Create account by filling the form below.
          </Text>
        </View>

        <View style={styles.logoContainer}>
          <CourierLogo size={250} />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            placeholderTextColor="#999"
            value={formData.name}
            onChangeText={value => handleInputChange('name', value)}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={value => handleInputChange('email', value)}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={value => handleInputChange('phone', value)}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={formData.password}
            onChangeText={value => handleInputChange('password', value)}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter pan number"
            placeholderTextColor="#999"
            autoCapitalize="characters"
            value={formData.panNumber}
            onChangeText={value => handleInputChange('panNumber', value)}
          />

          <TextInput
            style={styles.input}
            placeholder="Residential Address"
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
            value={formData.address}
            onChangeText={value => handleInputChange('address', value)}
          />

          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateAccount}
          >
            <Text style={styles.createButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Do you have already have account?{' '}
            <Text style={styles.loginLink} onPress={handleLogin}>
              LOGIN
            </Text>
          </Text>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  backBtn: {
    padding: 8,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  instruction: {
    fontSize: 16,
    color: '#000000',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000',
    marginBottom: 16,
    minHeight: 50,
  },
  createButton: {
    backgroundColor: '#FFB200',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#000000',
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default SignUpScreen;
