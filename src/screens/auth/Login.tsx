import React, {useEffect} from 'react';
import updateStatusBar from '@hooks/updateStatusBar';
import BaseView from '@components/BaseView';
import Container from '@components/Container';
import {useDispatch} from 'react-redux';
import {SvgXml} from 'react-native-svg';
import styled from 'styled-components/native';
import * as NavigationBar from 'expo-navigation-bar';
import {Platform} from 'react-native';
import theme from '@theme/theme';
import MainAppBaseView from '@components/MainAppBaseView';
import Button from '@components/Button';
import chevronBack from '@assets/svg/chevronBack.svg';
import Row from '@components/Row';
import CustomText from '@components/CustomText';
import Input from '@components/Input';
import {useLoginMutation} from '@redux/auth/authApi';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {setUser, userAuthenticated} from '@redux/auth/authSlice';
import {Keyboard} from 'react-native';
import {AlertHelper} from '@utils/AlertHelper';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const schema = yup.object().shape({
  pwd: yup.string().required('Password is required'),
  usr: yup.string().required('Please enter your email or username'),
});

interface FormValues {
  usr: string;
  pwd: string;
}

const Login = () => {
  updateStatusBar('dark-content', 'transparent', false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const setNavBarBackground = async () => {
    if (Platform.OS === 'android') {
      await NavigationBar.setButtonStyleAsync('dark');
      await NavigationBar.setBackgroundColorAsync(theme.colors.white);
    }
  };

  const [logIn, {isLoading}] = useLoginMutation();

  useEffect(() => {
    setNavBarBackground();
  }, []);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({resolver: yupResolver(schema)});

  const handleLogin: SubmitHandler<FormValues> = async data => {
    try {
      Keyboard.dismiss();
      let res = await logIn({
        ...data,
      }).unwrap();

      dispatch(userAuthenticated(true));
      dispatch(setUser(res));
      AlertHelper.show('success', 'Success', 'Welcome Successfull');
    } catch (error: any) {
      console.log(error);
      AlertHelper.show('error', 'Error', error?.data?.message);
    }
  };

  return (
    <MainAppBaseView backgroundColor={'white'} insertTop={true}>
      <Container
        px={'16px'}
        pb={'32px'}
        pt={Platform.OS === 'android' ? '12px' : '24px'}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Row justifyContent={'start'}>
            <SvgXml xml={chevronBack} />
            <CustomText.BodyMedium color={'primary'} ml={'4px'}>
              Cancel
            </CustomText.BodyMedium>
          </Row>
        </TouchableOpacity>
        <BaseView flex={1} mt={'24px'}>
          <CustomText.Heading3 fontSize={'34px'}>Login</CustomText.Heading3>
          <CustomText.BodyMedium fontSize={'17px'} mt={'16px'} color={'grey'}>
            Please enter your First, Last name and your phone number in order to
            register
          </CustomText.BodyMedium>
          <BaseView marginTop={'32px'}>
            {/* <Input textInputProps={{placeholder: 'URL'}} /> */}

            <Controller
              name="usr"
              control={control}
              render={({field: {onChange, value}}) => (
                <Input
                  textInputProps={{
                    placeholder: 'Username/Email',
                    onChangeText: text => onChange(text),
                    autoFocus: true,
                    autoCapitalize: 'none',
                    keyboardType: 'email-address',
                    value,
                  }}
                  // marginTop={'28px'}
                  error={errors.usr?.message}
                />
              )}
            />
            <Controller
              name="pwd"
              control={control}
              render={({field: {onChange, value}}) => (
                <Input
                  textInputProps={{
                    placeholder: 'Password',
                    onChangeText: text => onChange(text),
                    autoCapitalize: 'none',
                    value,
                  }}
                  marginTop={'28px'}
                  error={errors.pwd?.message}
                />
              )}
            />
          </BaseView>
        </BaseView>
        <Button
          title="Login"
          backgroundColor={'primary'}
          textColor={'white'}
          onPress={handleSubmit(handleLogin)}
          isLoading={isLoading}
        />
      </Container>
    </MainAppBaseView>
  );
};

export default Login;
