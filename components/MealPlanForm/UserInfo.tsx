import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FormContext } from 'FormContext';

type RootStackParamList = {
  UserInfo: undefined;
  Final: undefined;
};
type UserInfoScreenProps = NativeStackNavigationProp<RootStackParamList, 'UserInfo'>;

const UserInfoScreen: React.FC = () => {
  const navigation = useNavigation<UserInfoScreenProps>();
  const formContext = useContext(FormContext);

  if (!formContext) {
    throw new Error('FormContext must be used within a FormProvider');
  }

  const { form, updateForm } = formContext;

  const [weight, setWeight] = useState(form.current_weight.toString());
  const [height, setHeight] = useState(form.height.toString());
  const [targetWeight, setTargetWeight] = useState(form.target_weight.toString());
  const [activityLevel, setActivityLevel] = useState<'low' | 'medium' | 'high'>('medium');

  const handleNext = () => {
    const activityFrequencyMap: { [key: string]: 'sedentary' | 'moderate' | 'active' } = {
      low: 'sedentary',
      medium: 'moderate',
      high: 'active',
    };
    updateForm({
      current_weight: parseFloat(weight),
      height: parseFloat(height),
      target_weight: parseFloat(targetWeight),
      activity_frequency: activityFrequencyMap[activityLevel],
    });
    navigation.navigate('Final');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-4">
        <Text className="text-black font-semibold text-lg mb-2">Body Information</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-2 mb-3"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholder="Current Weight (kg)"
        />
        <TextInput
          className="border border-gray-300 rounded-lg p-2 mb-3"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          placeholder="Height (cm)"
        />
        <TextInput
          className="border border-gray-300 rounded-lg p-2 mb-4"
          value={targetWeight}
          onChangeText={setTargetWeight}
          keyboardType="numeric"
          placeholder="Target Weight (kg)"
        />
        <Text className="text-black font-medium mb-2">Activity Level</Text>
        <TouchableOpacity
          className={`border rounded-lg p-4 mb-3 ${activityLevel === 'low' ? 'border-purple-600 bg-purple-100' : 'border-gray-300'}`}
          onPress={() => setActivityLevel('low')}
        >
          <Text className={`font-medium ${activityLevel === 'low' ? 'text-purple-600' : 'text-black'}`}>Low</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`border rounded-lg p-4 mb-3 ${activityLevel === 'medium' ? 'border-purple-600 bg-purple-100' : 'border-gray-300'}`}
          onPress={() => setActivityLevel('medium')}
        >
          <Text className={`font-medium ${activityLevel === 'medium' ? 'text-purple-600' : 'text-black'}`}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`border rounded-lg p-4 mb-3 ${activityLevel === 'high' ? 'border-purple-600 bg-purple-100' : 'border-gray-300'}`}
          onPress={() => setActivityLevel('high')}
        >
          <Text className={`font-medium ${activityLevel === 'high' ? 'text-purple-600' : 'text-black'}`}>High</Text>
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-8 flex-row w-full justify-between px-4">
        <TouchableOpacity className="bg-gray-200 rounded px-4 py-2" onPress={() => navigation.goBack()}>
          <Text className="text-black text-center font-bold text-xs">Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-purple-600 rounded px-4 py-2" onPress={handleNext}>
          <Text className="text-white text-center font-bold text-xs">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserInfoScreen;