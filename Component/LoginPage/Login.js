/**
 * Created by HRFaez on 09/04/2017.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Button,
    Navigator,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    AsyncStorage
} from 'react-native';
import {Keyboard} from 'react-native';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Employeeid: "",
        }
        this.onOrgPress = this.onOrgPress.bind(this);
    }

    componentDidMount() {
        AsyncStorage.getItem("Employeeid").then((value) => {
            this.setState({"Employeeid": value});
        }).done();
    }
    saveData(value) {
        AsyncStorage.setItem("Employeeid", value);
        this.setState({"Employeeid": value});
    }

    onOrgPress() {
        if (this.state.Employeeid != "") {
            this.props.navigator.push({
                id: 2,
                orgId: this.state.Employeeid
            })
        }
    }
    getInitialState() {
        return {};
    }
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:2}}>
                </View>
                <View
                    style={{flex:1,paddingRight:30,paddingLeft:30,flexDirection: 'row'}}
                >
                    <View style={{flex:1}}>
                    </View>
                    <View style={{flex:3}}>
                        <TextInput
                            keyboardType={'numeric'}
                            style={{height: 40,textAlign: 'center',fontSize:16,borderColor: 'gray', borderWidth: 1}}
                            placeholder="کد کارمندی خود را وارد کنید"
                            onChangeText={(text) => this.saveData(text)}
                            value={this.state.Employeeid}
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
    container: {
        padding: 30,
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        backgroundColor: "#F5FCFF",
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    formInput: {
        flex: 1,
        height: 26,
        fontSize: 13,
        borderWidth: 1,
        borderColor: "#555555",
    },
    saved: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
        marginTop: 5,
    },
});


module.exports = Login;
