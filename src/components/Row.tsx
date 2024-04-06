import React, {ReactNode} from 'react';
import BaseView from './BaseView';
import {ContainerProps} from './Container';

interface RowProps extends ContainerProps {
  children: ReactNode;
}

const Row = ({children, ...rest}: RowProps) => {
  return (
    <BaseView
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      {...rest}>
      {children}
    </BaseView>
  );
};

export default Row;
