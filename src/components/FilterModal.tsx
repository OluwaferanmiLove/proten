import React, {ReactNode, useEffect, useRef, useState} from 'react';
import Modal, {ModalProps} from 'react-native-modal';
import Row from './Row';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native';
import BaseView from './BaseView';
import {snapPoint, useVector} from 'react-native-redash';
import CustomText from './CustomText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Platform} from 'react-native';
import {useLazyGetShipmentQuery} from '@redux/shipment/shipmentApi';
import {TouchableOpacity} from 'react-native';
import {ActivityIndicator} from 'react-native';
import theme from '@theme/theme';

export interface FilterModalProps extends Partial<ModalProps> {
  children?: ReactNode;
  footerElement?: ReactNode;
  closeModal: () => void;
  showButton?: boolean;
  isList?: boolean;
  title?: string;
}

const FilterModal = ({
  children,
  footerElement,
  title,
  showButton = true,
  closeModal = () => {},
  ...rest
}: FilterModalProps) => {
  const [height, setHeight] = useState(0);

  const isGestureActive = useSharedValue(false);
  const translation = useVector();

  const insets = useSafeAreaInsets();

  const onGestureEvent = Gesture.Pan()
    .onStart(() => (isGestureActive.value = true))
    .onChange(({translationY}) => {
      const isPositiveNumber = Math.sign(translationY);
      if (isPositiveNumber === 1) {
        translation.y.value = translationY;
      }
    })
    .onEnd(({translationY, velocityY}) => {
      console.log('ended');
      const snapBack =
        snapPoint(translationY, velocityY, [0, height]) === height;

      if (snapBack) {
        runOnJS(closeModal)();
        translation.y.value = withDelay(900, withTiming(0));
      } else {
        isGestureActive.value = false;
        translation.y.value = withSpring(0);
      }
    });

  const style = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translation.y.value}],
    };
  });

  const borderStyle = useAnimatedStyle(() => {
    return {
      borderRadius: withTiming(isGestureActive.value ? 24 : 0),
    };
  });

  const [test, {data: shipmentStatus, isLoading, error}] =
    useLazyGetShipmentQuery();

  const getShipmentStatusList = async () => {
    try {
      await test({
        doctype: 'AWB Status',
        fields: ['*'],
      }).unwrap();
    } catch (error) {
      console.log({error});
    }
  };

  useEffect(() => {
    getShipmentStatusList();
  }, []);

  return (
    <Modal
      avoidKeyboard={true}
      onBackdropPress={() => closeModal()}
      backdropColor={'#1E1E1E80'}
      useNativeDriverForBackdrop={true}
      onBackButtonPress={() => closeModal!()}
      style={{flex: 1, justifyContent: 'flex-end', margin: 0}}
      {...rest}>
      <SafeAreaView />
      <GestureDetector gesture={onGestureEvent}>
        <Animated.View
          style={[style, {justifyContent: 'flex-end'}]}
          onLayout={e => {
            setHeight(e.nativeEvent.layout.height);
          }}>
          <BaseView
            backgroundColor={'white'}
            borderTopLeftRadius={'20px'}
            borderTopRightRadius={'20px'}
            style={{
              paddingBottom: Platform.select({ios: insets.bottom, android: 24}),
            }}>
            <BaseView
              mt={'10px'}
              mb={'14px'}
              alignSelf={'center'}
              borderRadius={'30px'}
              backgroundColor={'#A7A3B3'}
              height={'5px'}
              width={'36px'}
            />
            <Row
              px={'16px'}
              borderBottomWidth={'1px'}
              paddingBottom={'12px'}
              borderBottomColor={'#EAE7F2'}>
              <CustomText.BodyMedium
                fontFamily={'medium'}
                onPress={closeModal}
                fontSize={'16px'}
                color={'royalBlue'}>
                Cancel
              </CustomText.BodyMedium>
              <CustomText.BodyMedium fontFamily={'bold'} fontSize={'18px'}>
                Filters
              </CustomText.BodyMedium>
              <CustomText.BodyMedium
                fontFamily={'medium'}
                onPress={closeModal}
                fontSize={'16px'}
                color={'royalBlue'}>
                Done
              </CustomText.BodyMedium>
            </Row>
            <BaseView mx={'16px'} mt={'12px'}>
              <CustomText.BodyMedium
                fontFamily={'medium'}
                fontSize={'13px'}
                color={'grey'}>
                SHIPMENT STATUS
              </CustomText.BodyMedium>
              {isLoading && (
                <ActivityIndicator
                  size={'small'}
                  color={theme.colors.primary}
                />
              )}
              <Row justifyContent={'flex-start'} mt={'12px'}>
                {shipmentStatus?.message?.map(item => (
                  <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                    <BaseView
                      paddingY={'9px'}
                      paddingX={'14px'}
                      mr={'10px'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      backgroundColor={'#F4F2F8'}
                      borderRadius={'10px'}>
                      <CustomText.BodyMedium
                        color={'#58536E'}
                        fontFamily={'medium'}
                        fontSize={'16px'}>
                        {item.name}
                      </CustomText.BodyMedium>
                    </BaseView>
                  </TouchableOpacity>
                ))}
              </Row>
            </BaseView>
          </BaseView>
        </Animated.View>
      </GestureDetector>
    </Modal>
  );
};

export default FilterModal;
