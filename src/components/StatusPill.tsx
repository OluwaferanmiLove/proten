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

interface StatusPillProps
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
  statusType?: StatusType;
  onPress?: (event: GestureResponderEvent) => void;
}

export enum StatusType {
  'RECEIVED' = 'RECEIVED',
  'DELIVERED' = 'DELIVERED',
  'CANCELLED' = 'CANCELLED',
  'ON_HOLD' = 'ON HOLD',
}

const StatusPill: React.FC<StatusPillProps> = ({
  onPress,
  title,
  isLoading,
  textColor = 'royalBlue',
  backgroundColor = 'white',
  statusType = StatusType.CANCELLED,
  disabled,
  ...rest
}) => {
  const statusPillVariants = {
    [StatusType.CANCELLED]: {
      backgroundColor: '#F4F2F8',
      textColor: '#58536E',
    },
    [StatusType.RECEIVED]: {
      backgroundColor: '#D9E6FD',
      textColor: '#2F50C1',
    },
    [StatusType.DELIVERED]: {
      backgroundColor: '#D9E6FD',
      textColor: '#2F50C1',
    },
    [StatusType.ON_HOLD]: {
      backgroundColor: '#D9E6FD',
      textColor: '#2F50C1',
    },
  };
  return (
    <StatusPillBase
      activeOpacity={0.8}
      onPress={onPress}
      paddingY={'2px'}
      paddingX={'6px'}
      borderColor={'white'}
      borderWidth={'1px'}
      alignItems={'center'}
      justifyContent={'center'}
      backgroundColor={statusPillVariants[statusType].backgroundColor}
      borderRadius={'4px'}
      disabled={disabled}
      {...rest}>
      <CustomText.BodySmall
        color={statusPillVariants[statusType].textColor}
        fontFamily={'medium'}
        fontSize={'11px'}>
        {title}
      </CustomText.BodySmall>
    </StatusPillBase>
  );
};

const StatusPillBase = styled.TouchableOpacity<
  ColorProps &
    SpaceProps &
    LayoutProps &
    FlexboxProps &
    BorderProps &
    PositionProps &
    BackgroundProps
>(compose(color, space, layout, flexbox, border, position, background));

export default StatusPill;
