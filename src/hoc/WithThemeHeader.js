import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme, lightTheme } from '../../context/ThemeContext';

const withThemeHeader = (Component, title = '') => {
  const Wrapped = (props) => {
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
      props.navigation.setParams({
        themeContext: { theme, toggleTheme },
        themeVersion: Date.now(), // force update
      });
    }, [theme]);

    return <Component {...props} />;
  };

  Wrapped.navigationOptions = ({ navigation }) => {
    const { theme, toggleTheme } = navigation.getParam('themeContext') || {};

    return {
      title: navigation.getParam('title', title),
      headerStyle: {
        backgroundColor: theme?.background || '#fff',
      },
      headerTitleStyle: {
        color: theme?.text || '#000',
      },
      headerRight: () => (
        <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
          <FontAwesome5
            name={theme === lightTheme ? 'moon' : 'sun'}
            size={18}
            color={theme?.text || '#000'}
          />
        </TouchableOpacity>
      ),
    };
  };

  return Wrapped;
};

export default withThemeHeader;
