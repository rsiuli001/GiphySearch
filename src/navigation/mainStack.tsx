import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens';

export type MainStackParams = {
    HomeScreen: undefined
}

const { Screen, Navigator } = createNativeStackNavigator<MainStackParams>();

const MainStack: FC = (): JSX.Element => {
  return (
    <Navigator screenOptions={{ gestureEnabled: false }} initialRouteName={'HomeScreen'}>
      <Screen name={'HomeScreen'} component={HomeScreen} options={{ title: 'Home Screen' }} />
    </Navigator>
  );
};

export default MainStack;
