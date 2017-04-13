/**
 * Created by HRFaez on 09/04/2017.
 */
/**
 * Created by HRFaez on 09/04/2017.
 */
import React ,{ Component } from 'react';
import {
    Text,
    View,
    Navigator,
    StyleSheet,
    BackAndroid,
    TextInput,
    TimePickerAndroid,
    Picker,
    Alert,
    ActivityIndicator
} from 'react-native';
const Item = Picker.Item;
import Button from 'apsl-react-native-button'

class SetTime extends Component{
    constructor(props){
        super(props);
        this.state={
            animating: false,
            id: null,
            btm_in:false,
            btm_out:false,
            Start_Time_Hour:"00",
            Start_Time_Min:"00",
            End_Time_Hour:"00",
            End_Time_Min:"00",
            Start:new Date(),
            End:new Date(),
            selected1: '0',
            selected2: '0',
            selected3: '0',
            selected4: '0',
            color: 'red',
            mode: Picker.MODE_DIALOG,
        }

        this.startloder = this.startloder.bind(this);
        this.checkState = this.checkState.bind(this);
    }
    Start_clock(){
        var date = new Date();
        var hourOffset = 3;
        date.setUTCHours(date.getUTCHours(), date.getUTCMinutes());
        var time = date.getTime();
        date.setUTCFullYear(date.getUTCFullYear(), 2, 22);
        var dstStart = date.getTime();
        date.setUTCFullYear(date.getUTCFullYear(), 8, 22);
        var dstEnd = date.getTime();
        if(time > dstStart && time < dstEnd)hourOffset = 4;
        date = new Date();
        var min =date.getUTCMinutes()+30;
        var hour = date.getUTCHours()+hourOffset;
        date.setUTCHours(date.getUTCHours()+hourOffset, date.getUTCMinutes()+30);
        if(min < 10){
            min = "0"+min;
        }
        var hour = date.getUTCHours();
        if(hour < 10){
            hour = "0"+hour;
        }
        var output = hour+":"+min;
        this.setState({
            Start:date,
            selected1: date.getUTCHours()+"",
            selected2: date.getUTCMinutes()+"",
            Start_Time_Hour:hour,
            Start_Time_Min:min,
        })
    }
    End_clock(){
        var date = new Date();
        var hourOffset = 3;
        date.setUTCHours(date.getUTCHours(), date.getUTCMinutes());
        var time = date.getTime();
        date.setUTCFullYear(date.getUTCFullYear(), 2, 22);
        var dstStart = date.getTime();
        date.setUTCFullYear(date.getUTCFullYear(), 8, 22);
        var dstEnd = date.getTime();
        if(time > dstStart && time < dstEnd)hourOffset = 4;
        date = new Date();
        var min =date.getUTCMinutes()+30;
        var hour = date.getUTCHours()+hourOffset;
        date.setUTCHours(date.getUTCHours()+hourOffset, date.getUTCMinutes()+30);
        if(min < 10){
            min = "0"+min;
        }
        var hour = date.getUTCHours();
        if(hour < 10){
            hour = "0"+hour;
        }
        this.setState({
            End:date,
            selected3: date.getUTCHours()+"",
            selected4: date.getUTCMinutes()+"",
            End_Time_Hour:hour,
            End_Time_Min:min,
        })
    }
    startloder(){
        this.checkState();
    }
    checkState(){
        var date = new Date();
        var a = new Date();
        date = this.state.Start;
        date.setHours(Number(this.state.Start_Time_Hour),Number(this.state.Start_Time_Min));
        this.setState({
            Start:date,
        })
        fetch('http://104.237.246.26:3000/insideout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "logTime": date.getTime(),
                "username": String(this.props.id),
            })
        })
            .then((response) => response.json())
            .then((responseJson)=>{

                if(responseJson.status.code == 200){
                    Alert.alert("وضعیت","ثبت شد");
                    this.setState({
                        animating:false,
                        btm_in:true,
                    })
                }
                else if(responseJson.status.code == 400){
                    this.setState({
                        animating:false,
                    })
                    alert(responseJson.status.message);
                }
                else{
                    this.setState({
                        animating:false,
                    })
                }
            })
    }
    render(){

        return(
            <View style={{flex:1}}>
                <ActivityIndicator
                    animating={this.state.animating}
                    style={[styles.centering, {height: 80}]}
                    size="large"
                />
                <View style={{flex:1}}></View>
                <View style={{flex:2}}>

                </View>
                <View style={{flex:2,justifyContent: 'center',flexDirection: 'row',}}>
                    <Text style={{
                        fontSize:20,
                        color:'#000'
                    }}>تاریخ</Text>
                </View>
                <View style={{flex:2,flexDirection: 'row',paddingLeft:10}}>
                    <View style={{flex:2}}>
                        <Button
                            isLoading={this.state.animating}
                            disabled={this.state.btm_in}
                            onPress={()=> {
                                        this.setState({
                                            animating:true,
                                        })
                                        this.startloder();
                            }}
                        >ورود</Button>
                    </View>
                    <View style={{flex:4,justifyContent: 'center',flexDirection: 'row',}}>
                        {/*<Text style={{*/}
                            {/*fontSize:20*/}
                        {/*}}>{this.state.Start_Time_Hour} : {this.state.Start_Time_Min}</Text>*/}
                        <View style={{flex:1}}></View>
                        <View style={{flex:2}}>
                            <Picker
                                selectedValue={this.state.selected1}
                                onValueChange={this.onValueChangeStartHour.bind(this, 'selected1')}>
                                <Item label="0" value="0" />
                                <Item label="1" value="1" />
                                <Item label="2" value="2" />
                                <Item label="3" value="3" />
                                <Item label="4" value="4" />
                                <Item label="5" value="5" />
                                <Item label="6" value="6" />
                                <Item label="7" value="7" />
                                <Item label="8" value="8" />
                                <Item label="9" value="9" />
                                <Item label="10" value="10" />
                                <Item label="11" value="11" />
                                <Item label="12" value="12" />
                                <Item label="13" value="13" />
                                <Item label="14" value="14" />
                                <Item label="15" value="15" />
                                <Item label="16" value="16" />
                                <Item label="17" value="17" />
                                <Item label="18" value="18" />
                                <Item label="19" value="19" />
                                <Item label="20" value="20" />
                                <Item label="21" value="22" />
                                <Item label="23" value="23" />
                                <Item label="24" value="24" />
                            </Picker>
                        </View>
                        <View style={{flex:2}}>
                            <Picker
                                selectedValue={this.state.selected2}
                                onValueChange={this.onValueChangeStartMinute.bind(this, 'selected2')}>
                                <Item label="0" value="0" />
                                <Item label="1" value="1" />
                                <Item label="2" value="2" />
                                <Item label="3" value="3" />
                                <Item label="4" value="4" />
                                <Item label="5" value="5" />
                                <Item label="6" value="6" />
                                <Item label="7" value="7" />
                                <Item label="8" value="8" />
                                <Item label="9" value="9" />
                                <Item label="10" value="10" />
                                <Item label="11" value="11" />
                                <Item label="12" value="12" />
                                <Item label="13" value="13" />
                                <Item label="14" value="14" />
                                <Item label="15" value="15" />
                                <Item label="16" value="16" />
                                <Item label="17" value="17" />
                                <Item label="18" value="18" />
                                <Item label="19" value="19" />
                                <Item label="20" value="20" />
                                <Item label="21" value="22" />
                                <Item label="23" value="23" />
                                <Item label="24" value="24" />
                                <Item label="25" value="25" />
                                <Item label="26" value="26" />
                                <Item label="27" value="27" />
                                <Item label="28" value="28" />
                                <Item label="29" value="29" />
                                <Item label="30" value="30" />
                                <Item label="31" value="31" />
                                <Item label="32" value="32" />
                                <Item label="33" value="33" />
                                <Item label="34" value="34" />
                                <Item label="35" value="35" />
                                <Item label="36" value="36" />
                                <Item label="37" value="37" />
                                <Item label="38" value="38" />
                                <Item label="39" value="39" />
                                <Item label="40" value="40" />
                                <Item label="41" value="41" />
                                <Item label="42" value="42" />
                                <Item label="43" value="43" />
                                <Item label="44" value="44" />
                                <Item label="45" value="45" />
                                <Item label="46" value="46" />
                                <Item label="47" value="47" />
                                <Item label="48" value="48" />
                                <Item label="49" value="49" />
                                <Item label="50" value="50" />
                                <Item label="51" value="51" />
                                <Item label="52" value="52" />
                                <Item label="53" value="53" />
                                <Item label="54" value="54" />
                                <Item label="55" value="55" />
                                <Item label="56" value="56" />
                                <Item label="57" value="57" />
                                <Item label="58" value="58" />
                                <Item label="59" value="59" />

                            </Picker>

                        </View>
                        <View style={{flex:1}}></View>
                    </View>
                    <View style={{flex:1,paddingRight:10}}>
                        <Button
                            onPress={()=>{
                                this.Start_clock();
                            }}
                        >الان</Button>
                    </View>

                </View>
                <View style={{flex:2,flexDirection: 'row',paddingLeft:10}}>
                    <View style={{flex:2}}>
                        <Button
                            isLoading={this.state.animating}
                            onPress={()=> {
                             var date = new Date();
                             var a = new Date();
                             date = this.state.End;
                             date.setHours(Number(this.state.End_Time_Hour),Number(this.state.End_Time_Min));
                             this.setState({
                                 isLoading:true,
                                 Start:date,
                             })
                                fetch('http://104.237.246.26:3000/insideout', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        "logTime": date.getTime(),
                                        "username": String(this.props.id),
                                    })
                                })
                                    .then((response) => response.json())
                                    .then((responseJson)=>{

                                        if(responseJson.status.code == 200){
                                            Alert.alert("وضعیت","ثبت شد");
                                               this.setState({
                                                btm_in:false,
                                            })
                                        }
                                        else if(responseJson.status.code == 400){
                                            alert(responseJson.status.message);
                                        }
                            })
                            }}
                        >خروج</Button>
                    </View>
                    <View style={{flex:4,justifyContent: 'center',flexDirection: 'row',}}>
                        <View style={{flex:1}}></View>
                        <View style={{flex:2}}>
                            <Picker
                                selectedValue={this.state.selected3}
                                onValueChange={this.onValueChangeEndHour.bind(this, 'selected3')}>
                                <Item label="0" value="0" />
                                <Item label="1" value="1" />
                                <Item label="2" value="2" />
                                <Item label="3" value="3" />
                                <Item label="4" value="4" />
                                <Item label="5" value="5" />
                                <Item label="6" value="6" />
                                <Item label="7" value="7" />
                                <Item label="8" value="8" />
                                <Item label="9" value="9" />
                                <Item label="10" value="10" />
                                <Item label="11" value="11" />
                                <Item label="12" value="12" />
                                <Item label="13" value="13" />
                                <Item label="14" value="14" />
                                <Item label="15" value="15" />
                                <Item label="16" value="16" />
                                <Item label="17" value="17" />
                                <Item label="18" value="18" />
                                <Item label="19" value="19" />
                                <Item label="20" value="20" />
                                <Item label="21" value="22" />
                                <Item label="23" value="23" />
                                <Item label="24" value="24" />
                            </Picker>
                        </View>
                        <View style={{flex:2}}>
                            <Picker
                                selectedValue={this.state.selected4}
                                onValueChange={this.onValueChangeEndMinute.bind(this, 'selected4')}>
                                <Item label="0" value="0" />
                                <Item label="1" value="1" />
                                <Item label="2" value="2" />
                                <Item label="3" value="3" />
                                <Item label="4" value="4" />
                                <Item label="5" value="5" />
                                <Item label="6" value="6" />
                                <Item label="7" value="7" />
                                <Item label="8" value="8" />
                                <Item label="9" value="9" />
                                <Item label="10" value="10" />
                                <Item label="11" value="11" />
                                <Item label="12" value="12" />
                                <Item label="13" value="13" />
                                <Item label="14" value="14" />
                                <Item label="15" value="15" />
                                <Item label="16" value="16" />
                                <Item label="17" value="17" />
                                <Item label="18" value="18" />
                                <Item label="19" value="19" />
                                <Item label="20" value="20" />
                                <Item label="21" value="22" />
                                <Item label="23" value="23" />
                                <Item label="24" value="24" />
                                <Item label="25" value="25" />
                                <Item label="26" value="26" />
                                <Item label="27" value="27" />
                                <Item label="28" value="28" />
                                <Item label="29" value="29" />
                                <Item label="30" value="30" />
                                <Item label="31" value="31" />
                                <Item label="32" value="32" />
                                <Item label="33" value="33" />
                                <Item label="34" value="34" />
                                <Item label="35" value="35" />
                                <Item label="36" value="36" />
                                <Item label="37" value="37" />
                                <Item label="38" value="38" />
                                <Item label="39" value="39" />
                                <Item label="40" value="40" />
                                <Item label="41" value="41" />
                                <Item label="42" value="42" />
                                <Item label="43" value="43" />
                                <Item label="44" value="44" />
                                <Item label="45" value="45" />
                                <Item label="46" value="46" />
                                <Item label="47" value="47" />
                                <Item label="48" value="48" />
                                <Item label="49" value="49" />
                                <Item label="50" value="50" />
                                <Item label="51" value="51" />
                                <Item label="52" value="52" />
                                <Item label="53" value="53" />
                                <Item label="54" value="54" />
                                <Item label="55" value="55" />
                                <Item label="56" value="56" />
                                <Item label="57" value="57" />
                                <Item label="58" value="58" />
                                <Item label="59" value="59" />
                            </Picker>

                        </View>
                        <View style={{flex:1}}></View>
                    </View>
                    <View style={{flex:1,paddingRight:10}}>
                        <Button
                            onPress={()=>{
                                this.End_clock();
                            }}
                        >الان</Button>
                    </View>
                </View>
                <View style={{flex:1}}></View>
                <View style={{flex:5,justifyContent: 'center',alignItems: 'center',}}>
                    <Text style={{
                        fontSize:20
                    }}>کد کارمندی</Text>
                    <Text
                    style={
                        {
                            fontSize:20,
                            backgroundColor:'#97ff82',
                            color:'#000'
                        }
                    }>{this.props.id}</Text>
                </View>
            </View>
        )
    }
    onValueChangeStartHour = (key: string, value: string) => {
        const newState = {};
        newState[key] = value;
        this.setState({
            Start_Time_Hour:value
        })
        this.setState(newState);
    };
    onValueChangeStartMinute = (key: string, value: string) => {
        const newState = {};
        newState[key] = value;
        this.setState({
            Start_Time_Min:value
        })
        this.setState(newState);
    };
    onValueChangeEndHour = (key: string, value: string) => {
        const newState = {};
        newState[key] = value;
        this.setState({
            End_Time_Hour:value
        })
        this.setState(newState);
    };
    onValueChangeEndMinute = (key: string, value: string) => {
        const newState = {};
        newState[key] = value;
        this.setState({
            End_Time_Min:value
        })
        this.setState(newState);
    };
}

const styles = StyleSheet.create({
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
})

module.exports = SetTime;