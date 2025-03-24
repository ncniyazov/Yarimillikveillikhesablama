import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import Home from './screens/Home';
import {YarimillikSecim} from "./screens/YarimillikSecim";

import { YarimilHesablaDefault } from './screens/YarimilHesabla/YarimilHesablaDefault';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { Updates } from './screens/Updates';
import { NotFound } from './screens/NotFound';
import { IllikHesabla } from './screens/IllikHesabla/IllikHesabla';
import IllikHeaderComp from './components/IllikHeaderComp';
import YarimilHeaderComp from './components/YarimilHeaderComp';
import YarimilSecimHeaderComp from './components/YarimilSecimHeaderComp';

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      
      screen: Home,
      options: {
        ScreenOptions: {
          header: () => <IllikHeaderComp />,
        },
        title: 'Əsas səhifə',
        
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Settings: {
      screen: Settings,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={bell}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    // IllikHesabla: {
    //   screen: IllikHesabla,
    //   options: {
    //     tabBarIcon: ({ color, size }) => (
    //       <Image
    //         source={bell}
    //         tintColor={color}
    //         style={{
    //           width: size,
    //           height: size,
    //         }}
    //       />
    //     ),
    //   },
    // },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    
    YarimilHesablaDefault: {
      screen: YarimilHesablaDefault,
      options: {
        title: 'YARIMİLLİK QİYMƏTLƏNDİRMƏ',
        // header: () => <YarimilHeaderComp />,
      },
    },
    IllikHesabla: {
      screen: IllikHesabla,
      options: {
        title: 'İLLİK QİYMƏTLƏNDİRMƏ',
        // header: () => <IllikHeaderComp />,
      },
    },
    YarimillikSecim: {
      screen: YarimillikSecim,
      options: {
        title: 'Yarımillik hesablama',
        header: () => <YarimilSecimHeaderComp />,
      },
    },
    Profile: {
      screen: Profile,
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
