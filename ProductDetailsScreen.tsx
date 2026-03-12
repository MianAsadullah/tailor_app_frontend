/**
 * Product Details Screen
 * @format
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  // Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, Star, Minus, Plus } from 'lucide-react-native';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  OTP: { phone: string };
  ForgotPassword: undefined;
  Home: undefined;
  EditProfile: undefined;
  ProductDetails: undefined;
};

type ProductDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProductDetails'
>;

const ProductDetailsScreen = () => {
  const navigation = useNavigation<ProductDetailsScreenNavigationProp>();
  const [quantity, setQuantity] = useState(1);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleOrder = () => {
    console.log('Order product, quantity:', quantity);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Top: Light teal curved header */}
      <View style={styles.headerShape}>
        <View style={styles.headerBar}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color="#190152" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Details</Text>
          <View style={styles.headerRight} />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Product card - white, rounded */}
        <View style={styles.productCard}>
          <View style={styles.productImageContainer} />
          <Text style={styles.productName}>Batik Furry Tunik Sakura</Text>
          <Text style={styles.productPrice}>Rp 170.000</Text>
          <View style={styles.productMetaRow}>
            <View style={styles.ratingRow}>
              <Star size={16} color="#000000" fill="#000000" strokeWidth={0} />
              <Text style={styles.ratingText}>4.6</Text>
              <Text style={styles.orderCount}>54 Order</Text>
            </View>
            <View style={styles.quantityRow}>
              <TouchableOpacity
                style={styles.quantityBtn}
                onPress={() => setQuantity(q => Math.max(1, q - 1))}
              >
                <Minus size={18} color="#FFFFFF" strokeWidth={2.5} />
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityBtn}
                onPress={() => setQuantity(q => q + 1)}
              >
                <Plus size={18} color="#FFFFFF" strokeWidth={2.5} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Description section */}
        <View style={styles.descriptionSection}>
          <View style={styles.descriptionTab}>
            <Text style={styles.descriptionTabText}>Description</Text>
          </View>
          <Text style={styles.detailLine}>Bahan : sutra Baron</Text>
          <Text style={styles.detailLine}>Ukuran: 2.60 X 1.10</Text>
          <Text style={styles.detailLine}>
            Menerima jasa jahit kualitas butik
          </Text>

          <Text style={styles.disclaimerTitle}>DISCLAIMER</Text>
          <Text style={styles.disclaimerItem}>
            1. Produk dalam bentuk kain, baju diatas merupakan ilustrasi yang
            diciptakan untuk membantu anda mengvisualisasikan hasil akhir kain
            yang telah dijahitkan.
          </Text>
          <Text style={styles.disclaimerItem}>
            2. Adanya sedikit perbedaan warna antara foto diatas dengan kain
            aslinya yang dikarenakan oleh faktor pencahayaan.
          </Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Order button - fixed at bottom */}
      <View style={styles.orderButtonContainer}>
        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.orderButtonText}>Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerShape: {
    backgroundColor: '#E0F7EF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: '#000000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    paddingBottom: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  productImageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#E0E0E0',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: 16,
    paddingTop: 12,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  productMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#000000',
    marginRight: 8,
  },
  orderCount: {
    fontSize: 14,
    color: '#666666',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityBtnText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '500',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginHorizontal: 16,
    minWidth: 24,
    textAlign: 'center',
  },
  descriptionSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  descriptionTab: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E6B800',
    backgroundColor: '#FFF9E6',
    marginBottom: 16,
  },
  descriptionTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  detailLine: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 8,
    lineHeight: 20,
  },
  disclaimerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 16,
    marginBottom: 8,
  },
  disclaimerItem: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 8,
  },
  bottomSpacer: {
    height: 24,
  },
  orderButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  orderButton: {
    backgroundColor: '#190152',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailsScreen;
