import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type HomeTabParamList = {
  Home: undefined;
  YarimillikSecim: undefined;
  IllikHesabla: undefined;
};

export type RootNavigatorParamList = {
  HomeTabs: NavigatorScreenParams<HomeTabParamList>;
  YarimillikSecim: undefined;
  IllikHesabla: undefined;
  YarimilHesablaDefault: { ksqCount: number; hasBigSummative: boolean };
  Yarimil3KSQBSQ: { ksqCount: number; hasBigSummative: boolean };
  Yarimil4KSQBSQ: { ksqCount: number; hasBigSummative: boolean };
  Yarimil5KSQBSQ: { ksqCount: number; hasBigSummative: boolean };
  Yarimil6KSQBSQ: { ksqCount: number; hasBigSummative: boolean };
  // ... other screens ...
};

export type RootStackNavigationProp = StackNavigationProp<RootNavigatorParamList>;