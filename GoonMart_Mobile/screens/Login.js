import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Alert} from 'react-native';


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

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

import{Octicons, Ionicons, Fontisto} from '@expo/vector-icons';
import {View, ActivityIndicator} from 'react-native';

const {brand, primary, secondary, tertiary, darkLight} = Colours;

const Login = ({navigation}) =>{
    const [hidePassword, setHidePassword] = useState(true);
    const {message, setMessage} = useState();
    const {messageType, setMessageType} = useState();
    //const handleSubmit = () =>{

    //}

    const handleLogin = ({credentials}, setSubmitting) => {
        hand
    //function that will handle the login

        if(status !== "SUCCESS"){
            handleMessage(message, status);
        }
        else{
            navigation.navigate('Welcome');
        }
        setSubmitting(false);
    }

    const handleMessage = (message, type = "FAILED") =>{
        setMessage(message);
        setMessageType(type);
    }

    return(

        //<KeyboardAvoidingWrapper>
            <StyledContainer>
            <StatusBar style="light" />
            <InnerContainer>
                <PageLogo resizeMode='cover' source={require('./../assets/logo512.png')}/>
                <PageTitle>GoonMart</PageTitle>
                <SubTitle>Account Login</SubTitle>
                <Formik
                    initialValues={{email: '', password:''}}
                    onSubmit= {(values, {setSubmitting}) =>{
                        //console.log(values);
                        
                        if(values.email=='' || values.password ==''){
                            Alert.alert('Please fill in all the fields');
                           // handleMessage("Please fill in all the fields");
                            //setSubmitting(false);
                        }
                        else{
                            navigation.navigate("HomeScreen");
                        }
                    }}
                >{({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (<StyledFormArea>
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
                    <MsgBox type={messageType}>{message}</MsgBox>
                    <StyledButton onPress={handleSubmit}>
                        <ButtonText>Login</ButtonText>
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
                        <TextLink onPress={() => navigation.navigate("SignUp")}>
                            <TextLinkContent>Sign up here!</TextLinkContent>
                        </TextLink>
                    </ExtraView>
                    
                </StyledFormArea>)}
                </Formik>
            </InnerContainer>
        </StyledContainer>
        //</KeyboardAvoidingWrapper>
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

