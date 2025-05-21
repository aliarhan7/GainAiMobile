import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { FormContext } from 'FormContext';
import { useUser } from '@clerk/clerk-expo';
import { useEffect } from 'react';

type StepOneScreenProps = NativeStackNavigationProp<RootStackParamList, 'StepOne'>;

const StepOneScreen: React.FC = () => {
  const navigation = useNavigation<StepOneScreenProps>();
  const context = useContext(FormContext);
  const { user } = useUser(); // Clerk to get user

  if (!context) {
    throw new Error('StepOneScreen must be used within a FormProvider'); 
  }
  const { updateUser } = context;

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);

  // Update clerk_user_id in context when user is available
  useEffect(() => {
    if (user?.id) {
      updateUser({ clerk_user_id: user.id });
    }
  }, [user, updateUser]);

  const handleNext = () => {
    if (name && age && gender && user?.id) {
      updateUser({
        name,
        age: parseInt(age),
        gender,
      });
      navigation.navigate('AllergySelection');
    } else {
      console.log('Please fill all fields and ensure user is authenticated');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="flex-row items-center justify-between px-4 pt-4">
        <View className="flex-row space-x-3">
          <View className="h-3 w-3 rounded-full bg-[#8A47EB] items-center justify-center">
            <Text className="text-xs text-white">1</Text>
          </View>
          <View className="h-3 w-3 rounded-full bg-[#EAEAEA] items-center justify-center">
            <Text className="text-xs text-black">2</Text>
          </View>
          <View className="h-3 w-3 rounded-full bg-[#EAEAEA] items-center justify-center">
            <Text className="text-xs text-black">3</Text>
          </View>
          <View className="h-3 w-3 rounded-full bg-[#EAEAEA] items-center justify-center">
            <Text className="text-xs text-black">4</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('AllergySelection')}>
          <Text className="text-[#1F73F1] font-bold text-xs">Skip</Text>
        </TouchableOpacity>
      </View>
      <View className="px-4 mt-6">
        <Text className="text-black font-semibold text-lg mb-4">Temel Bilgileriniz</Text>
        <Text className="text-black text-xs mb-5">
          Size en uygun yemek planını oluşturmak için birkaç temel bilgiye ihtiyacımız var.
        </Text>
        <Text className="text-black font-medium mb-1">Adınız</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-2 mb-3"
          value={name}
          onChangeText={setName}
          placeholder="Adınızı girin"
        />
        <Text className="text-black font-medium mb-1">Yaşınız</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-2 mb-4"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholder="Yaşınızı girin"
        />
        <Text className="text-black font-medium mb-2">Cinsiyet</Text>
        <View className="flex-row space-x-3 mb-4">
          <TouchableOpacity
            className={`flex-1 py-3 rounded-lg border ${gender === 'male' ? 'bg-[#F6F0FF] border-[#8A47EB]' : 'bg-white border-gray-300'}`}
            onPress={() => setGender('male')}
          >
            <Text className={`text-center font-medium ${gender === 'male' ? 'text-[#8A47EB]' : 'text-black'}`}>Erkek</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 rounded-lg border ${gender === 'female' ? 'bg-[#F6F0FF] border-[#8A47EB]' : 'bg-white border-gray-300'}`}
            onPress={() => setGender('female')}
          >
            <Text className={`text-center font-medium ${gender === 'female' ? 'text-[#8A47EB]' : 'text-black'}`}>Kadın</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="absolute bottom-8 flex-row w-full justify-between px-4">
        <TouchableOpacity
          className="bg-[#F2F2F2] rounded px-4 py-2"
          onPress={() => navigation.navigate('MainTabs', { screen: 'MealPlan' })}
        >
          <Text className="text-black text-center font-bold text-xs">Önceki</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#8A47EB] rounded px-4 py-2" onPress={handleNext}>
          <Text className="text-white text-center font-bold text-xs">Sonraki</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StepOneScreen;