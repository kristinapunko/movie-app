
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { loginUser } from '@/servises/appwrite';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      Alert.alert('Success', 'Logged in!');
      router.replace('/profile'); 
    } catch (error: any) {
      Alert.alert('Login failed', error.message);
    }
  };

  return (
    <View className="flex-1 bg-primary">
  <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />
        <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 60, paddingTop:100 }}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-8 mx-auto" />
  
      <Text className="text-light-100 text-3xl my-8 text-center">Login</Text>

      <Text className="text-light-100 text-lg mb-2">Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        className="mb-6 px-4 py-3 rounded-xl border border-light-300 text-light-100 bg-light-50"
      />

      <Text className="text-light-100 text-lg mb-2">Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        placeholderTextColor="#aaa"
        secureTextEntry
        className="mb-6 px-4 py-3 rounded-xl border border-light-300 text-light-100 bg-light-50"
      />

<View className="flex-row justify-center items-center gap-x-2 my-4">
                <Text className="text-light-200 text-lg">Already have an account?</Text>
                <TouchableOpacity onPress={()=>router.push('/register')}>
                    <Text className="text-light-100 text-lg font-semibold">Register</Text>
                </TouchableOpacity>
            </View>

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-dark-100 border border-dark-200 rounded-xl p-3"
      >
        <Text className="text-center text-light-100 text-base font-semibold">Login</Text>
      </TouchableOpacity>
      </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
