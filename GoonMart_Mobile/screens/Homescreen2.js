import React from 'react';
import {ImageBackground, StyleSheet, View, SafeAreaView, ScrollView, Text, TouchableOpacity, Image} from 'react-native';
import homeIcon from '../assets/home.png';
import searchIcon from '../assets/search.png';
import profileIcon from '../assets/user.png';
import menu from '../assets/menu.png';
import cart from '../assets/cart.png';
import starIcon from '../assets/star.png';
import backgroundImage from '../assets/electronics.jpg';
import backgroundImage1 from '../assets/toys.jpg';
import backgroundImage2 from '../assets/kithcen.jpg';
import backgroundImage3 from '../assets/clothes.jpg';
import backImage4 from '../assets/phone.jpg';
import backImage5 from '../assets/toy.jpg';
import backImage6 from '../assets/tshirt.jpg';

import placeholder from '../assets/dummy.jpg';
import Constants from 'expo-constants';

import { StatusBar } from 'expo-status-bar';
import { Colours, PageLogoSmallest, TextHomeHeader } from '../components/styles';
import{Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

const {brand, primary, secondary, tertiary, darkLight, badBlue, badOrange, proposedGreen} = Colours;

const StatusBarHeight = Constants.statusBarHeight;

const HomeScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" backgroundColor={badOrange}/>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                        {/*<Image source={menu} style={styles.bottomNavigationIcon} color={primary}/>*/}
                    <View>
                        <Ionicons
                            name='menu-outline'
                            color={badBlue}
                            size={32}
                        />
                    </View>
                </TouchableOpacity>
                <View style={styles.headerWithButtons}>
                    <PageLogoSmallest  resizeMode='cover' source={require('./../assets/goonmart-logo.png')}/>
                    <TextHomeHeader>GoonMart</TextHomeHeader>
                </View>
                    <TouchableOpacity>
                        {/*<Image source={cart} style={styles.bottomNavigationIcon} />*/}
                        <View paddingRight={20}>
                            <Ionicons
                                name='cart-outline'
                                color={badBlue}
                                size={32}
                            />
                        </View>
                    </TouchableOpacity>
                    {/*<View style={styles.logo}>
                        <Text style={styles.logoText}>Logo</Text>
                    </View>*/}
            </View>
            <ScrollView>
                {/* Product Deals */}
                <View style={styles.productDeals}>
                    <Text style={styles.sectionTitle}>Product Deals</Text>
                    {/* Horizontal Scroll View */}
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {/* Product Deal Tile */}
                        <View style={styles.productDealTile}>
                            <Text style={styles.productDealTitle}>Product Deal 1</Text>
                            <Text style={styles.productDealDescription}>Description of product deal 1</Text>
                            <Text style={styles.productDealPrice}>$10</Text>
                        </View>
                        {/* Add more Product Deal Tiles as needed */}
                    </ScrollView>
                </View>

                {/* Product Categories */}
                <View style={styles.productCategories}>
                    <Text style={styles.sectionTitle}>Product Categories</Text>
                    {/* Horizontal Scroll View */}
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {/* Product Category Tile */}
                        <View style={styles.productCategoryTile}>
                            <Text style={styles.productCategoryTitle}>All</Text>
                        </View>
                        <View style={styles.productCategoryTile}>
                            <ImageBackground source={backgroundImage} style={styles.productCategoryBackground}>
                                <Text style={styles.productCategoryTitle}>Electronics</Text>
                            </ImageBackground>
                        </View>


                        <View style={styles.productCategoryTile}>
                            <ImageBackground source={backgroundImage3} style={styles.productCategoryBackground}>
                                <Text style={styles.productCategoryTitle}>Clothes</Text>
                            </ImageBackground>
                        </View>
                        <View style={styles.productCategoryTile}>
                            <ImageBackground source={backgroundImage2} style={styles.productCategoryBackground}>
                                <Text style={styles.productCategoryTitle}>Home & Kitchen</Text>
                            </ImageBackground>
                        </View>
                        <View style={styles.productCategoryTile}>
                            <ImageBackground source={backgroundImage1} style={styles.productCategoryBackground}>
                               <Text style={styles.productCategoryTitle}>Toys & Games</Text>
                            </ImageBackground>
                        </View>
                        {/* Add more Product Category Tiles as needed */}
                    </ScrollView>
                </View>

                {/* Product List */}
                <View style={styles.productList}>
                    <Text style={styles.sectionTitle}>Products</Text>
                    {/* Vertical Scroll View */}
                    <ScrollView>
                        {/* Product Tile */}
                        <View style={styles.productTile}>
                            <TouchableOpacity>
                                <Image source={placeholder} style={styles.productListImage} />
                            </TouchableOpacity>
                            <Text style={styles.productTitle}>Laptop</Text>
                            <Text style={styles.productDescription}>It's just a laptop.</Text>
                            <Text style={styles.productPrice}>$1000</Text>
                            <Text style={styles.productRating}>
                                Rating: <Image source={starIcon} style={styles.productRatingIcon} />
                                <Image source={starIcon} style={styles.productRatingIcon} />
                                <Image source={starIcon} style={styles.productRatingIcon} />
                                <Image source={starIcon} style={styles.productRatingIcon} />
                                <Image source={starIcon} style={styles.productRatingIcon} />
                            </Text>
                        </View>
                        <View style={styles.productTile}>
                            <TouchableOpacity>
                                <Image source={backImage5} style={styles.productListImage} />
                            </TouchableOpacity>
                            <Text style={styles.productTitle}>Car</Text>
                            <Text style={styles.productDescription}>It's just a car.</Text>
                            <Text style={styles.productPrice}>$10</Text>
                            <Text style={styles.productRating}>
                                Rating: <Image source={starIcon} style={styles.productRatingIcon} />
                                <Image source={starIcon} style={styles.productRatingIcon} />
                                <Image source={starIcon} style={styles.productRatingIcon} />
                            </Text>
                        </View>
                        <View style={styles.productTile}>
                            <TouchableOpacity>
                                <Image source={backImage6} style={styles.productListImage} />
                            </TouchableOpacity>
                            <Text style={styles.productTitle}>T-Shirt</Text>
                            <Text style={styles.productDescription}>It's just a t-shirt.</Text>
                            <Text style={styles.productPrice}>$10</Text>
                            <Text style={styles.productRating}>
                                Rating: <Image source={starIcon} style={styles.productRatingIcon} />
                                <Image source={starIcon} style={styles.productRatingIcon} />
                                <Image source={starIcon} style={styles.productRatingIcon} />
                                <Image source={starIcon} style={styles.productRatingIcon} />
                            </Text>
                        </View>
                        {/* Add more Product Tiles as needed */}
                    </ScrollView>
                </View>
            </ScrollView>


            {/* Bottom Navigation */}
            <View style={styles.bottomNavigation}>
                <TouchableOpacity>
                    
                    <View>
                        <Ionicons
                            name='home-outline'
                            color={badBlue}
                            size={32}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View>
                        <Ionicons
                            name='search-outline'
                            color={badBlue}
                            size={32}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <View>
                        <Ionicons
                            name='person-outline'
                            color={badBlue}
                            size={32}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: StatusBarHeight,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: badOrange,
        backgroundColor:badOrange,
    },
    headerWithButtons: {
        flexDirection: 'row',
        borderBottomColor: badOrange,
        backgroundColor:badOrange,
    },
    logo: {
        alignItems: 'center',
    },
    logoText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: badBlue,
    },
    headerButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    productDeals: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productDealTile: {
        width: 300,
        height: 200,
        backgroundColor: '#f2f2f2',
        marginRight: 10,
        padding: 10,
    },
    productDealTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productDealDescription: {
        fontSize: 14,
        color: '#666',
    },
    productDealPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    productCategories: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    productCategoryTile: {
        width: 100,
        height: 100,
        backgroundColor: '#f2f2f2',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productCategoryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    productCategoryBackground: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productList: {
        paddingVertical: 65,
        paddingHorizontal: 20,
    },
    productTile: {
        marginBottom: 20,
        backgroundColor: '#f2f2f2',
        padding: 10,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productListImage: {
        width: 325,
        height: 200,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },

    productDescription: {
        fontSize: 14,
        color: '#666',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    productRating:{
        fontSize: 10,
        fontWeight: 'normal',

    },
    productRatingIcon:{
        width: 10,
        height: 10,
    },
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        height: 60,
        borderTopWidth: 1,
        borderTopColor:badOrange,
        backgroundColor: badOrange,
        borderRadius: 0,
        shadowColor: '#000'
    },
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginHorizontal: 20,
    marginBottom: 20,
    bottomNavigationButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    bottomNavigationIcon: {
        width: 25,
        height: 25,
    },
});

export default HomeScreen;

