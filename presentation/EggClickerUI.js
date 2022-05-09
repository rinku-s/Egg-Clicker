/*
 *  file: EggClickerUI.js
 *  author: Rinku Ansari <raf122@uregina.ca>
 *  version: 0.1
 *  date-created: apr-22-2022
 *  last-modified: apr-22-2022
 */
import React from 'react';

import {
    SafeAreaView,
    Text,
    Image,
    TouchableOpacity,
    Pressable,
    Animated,
    Modal,
    View,
    Alert,
} from 'react-native';
import styles from '../styles/AppStyle.js';
import {Colors} from '../themes/ColorTheme';

/**
 * EggClickerUI
 * Purpose: Define the overall presentation component of the main screen.
 ``*/
const EggClickerUI = ({counter, setCounter, onEggClick, animation, eggUri, clickSpeed, isOneDisabled, isTenDisabled, isTwentyDisabled, isThirtyDisabled, OnBoost, modalVisible, setModalVisible, onReset}) => {
    return (
        <SafeAreaView style = {styles.Container}>
            <Text
                style={styles.ClickCounter}
                clearButtonMode="always"
                underlineColorAndroid="transparent"
            >
                {counter} Clicks
            </Text>
            <TouchableOpacity
                style={styles.EggClick}
                onPress={() => onEggClick()}>
                <Animated.View style={{ transform: [{ translateX: animation.current }] }}>
                    <Image
                        source = {eggUri.path}
                        resizeMode="contain"
                        style={styles.Egg}
                    />
                </Animated.View>
            </TouchableOpacity>
            <Text style = {styles.ClickSpeed}>
                + {clickSpeed} Clicks/s
            </Text>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.CenteredView}>
                    <View style={styles.ModalView}>
                        <Text style={styles.ModalText}>Congrats on wasting your time! {'\n'}You win!!</Text>
                        <Pressable
                            style={styles.ModalButton}
                            onPress={() => onReset()}
                        >
                            <Image
                                source = {require('../assets/redo.png')}
                                resizeMode="contain"
                                style={styles.Egg}
                            />
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Text style = {styles.ClickBoostMessageHeader}>
                Click Boosts:
            </Text>
            <Text style = {styles.ClickBoostMessage}>Click Boosts are non-refundable!</Text>
            <Pressable
                style={!isOneDisabled ? ({ pressed }) => [
                    {
                        backgroundColor: pressed ? Colors.buttonPressedColor : Colors.buttonColor,
                    },
                    styles.ClickSpeedButton,
                ] : styles.DisabledButton}
                disabled={isOneDisabled}
                onPress={() =>  OnBoost(1)}>
                <Text style={!isOneDisabled? styles.ClickSpeedButtonText: styles.DisabledSpeedButtonText}>+ 1 Click/s (Cost: 100 Clicks)</Text>
            </Pressable>
            <Pressable
                style={!isTenDisabled ? ({ pressed }) => [
                    {
                        backgroundColor: pressed ? Colors.buttonPressedColor : Colors.buttonColor,
                    },
                    styles.ClickSpeedButton,
                ] : styles.DisabledButton}
                disabled={isTenDisabled}
                onPress={() =>  OnBoost(10)}>
                <Text style={!isTenDisabled? styles.ClickSpeedButtonText: styles.DisabledSpeedButtonText}>+ 10 Click/s (Cost: 10K Clicks)</Text>
            </Pressable>
            <Pressable
                style={!isTwentyDisabled ? ({ pressed }) => [
                    {
                        backgroundColor: pressed ? Colors.buttonPressedColor : Colors.buttonColor,
                    },
                    styles.ClickSpeedButton,
                ] : styles.DisabledButton}
                disabled={isTwentyDisabled}
                onPress={() =>  OnBoost(20)}>
                <Text style={!isTwentyDisabled? styles.ClickSpeedButtonText: styles.DisabledSpeedButtonText}>+ 20 Click/s (Cost: 1M Clicks)</Text>
            </Pressable>
            <Pressable
                style={!isThirtyDisabled ? ({ pressed }) => [
                    {
                        backgroundColor: pressed ? Colors.buttonPressedColor : Colors.buttonColor,
                    },
                    styles.ClickSpeedButton,
                ] : styles.DisabledButton}
                disabled={isThirtyDisabled}
                onPress={() =>  OnBoost(30)}>
                <Text style={!isThirtyDisabled? styles.ClickSpeedButtonText: styles.DisabledSpeedButtonText}>+ 30 Click/s (Cost: 100M Clicks)</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default EggClickerUI; 
