import React, { createContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  age: number;
  gender: 'male' | 'female';
  clerk_user_id: string;
}

interface Form {
  current_weight: number;
  height: number;
  target_weight: number;
  activity_frequency: 'sedentary' | 'moderate' | 'active';
}

interface FormContextType {
  user: User;
  form: Form;
  allergies: string[];
  updateUser: (data: Partial<User>) => void;
  updateForm: (data: Partial<Form>) => void;
  updateAllergies: (data: string[]) => void;
  submitToAPI: () => Promise<void>; 
}

export const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    name: '',
    age: 0,
    gender: 'male',
    clerk_user_id: 'clerk_123',
  });

  const [form, setForm] = useState<Form>({
    current_weight: 0,
    height: 0,
    target_weight: 0,
    activity_frequency: 'moderate',
  });

  const [allergies, setAllergies] = useState<string[]>([]);

  const updateUser = (data: Partial<User>) => setUser((prev) => ({ ...prev, ...data }));
  const updateForm = (data: Partial<Form>) => setForm((prev) => ({ ...prev, ...data }));
  const updateAllergies = (data: string[]) => setAllergies(data);

  const submitToAPI = async () => {
    const data = {
      user,
      form,
      allergies,
    };

    try {
      const res = await fetch('https://mipvvnn83i.us-east-1.awsapprunner.com/saveUserMealPlan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log('API response:', result);
    } catch (err) {
      console.error('API error:', err);
    }
  };

  return (
    <FormContext.Provider value={{ user, form, allergies, updateUser, updateForm, updateAllergies,submitToAPI }}>
      {children}
    </FormContext.Provider>
  );
};