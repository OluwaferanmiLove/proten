import React, {ReactNode} from 'react';
import SafeView from './SafeView';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ColorProps,
  FlexboxProps,
  SpaceProps,
  LayoutProps,
  BorderProps,
  PositionProps,
  BackgroundProps,
} from 'styled-system';
import {Platform} from 'react-native';

interface MainAppBaseViewProps
  extends ColorProps,
    SpaceProps,
    LayoutProps,
    FlexboxProps,
    BorderProps,
    PositionProps,
    BackgroundProps {
  children: ReactNode;
  insertTop?: boolean;
}

const MainAppBaseView = ({
  children,
  insertTop = true,
  ...rest
}: MainAppBaseViewProps) => {
  const inserts = useSafeAreaInsets();
  let top = Platform.select({android: inserts.top, ios: 24});

  return (
    <SafeView flex={1} paddingTop={insertTop ? `${top!}px` : '0px'} {...rest}>
      {children}
    </SafeView>
  );
};

export default MainAppBaseView;
