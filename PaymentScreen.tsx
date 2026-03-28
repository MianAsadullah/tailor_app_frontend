/**
 * Payment Screen (Summary step – payment form)
 * @format
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  CreditCard,
  User,
  Calendar,
  Check,
} from 'lucide-react-native';

type SummaryItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  OTP: { phone: string };
  ForgotPassword: undefined;
  Home: undefined;
  EditProfile: undefined;
  ProductDetails: undefined;
  TailorProfile: { tailorId?: string; tailorName?: string };
  Payment: { items: SummaryItem[] };
  Summary: { items: SummaryItem[] };
};

type PaymentRouteProp = RouteProp<RootStackParamList, 'Payment'>;
type PaymentNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Payment'
>;

const FALLBACK_ITEMS: SummaryItem[] = [
  { id: '1', name: 'Batik Furry Tunik Sakura', price: 170000, qty: 1 },
  { id: '2', name: 'Gamis Brokat', price: 200000, qty: 1 },
  { id: '3', name: 'Gamis Crinkle Airflow', price: 195000, qty: 1 },
  { id: '4', name: 'Shimmer', price: 125000, qty: 1 },
];

const SERVICE_FEE = 3988;

const formatRupiah = (value: number) =>
  `Rp${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

const PaymentScreen = () => {
  const navigation = useNavigation<PaymentNavigationProp>();
  const route = useRoute<PaymentRouteProp>();
  const items = route.params?.items?.length
    ? route.params.items
    : FALLBACK_ITEMS;
  const [rememberCard, setRememberCard] = useState(true);
  const [sendReceipt, setSendReceipt] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + SERVICE_FEE;

  const accentOrange = '#FFB200';
  // const darkPurple = '#DB640F';

  const handleCardNumberChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 16);
    const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleExpiryChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 4);
    if (digitsOnly.length <= 2) {
      setExpiry(digitsOnly);
      return;
    }
    setExpiry(`${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`);
  };

  const handleCvvChange = (value: string) => {
    setCvv(value.replace(/\D/g, '').slice(0, 4));
  };

  const handlePayNow = () => {
    const cleanCardNumber = cardNumber.replace(/\s/g, '');
    const isExpiryValid = /^((0[1-9])|(1[0-2]))\/\d{2}$/.test(expiry);

    if (!paymentMethod.trim()) {
      Alert.alert('Missing field', 'Please enter payment method.');
      return;
    }
    if (!cardholderName.trim()) {
      Alert.alert('Missing field', 'Please enter cardholder name.');
      return;
    }
    if (cleanCardNumber.length < 13) {
      Alert.alert('Invalid card number', 'Please enter a valid card number.');
      return;
    }
    if (!isExpiryValid) {
      Alert.alert('Invalid expiry', 'Please enter expiry as MM/YY.');
      return;
    }
    if (cvv.length < 3) {
      Alert.alert('Invalid CVV', 'Please enter a valid CVV.');
      return;
    }

    navigation.navigate('Summary', {
      items,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.headerBg}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <ArrowLeft size={24} color={'#ffffff'} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.stepperRow}>
          <View style={styles.stepperLineGray} />
          <View style={styles.stepperLinePurple} />
          <View style={[styles.stepDot, styles.stepDone]}>
            <Check size={12} color="#FFB200" strokeWidth={3} />
          </View>
          <View style={styles.stepCurrent}>
            <View style={styles.stepCurrentInner} />
          </View>
          <View style={styles.stepOutline}>
            <View style={styles.stepOutlineInner} />
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formSection}>
          <Text style={styles.inputLabel}>Payment Method</Text>
          <View style={styles.inputBox}>
            <CreditCard size={20} color={accentOrange} strokeWidth={2} />
            <TextInput
              style={styles.inputText}
              placeholder="Visa / MasterCard"
              placeholderTextColor="#9CA3AF"
              value={paymentMethod}
              onChangeText={setPaymentMethod}
            />
          </View>

          <Text style={styles.inputLabel}>Cardholder Name</Text>
          <View style={styles.inputBox}>
            <User size={20} color={accentOrange} strokeWidth={2} />
            <TextInput
              style={styles.inputText}
              placeholder="Name on card"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="words"
              value={cardholderName}
              onChangeText={setCardholderName}
            />
          </View>

          <Text style={styles.inputLabel}>Cardnumber</Text>
          <View style={styles.inputBox}>
            <CreditCard size={20} color={accentOrange} strokeWidth={2} />
            <TextInput
              style={styles.inputText}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              value={cardNumber}
              onChangeText={handleCardNumberChange}
            />
          </View>

          <View style={styles.rowTwo}>
            <View style={styles.halfField}>
              <Text style={styles.inputLabel}>Expiry</Text>
              <View style={styles.inputBox}>
                <Calendar size={20} color={accentOrange} strokeWidth={2} />
                <TextInput
                  style={styles.inputText}
                  placeholder="MM/YY"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                  value={expiry}
                  onChangeText={handleExpiryChange}
                />
              </View>
            </View>
            <View style={styles.halfField}>
              <Text style={styles.inputLabel}>CVV</Text>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.inputText}
                  placeholder="***"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                  secureTextEntry
                  value={cvv}
                  onChangeText={handleCvvChange}
                />
              </View>
            </View>
          </View>

          <View style={styles.toggleRow}>
            <Switch
              value={rememberCard}
              onValueChange={setRememberCard}
              trackColor={{ false: '#D1D5DB', true: accentOrange }}
              thumbColor="#FFFFFF"
            />
            <Text style={styles.toggleText}>Remember this card</Text>
          </View>

          <View style={styles.toggleRow}>
            <Switch
              value={sendReceipt}
              onValueChange={setSendReceipt}
              trackColor={{ false: '#D1D5DB', true: accentOrange }}
              thumbColor="#FFFFFF"
            />
            <Text style={styles.toggleText}>Send receipt to my email</Text>
          </View>
        </View>

        <View style={styles.bottomLine} />

        <View style={styles.finalRow}>
          <Text style={styles.finalText}>Total price</Text>
          <Text style={styles.finalPrice}>{formatRupiah(total)}</Text>
        </View>

        <TouchableOpacity
          style={styles.payBtn}
          onPress={handlePayNow}
        >
          <Text style={styles.payBtnText}>Pay Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const ACCENT_PURPLE = '#FFB200';
const DARK_PURPLE = '#1A004C';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerBg: {
    backgroundColor: '#FFB200',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 78,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  backBtn: { padding: 8, minWidth: 40 },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  headerRight: { width: 40 },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    paddingHorizontal: 8,
  },
  stepperLineGray: {
    position: 'absolute',
    left: 24,
    right: 24,
    height: 3,
    backgroundColor: '#D1D5DB',
    top: 10,
  },
  stepperLinePurple: {
    position: 'absolute',
    left: 24,
    width: '33%',
    height: 3,
    backgroundColor: '#ffffff',
    top: 10,
  },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 5,
    borderColor: '#FFFFFF',
    zIndex: 1,
  },
  stepDone: { alignItems: 'center', justifyContent: 'center' },
  stepCurrent: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: ACCENT_PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  stepCurrentInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: ACCENT_PURPLE,
  },
  stepOutline: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: ACCENT_PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  stepOutlineInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: ACCENT_PURPLE,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
    backgroundColor: '#FFFFFF',
  },
  formSection: {
    marginTop: 4,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: DARK_PURPLE,
    marginBottom: 8,
    marginTop: 14,
  },
  inputBox: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  inputText: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    marginLeft: 10,
    paddingVertical: 0,
  },
  placeholderText: {
    fontSize: 15,
    color: '#9CA3AF',
    marginLeft: 10,
    fontWeight: '400',
  },
  placeholderCvv: {
    fontSize: 15,
    color: DARK_PURPLE,
    marginLeft: 0,
    fontWeight: '500',
  },
  rowTwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  halfField: {
    width: '47%',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  toggleText: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '400',
    color: DARK_PURPLE,
  },
  bottomLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#9CA3AF',
    alignSelf: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  finalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 0,
  },
  finalText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  finalPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFB200',
  },
  payBtn: {
    backgroundColor: ACCENT_PURPLE,
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default PaymentScreen;
