import React from 'react';
import BaseView from './BaseView';
import CustomText from './CustomText';
import Row from './Row';
import Button from './Button';

interface EmptyStateProps {
  description: string;
  showPrimaryBtn?: boolean;
  primaryBtnTitle?: string;
  onPressPrimaryBtn?: () => void;
  secondaryBtnTitle?: string;
  showSecondaryBtn?: boolean;
  onPressSecondaryBtn?: () => void;
}

const EmptyState = ({
  description,
  showPrimaryBtn,
  primaryBtnTitle,
  onPressPrimaryBtn,
  showSecondaryBtn,
  secondaryBtnTitle,
  onPressSecondaryBtn,
}: EmptyStateProps) => (
  <BaseView
    flex={1}
    paddingX={'24px'}
    alignItems={'center'}
    justifyContent={'center'}>
    <CustomText.BodyMedium
      fontFamily={'bold'}
      marginTop={'24px'}
      textAlign={'center'}
      color={'black'}>
      {description}
    </CustomText.BodyMedium>
    <Row marginTop={'35px'}>
      {showPrimaryBtn && (
        <Button
          onPress={onPressPrimaryBtn}
          backgroundColor={'secondary'}
          borderColor={'primary'}
          width={'48%'}
          marginRight={'10px'}
          title={primaryBtnTitle!}
        />
      )}
      {showSecondaryBtn && (
        <Button
          onPress={onPressSecondaryBtn}
          backgroundColor={'#FEEDD1'}
          // borderColor={'primary'}
          width={'48%'}
          title={secondaryBtnTitle!}
          textColor={'primary'}
          marginLeft={'10px'}
        />
      )}
    </Row>
  </BaseView>
);

export default EmptyState;
