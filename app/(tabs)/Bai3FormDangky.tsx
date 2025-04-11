// screens/FormScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useSignupMutation } from '../services/serverApi';

export default function FormScreen() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    gender: '',
  });

  const [signup, { isLoading }] = useSignupMutation();

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await signup(form).unwrap();
      Alert.alert('Thành công', 'Đăng ký thành công!');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể gửi dữ liệu.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form Builder Basic Demo</Text>

      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text>Name<Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} onChangeText={(text) => handleChange('name', text)} />
        </View>
        <View style={styles.inputGroup}>
          <Text>User's Age<Text style={styles.required}>*</Text></Text>
          <TextInput style={styles.input} keyboardType="numeric" onChangeText={(text) => handleChange('age', text)} />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text>Email<Text style={styles.required}>*</Text></Text>
        <TextInput style={styles.input} keyboardType="email-address" onChangeText={(text) => handleChange('email', text)} />
      </View>

      <View style={styles.inputGroup}>
        <Text>Password<Text style={styles.required}>*</Text></Text>
        <TextInput style={styles.input} secureTextEntry onChangeText={(text) => handleChange('password', text)} />
      </View>

      <View style={styles.inputGroup}>
        <Text>Gender</Text>
        <TextInput style={styles.input} onChangeText={(text) => handleChange('gender', text)} />
        {/* Nếu bạn muốn dùng dropdown: dùng `Picker` thay thế */}
      </View>

      <View style={styles.button}>
        <Button title="Submit" onPress={handleSubmit} color="#00BFFF" disabled={isLoading} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      padding: 20,
      paddingTop: 40,
      backgroundColor: '#fff',
      flex: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginBottom: 20,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    inputGroup: {
      flex: 1,
      marginBottom: 15,
      marginRight: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#eee',
      borderRadius: 5,
      padding: 10,
      marginTop: 5,
    },
    required: {
      color: 'red',
    },
    button: {
      marginTop: 20,
    },
  });
  