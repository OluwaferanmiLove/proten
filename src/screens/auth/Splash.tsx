import React, {useEffect, useState} from 'react';
import updateStatusBar from '@hooks/updateStatusBar';
import BaseView from '@components/BaseView';
import Container from '@components/Container';
import { useDispatch } from 'react-redux';
import logoBlue from '@assets/svg/logoBlue.svg';
import { SvgXml } from 'react-native-svg';
import styled from 'styled-components/native';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';

const Splash = () => {
  updateStatusBar('dark-content', 'transparent', false);
  const dispatch = useDispatch();

  const setNavBarBackground = async () => {
    if (Platform.OS === 'android') {
      await NavigationBar.setButtonStyleAsync("dark");
      await NavigationBar.setBackgroundColorAsync("white");
    }
  }

  useEffect(() => {
    setNavBarBackground()
  }, [])


  return (
    <BaseView flex={1} backgroundColor={'white'} justifyContent={'center'} alignItems={'center'}>
      {/* <StatusBar hidden={true} /> */}
      <LogoImage source={require('@assets/images/logoBlue.png')} />
    </BaseView>
  );
};

const LogoImage = styled.Image`
  width: 36px;
  height: 36px;
`;

export default Splash;
