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

interface ButtonProps
  extends ColorProps,
    SpaceProps,
    LayoutProps,
    FlexboxProps,
    BorderProps,
    PositionProps,
    BackgroundProps {
  title: string;
  isLoading?: boolean;
  textColor?: string;
  backgroundColor?: string;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

/**
 * Base button
 * This components extends basetext components to display the text
 * you can use baseTextProps to control how th text look.
 */

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  isLoading,
  textColor = 'royalBlue',
  backgroundColor = 'white',
  disabled,
  ...rest
}) => {
  return (
    <ButtonBase
      activeOpacity={0.8}
      onPress={onPress}
      paddingY={'17px'}
      paddingX={'17px'}
      backgroundColor={backgroundColor}
      borderRadius={'10px'}
      disabled={disabled}
      {...rest}>
      <Row>
        {isLoading ? (
          <BaseView flex={1} alignItems={'center'} justifyContent={'center'}>
            <ActivityIndicator size={'small'} color={textColor} />
          </BaseView>
        ) : (
          <CustomText.BodyMedium
            color={textColor}
            fontFamily={'bold'}
            flex={1}
            textAlign={'center'}>
            {title}
          </CustomText.BodyMedium>
        )}
      </Row>
    </ButtonBase>
  );
};

const ButtonBase = styled.TouchableOpacity<
  ColorProps &
    SpaceProps &
    LayoutProps &
    FlexboxProps &
    BorderProps &
    PositionProps &
    BackgroundProps
>(compose(color, space, layout, flexbox, border, position, background));

export default Button;
