//defining the styles for the app
import styled from 'styled-components';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

//colors
export const Colours = {
    primary: "#ffffff",
    secondary: "#000030",
    tertiary: "#e1ad01", 
    darkLight: "#9ca3af",
    brand: "#602809",
    blue:"#1310b9",
    red: "#ef4444",
    grey:"#f0f0f0",
    badBlue: "#17328b",
    badOrange:"#FF4500",
    signInGreen: "#c8ff30f3",
    black: "#000",
    proposedGreen: "#08fc7c"

};


const {primary, secondary, tertiary, darkLight, brand, blue, red, grey, badBlue, badOrange, signInGreen, black, proposedGreen} = Colours;


export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 30}px;
    background-color: ${primary};
`;
export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const WelcomeContainer = styled(InnerContainer)`
    padding:25px;
    padding_top: 10px;
    justify-content:center;   
    background-color: ${badOrange} 
`;

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    margin: auto;
    border-radius: 50px;
    border-width: 2px;
    border-color: ${badOrange}
    margin-bottom:10px;
    margin-top: 10px;
`;

export const WelcomeImage = styled.Image`
    height: 50%;
    min-width: 100%;
`;

export const PageLogo = styled.Image`
    width:250px;
    height: 250px;
`;

export const PageLogoSmall = styled.Image`
    width: 100px;
    height: 100px;
`;

export const PageLogoSmallest = styled.Image`
    width: 30px;
    height: 30px;
`;

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${black};
    padding: 10px;

    ${(props) => props.welcome &&`
    font-size: 35px;
    `} 
`;

export const Search = styled.TextInput`
    background-color: ${grey};
    color: ${secondary};
    width: 220px;
    height: 30px;
    border-radius: 20px;
    border-width: 2px;
    border-color: ${badOrange}
`;

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${black}}
    

    ${(props) => props.welcome &&`
        margin-bottom: 5px;
        font-weight: normal;
    `}
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${grey};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height:60px;
    margin-vertical: 1px;
    margin-bottom: 10px;
    color: ${secondary};
    border-width: 2px;
    border-color: ${badOrange}
`;

export const StyledInputLabel = styled.Text`
    color: ${black};
    font-size: 13px;
    text-align: left;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding:15px;
    background-color: ${badOrange};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;

    ${(props) => props.google == true && `
    background-color: ${badBlue};
    flex-direction: row;
    justify-content: center;
    `}
`;

export const ButtonText = styled.Text`
    color: ${black};
    font-size: 16px;

    ${(props) => props.google == true && `
    padding: 5px;
    color: ${primary};
    `}
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
    color: ${props => props.type == "SUCCESS" ? tertiary : red}
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight}
    margin-vertical: 10px;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding:10px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${black};
    font-size: 15px;
`; 

export const TextLink = styled.TouchableOpacity`
    justify-content:center;
    align-items: center;
`;

export const TextLinkContent= styled.Text`
    color: ${badBlue};
    font-size: 15px;
    text-decoration: underline;
`;


export const TextHomeHeader= styled.Text`
    color: ${badBlue}};
    padding-left: 10px;
    font-size: 20px;
`;