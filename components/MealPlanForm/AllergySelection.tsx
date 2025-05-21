import { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { FormContext } from 'FormContext';
import { useContext } from 'react';
type AllergySelectionScreenProps = NativeStackNavigationProp<RootStackParamList, 'AllergySelection'>;

const AllergySelectionScreen: React.FC = () => {
  const navigation = useNavigation<AllergySelectionScreenProps>();
  
  const { updateAllergies } = useContext(FormContext)!;
  
  const [allergies, setAllergies] = useState({
    milk: false,
    eggs: false,
    nuts: false,
    fish: false,
    shellfish: false,
    wheat: false,
    soy: false,
    gluten: false,
  });

  const toggleAllergy = (key: keyof typeof allergies) => {
    setAllergies(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNext = () => {
    const selectedAllergies = Object.entries(allergies)
      .filter(([_, selected]) => selected)
      .map(([key]) => key);
    updateAllergies(selectedAllergies);
    navigation.navigate('UserInfo');
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
          <View className="h-3 w-3 rounded-full bg-[#8A47EB] items-center justify-center">
            <Text className="text-xs text-white">2</Text>
          </View>
          <View className="h-3 w-3 rounded-full bg-[#EAEAEA] items-center justify-center">
            <Text className="text-xs text-black">3</Text>
          </View>
          <View className="h-3 w-3 rounded-full bg-[#EAEAEA] items-center justify-center">
            <Text className="text-xs text-black">4</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('UserInfo')}>
          <Text className="text-[#1F73F1] font-bold text-xs">Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="px-4 py-4">
        <Text className="text-black font-semibold text-lg mb-2">Gıda Alerjileriniz</Text>
        
        <Text className="text-black text-xs mb-5">
          Size özel beslenme planı oluştururken dikkate almamız gereken gıda alerjilerinizi seçin.
          Birden fazla seçim yapabilirsiniz.
        </Text>
        
        {/* Alerji seçenekleri */}
        <View className="flex-row flex-wrap justify-between">
          <TouchableOpacity 
            className={`border rounded-lg p-4 mb-3 w-[48%] ${allergies.milk ? 'border-[#8A47EB] bg-[#F6F0FF]' : 'border-gray-300'}`}
            onPress={() => toggleAllergy('milk')}
          >
            <Text className={`font-medium text-base ${allergies.milk ? 'text-[#8A47EB]' : 'text-black'}`}>
              Süt
            </Text>
            <Text className="text-gray-600 text-xs mt-1">
              Süt ve süt ürünleri
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`border rounded-lg p-4 mb-3 w-[48%] ${allergies.eggs ? 'border-[#8A47EB] bg-[#F6F0FF]' : 'border-gray-300'}`}
            onPress={() => toggleAllergy('eggs')}
          >
            <Text className={`font-medium text-base ${allergies.eggs ? 'text-[#8A47EB]' : 'text-black'}`}>
              Yumurta
            </Text>
            <Text className="text-gray-600 text-xs mt-1">
              Tüm yumurta çeşitleri
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`border rounded-lg p-4 mb-3 w-[48%] ${allergies.nuts ? 'border-[#8A47EB] bg-[#F6F0FF]' : 'border-gray-300'}`}
            onPress={() => toggleAllergy('nuts')}
          >
            <Text className={`font-medium text-base ${allergies.nuts ? 'text-[#8A47EB]' : 'text-black'}`}>
              Kuruyemiş
            </Text>
            <Text className="text-gray-600 text-xs mt-1">
              Fındık, badem, ceviz vb.
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`border rounded-lg p-4 mb-3 w-[48%] ${allergies.fish ? 'border-[#8A47EB] bg-[#F6F0FF]' : 'border-gray-300'}`}
            onPress={() => toggleAllergy('fish')}
          >
            <Text className={`font-medium text-base ${allergies.fish ? 'text-[#8A47EB]' : 'text-black'}`}>
              Balık
            </Text>
            <Text className="text-gray-600 text-xs mt-1">
              Tüm balık türleri
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`border rounded-lg p-4 mb-3 w-[48%] ${allergies.shellfish ? 'border-[#8A47EB] bg-[#F6F0FF]' : 'border-gray-300'}`}
            onPress={() => toggleAllergy('shellfish')}
          >
            <Text className={`font-medium text-base ${allergies.shellfish ? 'text-[#8A47EB]' : 'text-black'}`}>
              Kabuklu Deniz Ürünleri
            </Text>
            <Text className="text-gray-600 text-xs mt-1">
              Karides, yengeç vb.
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`border rounded-lg p-4 mb-3 w-[48%] ${allergies.wheat ? 'border-[#8A47EB] bg-[#F6F0FF]' : 'border-gray-300'}`}
            onPress={() => toggleAllergy('wheat')}
          >
            <Text className={`font-medium text-base ${allergies.wheat ? 'text-[#8A47EB]' : 'text-black'}`}>
              Buğday
            </Text>
            <Text className="text-gray-600 text-xs mt-1">
              Buğday ve türevleri
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`border rounded-lg p-4 mb-3 w-[48%] ${allergies.soy ? 'border-[#8A47EB] bg-[#F6F0FF]' : 'border-gray-300'}`}
            onPress={() => toggleAllergy('soy')}
          >
            <Text className={`font-medium text-base ${allergies.soy ? 'text-[#8A47EB]' : 'text-black'}`}>
              Soya
            </Text>
            <Text className="text-gray-600 text-xs mt-1">
              Soya ve soya ürünleri
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`border rounded-lg p-4 mb-3 w-[48%] ${allergies.gluten ? 'border-[#8A47EB] bg-[#F6F0FF]' : 'border-gray-300'}`}
            onPress={() => toggleAllergy('gluten')}
          >
            <Text className={`font-medium text-base ${allergies.gluten ? 'text-[#8A47EB]' : 'text-black'}`}>
              Gluten
            </Text>
            <Text className="text-gray-600 text-xs mt-1">
              Buğday, arpa, çavdar vb.
            </Text>
          </TouchableOpacity>
        </View>

        {/* Ekstra boşluk */}
        <View className="h-20" />
      </ScrollView>

      {/* Navigasyon butonları */}
      <View className="absolute bottom-8 flex-row w-full justify-between px-4">
        <TouchableOpacity 
          className="bg-[#F2F2F2] rounded px-4 py-2"
          onPress={() => navigation.navigate('FirstMealForm')}
        >
          <Text className="text-black text-center font-bold text-xs">Önceki</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="bg-[#8A47EB] rounded px-4 py-2"
          onPress={handleNext}
        >
          <Text className="text-white text-center font-bold text-xs">Sonraki</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AllergySelectionScreen;