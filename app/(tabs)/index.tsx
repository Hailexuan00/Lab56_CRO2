import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice, createAction } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// Action dùng cho extraReducers
const RESET_COUNTER = createAction('RESET_COUNTER');

// Slice quản lý state counter
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 10 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
    multiply: (state) => { state.value *= state.value },
    lapphuong: (state) => { state.value *= (state.value * state.value) },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_COUNTER, (state) => {
      state.value = 10;
    });
  }
});

// Redux store
const store = configureStore({
  reducer: { counter: counterSlice.reducer }
});     

const CounterApp = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state: any) => state.counter.value);

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>{counter}</Text>

      <TouchableOpacity style={styles.button} onPress={() => dispatch(counterSlice.actions.increment())}>
        <Text style={styles.buttonText}>Tăng biến đếm</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => dispatch(counterSlice.actions.decrement())}>
        <Text style={styles.buttonText}>Giảm biến đếm</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => dispatch(counterSlice.actions.multiply())}>
        <Text style={styles.buttonText}>Mũ bình phương biến đếm</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => dispatch(counterSlice.actions.lapphuong())}>
        <Text style={styles.buttonText}>Lập phương biến đếm</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => dispatch(RESET_COUNTER())}>
        <Text style={styles.buttonText}>Reset biến đếm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <CounterApp />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  counterText: {
    fontSize: 48,
    marginBottom: 30,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 5,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
