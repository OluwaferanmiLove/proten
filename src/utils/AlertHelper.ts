import {DropdownAlertType} from 'react-native-dropdownalert';
import {Platform, StatusBar, StatusBarStyle} from 'react-native';

export class AlertHelper {
  static dropDown: any;
  static onClose: () => void;
  static statusBarStyle: StatusBarStyle = 'dark-content';

  static setStatusBarStyle(style: StatusBarStyle) {
    this.statusBarStyle = style;
  }

  static setDropDown(dropDown: any) {
    this.dropDown = dropDown;
  }

  static show(type: DropdownAlertType, title: string = '', message: string) {
    if (this.dropDown) {
      this.dropDown.alertWithType(type, title, message);
    }
  }

  static setOnClose(onClose: () => void) {
    this.onClose = onClose;
  }

  static invokeOnClose() {
    setTimeout(() => {
      StatusBar.setBarStyle(this.statusBarStyle, true);
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('white', true);
      }
      this.setStatusBarStyle('dark-content');
    }, 100);
    if (typeof this.onClose === 'function') {
      this.onClose();
    }
  }
}
