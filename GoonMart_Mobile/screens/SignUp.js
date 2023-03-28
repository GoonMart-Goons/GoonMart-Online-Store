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

const SignUp = () =>{

    const [hidePassword, setHidePassword] = useState(true);

    return(
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageTitle>GoonMart</PageTitle>
                <SubTitle>Account Sign Up</SubTitle>
                <Formik
                    initialValues={{email: '', password:'', firstName:'', surname:'', confirmPassword:''}}
                    onSubmit= {(values) =>{
                        console.log(values)
                    }}
                >{({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                    <MyTextInput
                        label="First Name"
                        icon = "person"
                        placeholder="Devaughn"
                        placeholderTextColor = {darkLight}
                        onChangeText={handleChange('firstName')}
                        onBlur={handleBlur('firstName')}
                        values={values.firstName}
                    />
                    <MyTextInput
                        label="Surname"
                        icon = "person"
                        placeholder="Hendricks"
                        placeholderTextColor = {darkLight}
                        onChangeText={handleChange('surname')}
                        onBlur={handleBlur('surname')}
                        values={values.surname}
                    /> 
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
                    <MsgBox>...</MsgBox>
                    <StyledButton onPress={handleSubmit}>
                        <ButtonText>
                            Login
                        </ButtonText>
                    </StyledButton>
                    <Line/>
                    <ExtraView>
                        <ExtraText>Have an account? </ExtraText>
                        <TextLink>
                            <TextLinkContent>Login</TextLinkContent>
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

export default SignUp;