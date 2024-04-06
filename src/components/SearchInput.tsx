import React, {ReactNode, useState} from 'react';
import {TextInputProps} from 'react-native';
import styled from 'styled-components/native';
import {
  ColorProps,
  FlexboxProps,
  SpaceProps,
  BorderProps,
  PositionProps,
  BackgroundProps,
  color,
  space,
  flexbox,
  border,
  position,
  background,
  compose,
  typography,
  TypographyProps,
} from 'styled-system';
import BaseView from './BaseView';
import {ContainerProps} from './Container';
import CustomText, {CustomTextProps} from './CustomText';
import Row from './Row';
import {SvgXml} from 'react-native-svg';
import search from '@assets/svg/search.svg';
import close from '@assets/svg/close.svg';
import theme from '@theme/theme';

export interface SearchInputProps {
  textInputProps?: TextInputProps &
    ColorProps &
    SpaceProps &
    FlexboxProps &
    BorderProps &
    PositionProps &
    BackgroundProps;
}

const SearchInput: React.FC<SearchInputProps> = ({textInputProps}) => {
  const [isFocused, setISFocused] = useState(false);

  const onFocus = () => {
    setISFocused(true);
  };

  const onBlur = () => {
    setISFocused(false);
  };

  return (
    <BaseView
      borderWidth={'1px'}
      borderRadius={'10px'}
      borderColor={isFocused ? 'royalBlue400' : '#E9E5E500'}
      backgroundColor={'#F4F2F8'}
      paddingX={'14px'}
      paddingY={'6px'}
      justifyContent={'center'}>
      <Row>
        <SvgXml
          xml={search}
          stroke={isFocused ? theme.colors.royalBlue400 : '#A7A3B3'}
        />
        <InputField
          flex={1}
          paddingBottom={'0px'}
          fontFamily={'SF-Pro-Display-Regular'}
          placeholderTextColor={'#A7A3B3'}
          ml={'8px'}
          color={'primary'}
          fontSize={'16px'}
          lineHeight={'24px'}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={'Search'}
          style={{paddingVertical: 0, marginVertical: 0}}
          {...textInputProps}
        />
        <SvgXml
          xml={close}
          stroke={
            textInputProps?.value?.length! > 0
              ? theme.colors.royalBlue400
              : '#A7A3B300'
          }
        />
      </Row>
    </BaseView>
  );
};

const InputField = styled.TextInput<
  ColorProps &
    SpaceProps &
    FlexboxProps &
    BorderProps &
    PositionProps &
    TypographyProps &
    BackgroundProps
>(compose(color, space, flexbox, border, position, typography, background));

export default SearchInput;
