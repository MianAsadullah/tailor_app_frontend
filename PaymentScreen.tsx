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

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal + SERVICE_FEE;

  const accentPurple = '#4B0082';
  const darkPurple = '#1A004C';

  return (
    <View style={styles.container}>
      <View style={styles.headerBg}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <ArrowLeft size={24} color={darkPurple} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Summary</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.stepperRow}>
          <View style={styles.stepperLineGray} />
          <View style={styles.stepperLinePurple} />
          <View style={[styles.stepDot, styles.stepDone]}>
            <Check size={12} color="#FFFFFF" strokeWidth={3} />
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
      >
        <View style={styles.formSection}>
          <Text style={styles.inputLabel}>Payment Method</Text>
          <View style={styles.inputBox}>
            <CreditCard size={20} color={accentPurple} strokeWidth={2} />
          </View>

          <Text style={styles.inputLabel}>Cardholder Name</Text>
          <View style={styles.inputBox}>
            <User size={20} color={accentPurple} strokeWidth={2} />
          </View>

          <Text style={styles.inputLabel}>Cardnumber</Text>
          <View style={styles.inputBox}>
            <CreditCard size={20} color={accentPurple} strokeWidth={2} />
          </View>

          <View style={styles.rowTwo}>
            <View style={styles.halfField}>
              <Text style={styles.inputLabel}>Expiry</Text>
              <View style={styles.inputBox}>
                <Calendar size={20} color={accentPurple} strokeWidth={2} />
                <Text style={styles.placeholderText}>MM/YY</Text>
              </View>
            </View>
            <View style={styles.halfField}>
              <Text style={styles.inputLabel}>CVV</Text>
              <View style={styles.inputBox}>
                <Text style={styles.placeholderCvv}>***</Text>
              </View>
            </View>
          </View>

          <View style={styles.toggleRow}>
            <Switch
              value={rememberCard}
              onValueChange={setRememberCard}
              trackColor={{ false: '#D1D5DB', true: accentPurple }}
              thumbColor="#FFFFFF"
            />
            <Text style={styles.toggleText}>Remember this card</Text>
          </View>

          <View style={styles.toggleRow}>
            <Switch
              value={sendReceipt}
              onValueChange={setSendReceipt}
              trackColor={{ false: '#D1D5DB', true: accentPurple }}
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
          onPress={() =>
            navigation.navigate('Summary', {
              items,
            })
          }
        >
          <Text style={styles.payBtnText}>Pay Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const ACCENT_PURPLE = '#4B0082';
const DARK_PURPLE = '#1A004C';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerBg: {
    backgroundColor: '#C3EDE2',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 28,
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
    color: DARK_PURPLE,
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
    backgroundColor: ACCENT_PURPLE,
    top: 10,
  },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: ACCENT_PURPLE,
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
    fontWeight: '400',
    color: DARK_PURPLE,
  },
  finalPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: DARK_PURPLE,
  },
  payBtn: {
    backgroundColor: ACCENT_PURPLE,
    borderRadius: 14,
    paddingVertical: 16,
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
