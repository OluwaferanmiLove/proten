import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '@screens/home/Home';
import Splash from '@screens/auth/Splash';
import theme from '@theme/theme';
import Welcome from '@screens/auth/Welcome';
import Login from '@screens/auth/Login';
import {RootState} from '@redux/store';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const BaseApp = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: theme.colors.white},
        }}>
        {/* <Stack.Screen name="Splash" component={Splash} /> */}
        {isAuthenticated ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{presentation: 'modal'}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default BaseApp;
