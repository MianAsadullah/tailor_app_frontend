import React, { useState } from 'react';
import { styles } from '../../assets/style';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, Check, Minus, Plus, Trash2 } from 'lucide-react-native';
import { ORDER_ITEMS } from '../../assets/mockdata';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


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
    Payment: {
      items: Array<{ id: string; name: string; price: number; qty: number }>;
    };
    Summary: {
      items: Array<{ id: string; name: string; price: number; qty: number }>;
    };
    Notification: undefined;
  };


type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const OrderTab = ({ setActiveTab }: { setActiveTab: any }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [trashForId, setTrashForId] = useState<string | null>(null);

  const [orderItems, setOrderItems] = useState(ORDER_ITEMS);
  const [orderQty, setOrderQty] = useState<Record<string, number>>({
    '1': 1,
    '2': 1,
    '3': 1,
    '4': 1,
  });

  const handleQtyChange = (id: string, delta: number) => {
    setOrderQty(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleDeleteItem = (id: string) => {
    setOrderItems(prev => prev.filter(item => item.id !== id));
    setTrashForId(null);
  };

  const totalPrice = orderItems.reduce(
    (sum, item) => sum + item.price * (orderQty[item.id] || 1),
    0,
  );

  const formatRupiah = (value: number) =>
    `Rp${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

  return (
    <View style={styles.myOrderContainer}>
      <View style={styles.myOrderHeaderBg}>
        <View style={styles.myOrderHeaderRow}>
          <TouchableOpacity
            onPress={() => setActiveTab('home')}
            style={styles.myOrderBackBtn}
          >
            <ArrowLeft size={24} color="#ffffff" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.myOrderTitle}>My order</Text>
          <View style={styles.myOrderHeaderRight} />
        </View>

        <View style={styles.myOrderStepperRow}>
          <View style={styles.myOrderStepperLine} />
          <View style={[styles.myOrderStepDot, styles.myOrderStepDone]}>
            <Check size={12} color="#FFB200" strokeWidth={3} />
          </View>
          <View style={styles.myOrderStepDot} />
          <View style={styles.myOrderStepDot} />
        </View>
      </View>

      <ScrollView
        style={styles.myOrderScroll}
        contentContainerStyle={styles.myOrderScrollContent}
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={() => setTrashForId(null)}
      >
        {ORDER_ITEMS.map(item => (
          <View key={item.id} style={styles.myOrderRowWrap}>
            <TouchableOpacity
              style={styles.myOrderCard}
              activeOpacity={0.95}
              onLongPress={() => setTrashForId(item.id)}
              onPress={() => setTrashForId(null)}
            >
              <View style={styles.myOrderImage} />
              <View style={styles.myOrderInfo}>
                <Text style={styles.myOrderItemName}>{item.name}</Text>
                <Text style={styles.myOrderItemPrice}>
                  {formatRupiah(item.price)}
                </Text>
                <Text style={styles.myOrderItemEdit}>Edit</Text>
              </View>
              <View style={styles.myOrderQtyPillWrapper}>
                <View style={styles.myOrderQtyPill}>
                  <TouchableOpacity
                    style={styles.myOrderQtyBtn}
                    onPress={() => handleQtyChange(item.id, -1)}
                  >
                    <Minus size={14} color="#000000" strokeWidth={2.5} />
                  </TouchableOpacity>
                  <Text style={styles.myOrderQtyText}>
                    {orderQty[item.id] || 1}
                  </Text>
                  <TouchableOpacity
                    style={styles.myOrderQtyBtn}
                    onPress={() => handleQtyChange(item.id, 1)}
                  >
                    <Plus size={14} color="#000000" strokeWidth={2.5} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
            {trashForId === item.id && (
              <TouchableOpacity
                style={styles.myOrderDeleteBtn}
                onPress={() => handleDeleteItem(item.id)}
              >
                <Trash2 size={24} color="#FFFFFF" strokeWidth={2} />
              </TouchableOpacity>
            )}
          </View>
        ))}

        <View style={styles.myOrderDivider} />
        <View style={styles.myOrderTotalRow}>
          <Text style={styles.myOrderTotalLabel}>Total price</Text>
          <Text style={styles.myOrderTotalValue}>
            {formatRupiah(totalPrice)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.myOrderActionBtn}
          onPress={() =>
            navigation.navigate('Payment', {
              items: orderItems.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                qty: orderQty[item.id] || 1,
              })),
            })
          }
        >
          <Text style={styles.myOrderActionText}>Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default OrderTab;
