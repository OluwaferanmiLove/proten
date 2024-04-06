import React, {useEffect, useState} from 'react';
import updateStatusBar from '@hooks/updateStatusBar';
import BaseView from '@components/BaseView';
import Container from '@components/Container';
import {useDispatch, useSelector} from 'react-redux';
import {SvgXml} from 'react-native-svg';
import styled from 'styled-components/native';
import * as NavigationBar from 'expo-navigation-bar';
import {Platform} from 'react-native';
import theme from '@theme/theme';
import MainAppBaseView from '@components/MainAppBaseView';
import Row from '@components/Row';
import CustomText from '@components/CustomText';
import Header from '@components/Header';
import SearchInput from '@components/SearchInput';
import {RootState, persistor} from '@redux/store';
import scan from '@assets/svg/scan.svg';
import filter from '@assets/svg/filter.svg';
import {ScrollView} from 'react-native';
import Checkbox from '@components/Checkbox';
import {useLazyGetShipmentQuery} from '@redux/shipment/shipmentApi';
import ShipmentCard from '@components/ShipmentCard';
import {ActivityIndicator} from 'react-native';
import FilterModal from '@components/FilterModal';
import {TouchableOpacity} from 'react-native';
import {revertAll} from '@redux/sharedAction';
import {userAuthenticated} from '@redux/auth/authSlice';

const Home = () => {
  const [filterModal, setFilterModal] = useState(false);
  updateStatusBar('dark-content', 'transparent', false);
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  const [test, {data: shipments, isLoading, error}] = useLazyGetShipmentQuery();

  const getShipmentList = async () => {
    try {
      await test({
        doctype: 'AWB',
        fields: ['*'],
      }).unwrap();
    } catch (error) {
      console.log({error});
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(revertAll());
      persistor.purge();
      dispatch(userAuthenticated(false));
    } catch (error: any) {
      // showError(error);
    }
  };

  useEffect(() => {
    getShipmentList();
    // handleLogout();
  }, []);

  const setNavBarBackground = async () => {
    if (Platform.OS === 'android') {
      await NavigationBar.setButtonStyleAsync('dark');
      await NavigationBar.setBackgroundColorAsync(theme.colors.white);
    }
  };

  useEffect(() => {
    setNavBarBackground();
  }, []);

  return (
    <MainAppBaseView backgroundColor={'white'} insertTop={true}>
      <Header />
      <ScrollView>
        <Container px={'16px'} pb={'32px'}>
          <BaseView pb={'12px'}>
            <CustomText.BodyMedium fontSize={'14px'} color={'grey'}>
              Hello,
            </CustomText.BodyMedium>
            <CustomText.Heading3 fontSize={'28px'}>
              {user?.full_name}
            </CustomText.Heading3>
          </BaseView>
          <BaseView mt={'0px'}>
            <SearchInput />
          </BaseView>
          <Row mt={'24px'}>
            <BaseView flex={1}>
              <TouchableOpacity onPress={() => setFilterModal(true)}>
                <Row
                  justifyContent={'center'}
                  backgroundColor={'#F4F2F8'}
                  py={'10px'}
                  borderRadius={'10px'}>
                  <SvgXml xml={filter} />
                  <CustomText.BodyMedium color={'cyan'} ml={'14px'}>
                    Filters
                  </CustomText.BodyMedium>
                </Row>
              </TouchableOpacity>
            </BaseView>
            <BaseView flex={1} ml={'14px'}>
              <Row
                justifyContent={'center'}
                backgroundColor={'primary'}
                py={'10px'}
                borderRadius={'10px'}>
                <SvgXml xml={scan} />
                <CustomText.BodyMedium color={'white'} ml={'14px'}>
                  Add Scan
                </CustomText.BodyMedium>
              </Row>
            </BaseView>
          </Row>
          <Row mt={'32px'}>
            <CustomText.Heading3 fontSize={'22px'}>
              Shipments
            </CustomText.Heading3>
            <Checkbox label={'Mark All'} />
          </Row>

          <BaseView mt={'16px'}>
            {isLoading && (
              <ActivityIndicator size={'small'} color={theme.colors.primary} />
            )}
            {shipments?.message?.map(item => (
              <ShipmentCard shipmentData={item} mb={'8px'} />
            ))}
          </BaseView>
        </Container>
      </ScrollView>
      <FilterModal
        isVisible={filterModal}
        closeModal={() => setFilterModal(false)}
      />
    </MainAppBaseView>
  );
};

export default Home;
