import React, {ReactNode} from 'react';
import {TextProps, TextStyle} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  ColorProps,
  FlexProps,
  LayoutProps,
  SpaceProps,
  TextStyleProps,
  TypographyProps,
} from 'styled-system';
import BaseText from './BaseText';

export interface CustomTextProps
  extends TextProps,
    TextStyleProps,
    TypographyProps,
    SpaceProps,
    ColorProps,
    LayoutProps,
    FlexProps {
  children: ReactNode;
  fontFamily?:
    | 'black'
    | 'bold'
    | 'extraBold'
    | 'extraLight'
    | 'light'
    | 'medium'
    | 'regular'
    | 'semiBold'
    | 'thin'
    | 'mediumItalic';
}

/**
 * Geneic text component, you con proceed to change the font famil to get the variant.
 * more like empty text components
 */
const Text: React.FC<CustomTextProps> = ({children, ...rest}) => {
  return (
    <BaseText fontFamily={'regular'} {...rest}>
      {children}
    </BaseText>
  );
};

/**
 * Heading3 text component, you con proceed to change the font famil to get the variant.
 * Font size 24px
 * line heaight 32px
 */
const Heading5: React.FC<CustomTextProps> = ({children, ...rest}) => {
  return (
    <BaseText
      fontFamily={'extraBold'}
      fontSize={'18px'}
      lineHeight={'24px'}
      color={'black'}
      {...rest}>
      {children}
    </BaseText>
  );
};

/**
 * Heading3 text component, you con proceed to change the font famil to get the variant.
 * Font size 24px
 * line heaight 32px
 */
const Heading3: React.FC<CustomTextProps> = ({children, ...rest}) => {
  return (
    <BaseText
      fontFamily={'bold'}
      fontSize={'24px'}
      lineHeight={'32px'}
      color={'black'}
      {...rest}>
      {children}
    </BaseText>
  );
};

/**
 * Body text component, you con proceed to change the font famil to get the variant.
 * Font size 14px
 * line heaight 22px
 */
const BodySmall: React.FC<CustomTextProps> = ({children, ...rest}) => {
  return (
    <BaseText
      fontFamily={'regular'}
      fontSize={'14px'}
      lineHeight={'24px'}
      color={'black'}
      {...rest}>
      {children}
    </BaseText>
  );
};

/**
 * Body text component, you con proceed to change the font famil to get the variant.
 * Font size 14px
 * line heaight 22px
 */
const BodyMedium: React.FC<CustomTextProps> = ({children, ...rest}) => {
  return (
    <BaseText
      fontFamily={'regular'}
      fontSize={'17px'}
      lineHeight={'24px'}
      color={'black'}
      {...rest}>
      {children}
    </BaseText>
  );
};

/**
 * BodyMedium text component, you con proceed to change the font famil to get the variant.
 * Font size 16px
 * line heaight 24px
 */
const BodyLarge: React.FC<CustomTextProps> = ({children, ...rest}) => {
  return (
    <BaseText
      fontFamily={'regular'}
      fontSize={'18px'}
      lineHeight={'23px'}
      color={'black'}
      {...rest}>
      {children}
    </BaseText>
  );
};

/**
 * Feature text component, you con proceed to change the font famil to get the variant.
 * Font size 12px
 * line heaight 16px
 */
const Caption: React.FC<CustomTextProps> = ({children, ...rest}) => {
  return (
    <BaseText
      fontFamily={'regular'}
      fontSize={'12px'}
      lineHeight={'16px'}
      color={'black'}
      {...rest}>
      {children}
    </BaseText>
  );
};

const CustomText = {
  Text,
  BodyLarge,
  BodyMedium,
  BodySmall,
  Caption,
  Heading3,
  Heading5,
};

export default CustomText;
