import React, { createContext, useContext, useMemo, useState } from 'react';

export type Language = 'English' | 'Urdu';

const translations = {
  English: {
    languageEnglish: 'English',
    languageUrdu: 'Urdu',
    loginAccount: 'Login Account',
    loginWelcome: 'Hello, welcome back to our account!',
    emailAddressPlaceholder: 'Email address',
    passwordPlaceholder: 'Password',
    phoneNumberPlaceholder: 'Enter Phone Number',
    forgotPassword: 'Forgot Password?',
    login: 'Login',
    emailTab: 'Email',
    phoneNumberTab: 'Phone Number',
    sendOtp: 'Send OTP',
    orSignUpWith: 'Or sign up with',
    google: 'Google',
    noAccountYet: 'Not registered yet?',
    createAccount: 'Create Account',
    signUpTitle: 'Sign up!',
    signUpInstruction: 'Create account by filling the form below.',
    enterName: 'Enter name',
    enterEmail: 'Enter email',
    enterPhoneNumber: 'Enter phone number',
    enterPanNumber: 'Enter pan number',
    residentialAddress: 'Residential Address',
    createAccountBtn: 'Create Account',
    alreadyHaveAccount: 'Do you already have an account?',
    loginUpper: 'LOGIN',
    forgotTitle: 'Forgot',
    passwordQuestion: 'Password?',
    forgotPasswordDescription:
      "Don't worry! It happens. Please enter the phone number and we will send the OTP to this phone number.",
    enterPhoneNumberForOtp: 'Enter the phone Number',
    continue: 'Continue',
    otpVerification: 'OTP VERIFICATION',
    enterOtpInstruction: 'Enter the OTP sent to -',
    resendCode: "Don't receive code?",
    resend: 'Re-send',
    submit: 'Submit',
    payment: 'Payment',
    paymentMethod: 'Payment Method',
    visaMastercard: 'Visa / MasterCard',
    cardholderName: 'Cardholder Name',
    nameOnCard: 'Name on card',
    cardnumber: 'Cardnumber',
    expiry: 'Expiry',
    cvv: 'CVV',
    rememberThisCard: 'Remember this card',
    sendReceiptEmail: 'Send receipt to my email',
    totalPrice: 'Total price',
    balanceLabel: 'Balance :',
    pointLabel: 'Antar Point :',
    payNow: 'Pay Now',
    productDetails: 'Product Details',
    description: 'Description',
    verified: 'Verified',
    homeService: 'Home Service',
    dropOff: 'Drop Off',
    notifications: 'Notifications',
    orderAccepted: 'Order accepted',
    paymentReminder: 'Payment reminder',
    newPromoAvailable: 'New promo available',
    orderBtn: 'Order',
    disclaimer: 'DISCLAIMER',
    summary: 'Summary',
    subtotal: 'Subtotal',
    servicesFee: 'Services Fee',
    total: 'Total',
    myOrder: 'My order',
    recommendedTailor: 'Recommended Tailor',
    seeAll: 'See All',
    latestNews: 'Latest News',
    ratingsReviews: 'Ratings & Reviews',
    tailoringServices: 'Tailoring & Alteration Services',
    collection: 'Collection',
    profile: 'Profile',
    account: 'Account',
    privacy: 'Privacy',
    orders: 'Orders',
    appearance: 'Appearance',
    language: 'Language',
    accessibility: 'Accessibility',
    support: 'Support',
    logout: 'Logout',
    editProfile: 'Edit Profile',
    username: 'Username',
    emailId: "Email I'd",
    phoneNumberLabel: 'Phone Number',
    changePicture: 'Change Picture',
    update: 'Update',
    welcome: 'Welcome,',
    addBalance: 'Add Balance',
    getPoint: 'Get Point',
    order: 'Order',
    myOrderTotalLabel: 'Total price',
    tailorProfileDescription: 'For all your sewing needs',
  },
  Urdu: {
    languageEnglish: 'انگریزی',
    languageUrdu: 'اردو',
    loginAccount: 'لاگ ان اکاؤنٹ',
    loginWelcome: 'ہیلو، ہمارے اکاؤنٹ میں خوش آمدید!',
    emailAddressPlaceholder: 'ای میل ایڈریس',
    passwordPlaceholder: 'پاس ورڈ',
    phoneNumberPlaceholder: 'فون نمبر درج کریں',
    forgotPassword: 'پاس ورڈ بھول گئے؟',
    login: 'لاگ ان',
    sendOtp: 'او ٹی پی بھیجیں',
    orSignUpWith: 'یا کے ساتھ سائن اپ کریں',
    google: 'گوگل',
    noAccountYet: 'ابھی تک رجسٹر نہیں کیا؟',
    createAccount: 'اکاؤنٹ بنائیں',
    signUpTitle: 'سائن اپ!',
    signUpInstruction: 'نیچے فارم پُر کرکے اکاؤنٹ بنائیں۔',
    enterName: 'نام درج کریں',
    enterEmail: 'ای میل درج کریں',
    enterPhoneNumber: 'فون نمبر درج کریں',
    enterPanNumber: 'پین نمبر درج کریں',
    residentialAddress: 'رہائشی پتہ',
    createAccountBtn: 'اکاؤنٹ بنائیں',
    alreadyHaveAccount: 'کیا آپ کے پاس پہلے سے اکاؤنٹ ہے؟',
    loginUpper: 'لاگ ان',
    forgotTitle: 'بھول گئے',
    passwordQuestion: 'پاس ورڈ؟',
    forgotPasswordDescription:
      'فکر نہ کریں! ایسا ہوتا ہے۔ براہ کرم فون نمبر درج کریں۔ ہم اس فون نمبر پر او ٹی پی بھیجیں گے۔',
    enterPhoneNumberForOtp: 'فون نمبر درج کریں',
    continue: 'جاری رکھیں',
    otpVerification: 'او ٹی پی کی تصدیق',
    enterOtpInstruction: 'او ٹی پی درج کریں جو بھیجا گیا ہے -',
    resendCode: 'کوڈ موصول نہیں ہوا؟',
    resend: 'دوبارہ بھیجیں',
    submit: 'جمع کرائیں',
    payment: 'ادائیگی',
    paymentMethod: 'ادائیگی کا طریقہ',
    visaMastercard: 'ویزہ / ماسٹر کارڈ',
    cardholderName: 'کارڈ ہولڈر کا نام',
    nameOnCard: 'کارڈ پر نام',
    cardnumber: 'کارڈ نمبر',
    expiry: 'ختم ہونے کی تاریخ',
    cvv: 'سی وی وی',
    rememberThisCard: 'اس کارڈ کو یاد رکھیں',
    sendReceiptEmail: 'رسید میری ای میل پر بھیجیں',
    totalPrice: 'کل قیمت',
    payNow: 'ابھی ادائیگی کریں',
    summary: 'خلاصہ',
    subtotal: 'ذیلی کل',
    servicesFee: 'سروس فیس',
    total: 'کل',
    myOrder: 'میرا آرڈر',
    recommendedTailor: 'تجویز کردہ درزی',
    seeAll: 'سب دیکھیں',
    latestNews: 'تازہ ترین خبریں',
    ratingsReviews: 'درجہ بندی اور جائزے',
    tailoringServices: 'درزی اور ترمیم کی خدمات',
    collection: 'کلیکشن',
    profile: 'پروفائل',
    account: 'اکاؤنٹ',
    privacy: 'رازداری',
    orders: 'آرڈرز',
    appearance: 'ظاہری شکل',
    language: 'زبان',
    accessibility: 'رسائی',
    support: 'مدد',
    logout: 'لاگ آؤٹ',
    editProfile: 'پروفائل میں ترمیم کریں',
    username: 'صارف نام',
    emailId: 'ای میل',
    phoneNumberLabel: 'فون نمبر',
    changePicture: 'تصویر تبدیل کریں',
    update: 'اپ ڈیٹ',
    welcome: 'خوش آمدید،',
    addBalance: 'بیلنس شامل کریں',
    getPoint: 'پوائنٹ حاصل کریں',
    order: 'آرڈر',
    myOrderTotalLabel: 'کل قیمت',
    tailorProfileDescription: 'آپ کی ساری سلائی کی ضروریات کے لیے',
    productDetails: 'تفصیل',
    description: 'تفصیل',
    verified: 'تصدیق شدہ',
    homeService: 'ہوم سروس',
    dropOff: 'ڈراپ آف',
    notifications: 'اطلاعات',
    orderAccepted: 'آرڈر قبول ہو گیا',
    paymentReminder: 'ادائیگی کی یاددہانی',
    newPromoAvailable: 'نیا پرومو دستیاب ہے',
    orderBtn: 'آرڈر',
    disclaimer: 'ڈرکلیئر',
    balanceLabel: 'بیلنس :',
    pointLabel: 'پوائنٹ :',
  },
} as const;

export type TranslationKey = keyof typeof translations['English'];

type Translations = typeof translations;
const translationMap: { [L in Language]: Record<TranslationKey, string> } = translations as unknown as {
  [L in Language]: Record<TranslationKey, string>;
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('English');

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: TranslationKey) => translationMap[language][key],
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
