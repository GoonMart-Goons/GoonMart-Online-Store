import React from 'react';
import { StatusBar } from 'expo-status-bar';

//Simply importing the styles created in the styles.js file
import{
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    WelcomeContainer,
    WelcomeImage,
    Avatar
} from './../components/styles'



const Welcome = () =>{
    return(
        <>
            <StatusBar style="light" />
            <InnerContainer>
                <WelcomeImage resizeMode='cover' source={require('./../assets/icon.png')}></WelcomeImage>
                <WelcomeContainer>  
                    <PageTitle welcome={true}>Welcome</PageTitle>
                    <SubTitle>Some name</SubTitle>
                    <SubTitle>somename@name.com</SubTitle>

                    <StyledFormArea> 
                    <Avatar resizeMode='cover' source={require('./../assets/logo512.png')}/>
                    <MsgBox>...</MsgBox>
                    <Line/>
                    <StyledButton onPress={()=>{}}>
                        <ButtonText>
                            Logout
                        </ButtonText>
                    </StyledButton>
                    
                </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </ >
    );
}

export default Welcome;