/**
 * Created by HRFaez on 09/04/2017.
 */
import React ,{ Component } from 'react';
import {
    Text,
    View,
    Button,
    Navigator,
    StyleSheet,
    BackAndroid,
    TextInput,
} from 'react-native';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            id: null,
        }
        this.onOrgPress = this.onOrgPress.bind(this);
    }
    onOrgPress(){
        console.log("FirstPage");
        this.props.navigator.push({
            id: 2,
            orgId:this.state.id
        })
    }
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:2}}></View>
                <View
                    style={{flex:1,paddingRight:30,paddingLeft:30,flexDirection: 'row'}}
                >
                    <View style={{flex:1}}></View>
                    <View style={{flex:3}}>
                    <TextInput
                        keyboardType={'numeric'}
                        style={{height: 40,textAlign: 'center',fontSize:16}}
                        placeholder="کد کارمندی خود را وارد کنید"
                        onChangeText={(id) => this.setState({id})}

                    />
                    </View>
                    <View style={{flex:1}}></View>
                </View>
                <View
                    style={{flex:1,paddingRight:30,paddingLeft:30,flexDirection: 'row'}}
                >
                    <View style={{flex:1}}></View>
                    <View style={{flex:4}}>
                        <Button
                            onPress={this.onOrgPress}
                            title={"ادامه"}
                        />
                    </View>
                    <View style={{flex:1}}></View>
                </View>
                <View style={{flex:3}}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

module.exports = Login;