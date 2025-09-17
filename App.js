import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginSrceen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import { ThemeProvider } from "./context/ThemeContext";
import HomeScreen from "./src/screens/HomeScreen";
import ConfirmEmailScreen from "./src/screens/ConfirmEmailScreen";
import Dashboard from "./src/screens/Dashboard";
import { Provider } from "react-redux";
import { store } from "./src/api/store";
import WalletScreen from './src/screens/WalletScreen';
import SetGoalScreen from './src/screens/SetGoalScreen';
import SaveScreen from './src/screens/SaveScreen';
import FundWalletScreen from "./src/screens/FundWalletScreen";
import PaystackWebviewScreen from "./src/screens/PaystackWebviewScreen";
import FundSuccessScreen from "./src/screens/FundSuccessScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Register: RegisterScreen,
    Login: LoginScreen,
    ForgotPassword: ForgotPasswordScreen,
    ConfirmEmail: ConfirmEmailScreen,
    Dashboard: Dashboard,
    Wallet: WalletScreen,
    SetGoal: SetGoalScreen,
    Save: SaveScreen,
    FundWallet: FundWalletScreen,
    PaystackWebview: PaystackWebviewScreen,
    FundSuccess: FundSuccessScreen
  },
  {
    initialRouteName: 'Dashboard',
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const AppContainer = createAppContainer(navigator);

export default function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </ThemeProvider>
  );
}
