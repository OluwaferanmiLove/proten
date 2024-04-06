import React, {useCallback, useEffect} from 'react';
import updateStatusBar from '@hooks/updateStatusBar';
import BaseView from '@components/BaseView';
import Container from '@components/Container';
import {useDispatch} from 'react-redux';
import logoFull from '@assets/svg/logoFull.svg';
import {SvgXml} from 'react-native-svg';
import styled from 'styled-components/native';
import * as NavigationBar from 'expo-navigation-bar';
import {Platform, View} from 'react-native';
import theme from '@theme/theme';
import MainAppBaseView from '@components/MainAppBaseView';
import Button from '@components/Button';
import * as Animatable from 'react-native-animatable';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const Welcome = () => {
  updateStatusBar('light-content', 'transparent', true);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const setNavBarBackground = async () => {
    if (Platform.OS === 'android') {
      await NavigationBar.setButtonStyleAsync('light');
      await NavigationBar.setBackgroundColorAsync(theme.colors.primary);
    }
  };

  // useEffect(() => {
  //   setNavBarBackground();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      setNavBarBackground();
    }, []),
  );

  return (
    <MainAppBaseView backgroundColor={'primary'} insertTop={false}>
      <Container pb={'32px'}>
        <BaseView flex={1} justifyContent={'center'} alignItems={'center'}>
          {/* <LogoImage source={require('@assets/images/logoBlue.png')}  /> */}
          <SvgXml
            xml={logoFull}
            width="209"
            height="37"
            fill={theme.colors.white}
          />
        </BaseView>
        <Animatable.View animation={'fadeInUp'} delay={50} duration={200}>
          <Button title="Login" onPress={() => navigation.navigate('Login')} />
        </Animatable.View>
      </Container>
    </MainAppBaseView>
  );
};

const LogoImage = styled.Image`
  width: 36px;
  height: 36px;
`;

export default Welcome;
