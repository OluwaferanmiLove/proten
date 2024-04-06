import React, {ReactNode, useState} from 'react';
import {TextInputProps, LayoutAnimation} from 'react-native';
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

export interface InputProps {
  marginTop?: string;
  error?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  secureTextEntry?: boolean;
  label?: string;
  inputContainerStyles?: Partial<ContainerProps>;
  labelTextProps?: Omit<CustomTextProps, 'children'>;
  textInputProps?: TextInputProps &
    ColorProps &
    SpaceProps &
    FlexboxProps &
    BorderProps &
    PositionProps &
    BackgroundProps;
}

const Input: React.FC<InputProps> = ({
  label,
  labelTextProps,
  error,
  leftElement,
  rightElement,
  inputContainerStyles,
  textInputProps,
  marginTop,
}) => {
  const [isFocused, setISFocused] = useState(false);

  const onFocus = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setISFocused(true);
  };

  const onBlur = () => {
    setISFocused(false);
  };

  return (
    <InputContainer marginTop={marginTop}>
      <BaseView
        borderWidth={'1px'}
        borderRadius={'10px'}
        borderColor={isFocused ? 'primary' : '#E9E5E500'}
        backgroundColor={'inputBg'}
        paddingX={'17px'}
        paddingY={'8px'}
        justifyContent={'center'}
        height={'56px'}
        marginTop={label ? '8px' : '0px'}
        {...inputContainerStyles}>
        {(textInputProps?.value?.length! > 0 || isFocused) && (
          <CustomText.Caption
            color={'#58536E'}
            fontSize={'11px'}
            {...labelTextProps}>
            {textInputProps?.placeholder}
          </CustomText.Caption>
        )}
        <Row>
          {leftElement}
          <InputField
            flex={1}
            paddingBottom={'0px'}
            fontFamily={'SF-Pro-Display-Regular'}
            placeholderTextColor={'#A7A3B3'}
            color={'primary'}
            fontSize={'16px'}
            lineHeight={'24px'}
            onFocus={onFocus}
            onBlur={onBlur}
            style={{paddingVertical: 0, marginVertical: 0}}
            {...textInputProps}
          />
          {rightElement}
        </Row>
      </BaseView>
      {error && (
        <CustomText.Caption mt={'8px'} color={'red'}>
          {error}
        </CustomText.Caption>
      )}
    </InputContainer>
  );
};

const InputContainer = styled.View<SpaceProps & FlexboxProps>(
  compose(space, flexbox),
);

const InputField = styled.TextInput<
  ColorProps &
    SpaceProps &
    FlexboxProps &
    BorderProps &
    PositionProps &
    TypographyProps &
    BackgroundProps
>(compose(color, space, flexbox, border, position, typography, background));

export default Input;
