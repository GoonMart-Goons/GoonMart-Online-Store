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
    TextLinkContent,
    PageLogoSmall
} from '../components/styles'

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

import{Octicons, Ionicons, Fontisto} from '@expo/vector-icons';
import {View} from 'react-native';

const {brand, primary, secondary, tertiary, darkLight, badBlue, black, badOrange} = Colours;

const SignUp = ({navigation}) =>{

    const [hidePassword, setHidePassword] = useState(true);

    return(
        //<KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
            <PageLogoSmall  resizeMode='cover' source={require('./../assets/goonmart-logo.png')}/>
                <PageTitle>Create an account</PageTitle>
                {/*<SubTitle>Create an account</SubTitle>*/}
                <Formik
                    initialValues={{email: '', password:'', firstName:'', surname:'', confirmPassword:''}}
                    onSubmit= {(values) =>{
                        if(values.email=='' || values.password =='' || values.firstName ==''|| values.surname ==''|| values.confirmPassword ==''){
                            Alert.alert('Please fill in all the fields');
                           // handleMessage("Please fill in all the fields");
                            //setSubmitting(false);
                        }
                        else if(values.password !==values.confirmPassword){
                            Alert.alert('Please make sure your passwords are the same');
                           // handleMessage("Please fill in all the fields");
                            //setSubmitting(false);
                        }
                        else{
                            navigation.navigate("Welcome");
                        }
                    }}
                >{({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                    <MyTextInput
                        label="Name"
                        icon = "person"
                        placeholder="Name"
                        placeholderTextColor = {darkLight}
                        onChangeText={handleChange('firstName')}
                        onBlur={handleBlur('firstName')}
                        values={values.firstName}
                    />
                    <MyTextInput
                        label="Surname"
                        icon = "person"
                        placeholder="Surname"
                        placeholderTextColor = {darkLight}
                        onChangeText={handleChange('surname')}
                        onBlur={handleBlur('surname')}
                        values={values.surname}
                    /> 
                    <MyTextInput
                        label="Email"
                        icon = "mail"
                        placeholder="Email"
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
                    <MyTextInput
                        label="Confirm Password"
                        icon = "lock"
                        placeholder="************"
                        placeholderTextColor = {darkLight}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        values={values.confirmPassword}
                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}  
                    />
                    {/*<MsgBox>...</MsgBox>*/}
                    <StyledButton onPress={handleSubmit}>
                        <ButtonText>
                            Register
                        </ButtonText>
                    </StyledButton>
                    <Line/>
                    <ExtraView>
                        <ExtraText>Have an account? </ExtraText>
                        <TextLink onPress={() => navigation.navigate("Login")}>
                            <TextLinkContent>Login</TextLinkContent>
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
                <Octicons name={icon} size={30} color={badOrange} />
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

export default SignUp;