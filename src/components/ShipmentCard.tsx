import React, {useState} from 'react';
import {GestureResponderEvent} from 'react-native';
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
import Checkbox from './Checkbox';
import {ShipmentType} from '@redux/shipment/Shipment';
import arrowRight1 from '@assets/svg/arrowRight1.svg';
import arrowRight2 from '@assets/svg/arrowRight2.svg';
import {SvgXml} from 'react-native-svg';
import arrowExpand from '@assets/svg/arrowExpand.svg';
import {LayoutAnimation} from 'react-native';
import theme from '@theme/theme';
import call from '@assets/svg/call.svg';
import whatsapp from '@assets/svg/whatsapp.svg';
import StatusPill from './StatusPill';

interface ShipmentCardProps
  extends ColorProps,
    SpaceProps,
    LayoutProps,
    FlexboxProps,
    BorderProps,
    PositionProps,
    BackgroundProps {
  shipmentData: ShipmentType;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}
const ShipmentCard: React.FC<ShipmentCardProps> = ({
  onPress,
  shipmentData,
  disabled,
  ...rest
}) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <ShipmentCardBase
      activeOpacity={0.8}
      onPress={onPress}
      borderRadius={'10px'}
      overflow={'hidden'}
      disabled={disabled}
      {...rest}>
      <Row background={'#F4F2F8'} p={'12px'}>
        <Checkbox />
        <BoxImage source={require('@assets/images/box1.png')} />
        <BaseView flex={1} mx={'14px'}>
          <CustomText.BodySmall fontSize={'13px'}>AWB</CustomText.BodySmall>
          <CustomText.BodyMedium
            fontFamily={'bold'}
            fontSize={'18px'}
            numberOfLines={1}>
            {shipmentData?.name}
          </CustomText.BodyMedium>
          <Row justifyContent={'flex-start'}>
            <CustomText.BodySmall
              fontSize={'13px'}
              color={'grey'}
              mr={'8px'}
              numberOfLines={1}>
              {shipmentData?.origin_city}
            </CustomText.BodySmall>
            <SvgXml xml={arrowRight1} />
            <CustomText.BodySmall
              fontSize={'13px'}
              color={'grey'}
              ml={'8px'}
              numberOfLines={1}>
              {shipmentData?.destination_city}
            </CustomText.BodySmall>
          </Row>
        </BaseView>
        <StatusPill mr={'20px'} title={shipmentData?.status} />
        <ExpandBtn
          activeOpacity={0.8}
          p={'4px'}
          backgroundColor={collapsed ? 'royalBlue400' : 'white'}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            setCollapsed(prev => !prev);
          }}
          borderRadius={'999px'}>
          <SvgXml
            xml={arrowExpand}
            stroke={collapsed ? 'white' : theme.colors.deepDenim}
          />
        </ExpandBtn>
      </Row>
      {collapsed && (
        <BaseView>
          <BaseView
            borderWidth={'2px'}
            borderColor={'white'}
            borderStyle={'dashed'}
          />
          <BaseView background={'#F4F2F880'} p={'12px'}>
            <Row>
              <BaseView>
                <CustomText.BodySmall fontSize={'13px'} color={'royalBlue'}>
                  Origin
                </CustomText.BodySmall>
                <CustomText.BodyMedium
                  fontFamily={'medium'}
                  fontSize={'16px'}
                  numberOfLines={1}>
                  {shipmentData?.origin_city}
                </CustomText.BodyMedium>
                <CustomText.BodySmall
                  fontSize={'13px'}
                  color={'grey'}
                  numberOfLines={1}>
                  Dokki, 22 Nile St.
                </CustomText.BodySmall>
              </BaseView>
              <SvgXml xml={arrowRight2} />
              <BaseView>
                <CustomText.BodySmall fontSize={'13px'} color={'royalBlue'}>
                  Destination
                </CustomText.BodySmall>
                <CustomText.BodyMedium
                  fontFamily={'medium'}
                  fontSize={'16px'}
                  numberOfLines={1}>
                  {shipmentData?.destination_city}
                </CustomText.BodyMedium>
                <CustomText.BodySmall
                  fontSize={'13px'}
                  color={'grey'}
                  numberOfLines={1}>
                  Smoha, 22 max St.
                </CustomText.BodySmall>
              </BaseView>
            </Row>
            <Row justifyContent={'flex-end'} mt={'24px'}>
              <BaseView>
                <Row
                  justifyContent={'center'}
                  backgroundColor={'royalBlue400'}
                  py={'10px'}
                  borderRadius={'10px'}
                  px={'14px'}>
                  <SvgXml xml={call} />
                  <CustomText.BodyMedium color={'white'} ml={'8px'}>
                    Call
                  </CustomText.BodyMedium>
                </Row>
              </BaseView>
              <BaseView ml={'14px'}>
                <Row
                  justifyContent={'center'}
                  backgroundColor={'#25D366'}
                  py={'10px'}
                  borderRadius={'10px'}
                  px={'14px'}>
                  <SvgXml xml={whatsapp} />
                  <CustomText.BodyMedium color={'white'} ml={'8px'}>
                    Whatsapp
                  </CustomText.BodyMedium>
                </Row>
              </BaseView>
            </Row>
          </BaseView>
        </BaseView>
      )}
    </ShipmentCardBase>
  );
};

const ShipmentCardBase = styled.TouchableOpacity<
  ColorProps &
    SpaceProps &
    LayoutProps &
    FlexboxProps &
    BorderProps &
    PositionProps &
    BackgroundProps
>(compose(color, space, layout, flexbox, border, position, background));

const ExpandBtn = styled.TouchableOpacity<
  ColorProps &
    SpaceProps &
    LayoutProps &
    FlexboxProps &
    BorderProps &
    PositionProps &
    BackgroundProps
>(compose(color, space, layout, flexbox, border, position, background));

const BoxImage = styled.Image`
  width: 40px;
  height: 40px;
  margin-left: 14px;
`;

export default ShipmentCard;
