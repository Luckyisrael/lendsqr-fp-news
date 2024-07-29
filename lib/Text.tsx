/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Text as RNText, type TextProps, TextStyle, StyleSheet, Appearance } from 'react-native';
import { moderateScale } from './ResponsiveSize';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  children:
  | React.ReactElement
  | React.ReactElement[]
  | React.JSX.Element
  | string
  | string[]
  | React.JSX.Element[]
  | number
  | number[];
size?: number;
color?: string;
style?: TextStyle;
numberOfLines?: number;
family?:
  | 'bold'
  | 'medium'
  | 'light'
  | 'regular'
  | 'semi-bold'
  | 'extra-bold'
  | 'extra-light';
};

const Text = ({color, children, size, style, numberOfLines, family}: ThemedTextProps) => {
  return (
    <RNText 
      style={[
        {
          fontSize: moderateScale(size || 12),
          fontFamily: renderFamily(family) || 'TitilliumWeb-Regular',
          color: color 
        },
      
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
};

const renderFamily = (type: string | undefined) => {
  switch (type) {
    case 'bold':
      return 'TitilliumWeb-Bold';
    case 'bold-italic':
      return 'TitilliumWeb-BoldItalic';
    case 'light':
      return 'TitilliumWeb-Light';
    case 'extra-light':
      return 'TitilliumWeb-ExtraLight';
    case 'regular':
      return 'TitilliumWeb-Regular';
    case 'medium':
      return 'TitilliumWeb-Black';
    case 'semi-bold':
      return 'TitilliumWeb-SemiBold';
    default:
      return 'TitilliumWeb-Regular';
  }
};

export { Text };
