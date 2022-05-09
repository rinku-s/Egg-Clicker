  /*
 *  file: App.js
 *  author: Rinku Ansari <raf122@uregina.ca>
 *  version: 0.1
 *  date-created: apr-22-2022
 *  last-modified: apr-22-2022
 */

import {GlobalConstants} from './constants/GlobalConstants'
import * as React from 'react';
import {Alert, Animated, Vibration, } from 'react-native';
import {getImageSource} from './utils/ImageChanger';
import { Audio } from 'expo-av';
import EggClickerUI from './presentation/EggClickerUI';


/**
 * App
 * Purpose: Define the container component of Egg Clicker app
 ``*/
export default function App() {
    const [counter, setCounter] = React.useState(0)
    const [clickSpeed, setClickSpeed] = React.useState(0)
    const [eggButton, setEggButton] = React.useState(true)
    const [isAutoClickEnabled, setIsAutoClickEnabled] = React.useState(false)
    const [isOneDisabled, setIsOneDisabled] = React.useState(true)
    const [isTenDisabled, setIsTenDisabled] = React.useState(true)
    const [isTwentyDisabled, setIsTwentyDisabled] = React.useState(true)
    const [isThirtyDisabled, setIsThirtyDisabled] = React.useState(true)
    const [target,setTarget] = React.useState("default");
    const [eggUri,setEggUri] = React.useState({path: getImageSource('default')})
    const animation = React.useRef(new Animated.Value(0));
    const [modalVisible, setModalVisible] = React.useState(false);
    const [sound, setSound] = React.useState();


    /**
     * useEffect
     * Purpose: this hook runs every time the sound variable changes value.
     *
     * Parameter(s):
     * <1> sound must be defined and initialized.
     *
     * Precondition(s):
     * <1> sound must be defined and initialized  as default.
     * Returns: sound
     *
     * Side effect:
     * <1> refresh the value of sound variable by removing the sound from memory
     * <2> else, set sound as undefined.
     */
  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);
    /**
     * useEffect
     * Purpose: this hook runs every time value of state variable target changes to update the image of the Egg Button according to counter value.
     *
     * Parameter(s):
     * <1> target must be defined and initialized.
     *
     * Precondition(s):
     * <1> target must be defined and initialized  as default.
     * <2  setEggUri must be defined and initialized.
     * Returns: N/A
     *
     * Side effect:
     * <1> if target value is updated to default, then setEggUri will set source of the image of Egg Button as default value from imageChanger.js
     * <2> else if target value is updated to win, then setEggUri will set the source of the image of Egg Button the win image from imageChanger.js
     * <2> else, do nothing
     */
    React.useEffect(() => {
        if(target == "default")
            setEggUri({
                path: getImageSource(target)
            });
        if(target == "win") {
            setEggUri({
                path: getImageSource(target)
            });
        }
    },[target])

    /**
     * useEffect
     * Purpose: this hook runs every time value of state variables clickSpeed, isAutoClickEnabled, or counter are updated. It updates the counter value according to speed set by the user and displays the winning outcome of Egg Clicker.
     *
     * Parameter(s):
     * <1> clickSpeed must be defined and initialized.
     * <2> isAutoClickEnabled must be defined and initialized.
     * <3> counter must be defined and initialized.
     *
     * Precondition(s):
     * <1> clickSpeed must be defined and initialized  as default.
     * <2  isAutoClickEnabled must be defined and initialized.
     * <3> counter must be defined and initialized.
     * <4> buttonEnable function must be defined and initialized.
     * <5> GlobalConstants must be imported.
     * <6> eggShaker function must be defined and initialized.
     * Returns:
     * <1> clearInterval: ensures the counter value is updated correctly.
     *
     * Side effect:
     * <1> if any of the values clickSpeed, isAutoClickEnabled or counter is updated, then the buttonEnable function is called which will evaluate which Booster buttons must be enabled or greyed out according to the counter value.
     * <2> if any of the Booster buttons is enabled and clicked by the user i.e. isAutoClickEnabled is true, eggShaker function is called to perform shaking animation and counter is updated using setInterval according to the clickSpeed value.
     * <3> if the counter value is greater than winCost then the user is shown win animation by updating target value to win, timer is reset, and win alert is displayed.
     * <4> else, do nothing
     */
    React.useEffect(() => {
        buttonEnable(counter)
        if(isAutoClickEnabled){
            const interval = setInterval(() => {
                setCounter(counter + 1);
                //console.log("Inside setInterval with counter "+ counter)
                eggShaker()
            }, GlobalConstants.oneSecond/clickSpeed);
            if (counter > GlobalConstants.winCost) {
                Vibration.vibrate(GlobalConstants.oneSecond/2)
                playSound('win')
                setTarget("win")
                clearInterval(interval)
                setModalVisible(true)
            }
            return () => clearInterval(interval);
        }

    }, [clickSpeed, isAutoClickEnabled, counter]);

    /**
     * playSound
     * Purpose: this function runs every time the egg button is clicked to play sound of clicking or on win to play the victory sound.
     * Parameter(s): N/A
     *
     * Precondition(s):
     * <1> sound must be defined and initialized.
     * Returns: N/A
     *
     * Side effect:
     * <1> if playSound is called, it checks if the call is from eggClick function or from win condition, and it plays the sound associated to it accordingly.
     * <2> else, do nothing
     */
  async function playSound(whichSound) {
    console.log('Loading Sound');
    if (whichSound == 'eggClick') 
    {    const { sound } = await Audio.Sound.createAsync(
       require('./assets/sounds/eggClick.mp3')
    );
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync(); 
    }
    else if (whichSound == 'win')  {    
      const { sound } = await Audio.Sound.createAsync(
       require('./assets/sounds/win-sound.mp3')
    );
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync(); 
    }
    }

    /**
     * eggShaker
     * Purpose: this function runs every time the egg button is clicked or auto-clicked to perform shaking animations of the Egg Button.
     *
     * Parameter(s): N/A
     *
     * Precondition(s):
     * <1> animation must be defined and initialized.
     * Returns: N/A
     *
     * Side effect:
     * <1> if eggShaker is called, the Egg Image in Pressable for Egg Button is animated to shake by displacing it four units to the right and left and then bringing it back to its original position twice in a loop.
     * <2> else, do nothing
     */
    const eggShaker = React.useCallback(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animation.current, {
                    toValue: -4,
                    duration: 20,
                }),
                Animated.timing(animation.current, {
                    toValue: 4,
                    duration: 20,
                }),
                Animated.timing(animation.current, {
                    toValue: 0,
                    duration: 20,
                }),
            ]),
            { iterations: 2 }
        ).start();
    }, []);

    /**
     * onEggClick
     * Purpose: this function handles the button press for egg Button.
     *
     * Parameter(s): N/A
     *
     * Precondition(s):
     * <1> eggShaker must be defined and initialized.
     * <2> counter must be defined and initialized.
     * <3> buttonEnable function  must be defined and initialized.
     * <4> playSound must be defined and initialized.
     * Returns: N/A
     *
     * Side effect:
     * <1> if egg Button is clicked, onEggClick is called, which in turn calls playSound to play the sound effect of click and eggShaker to perform animation and then increases the counter value by 1. buttonEnable is called to check if counter value is big enough to enable any of the Booster buttons towards the bottom of the screen.
     * <2> else, do nothing
     */
    const onEggClick = () => {
        playSound('eggClick')
        eggShaker()
        const counterValue = counter + 1
        setCounter(counterValue)
        buttonEnable(counterValue)
    }

    /**
     * buttonEnable
     * Purpose: this function is called every time the egg button is clicked or auto-clicked or the counter value changes to enable or disable the four Booster buttons.
     *
     * Parameter(s): N/A
     *
     * Precondition(s):
     * <1> counterValue must be defined and initialized.
     *
     * Returns: N/A
     *
     * Side effect:
     * <1> if egg Button is clicked or auto-clicked resulting in a change in counter value then, buttonEnable checks if it is greater than or equal to the cost of any of the Booster buttons.
     * <2> if counter Value > cost Value, enable the corresponding Booster button.
     * <2> else, do nothing
     */
    const buttonEnable = (counterValue) => {
        //console.log("Inside buttonEnable")
        if(counterValue >= GlobalConstants.oneClickCost) {
            setIsOneDisabled(false)
            if (counterValue >= GlobalConstants.tenClickCost) {
                setIsTenDisabled(false)
                if (counterValue >= GlobalConstants.twentyClickCost) {
                    setIsTwentyDisabled(false)
                    if (counterValue >= GlobalConstants.thirtyClickCost) {
                        setIsThirtyDisabled(false)
                    }
                }
            }
        }

    }

    /**
     * OnBoost
     * Purpose: this function handles the click of all of the Booster buttons.
     *
     * Parameter(s): N/A
     *
     * Precondition(s):
     * <1> boost must be defined and initialized.
     * <2> counter must be defined and initialized.
     * <3> isAutoClickEnabled must be defined and initialized.
     * <4> clickSpeed must be defined and initialized.
     * <5> GlabalConstants must be imported.
     * Returns: N/A
     *
     * Side effect:
     * <1> if any of the Booster buttons is clicked then boost parameter value is checked to see which Booster button is clicked and accordingly the cost of the Booster is deducted, and isAutoClickEnabled is set to true and clickSpeed is increased according the the Booster button enabled.
     * <2> else, do nothing
     */
    const OnBoost = (boost) => {
        //console.log("Inside OnBoost with " +boost)
        if(boost == 1 && counter >= GlobalConstants.oneClickCost) {
            setCounter(counter - GlobalConstants.oneClickCost)
            setIsAutoClickEnabled(true)
            setClickSpeed (clickSpeed + 1)
        }
        else if(boost == 10 && counter >= GlobalConstants.tenClickCost)  {
            setCounter(counter-GlobalConstants.tenClickCost)
            setIsAutoClickEnabled(true)
            setClickSpeed (clickSpeed + 10)
        }
        else if (boost == 20 && counter > GlobalConstants.twentyClickCost) {
            setCounter(counter-GlobalConstants.twentyClickCost)
            setIsAutoClickEnabled(true)
            setClickSpeed (clickSpeed + 20)
        }
        else if (boost == 30 && counter > GlobalConstants.thirtyClickCost) {
            setCounter(counter-GlobalConstants.thirtyClickCost)
            setIsAutoClickEnabled(true)
            setClickSpeed (clickSpeed + 30)
        }
    }
  /**
     * onReset
     * Purpose: this function handles the click of the Reset button in the Modal
     *
     * Parameter(s): N/A
     *
     * Precondition(s):
     * <1> isAutoClickEnabled must be defined and initialized.
     * <2> modalVisible must be defined and initialized.
     * <3> target must be defined and initialized.
     * <4> counter must be defined and initialized.
     * <5> clickSpeed  must be defined and initialized.
     * <6> isOneDisabled must be defined and initialized.
     * <7> isTenDisabled must be defined and initialized.
     * <8> isTwentyDisabled must be defined and initialized.
     * <9> isThirtyDisabled must be defined and initialized..
     * Returns: N/A
     *
     * Side effect:
     * <1> if reset button is clicked, all the variables related to counter, booster buttons and egg image are reset to their default state.
     * <2> else, do nothing
     */
    const onReset = () => {
          setIsAutoClickEnabled(false)
          setModalVisible(!modalVisible)
          setTarget('default')
          setCounter(0)
          setClickSpeed(0)
          setIsOneDisabled(true)
          setIsTenDisabled(true)
          setIsTwentyDisabled(true)
          setIsThirtyDisabled(true)
        }

    return (
        <EggClickerUI
            counter={counter}
            setCounter = {setCounter}
            onEggClick = {onEggClick}
            animation = {animation}
            eggUri = {eggUri}
            clickSpeed = {clickSpeed} isOneDisabled = {isOneDisabled}
            isTenDisabled = {isTenDisabled}
            isTwentyDisabled = {isTwentyDisabled}
            isThirtyDisabled = {isThirtyDisabled}
            OnBoost = {OnBoost}
            modalVisible ={modalVisible}
            setModalVisible ={setModalVisible}
            onReset = {onReset}
        />
    );
}