import React, {ReactNode} from 'react';
import {StyleSheet, GestureResponderEvent, View} from 'react-native';
import CustomText from './CustomText';
import styled from 'styled-components/native';
import {
  color,
  space,
  layout,
  flexbox,
  border,
  position,
  compose,
  ColorProps,
  FlexboxProps,
  background,
  SpaceProps,
  LayoutProps,
  BorderProps,
  PositionProps,
  BackgroundProps,
} from 'styled-system';
import BaseView from './BaseView';
import Row from './Row';
import {ActivityIndicator} from 'react-native';
import check from '@assets/svg/check.svg';
import {SvgXml} from 'react-native-svg';

interface CheckboxProps
  extends ColorProps,
    SpaceProps,
    LayoutProps,
    FlexboxProps,
    BorderProps,
    PositionProps,
    BackgroundProps {
  isActive?: boolean;
  label?: string;
  textColor?: string;
  backgroundColor?: string;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

/**
 * Base Checkbox
 * This components extends basetext components to display the text
 * you can use baseTextProps to control how th text look.
 */

const Checkbox: React.FC<CheckboxProps> = ({
  onPress,
  isActive,
  label,
  textColor = 'royalBlue',
  disabled,
  ...rest
}) => {
  return (
    <CheckboxBase
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      {...rest}>
      <Row>
        <BaseView
          p={'2px'}
          backgroundColor={isActive ? '#D9E6FD' : 'white'}
          border={isActive ? 'royalBlue' : '#D0D5DD'}
          borderWidth={'1px'}
          borderRadius={'4px'}>
          <BaseView opacity={isActive ? 1 : 0}>
            <SvgXml xml={check} />
          </BaseView>
        </BaseView>
        {label && (
          <CustomText.BodyMedium color={textColor} ml={'8px'}>
            {label}
          </CustomText.BodyMedium>
        )}
      </Row>
    </CheckboxBase>
  );
};

const CheckboxBase = styled.TouchableOpacity<
  ColorProps &
    SpaceProps &
    LayoutProps &
    FlexboxProps &
    BorderProps &
    PositionProps &
    BackgroundProps
>(compose(color, space, layout, flexbox, border, position, background));

export default Checkbox;
