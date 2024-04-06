import React from 'react';
import styled from 'styled-components/native';
import BaseView from './BaseView';
import Row from './Row';
import logoFull from '@assets/svg/logoFull.svg';
import bell from '@assets/svg/bell.svg';
import theme from '@theme/theme';
import {SvgXml} from 'react-native-svg';

export interface HeaderProps {
  marginTop?: string;
}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <BaseView py={'16px'} px={'16px'}>
      <Row>
        <ProfileImage source={{uri: 'https://random.imagecdn.app/150/150'}} />
        <SvgXml
          xml={logoFull}
          width="92"
          height="16"
          fill={theme.colors.primary}
        />
        <BaseView
          backgroundColor={'#F4F2F8'}
          padding={'8px'}
          borderRadius={'999px'}>
          <SvgXml xml={bell} />
        </BaseView>
      </Row>
    </BaseView>
  );
};

const ProfileImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 999px;
`;

export default Header;
