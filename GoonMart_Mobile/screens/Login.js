import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';


import {Formik} from 'formik';

//Simply importing the styles created in the styles.js file
import{
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    Colours,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink, 
    TextLinkContent
} from './../components/styles'


import{Octicons, Ionicons, Fontisto} from '@expo/vector-icons';
import {View} from 'react-native';

const {brand, primary, secondary, tertiary, darkLight} = Colours;

const Login = () =>{
    const [hidePassword, setHidePassword] = useState(true);

    return(
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode='cover' source={require('./../assets/logo512.png')}/>
                <PageTitle>GoonMart</PageTitle>
                <SubTitle>Account Login</SubTitle>
                <Formik
                    initialValues={{email: '', password:''}}
                    onSubmit= {(values) =>{
                        console.log(values)
                    }}
                >{({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                    <MyTextInput
                        label="Email Address"
                        icon = "mail"
                        placeholder="thegoat@goated.com"
                        placeholderTextColor = {darkLight}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        values={values.email}
                        keyboardType="email-address"
                    />
                    <MyTextInput
                        label="Password"
                        icon = "lock"
                        placeholder="************"
                        placeholderTextColor = {darkLight}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        values={values.password}
                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}  
                    />
                    <MsgBox>...</MsgBox>
                    <StyledButton onPress={handleSubmit}>
                        <ButtonText>
                            Login
                        </ButtonText>
                    </StyledButton>
                    <Line/>
                    <StyledButton google={true} onPress={handleSubmit}>
                        <Fontisto name='google' color={primary} size={25}/>
                        <ButtonText google={true} >
                            Sign in with Google
                        </ButtonText>
                    </StyledButton>
                    <ExtraView>
                        <ExtraText>Want to create an account? </ExtraText>
                        <TextLink>
                            <TextLinkContent>Sign up here!</TextLinkContent>
                        </TextLink>
                    </ExtraView>
                    
                </StyledFormArea>)}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) =>{
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={tertiary} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RightIcon onPress= {() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}/>
                </RightIcon>
            )}
        </View>
    );
}

export default Login;

