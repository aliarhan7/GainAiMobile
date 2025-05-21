import { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useContext } from 'react';
import { FormContext } from 'FormContext';

type FinalScreenProps = NativeStackNavigationProp<RootStackParamList, 'Final'>;

const FinalScreen: React.FC = () => {
  const navigation = useNavigation<FinalScreenProps>();
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('must be used within a FormProvider');
  }
  const { user, form, allergies, submitToAPI } = context;

  const [planType, setPlanType] = useState<'balanced' | 'lowCarb' | 'highProtein'>('balanced');

  const handleFinish = async () => {
    try {
      await submitToAPI();
      console.log('Selected Plan Type:', planType ); 
      navigation.navigate('Home');
    } catch (err) {
      console.error('Failed to submit data:', err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* İlerleme göstergesi */}
      <View className="flex-row items-center justify-between px-4 pt-4">
        <View className="flex-row space-x-3">
          <View className="h-3 w-3 rounded-full bg-[#EAEAEA] items-center justify-center">
            <Text className="text-xs text-black">1</Text>
          </View>
          <View className="h-3 w-3 rounded-full bg-[#EAEAEA] items-center justify-center">
            <Text className="text-xs text-black">2</Text>
          </View>
          <View className="h-3 w-3 rounded-full bg-[#EAEAEA] items-center justify-center">
            <Text className="text-xs text-black">3</Text>
          </View>
          <View className="h-3 w-3 rounded-full bg-[#8A47EB] items-center justify-center">
            <Text className="text-xs text-white">4</Text>
          </View>
        </View>
      </View>

      <ScrollView className="px-4 py-4">
        <Text className="text-black font-semibold text-lg mb-2">Beslenme Planı Türü</Text>
        
        <Text className="text-black text-xs mb-5">
          Son olarak, oluşturmak istediğiniz beslenme planı türünü seçin. 
          Tüm bilgileriniz ve tercihleriniz dikkate alınarak özel bir plan hazırlanacaktır.
        </Text>
        
        {/* Plan seçenekleri */}
        <TouchableOpacity 
          className={`border rounded-lg p-4 mb-3 ${planType === 'balanced' ? 'border-[#8A47EB] bg-[#F6F0FF]' : 'border-gray-300'}`}
          onPress={() => setPlanType('balanced')}
        >
          <Text className={`font-medium text-base ${planType === 'balanced' ? 'text-[#8A47EB]' : 'text-black'}`}>
            Dengeli Beslenme
          </Text>
          <Text className="text-gray-600 text-xs mt-1">
            Karbonhidrat, protein ve yağ dengeli olarak dağıtılır. Genel sağlık için idealdir.
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className={`border rounded-lg p-4 mb-3 ${planType === 'lowCarb' ? 'border-[#8A47EB] bg-[#F6F0FF]' : 'border-gray-300'}`}
          onPress={() => setPlanType('lowCarb')}
        >
          <Text className={`font-medium text-base ${planType === 'lowCarb' ? 'text-[#8A47EB]' : 'text-black'}`}>
            Düşük Karbonhidrat
          </Text>
          <Text className="text-gray-600 text-xs mt-1">
            Karbonhidrat miktarı sınırlı tutulur, protein ve sağlıklı yağlar arttırılır. Kilo vermek için etkilidir.
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className={`border rounded-lg p-4 mb-3 ${planType === 'highProtein' ? 'border-[#8A47EB] bg-[#F6F0FF]' : 'border-gray-300'}`}
          onPress={() => setPlanType('highProtein')}
        >
          <Text className={`font-medium text-base ${planType === 'highProtein' ? 'text-[#8A47EB]' : 'text-black'}`}>
            Yüksek Proteinli
          </Text>
          <Text className="text-gray-600 text-xs mt-1">
            Protein ağırlıklı beslenme planı. Kas gelişimi ve spor performansı için uygundur.
          </Text>
        </TouchableOpacity>
        
        {/* Özet Bilgiler - Buraya kullanıcının önceki ekranlarda girdiği bilgilerin özeti konulabilir */}
        <View className="bg-gray-50 p-4 rounded-lg mt-4 mb-8">
          <Text className="font-medium mb-2">Beslenme Planı Bilgileri</Text>
          <Text className="text-xs text-gray-600 mb-1">• Seçilen alerjiler dikkate alınacak</Text>
          <Text className="text-xs text-gray-600 mb-1">• Hedef kilonuz ve süreniz doğrultusunda günlük kalori miktarı hesaplanacak</Text>
          <Text className="text-xs text-gray-600 mb-1">• Aktivite seviyenize göre besin dağılımı özelleştirilecek</Text>
          <Text className="text-xs text-gray-600">• 7 günlük değiştirilebilir beslenme planı oluşturulacak</Text>
        </View>
        
        {/* Ekstra boşluk */}
        <View className="h-20" />
      </ScrollView>

      {/* Navigasyon butonları */}
      <View className="absolute bottom-8 flex-row w-full justify-between px-4">
        <TouchableOpacity 
          className="bg-[#F2F2F2] rounded px-4 py-2"
          onPress={() => navigation.navigate('UserInfo')}
        >
          <Text className="text-black text-center font-bold text-xs">Önceki</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="bg-[#8A47EB] rounded px-4 py-2"
          onPress={handleFinish}
        >
          <Text className="text-white text-center font-bold text-xs">Planı Oluştur</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FinalScreen;