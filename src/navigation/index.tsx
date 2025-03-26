import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import bell from '../assets/bell.png';
import wallet from '../assets/icons/wallet.png';
import newspaper from '../assets/newspaper.png';
import Home from './screens/Home';
import { YarimillikSecim } from "./screens/YarimillikSecim";

import { YarimilHesablaDefault } from './screens/YarimilHesabla/YarimilHesablaDefault';
import { Yarimil3KSQBSQ } from './screens/YarimilHesabla/Yarimil3KSQBSQ';
import { Yarimil4KSQBSQ } from './screens/YarimilHesabla/Yarimil4KSQBSQ';
import { Yarimil5KSQBSQ } from './screens/YarimilHesabla/Yarimil5KSQBSQ';
import { Yarimil6KSQBSQ } from './screens/YarimilHesabla/Yarimil6KSQBSQ';
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
        title: 'Dəstək ol',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={wallet}
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
    Yarimil3KSQBSQ: {
      screen: Yarimil3KSQBSQ,
      options: {
        title: 'YARIMİLLİK QİYMƏTLƏNDİRMƏ',
        headerShown: false,
      },
    },
    Yarimil4KSQBSQ: {
      screen: Yarimil4KSQBSQ,
      options: {
        title: 'YARIMİLLİK QİYMƏTLƏNDİRMƏ',
        headerShown: false,
      },
    },
    Yarimil5KSQBSQ: {
      screen: Yarimil5KSQBSQ,
      options: {
        title: 'YARIMİLLİK QİYMƏTLƏNDİRMƏ',
        headerShown: false,
      },
    },
    Yarimil6KSQBSQ: {
      screen: Yarimil6KSQBSQ,
      options: {
        title: 'YARIMİLLİK QİYMƏTLƏNDİRMƏ',
        headerShown: false,
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
        // header: () => <YarimilSecimHeaderComp />,
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
    interface RootParamList extends RootStackParamList { }
  }
}
