import React, {useRef, useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import PhoneButton from './PhoneButton';
import {
    ClientRoleType,
    createAgoraRtcEngine,
    IRtcEngine,
    RtcSurfaceView,
    ChannelProfileType,
} from 'react-native-agora';
const appId = '6867bb4ece064929837fd67045fea2c1';
const channelName = 'call-test';
const token = '007eJxTYPjowX4qs/Viy+dXQTdPT9z9+ITsYpHvjFp1Id8eM02+lcWmwGBmYWaelGSSmpxqYGZiaWRpYWyelmJmbmBimpaaaJRsOEHBOqUhkJFB5mk7CyMDBIL4nAzJiTk5uiWpxSUMDACS4SKP';
const uid = 0;

const VideoCall = () => {
    const agoraEngineRef = useRef(); // Agora engine instance
    const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
    const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
    const [message, setMessage] = useState(''); // Message to the user
    useEffect(() => {
        // Initialize Agora engine when the app starts
        setupVideoSDKEngine();
     });
     
     const setupVideoSDKEngine = async () => {
        try {
        // use the helper function to get permissions
        if (Platform.OS === 'android') { await getPermission()};
        agoraEngineRef.current = createAgoraRtcEngine();
        const agoraEngine = agoraEngineRef.current;
        agoraEngine.registerEventHandler({
            onJoinChannelSuccess: () => {
                showMessage('Successfully joined the channel ' + channelName);
                setIsJoined(true);
            },
            onUserJoined: (_connection, Uid) => {
                showMessage('Remote user joined with uid ' + Uid);
                setRemoteUid(Uid);
            },
            onUserOffline: (_connection, Uid) => {
                showMessage('Remote user left the channel. uid: ' + Uid);
                setRemoteUid(0);
            },
        });
        agoraEngine.initialize({
            appId: appId,
            channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
        });
        agoraEngine.enableVideo();
        } catch (e) {
            console.log(e);
        }
     };
     const join = async () => {
        if (isJoined) {
            return;
        }
        try {
            agoraEngineRef.current?.setChannelProfile(
                ChannelProfileType.ChannelProfileCommunication,
            );
            agoraEngineRef.current?.startPreview();
            agoraEngineRef.current?.joinChannel(token, channelName, uid, {
                clientRoleType: ClientRoleType.ClientRoleBroadcaster,
            });
        } catch (e) {
            console.log(e);
        }
    };
    const leave = () => {
        try {
            agoraEngineRef.current?.leaveChannel();
            setRemoteUid(0);
            setIsJoined(false);
            showMessage('You left the channel');
        } catch (e) {
            console.log(e);
        }
    };
    
    
     
    return (
        <SafeAreaView style={styles.main}>
            <Text style={styles.head}>Video Call</Text>
            <View style={styles.btnContainer}>
                {/* <Text onPress={join} style={styles.button}>
                    Join
                </Text> */}
                <PhoneButton onPress={join} text={"Join"} color={"green"} />
                {/* <Text onPress={leave} style={styles.button}>
                    Leave
                </Text> */}
                <PhoneButton onPress={leave} text={"Leave"} color={"red"} />

            </View>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContainer}>
                {isJoined ? (
                    <React.Fragment key={0}>
                    <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView} />
                    <Text>Local user uid: {uid}</Text>
                    </React.Fragment>
                ) : (
                    <Text>Join a channel</Text>
                )}
                {isJoined && remoteUid !== 0 ? (
                    <React.Fragment key={remoteUid}>
                    <RtcSurfaceView
                        canvas={{uid: remoteUid}}
                        style={styles.videoView}
                    />
                    <Text>Remote user uid: {remoteUid}</Text>
                    </React.Fragment>
                ) : (
                    <Text>Waiting for a remote user to join</Text>
                )}
                <Text style={styles.info}>{message}</Text>
            </ScrollView>
        </SafeAreaView>
    );
    


    function showMessage(msg) {
        setMessage(msg);
    }
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 25,
        paddingVertical: 4,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#0055cc',
        margin: 5,
    },
    main: {flex: 1, alignItems: 'center'},
    scroll: {flex: 1, backgroundColor: '#ddeeff', width: '100%'},
    scrollContainer: {alignItems: 'center'},
    videoView: {width: '90%', height: 200},
    btnContainer: {flexDirection: 'row', justifyContent: 'center'},
    head: {fontSize: 20},
    info: {backgroundColor: '#ffffe0', color: '#0000ff'}
});
const getPermission = async () => {
    if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
    }
};

export default VideoCall;

