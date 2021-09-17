import React from 'react'
import {View, Text, SafeAreaView, Image, ScrollView} from 'react-native'
import { Header,} from 'native-base';
import {COLOR_PALLETE, LOGOS} from '../commons/Color'
import { getJSON } from '../functions/getJSON';

const TransmissionDetails = ({transmission}) => {
    const getJSONInstance = (value, undefined_response='') => getJSON(transmission, [value], undefined_response)
    const image = getJSONInstance('image', null) ? {uri: getJSONInstance('image', '') } : LOGOS.primary
    console.log('transmission->', transmission);
    return(
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}} >
                <Header style={COLOR_PALLETE.headerTabs} hasTabs />
                <Text style={{color:'#000', alignSelf:'center', marginTop:12, fontSize:25, fontWeight:'bold', fontStyle:'italic'}} >{getJSONInstance('title', 'Sin título')}</Text>
                <Image source={image} style={{width:'85%', height:'50%', alignSelf:'center', marginTop:5}} />
                <ScrollView>
                    <Text style={{alignSelf:'center', marginHorizontal:15, marginTop:'5%', fontSize:17, fontStyle:'italic', fontWeight:'500'}} >{getJSONInstance('description', 'Sin descipcion del programa...')}</Text>
                </ScrollView>
        </SafeAreaView>
    )
}

export default TransmissionDetails