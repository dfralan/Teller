/*!
  * Teller v3.0.2 (https://github.com/dfralan/Teller)
  * Copyright 2021-2023 The Teller Authors.
  * Licensed under GNU GENERAL PUBLIC LICENSE (https://github.com/dfralan/Teller/blob/main/LICENSE)
  */
(function () {
    function main(){
        //teller element where instructions are made
        const tellerTag = document.getElementsByTagName("teller")[0]
        //Languages
        var userLang = 'en';
        //Displayed Box or not
        var displayedBox = false;
        //Already interacted Box or not
        var interacted = false;
        //Ready to fetch
        var emotionSelected= false;
        var messageReady = false;
        var emailReadyTeller = false;
        var lockAndLoudTeller=false;
        var stateGeneral = false;
        //User input data
        var emotionTeller = "";
        var messageTeller = "";
        var emailTeller = "";
        //CSS Repetitions
        const transitionChill = '.3s!important;-webkit-transition: .3s!important;-moz-transition: .3s!important;-o-transition: .3s!important;'
        const animationStandard = '1;animation-direction: normal!important;animation-play-state: paused;animation-duration: 2s!important;animation-timing-function: ease-all!important;animation-iteration-count: infinite!important;cursor: pointer!important;'
        const emojiBrickStyle = 'transition:'+transitionChill+'position: absolute!important;opacity: 0.25;background-color: transparent!important;width: 60px!important;height: 80px!important;left: 0!important;top: 0!important;text-align: center!important;cursor: pointer!important;'
        //Color Palette
        const almostBlack = '#0D1418';
        const realWhite = 'white';
        const nebulaGrey = '#E8E8E8';
        const charmingGrey = '#2A2F32';
        const onlineGreen = '#31A24C';
        //Get color selected by user
        let userColor = tellerTag.getAttribute("userColor") || byTheme(charmingGrey,realWhite);
        let userBorderRadius = tellerTag.getAttribute("borderRadius") || "25"
         
        //Platform Main Buttons
        
        //Platform Components Buttons
        const tellerSmallA = '<b><a target="_blank" href="https://github.com/dfralan/Teller">Teller<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="22px"	 height="14.6px" viewBox="0 0 22 14.6" style="overflow:visible;enable-background:new 0 0 22 14.6;" xml:space="preserve"><style type="text/css">	.stayPlane{fill:'+ userColor +';}</style><defs></defs><path class="stayPlane" d="M5.1,6l14.5-5.9C19.9,0,20.1,0.3,20,0.5l-9.1,14c-0.1,0.2-0.5,0.1-0.5-0.1L10,7.5c0-0.1-0.1-0.2-0.2-0.3L5.2,6.5C4.9,6.5,4.9,6.1,5.1,6z"/></svg></a></b>'
        //Feedback URL variables
        var ffu = "";//feedbackFormUrl
        //Regex section
        const regexMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regexMsg = /^[\a-zA-Z\d\s:\u00C0-\u00FF.,¡!¿?]+$/;
        //Brick appear after x milliseconds
        let appearAfter = tellerTag.getAttribute("appearAfter") || "5000"

        detectUserLang();
        //Styles sheet/Hoja de estilos
        const styleSheetTeller = `<style>
        @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;600&display=swap");
        
        teller{
            font-family: "Outfit", sans-serif;
            display: block;
            position: fixed!important;
            z-index: 100000;
            ${ getSide()[0] }: 30px!important;
            bottom: 30px!important;
            background-color: transparent!important;
        }
        .transparentBG{
            fill: transparent !important;
        }
        #hoverBrick{
            transition:${transitionChill}
            opacity: 0;
            display:none;
            position: absolute!important;
            bottom: 7px!important;
            ${ getSide()[0] }: 70px!important;
            border-radius: 5px;
            white-space: nowrap;
            width: auto!important;
            height: auto!important;
            padding: 6px 10px 10px 10px !important;
            text-align: left;
            font-weight: 200!important;
            font-size: small!important;
            color: ${  byTheme(charmingGrey, realWhite) };
            background-color: ${  byTheme(realWhite,charmingGrey) }!important;
            box-shadow: -2px 1px 5px rgba(0,0,0,0.1) !important;
        }
        #hoverBrick:after{
            top:10px;
            content:"";
            border-style:solid;
            position:absolute;
            ${ getSide()[0] }:-7px;
            border-color: ${ getSide()[1] };
            border-width: ${ getSide()[2] };
        }
        #buttonFatherBrick{
            opacity: 1;
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
            position: absolute!important;
            background-color: ${byTheme(realWhite, charmingGrey)}!important;
            width: 50px;
            height: 50px;
            ${ getSide()[0] }: 0px;
            bottom: 0px!important;
            border-radius: ${ userBorderRadius }px;
            cursor: pointer!important;
            transition:${transitionChill};
            z-index: 1;
        }
        #notificationInMainButtonPulse{
            opacity: .7;
            box-shadow: 0 0 5px 5px ${ userColor };
            ${ getSide()[0] }: 0px;
            bottom: 0px!important;
            position:absolute;
            width: 50px;
            height: 50px;
            outline: 2px solid ${ userColor };
            border-radius: ${ userBorderRadius }px;
            transform: scale(1);
            cursor: pointer!important;
            animation-name: Pulse;
            animation-play-state: running;
            animation-duration: 3s!important;
            animation-timing-function: ease-all!important;
            animation-iteration-count: infinite!important;
            z-index: 0;
        }
        @keyframes Pulse {
            0% {
                opacity: 0;
                transform: scale(1);
            }
            10% {
                opacity: .4;
            }
        40% {
            opacity: 0;
            transform: scale(1.4);
        }
        100% {
            opacity: 0;
            transform: scale(1);
        }
    }
        #buttonFatherBrick svg{
            transition:${transitionChill}
        }
        #buttonFatherBrick svg:hover{
            transform: scale(1.05);
        }
        #feedbackBrick{
            transition:${transitionChill}
        }
        #feedbackIconShape{
            transition:${transitionChill}
            fill:${ byTheme(realWhite,charmingGrey)};
        }
        #fatherBrick{
            transition:${transitionChill}
            opacity: 0;
            display: none;
            font-family: "Outfit", sans-serif;
            position: absolute!important;
            background-color:${byTheme(realWhite,charmingGrey)}!important;
            width: 340px!important;
            height: 200px;
            ${ getSide()[0] }: 0px!important;
            bottom: 70px!important;
            border-radius: 10px;
            transform: translateY(10px);
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
        }
        #xBrick{
            transition:${transitionChill}
            opacity: 0;
            fill: ${userColor} !important;
            transform: translateX(30px) scaleX(0);
        }
        #tellercin{
            transition:${transitionChill}
            opacity: 1;
            fill: ${userColor} !important;
            transform: scaleX(1);
        }
        #titleBrick{
            transition:${transitionChill}
            position: absolute!important;
            opacity: 1;
            font-weight: 200;
            color:${byTheme(almostBlack,realWhite)}!important;
            background-color: transparent!important;
            width: 300px!important;
            height: auto!important;
            left: 20px!important;
            top: 20px!important;
            text-align: center!important;
        }
        #emojisBrick{
            transition:${transitionChill}
            position: absolute!important;
            opacity: 1;
            background-color: transparent!important;
            width: 300px!important;
            height: 80px!important;
            left: 20px!important;
            top: 60px;
            text-align: center!important;
        }
        #emojiSelectorBrick{
            transition:${transitionChill}
            position: absolute!important;
            opacity: 0;
            background-color: #eaeaeb!important;
            width: 10px!important;
            height: 10px!important;
            left: 25px;
            transform: rotate(45deg)!important;
            bottom: -7px!important;
            text-align: center!important;
        }
        #emojiBrick1{${ emojiBrickStyle }
            left: 0px!important;
        }
        #emojiBrick1:hover>#emojiDescriptionBrick1 {
            opacity: 1!important;
        }
        #emojiBrick2{${ emojiBrickStyle }
            left: 60px!important;
        }
        #emojiBrick2:hover > #emojiDescriptionBrick2{
            opacity: 1!important;
        }
        #emojiBrick3{${ emojiBrickStyle }
            left: 120px!important;
        }
        #emojiBrick3:hover>#emojiDescriptionBrick3{
            opacity: 1!important;
        }
        #emojiBrick4{${ emojiBrickStyle }
            left: 180px!important;
        }
        #emojiBrick4:hover>#emojiDescriptionBrick4{
            opacity: 1!important;
        }
        #emojiBrick5{${ emojiBrickStyle }
            left: 240px!important;
        }
        #emojiBrick5:hover>#emojiDescriptionBrick5{
            opacity: 1!important;
        }
        #emojiFaceBrick1{
            transition:${transitionChill}
            opacity: 1!important;
            position: absolute!important;
            background-color: ${ byTheme(charmingGrey,nebulaGrey) };
            width: 40px!important;
            height: 40px!important;
            border-radius: 25px;
            left: 10px!important;
            top: 10px!important;
            cursor: pointer!important;
        }
        #emojiFaceBrick2{
            transition:${transitionChill}
            opacity: 1!important;
            position: absolute!important;
            background-color: ${ byTheme(charmingGrey,nebulaGrey) };
            width: 40px!important;
            height: 40px!important;
            border-radius: 25px;
            left: 10px!important;
            top: 10px!important;
            cursor: pointer!important;
        }
        #emojiFaceBrick3{
            transition:${transitionChill}
            opacity: 1!important;
            position: absolute!important;
            background-color: ${ byTheme(charmingGrey,nebulaGrey) };
            width: 40px!important;
            height: 40px!important;
            border-radius: 25px;
            left: 10px!important;
            top: 10px!important;
            cursor: pointer!important;
        }
        #emojiFaceBrick4{
            transition:${transitionChill}
            opacity: 1!important;
            position: absolute!important;
            background-color: ${ byTheme(charmingGrey,nebulaGrey) };
            width: 40px!important;
            height: 40px!important;
            border-radius: 25px;
            left: 10px!important;
            top: 10px!important;
            cursor: pointer!important;
        }
        #emojiFaceBrick5{
            transition:${transitionChill}
            opacity: 1!important;
            position: absolute!important;
            background-color: ${ byTheme(charmingGrey,nebulaGrey) };
            width: 40px!important;
            height: 40px!important;
            border-radius: 25px;
            left: 10px!important;
            top: 10px!important;
            cursor: pointer!important;
        }
        #SuperFaceTeller{
            animation-name: Super!important;
            opacity:${animationStandard}
        }
        #GoodFaceTeller{
            animation-name: Good!important;
            opacity:${animationStandard}
        }
        #NeutralFaceTeller{
            animation-name: Neutral!important;
            opacity:${animationStandard}
        }
        #BadFaceTeller{
            animation-name: Bad!important;
            opacity:${animationStandard}
        }
        #FuriousFaceTeller{
            animation-name: Furious!important;
            opacity:${animationStandard}
        }
        .tellersFace{
            fill: none!important;
        }
        .tellersGesture{
            fill: ${byTheme(realWhite,almostBlack)}!important;
        }
        #emojiDescriptionBrick1{
            transition:${transitionChill}
            position: absolute!important;
            opacity: 0;
            color:${byTheme(almostBlack,realWhite)}!important;
            font-size: small!important;
            background-color: transparent!important;
            width: 60px!important;
            height: 20px!important;
            left: 0!important;
            bottom: 0!important;
            text-align: center!important;
            cursor: pointer!important;
        }
        #emojiDescriptionBrick2{
            transition:${transitionChill}
            position: absolute!important;
            opacity: 0;
            color:${byTheme(almostBlack,realWhite)}!important;
            font-size: small!important;
            background-color: transparent!important;
            width: 60px!important;
            height: 20px!important;
            left: 0!important;
            bottom: 0!important;
            text-align: center!important;
            cursor: pointer!important;
        }
        #emojiDescriptionBrick3{
            transition:${transitionChill}
            position: absolute!important;
            opacity: 0;
            color:${byTheme(almostBlack,realWhite)}!important;
            font-size: small!important;
            background-color: transparent!important;
            width: 60px!important;
            height: 20px!important;
            left: 0!important;
            bottom: 0!important;
            text-align: center!important;
            cursor: pointer!important;
        }
        #emojiDescriptionBrick4{
            transition:${transitionChill}
            position: absolute!important;
            opacity: 0;
            color:${byTheme(almostBlack,realWhite)}!important;
            font-size: small!important;
            background-color: transparent!important;
            width: 60px!important;
            height: 20px!important;
            left: 0!important;
            bottom: 0!important;
            text-align: center!important;
            cursor: pointer!important;
        }
        #emojiDescriptionBrick5{
            transition:${transitionChill}
            position: absolute!important;
            opacity: 0;
            color:${byTheme(almostBlack,realWhite)}!important;
            font-size: small!important;
            width: 60px!important;
            height: 20px!important;
            left: 0!important;
            bottom: 0!important;
            text-align: center!important;
            cursor: pointer!important;
        }
        #textAreasBrick{
            transition:${transitionChill}
            position: absolute!important;
            opacity: 0;
            display: none;
            background-color: #eaeaeb!important;
            width: 340px!important;
            height: 110px!important;
            left: 0!important;
            top: 100px!important;
            text-align: center!important;
        }
        #textAreaBrick{
            transition:${transitionChill}
            position: absolute!important;
            color: #333!important;
            resize: none!important;
            font-family: "Outfit", sans-serif;
            font-size: medium!important;
            outline: 0!important;
            border: none!important;
            background-color: transparent!important;
            width: 300px!important;
            height: 90px!important;
            left: 20px!important;
            top: 10px!important;
            text-align: left!important;
        }
        
        #inputAreasBrick{
            transition:${transitionChill}
            position: absolute!important;
            opacity: 0;
            display: none;
            background-color: #eaeaeb!important;
            width: 340px!important;
            height: 50px!important;
            left: 0!important;
            top: 90px!important;
            text-align: center!important;
        }
        #inputAreaBrick{
            position: absolute!important;
            opacity: 1;
            color: #333!important;
            resize: none!important;
            font-family: "Outfit", sans-serif;
            font-size: medium!important;
            outline: 0!important;
            box-shadow: none!important;
            border: none!important;
            background-color: transparent!important;
            width: 300px!important;
            height: 30px!important;
            left: 20px!important;
            top: 10px!important;
            text-align: center!important;
        }
        #actionButtonBrick{
            transition:${transitionChill}
            position: absolute!important;
            opacity: 0;
            display: none;
            bottom: 10px;
            right: 20px!important;
            border-radius: 5px;
            background-color: ${nebulaGrey};
            width: 60px!important;
            height: 30px!important;
            line-height: 28px;
            font-size: small!important;
            text-align: center!important;
            color: ${realWhite};
            cursor: pointer!important;
        }
        #actionButtonBrick:hover{
            opacity: .7!important;
        }
        #skipButtonBrick{
            transition:${transitionChill}
            position: absolute!important;
            opacity: 0;
            display: none;
            bottom: 20px!important;
            right: 80px!important;
            border-radius: 5px;
            background-color: transparent!important;
            width: 60px!important;
            height: 25px!important;
            font-size: small!important;
            text-align: center!important;
            padding-top: 7px!important;
            color: ${byTheme(charmingGrey,realWhite)}!important;
            cursor: pointer!important;
            text-decoration: underline!important;
        }
        #paragraphBrick{
            transition:${transitionChill}
            position: absolute!important;
            opacity: 1;
            color:${byTheme(almostBlack,realWhite)}!important;;
            text-align: right;
            bottom: 10px!important;
            right: 20px!important;
            border-radius: 5px;
            background-color: transparent!important;
            width: 300px!important;
            height: 25px!important;
            font-weight: 200;
            font-size: x-small!important;
            padding-top: 7px!important;
            cursor: pointer!important;
        }
        #paragraphBrick a{
            text-decoration: none !important;
            color:${byTheme(almostBlack,realWhite)}!important;
            font-weight: 600;
            font-size: x-small;
        }
        #paragraphBrick a svg{
            transform: translate(-4px, 3px) scale(.65) !important;
        }
        #notificationParagraphBrick{
            transition:${transitionChill}
            position: absolute!important;
            opacity: 0;
            display: none;
            font-size: small!important;
            background-color: transparent!important;
            width: 300px!important;
            height: 10px!important;
            left: 20px!important;
            bottom: 60px!important;
            text-align: center!important;
            color:${byTheme(charmingGrey,realWhite)}!important;
        }
        @keyframes Furious{
            0% {
            transform: translateX(0) translateY(0);
        }
        10% {
            transform: translateX(0) translateY(0);
        }
        15% {
            transform: translateX(4px) translateY(-3px);
        }
        20% {
            transform: translateX(-4px) translateY(-3px);
        }
        25% {
            transform: translateX(4px) translateY(-3px);
        }
        30% {
            transform: translateX(-4px) translateY(-3px);
        }
        35% {
            transform: translateX(4px) translateY(-3px);
        }
        40% {
            transform: translateX(-4px) translateY(-3px);
        }
        45% {
            transform: translateX(0) translateY(-3px);
        }
        90% {
            transform: translateX(0) translateY(0);
        }
        }@-webkit-keyframes Furious {
            0% {
            transform: translateX(0) translateY(0);
        }
        10% {
            transform: translateX(0) translateY(0);
        }
        15% {
            transform: translateX(4px) translateY(-3px);
        }
        20% {
            transform: translateX(-4px) translateY(-3px);
        }
        25% {
            transform: translateX(4px) translateY(-3px);
        }
        30% {
            transform: translateX(-4px) translateY(-3px);
        }
        35% {
            transform: translateX(4px) translateY(-3px);
        }
        40% {
            transform: translateX(-4px) translateY(-3px);
        }
        45% {
            transform: translateX(0) translateY(-3px);
        }
        90% {
            transform: translateX(0) translateY(0);
        }
        }@-moz-keyframes Furious {
            0% {
            transform: translateX(0) translateY(0);
        }
        10% {
            transform: translateX(0) translateY(0);
        }
        15% {
            transform: translateX(4px) translateY(-3px);
        }
        20% {
            transform: translateX(-4px) translateY(-3px);
        }
        25% {
            transform: translateX(4px) translateY(-3px);
        }
        30% {
            transform: translateX(-4px) translateY(-3px);
        }
        35% {
            transform: translateX(4px) translateY(-3px);
        }
        40% {
            transform: translateX(-4px) translateY(-3px);
        }
        45% {
            transform: translateX(0) translateY(-3px);
        }
        90% {
            transform: translateX(0) translateY(0);
        }
        }@-ms-keyframes Furious {
            0% {
            transform: translateX(0) translateY(0);
        }
        10% {
            transform: translateX(0) translateY(0);
        }
        15% {
            transform: translateX(4px) translateY(-3px);
        }
        20% {
            transform: translateX(-4px) translateY(-3px);
        }
        25% {
            transform: translateX(4px) translateY(-3px);
        }
        30% {
            transform: translateX(-4px) translateY(-3px);
        }
        35% {
            transform: translateX(4px) translateY(-3px);
        }
        40% {
            transform: translateX(-4px) translateY(-3px);
        }
        45% {
            transform: translateX(0) translateY(-3px);
        }
        90% {
            transform: translateX(0) translateY(0);
        }
        }@-o-keyframes Furious {
            0% {
            transform: translateX(0) translateY(0);
        }
        10% {
            transform: translateX(0) translateY(0);
        }
        15% {
            transform: translateX(4px) translateY(-3px);
        }
        20% {
            transform: translateX(-4px) translateY(-3px);
        }
        25% {
            transform: translateX(4px) translateY(-3px);
        }
        30% {
            transform: translateX(-4px) translateY(-3px);
        }
        35% {
            transform: translateX(4px) translateY(-3px);
        }
        40% {
            transform: translateX(-4px) translateY(-3px);
        }
        45% {
            transform: translateX(0) translateY(-3px);
        }
        90% {
            transform: translateX(0) translateY(0);
        }
        }@keyframes Bad {
            0% {
            transform: translateX(0);
        }
        10% {
            transform: translateX(0);
        }
        20% {
            transform: translateX(4px);
        }
        30% {
            transform: translateX(-4px);
        }
        40% {
            transform: translateX(4px);
        }
        50% {
            transform: translateX(-4px);
        }
        60% {
            transform: translateX(4px);
        }
        70% {
            transform: translateX(-4px);
        }
        80% {
            transform: translateX(0);
        }
        90% {
            transform: translateX(0);
        }
        }@-webkit-keyframes Bad {
            0% {
            transform: translateX(0);
        }
        10% {
            transform: translateX(0);
        }
        20% {
            transform: translateX(4px);
        }
        30% {
            transform: translateX(-4px);
        }
        40% {
            transform: translateX(4px);
        }
        50% {
            transform: translateX(-4px);
        }
        60% {
            transform: translateX(4px);
        }
        70% {
            transform: translateX(-4px);
        }
        80% {
            transform: translateX(0);
        }
        90% {
            transform: translateX(0);
        }
        }@-moz-keyframes Bad {
            0% {
            transform: translateX(0);
        }
        10% {
            transform: translateX(0);
        }
        20% {
            transform: translateX(4px);
        }
        30% {
            transform: translateX(-4px);
        }
        40% {
            transform: translateX(4px);
        }
        50% {
            transform: translateX(-4px);
        }
        60% {
            transform: translateX(4px);
        }
        70% {
            transform: translateX(-4px);
        }
        80% {
            transform: translateX(0);
        }
        90% {
            transform: translateX(0);
        }
        }@-ms-keyframes Bad {
            0% {
            transform: translateX(0);
        }
        10% {
            transform: translateX(0);
        }
        20% {
            transform: translateX(4px);
        }
        30% {
            transform: translateX(-4px);
        }
        40% {
            transform: translateX(4px);
        }
        50% {
            transform: translateX(-4px);
        }
        60% {
            transform: translateX(4px);
        }
        70% {
            transform: translateX(-4px);
        }
        80% {
            transform: translateX(0);
        }
        90% {
            transform: translateX(0);
        }
        }@-o-keyframes Bad {
            0% {
            transform: translateX(0);
        }
        10% {
            transform: translateX(0);
        }
        20% {
            transform: translateX(4px);
        }
        30% {
            transform: translateX(-4px);
        }
        40% {
            transform: translateX(4px);
        }
        50% {
            transform: translateX(-4px);
        }
        60% {
            transform: translateX(4px);
        }
        70% {
            transform: translateX(-4px);
        }
        80% {
            transform: translateX(0);
        }
        90% {
            transform: translateX(0);
        }
        }@keyframes Neutral {
            0% {
            transform: translateY(0);
        }
        10% {
            transform: translateY(0);
        }
        30% {
            transform: translateX(5px);
        }
        40% {
            transform: translateX(5px);
        }
        60% {
            transform: translateX(-5px);
        }
        70% {
            transform: translateX(-5px);
        }
        80% {
            transform: translateY(0);
        }
        90% {
            transform: translateY(0);
        }
        }@-webkit-keyframes Neutral {
            0% {
            transform: translateY(0);
        }
        10% {
            transform: translateY(0);
        }
        30% {
            transform: translateX(5px);
        }
        40% {
            transform: translateX(5px);
        }
        60% {
            transform: translateX(-5px);
        }
        70% {
            transform: translateX(-5px);
        }
        80% {
            transform: translateY(0);
        }
        90% {
            transform: translateY(0);
        }
        }@-moz-keyframes Neutral {
            0% {
            transform: translateY(0);
        }
        10% {
            transform: translateY(0);
        }
        30% {
            transform: translateX(5px);
        }
        40% {
            transform: translateX(5px);
        }
        60% {
            transform: translateX(-5px);
        }
        70% {
            transform: translateX(-5px);
        }
        80% {
            transform: translateY(0);
        }
        90% {
            transform: translateY(0);
        }
        }@-ms-keyframes Neutral {
            0% {
            transform: translateY(0);
        }
        10% {
            transform: translateY(0);
        }
        30% {
            transform: translateX(5px);
        }
        40% {
            transform: translateX(5px);
        }
        60% {
            transform: translateX(-5px);
        }
        70% {
            transform: translateX(-5px);
        }
        80% {
            transform: translateY(0);
        }
        90% {
            transform: translateY(0);
        }
        }@-o-keyframes Neutral {
            0% {
            transform: translateY(0);
        }
        10% {
            transform: translateY(0);
        }
        30% {
            transform: translateX(5px);
        }
        40% {
            transform: translateX(5px);
        }
        60% {
            transform: translateX(-5px);
        }
        70% {
            transform: translateX(-5px);
        }
        80% {
            transform: translateY(0);
        }
        90% {
            transform: translateY(0);
        }
        }@keyframes Good {
            0% {
            transform: translateY(0);
        }
        10% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(-7px);
        }
        40% {
            transform: translateY(5px);
        }
        80% {
            transform: translateY(0);
        }
        90% {
            transform: translateY(0);
        }
        }@-webkit-keyframes Good {
            0% {
            transform: translateY(0);
        }
        10% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(-7px);
        }
        40% {
            transform: translateY(5px);
        }
        80% {
            transform: translateY(0);
        }
        90% {
            transform: translateY(0);
        }
        }@-moz-keyframes Good {
            0% {
            transform: translateY(0);
        }
        10% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(-7px);
        }
        40% {
            transform: translateY(5px);
        }
        80% {
            transform: translateY(0);
        }
        90% {
            transform: translateY(0);
        }
        }@-ms-keyframes Good {
            0% {
            transform: translateY(0);
        }
        10% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(-7px);
        }
        40% {
            transform: translateY(5px);
        }
        80% {
            transform: translateY(0);
        }
        90% {
            transform: translateY(0);
        }
        }@-o-keyframes Good {
            0% {
            transform: translateY(0);
        }
        10% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(-7px);
        }
        40% {
            transform: translateY(5px);
        }
        80% {
            transform: translateY(0);
        }
        90% {
            transform: translateY(0);
        }
        }@keyframes Super {
            0% {
            transform: translateY(0);
        }
        10% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(4px);
        }
        50% {
            transform: translateY(4px);
        }
        90% {
            transform: translateY(0);
        }
        }@-webkit-keyframes Super {
            0% {
            transform: translateY(0);
        }
        10% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(4px);
        }
        50% {
            transform: translateY(4px);
        }
        90% {
            transform: translateY(0);
        }
        }@-moz-keyframes Super {
            0% {
            transform: translateY(0);
        }
        10% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(4px);
        }
        50% {
            transform: translateY(4px);
        }
        90% {
            transform: translateY(0);
        }
        }@-ms-keyframes Super {
            0% {
            transform: translateY(0);
        }
        10% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(4px);
        }
        50% {
            transform: translateY(4px);
        }
        90% {
            transform: translateY(0);
        }
        }@-o-keyframes Super {
            0% {
            transform: translateY(0);
        }
        10% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(4px);
        }
        50% {
            transform: translateY(4px);
        }
        90% {
            transform: translateY(0);
        }
        }
        #sharedComponentsArea{
            transition:${transitionChill}
            opacity: 0;
            display: none;
        }
        #platformBoxBrick{
            transition:${transitionChill}
            position: absolute;
            outline: 1px solid ${byTheme("rgba(0,0,0,0.03)","rgba(0,0,0,0.1)")};
            outline-offset: -1px;
            -ms-overflow-style: none;
            scrollbar-width: none;
            overflow: auto;
            left: 0;
            top: 100px;
            width: 100%;
            height: 120px;
            background-color: ${byTheme(nebulaGrey,almostBlack)};
        }
        #platformBoxBrick::-webkit-scrollbar{
            display: none;
        }
        #bubbleWelcome{
            transition:${transitionChill}
            display: none;
            margin: 10px !important;
            padding: 6px 10px 10px 10px !important;
            font-weight: 300;
            font-size: small;
            max-width: 180px;
            height: auto;
            border-radius: 5px;
            color: ${byTheme(charmingGrey,realWhite)}!important;
            background-color:${byTheme(realWhite,charmingGrey)}!important;;
        }
        </style>`
        
        //Teller full element
        var tellerBrick = `
        <brick id="hoverBrick"></brick>
        <brick id="buttonFatherBrick">
            <brick id="notificationInMainButtonPulse"></brick>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30 30" ><circle class="tellersFace" cx="15" cy="15" r="15"/>
            <path id="tellercin" d="M15.2353 22.6808H15C12.7725 22.6808 10.8824 21.8712 9.32941 20.2522C7.77647 18.6332 7 16.6626 7 14.3404C7 12.0182 7.77647 10.0475 9.32941 8.42852C10.8824 6.80951 12.7725 6 15 6C16.1137 6 17.1529 6.21669 18.1176 6.65006C19.0824 7.08343 19.9294 7.68034 20.6588 8.44079C21.3882 9.20123 21.9608 10.0843 22.3765 11.0901C22.7922 12.0958 23 13.1793 23 14.3404C23 16.5318 22.4078 18.5678 21.2235 20.4485C20.0392 22.3291 18.5451 23.801 16.7412 24.864C16.5843 24.9457 16.4275 24.9907 16.2706 24.9989C16.1137 25.0071 15.9725 24.9703 15.8471 24.8885C15.7216 24.8067 15.6118 24.7004 15.5176 24.5696C15.4235 24.4388 15.3686 24.2834 15.3529 24.1035L15.2353 22.6808ZM17.3529 22.043C18.4667 21.0617 19.3725 19.9129 20.0706 18.5964C20.7686 17.2799 21.1176 15.8613 21.1176 14.3404C21.1176 12.5578 20.5255 11.0492 19.3412 9.8145C18.1569 8.57979 16.7098 7.96244 15 7.96244C13.2902 7.96244 11.8431 8.57979 10.6588 9.8145C9.47451 11.0492 8.88235 12.5578 8.88235 14.3404C8.88235 16.1229 9.47451 17.6316 10.6588 18.8663C11.8431 20.101 13.2902 20.7183 15 20.7183H17.3529V22.043ZM14.9765 19.7126C15.2431 19.7126 15.4706 19.6144 15.6588 19.4182C15.8471 19.2219 15.9412 18.9848 15.9412 18.7068C15.9412 18.4288 15.8471 18.1917 15.6588 17.9954C15.4706 17.7992 15.2431 17.7011 14.9765 17.7011C14.7098 17.7011 14.4824 17.7992 14.2941 17.9954C14.1059 18.1917 14.0118 18.4288 14.0118 18.7068C14.0118 18.9848 14.1059 19.2219 14.2941 19.4182C14.4824 19.6144 14.7098 19.7126 14.9765 19.7126ZM12.9294 12.2553C13.102 12.337 13.2745 12.3411 13.4471 12.2675C13.6196 12.194 13.7608 12.0754 13.8706 11.9119C14.0118 11.7156 14.1765 11.5643 14.3647 11.458C14.5529 11.3517 14.7647 11.2986 15 11.2986C15.3765 11.2986 15.6824 11.409 15.9176 11.6298C16.1529 11.8505 16.2706 12.1326 16.2706 12.4761C16.2706 12.6887 16.2118 12.9013 16.0941 13.1138C15.9765 13.3264 15.7686 13.5881 15.4706 13.8988C15.0784 14.2586 14.7882 14.5979 14.6 14.9168C14.4118 15.2357 14.3176 15.5587 14.3176 15.8858C14.3176 16.082 14.3843 16.2497 14.5176 16.3887C14.651 16.5277 14.8118 16.5972 15 16.5972C15.1882 16.5972 15.3451 16.5236 15.4706 16.3764C15.5961 16.2292 15.6902 16.0575 15.7529 15.8613C15.8314 15.5833 15.9725 15.3298 16.1765 15.1008C16.3804 14.8719 16.5686 14.6674 16.7412 14.4876C17.0706 14.1441 17.3176 13.8007 17.4824 13.4573C17.6471 13.1138 17.7294 12.7704 17.7294 12.427C17.7294 11.6747 17.4824 11.0696 16.9882 10.6117C16.4941 10.1538 15.8314 9.92488 15 9.92488C14.498 9.92488 14.0353 10.0516 13.6118 10.3051C13.1882 10.5586 12.8431 10.9061 12.5765 11.3477C12.4824 11.5275 12.4706 11.7033 12.5412 11.8751C12.6118 12.0468 12.7412 12.1735 12.9294 12.2553Z" />
            <path id="xBrick" d="M17.3,14.8l3.7-3.7c0.6-0.6,0.6-1.5,0-2.1c-0.6-0.6-1.5-0.6-2.1,0l-3.7,3.7L11.6,9C11,8.4,10,8.4,9.4,9c-0.6,0.6-0.6,1.5,0,2.1l3.7,3.7l-3.7,3.7c-0.6,0.6-0.6,1.5,0,2.1c0.3,0.3,0.7,0.4,1.1,0.4c0.4,0,0.8-0.1,1.1-0.4l3.7-3.7l3.7,3.7c0.3,0.3,0.7,0.4,1.1,0.4c0.4,0,0.8-0.1,1.1-0.4c0.6-0.6,0.6-1.5,0-2.1L17.3,14.8z"/>
        </svg>
        </brick>
        <brick id="fatherBrick">
            <brick id="feedbackBrick">
                <brick id="mainNotificationBrick">
                    <brick id="titleBrick">` + byLanguage("How would you describe your experience?","Califique su experiencia.") + `</brick>
                    <brick id="paragraphBrick">` + byLanguage(`Powered by `+ tellerSmallA,`Con el poder de `+ tellerSmallA) + `</brick>
                </brick>
                <brick id="emojisBrick">
                    <brick id="emojiBrick1">
                        <brick id="emojiFaceBrick1">
                            <svg id="SuperFaceTeller" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs></defs><g><circle class="tellersFace" cx="20" cy="20" r="20"/><g><path class="tellersGesture" d="M27.17,13.58a1.51,1.51,0,1,0,1.51,1.51A1.52,1.52,0,0,0,27.17,13.58Z"/><path class="tellersGesture" d="M14.34,15.09a1.51,1.51,0,1,0-1.51,1.51A1.52,1.52,0,0,0,14.34,15.09Z"/><path class="tellersGesture" d="M25.5,20.89h-11a1,1,0,0,0-.79.37,1,1,0,0,0-.19.85A6.32,6.32,0,0,0,20,26.66c4.44,0,6.18-3,6.49-4.58a1,1,0,0,0-.21-.83A1,1,0,0,0,25.5,20.89Z"/></g></g></svg>
                        </brick>
                        <brick id="emojiDescriptionBrick1">` + byLanguage("Super","Super") + `</brick>
                    </brick>
                    <brick id="emojiBrick2">
                        <brick id="emojiFaceBrick2">
                            <svg id="GoodFaceTeller" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs></defs><g><circle class="tellersFace" cx="20" cy="20" r="20"/><g><path class="tellersGesture" d="M27.17,13.58a1.51,1.51,0,1,0,1.51,1.51A1.52,1.52,0,0,0,27.17,13.58Z"/><path class="tellersGesture" d="M14.34,15.09a1.51,1.51,0,1,0-1.51,1.51A1.52,1.52,0,0,0,14.34,15.09Z"/><path class="tellersGesture" d="M25,20.71a8.54,8.54,0,0,1-5,1.34,8.47,8.47,0,0,1-5-1.34,1,1,0,1,0-1.28,1.53A10.17,10.17,0,0,0,20,24.05a10.17,10.17,0,0,0,6.3-1.81A1,1,0,1,0,25,20.71Z"/></g></g></svg>
                        </brick>
                        <brick id="emojiDescriptionBrick2">` + byLanguage("Good","Buena") + `</brick>
                    </brick>
                    <brick id="emojiBrick3">
                        <brick id="emojiFaceBrick3">
                            <svg id="NeutralFaceTeller" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs></defs><g><circle class="tellersFace" cx="20" cy="20" r="20"/><g><path class="tellersGesture" d="M27.17,13.58a1.51,1.51,0,1,0,1.51,1.51A1.52,1.52,0,0,0,27.17,13.58Z"/><path class="tellersGesture" d="M12.83,13.58a1.51,1.51,0,1,0,1.51,1.51A1.52,1.52,0,0,0,12.83,13.58Z"/><path class="tellersGesture" d="M23.47,22.4H16.53a1,1,0,0,0,0,2h6.94a1,1,0,0,0,0-2Z"/></g></g></svg>
                        </brick>
                        <brick id="emojiDescriptionBrick3">` + byLanguage("Normal","Normal") + `</brick>
                    </brick>
                    <brick id="emojiBrick4">
                        <brick id="emojiFaceBrick4">
                            <svg id="BadFaceTeller" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs></defs><g><circle class="tellersFace" cx="20" cy="20" r="20"/><g><path class="tellersGesture" d="M27.17,13.58a1.51,1.51,0,1,0,1.51,1.51A1.52,1.52,0,0,0,27.17,13.58Z"/><path class="tellersGesture" d="M14.34,15.09a1.51,1.51,0,1,0-1.51,1.51A1.52,1.52,0,0,0,14.34,15.09Z"/><path class="tellersGesture" d="M20,20.47a10.18,10.18,0,0,0-6.3,1.82A1,1,0,1,0,15,23.82a8.46,8.46,0,0,1,5-1.35,8.46,8.46,0,0,1,5,1.35,1,1,0,0,0,.64.23,1,1,0,0,0,.64-1.76A10.18,10.18,0,0,0,20,20.47Z"/></g></g></svg>
                        </brick>
                        <brick id="emojiDescriptionBrick4">` + byLanguage("Bad","Mala") + `</brick>
                    </brick>
                    <brick id="emojiBrick5">
                        <brick id="emojiFaceBrick5">
                            <svg id="FuriousFaceTeller" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs></defs><g><circle class="tellersFace" cx="20" cy="20" r="20"/><g><path class="tellersGesture" d="M27.17,13.58a1.51,1.51,0,1,0,1.51,1.51A1.52,1.52,0,0,0,27.17,13.58Z"/><path class="tellersGesture" d="M14.34,15.09a1.51,1.51,0,1,0-1.51,1.51A1.52,1.52,0,0,0,14.34,15.09Z"/><path class="tellersGesture" d="M20,20.13c-4.44,0-6.18,3-6.49,4.59a1,1,0,0,0,.21.82,1,1,0,0,0,.78.37h11a1,1,0,0,0,.79-.38,1,1,0,0,0,.19-.84A6.32,6.32,0,0,0,20,20.13Z"/></g></g></svg>
                        </brick>
                        <brick id="emojiDescriptionBrick5">` + byLanguage("Furious","Furiosa") + `</brick>
                    </brick>
                    <brick id="emojiSelectorBrick"></brick>
                </brick>
                <brick id="textAreasBrick">
                    <textarea id="textAreaBrick" placeholder="` + byLanguage("How would you describe your experience?","Compartanos su experiencia.") + `"></textarea>
                </brick>
                    <brick id="inputAreasBrick">
                        <input id="inputAreaBrick" placeholder="` + byLanguage("email@example.com","correo@ejemplo.com") + `"></input>
                    </brick>
                    <brick id="actionButtonBrick">` + byLanguage("NEXT","SIG.") + `</brick>
                    <brick id="skipButtonBrick">` + byLanguage("Skip","Omitir") + `</brick>
                    <brick id="notificationParagraphBrick"></brick>
            </brick>
            <brick id="sharedComponentsArea">
                <brick id="imagenPerfilOperator" src="none" alt="teller Operator">
                    <brick id="stateLight"></brick>
                </brick>
                <brick id="operatorBrick">${ operatorData()[0] }</brick>
                <brick id="stateBrick">${ operatorData()[1] }</brick>
                <brick id="platformBoxBrick">
                    <brick id="bubbleWelcome"></brick>
                </brick>
            </brick>
        </brick>`

        //Detect user language
        function detectUserLang(){
            var a = navigator.language || navigator.userLanguage || navigator.browserLanguage;
            if (a == null || a == "none" || a == ""){return}
            else if(/[es|ES]/.test(a)){userLang = "es";}
            else if(/[en|EN]/.test(a)){userLang = "en";}
        }

        //Set phrase by language and set it for users
        function byLanguage(en,es){  
            if (userLang == 'en') {return en;}
            else if (userLang == 'es'){return es;}
        }

        //Select description emoji function(x: Selected description emoji)
        function sde(x){
            x.style.opacity = "1";
            x.style.transform = "translateY(-5px)";
        }

        //Unselect description emoji function(x: Unselected description emoji)
        function ude(x){
            x.style.opacity = "0";
            x.style.transform = "translateY(0px)";
        }

        //stayButHide(x: object that u wanna stay but hide)
        function hmm(x){
            x.style.opacity = "0";
            setTimeout(function(){ x.style.display = "none";  },300);
        }

        //showMeMan(x: object that u wanna show man)
        function smm(x){
            x.style.display = "block";
            setTimeout(function(){
                x.style.opacity = "1";
            },310);
        }

        //showMyEmojiMan(x: object that u wanna show man)
        function smem(x){
            x.style.display = "block";
            x.style.opacity = "1";
        }

        //minify my opacity men
        function mmom(x){
            x.style.opacity = "0.25"; 
        }

        //Get side by user
        function getSide(){
            let a = tellerTag.getAttribute("side")
            if (a == null || a == "none" || a == "" || a == "left"){
                return [
                    "left",
                    'transparent '+ byTheme(realWhite,charmingGrey) +' transparent transparent',
                    '5px 7px 5px 0'
                ]
            ;}      
            else{
                return [
                    "right",
                    'transparent transparent transparent '+ byTheme(realWhite,charmingGrey),
                    '5px 0 5px 7px'
                ]
            ;}
        }

        //Select colors by theme
        function byTheme(light,dark){
            let xy = tellerTag.getAttribute("theme") == "dark" ? "dark" : "light"  
            if (xy == 'dark') {return dark;}
            else{return light;}
        }

        //Get operator state (online/offline & name)
        function operatorData(){
            //User attributes
            let u = tellerTag.getAttribute("username")
            let n = tellerTag.getAttribute("operatorName")    
            let h = tellerTag.getAttribute("supportHours")
            //Get or set operatorName
            function operatorName(){
                if(n == null || n == "none" || n == "" && u == null || u == "none" || u == ""){return byLanguage("Bot John","Bot Juancho");}
                else if(u == null || u == "none" || u == ""){return n}
                else if(n == null || n == "none" || n == ""){return u}
                else{return n}
            }
            //Get or set operatorState (online/offline)
            function operatorState(){
                //Zero Zone
                var localDate = new Date();
                var zeroDate = localDate.toUTCString();
                var zeroTime = ((zeroDate.split(" "))[4]).split(":");
                var zeroInSec = (zeroTime[0]*3600)+(zeroTime[1]*60);
                let a = h.slice(0, 5); a1 = a.split(":"); a2 = (a1[0]*3600)+(a1[1]*60); //openhour
                let b = h.slice(6, 11); b1 = b.split(":"); b2 = (b1[0]*3600)+(b1[1]*60); //endhour
                let pol = h.slice(12, 13)//operator (+ or -)
                var c = h.slice(13, 18); c1 = c.split(":"); c2 = (c1[0]*3600)+(c1[1]*60);//gmt zone
                let oh = 0;
                let eh = 0;
                getOhEh()
                function getOhEh(){
                    if(pol=="+"){oh = a2-c2; eh = b2-c2}
                    else {oh = a2+c2; eh = b2+c2}
                }

                if((oh < eh && zeroInSec >= oh && zeroInSec < eh) || (oh > eh && zeroInSec < eh && zeroInSec < oh) || (oh == eh)){
                    stateGeneral = true;
                    return byLanguage("Active","Activo");
                }
                else{
                    stateGeneral = false;
                    return byLanguage("Offline","Desconectado");
                }
            }
            return [operatorName(),operatorState()]
        }

        //Get model of teller from HTML with teller TAG and execute it
        brick()
        ////Main brick function
        function brick() {
            //Create teller brick
            tellerTag.innerHTML = styleSheetTeller + tellerBrick;
            //Get form entries for feedback query
            function urlFeedbackConstructor(){
                ffu = tellerTag.getAttribute("formUrl")
                ss = ffu.match("https(.*)/viewform");
                var formEntries = ffu.match(/entry.([0-9]+)/g);
                entryA = formEntries[0];
                entryB = formEntries[1];
                entryC = formEntries[2];
                entryD = formEntries[3];
                return ss[0].replace("viewform", "formResponse?usp=pp_url");        
            }
            
            //Main Button
            const buttonFatherBrick = document.getElementById("buttonFatherBrick");
            const xBrick = document.getElementById("xBrick");
            const tellercin = document.getElementById("tellercin");
            const stateLight = document.getElementById("stateLight");
            const notificationInMainButtonPulse = document.getElementById("notificationInMainButtonPulse");

            //feedback components
            var currentHeightforFeedback = 200;
            const feedbackIconShape = document.getElementById("feedbackIconShape");

            //Main Button Notification
            const hoverBrick = document.getElementById("hoverBrick");

            //Global Components
            const mainNotificationBrick = document.getElementById("mainNotificationBrick");
            const feedbackBrick = document.getElementById("feedbackBrick");

            //Main Brick
            const fatherBrick = document.getElementById("fatherBrick");
            const titleBrick = document.getElementById("titleBrick");
            const notificationParagraphBrick = document.getElementById("notificationParagraphBrick")
            const paragraphBrick = document.getElementById("paragraphBrick"); 
            
            //EmailInput
            const inputAreaBrick = document.getElementById("inputAreaBrick");

            //Feedback textarea
            const textAreasBrick = document.getElementById("textAreasBrick");
            const textAreaBrick = document.getElementById("textAreaBrick");

            //Action Buttons
            const actionButtonBrick = document.getElementById("actionButtonBrick");
            const skipButtonBrick = document.getElementById("skipButtonBrick");

            //Emoji Zone
            const emojiSelectorBrick = document.getElementById("emojiSelectorBrick");
            const emojisBrick = document.getElementById("emojisBrick");
            const emojiBrick1 = document.getElementById("emojiBrick1");
            const emojiBrick2 = document.getElementById("emojiBrick2");
            const emojiBrick3 = document.getElementById("emojiBrick3");
            const emojiBrick4 = document.getElementById("emojiBrick4");
            const emojiBrick5 = document.getElementById("emojiBrick5");
            const emojiDescriptionBrick1 = document.getElementById("emojiDescriptionBrick1");
            const emojiDescriptionBrick2 = document.getElementById("emojiDescriptionBrick2");
            const emojiDescriptionBrick3 = document.getElementById("emojiDescriptionBrick3");
            const emojiDescriptionBrick4 = document.getElementById("emojiDescriptionBrick4");
            const emojiDescriptionBrick5 = document.getElementById("emojiDescriptionBrick5");
            const SuperFaceTeller = document.getElementById("SuperFaceTeller");
            const GoodFaceTeller = document.getElementById("GoodFaceTeller");
            const NeutralFaceTeller = document.getElementById("NeutralFaceTeller");
            const BadFaceTeller = document.getElementById("BadFaceTeller");
            const FuriousFaceTeller = document.getElementById("FuriousFaceTeller");

            //Show paragraph brick on left
            function spbol(){        
                if(!emotionSelected){
                    hmm(paragraphBrick)
                    setTimeout(function(){ paragraphBrick.style.textAlign= "left"} , 300);
                    setTimeout(function(){ smm(paragraphBrick);  }, 600);
                }
            }
            
            //turnLight
            turnLight()
            function turnLight(){
                if (stateGeneral){stateLight.style.backgroundColor=onlineGreen}
                else stateLight.style.backgroundColor=nebulaGrey;
            }

            //Get call to action message by user
            function userCallToActionMessage(){
                a = tellerTag.getAttribute("callToAction")
                if (a == null || a == "none" || a == ""){
                    if(stateGeneral){
                        hoverBrick.textContent = byLanguage("We are online. ","Estamos en línea. ")+byLanguage("Share your user experience with us or send us a message.","Comparte tu experiencia con nosotros o envíanos un mensaje.")
                    }
                    else{
                        hoverBrick.textContent = byLanguage("Share your user experience with us or send us a message.","Comparte tu experiencia con nosotros o envíanos un mensaje.")
                    }
                }
                else{
                    if(stateGeneral){
                        hoverBrick.textContent = byLanguage("We are online. ","Estamos en línea. ") + a
                    }
                    else{
                        hoverBrick.textContent = a
                    }
                }
            }

            callToActionTeller()
            function callToActionTeller(){
                    setTimeout(function(){
                        x = interacted;
                        if(!x){
                            userCallToActionMessage()
                            notificationInMainButtonPulse.style.display="block";
                            setTimeout(function(){ notificationInMainButtonPulse.style.opacity = "1";  },1);
                        }
                    }, parseInt(appearAfter));
                
            }

            function notificationAppear(l,c){
                hmm(l)
                l.textContent = "";
                setTimeout(function(){
                    l.textContent = c;
                    smm(l)
                },300);
            }

            //Show teller components
            function showTellerComponents(){
                //Change color to button selected
                smm(fatherBrick)
                smm(feedbackBrick)
                fatherBrick.style.height = currentHeightforFeedback + "px"
            }

            //notification number over main button
            buttonFatherBrick.addEventListener("mouseover", function(){
                //appear hoverBrick
                if(!interacted) {smm(hoverBrick)};
                //Notification numbers dissapear
                setTimeout(function(){hmm(notificationInMainButtonPulse);}, 300);
            })

            ////By main button
            buttonFatherBrick.addEventListener("click", function() {
                hmm(hoverBrick);
                interacted = true;
                if(displayedBox){
                    displayedBox = false;
                    //Show father brick
                    hmm(fatherBrick)
                    //Hide complements brick
                    //Button animation
                    xBrick.style.opacity = "0";
                    xBrick.style.transform = "translateX(30px) scaleX(0)";
                    setTimeout(function(){
                        tellercin.style.opacity = "1";
                        tellercin.style.transform = "scaleX(1)";
                    }, 300);
                }
                else{
                    displayedBox = true;
                    //Main Button animation
                    tellercin.style.opacity = "0";
                    tellercin.style.transform = "scaleX(0.3)";
                    //Notification numbers dissapear
                    hmm(notificationInMainButtonPulse);
                    setTimeout(function(){
                        xBrick.style.opacity = "1";
                        xBrick.style.transform = "translateX(0px) scaleX(1)";
                    }, 300);            
                    //Show father brick
                    smm(fatherBrick);showTellerComponents()       
                }
            });

            //Cuando hago click en el icon1
            emojiBrick1.addEventListener("click", function() {
                emotionTeller = "Super";
                fatherBrick.style.height = "290px";
                currentHeightforFeedback = 290;
                hmm(titleBrick)
                spbol()
                emojiSelectorBrick.style.left = "25px";
                emojiSelectorBrick.style.opacity = "1";
                emojisBrick.style.top = "20px";
                smm(emojiBrick1);
                mmom(emojiBrick2);
                mmom(emojiBrick3); 
                mmom(emojiBrick4); 
                mmom(emojiBrick5); 
                sde(emojiDescriptionBrick1);
                ude(emojiDescriptionBrick2);
                ude(emojiDescriptionBrick3);
                ude(emojiDescriptionBrick4);
                ude(emojiDescriptionBrick5);
                smm(actionButtonBrick)
                smm(textAreasBrick)
                setTimeout(function(){ actionButtonBrick.style.bottom = "20px" }, 300);
                emotionSelected = true;
            });

            //Cuando hago click en el icon2
            emojiBrick2.addEventListener("click", function() {
                emotionTeller = "Good";
                fatherBrick.style.height = "290px";
                currentHeightforFeedback = 290;
                hmm(titleBrick)
                spbol()
                emojiSelectorBrick.style.left = "85px";
                emojiSelectorBrick.style.opacity = "1";
                emojisBrick.style.top = "20px";
                smm(emojiBrick2);
                mmom(emojiBrick1);
                mmom(emojiBrick3); 
                mmom(emojiBrick4); 
                mmom(emojiBrick5);
                sde(emojiDescriptionBrick2)
                ude(emojiDescriptionBrick1);
                ude(emojiDescriptionBrick3);
                ude(emojiDescriptionBrick4);
                ude(emojiDescriptionBrick5);
                smm(actionButtonBrick)
                smm(textAreasBrick)
                setTimeout(function(){ actionButtonBrick.style.bottom = "20px" }, 300);
                emotionSelected = true;
            });

            //Cuando hago click en el icon3
            emojiBrick3.addEventListener("click", function() {
                emotionTeller = "Neutral";
                fatherBrick.style.height = "290px";
                currentHeightforFeedback = 290;
                hmm(titleBrick)
                spbol()
                emojiSelectorBrick.style.left = "145px";
                emojiSelectorBrick.style.opacity = "1";
                emojisBrick.style.top = "20px";
                smm(emojiBrick3);
                mmom(emojiBrick1);
                mmom(emojiBrick2); 
                mmom(emojiBrick4); 
                mmom(emojiBrick5);
                sde(emojiDescriptionBrick3)
                ude(emojiDescriptionBrick1);
                ude(emojiDescriptionBrick2);
                ude(emojiDescriptionBrick4);
                ude(emojiDescriptionBrick5);
                smm(actionButtonBrick)
                smm(textAreasBrick)
                setTimeout(function(){ actionButtonBrick.style.bottom = "20px" }, 300);
                emotionSelected = true;
            });

            //Cuando hago click en el icon4
            emojiBrick4.addEventListener("click", function() {
                emotionTeller = "Bad";
                fatherBrick.style.height = "290px";
                currentHeightforFeedback = 290;
                hmm(titleBrick)
                spbol()
                emojiSelectorBrick.style.left = "205px";
                emojiSelectorBrick.style.opacity = "1";
                emojisBrick.style.top = "20px";
                smm(emojiBrick4);
                mmom(emojiBrick1);
                mmom(emojiBrick2); 
                mmom(emojiBrick3); 
                mmom(emojiBrick5);
                sde(emojiDescriptionBrick4)
                ude(emojiDescriptionBrick1);
                ude(emojiDescriptionBrick2);
                ude(emojiDescriptionBrick3);
                ude(emojiDescriptionBrick5);
                smm(actionButtonBrick)
                smm(textAreasBrick)
                setTimeout(function(){ actionButtonBrick.style.bottom = "20px" }, 300);
                emotionSelected = true;
            });

            //Cuando hago click en el icon5
            emojiBrick5.addEventListener("click", function() {
                emotionTeller = "Furious";
                fatherBrick.style.height = "290px";
                currentHeightforFeedback = 290;
                hmm(titleBrick)
                spbol()
                emojiSelectorBrick.style.left = "265px";
                emojiSelectorBrick.style.opacity = "1";
                emojisBrick.style.top = "20px";
                smm(emojiBrick5);
                mmom(emojiBrick1);
                mmom(emojiBrick2);
                mmom(emojiBrick3); 
                mmom(emojiBrick4);
                sde(emojiDescriptionBrick5)
                ude(emojiDescriptionBrick1);
                ude(emojiDescriptionBrick2);
                ude(emojiDescriptionBrick3);
                ude(emojiDescriptionBrick4);
                smm(actionButtonBrick)
                smm(textAreasBrick)
                setTimeout(function(){ actionButtonBrick.style.bottom = "20px" }, 300);
                emotionSelected = true;
            });

            //Icon1 hover
            emojiBrick1.addEventListener("mouseover", function() {
                emojiFaceBrick1.style.transform="translateY(-10px)";
                SuperFaceTeller.style.animationPlayState = "running";
                if(!emotionSelected){
                smem(emojiDescriptionBrick1);
                smem(emojiBrick1);
                mmom(emojiBrick2);
                mmom(emojiBrick3);
                mmom(emojiBrick4);
                mmom(emojiBrick5);
                }
                emojiBrick1.addEventListener("mouseout", function() {
                    emojiFaceBrick1.style.transform="translateY(0px)";
                    SuperFaceTeller.style.animationPlayState = "paused";
                    if(!emotionSelected){
                        mmom(emojiBrick1);
                        emojiDescriptionBrick1.style.opacity= "0";
                    }      
                });
            });

            //Icon2 hover
            emojiBrick2.addEventListener("mouseover", function() {
                emojiFaceBrick2.style.transform="translateY(-10px)";
                GoodFaceTeller.style.animationPlayState = "running";
                if(!emotionSelected){
                smem(emojiDescriptionBrick2);
                smem(emojiBrick2);
                mmom(emojiBrick1);
                mmom(emojiBrick3); 
                mmom(emojiBrick4); 
                mmom(emojiBrick5); 
                }
                emojiBrick2.addEventListener("mouseout", function() {
                    emojiFaceBrick2.style.transform="translateY(0px)";
                    GoodFaceTeller.style.animationPlayState = "paused";
                    if(!emotionSelected){
                        mmom(emojiBrick2);
                        emojiDescriptionBrick2.style.opacity="0";
                    }     
                });
            });

            //Icon3 hover
            emojiBrick3.addEventListener("mouseover", function() {
                emojiFaceBrick3.style.transform="translateY(-10px)";
                NeutralFaceTeller.style.animationPlayState = "running";
                if(!emotionSelected){
                smem(emojiDescriptionBrick3);
                smem(emojiBrick3);
                mmom(emojiBrick1);
                mmom(emojiBrick2);
                mmom(emojiBrick4); 
                mmom(emojiBrick5); 
                }
                emojiBrick3.addEventListener("mouseout", function() {
                    emojiFaceBrick3.style.transform="translateY(0px)";
                    NeutralFaceTeller.style.animationPlayState = "paused";
                    if(!emotionSelected){
                        mmom(emojiBrick3);
                        emojiDescriptionBrick3.style.opacity="0";
                    }    
                });
            });

            //Icon4 hover
            emojiBrick4.addEventListener("mouseover", function() {
                emojiFaceBrick4.style.transform="translateY(-10px)";
                BadFaceTeller.style.animationPlayState = "running";
                if(!emotionSelected){
                smem(emojiDescriptionBrick4);
                smem(emojiBrick4);
                mmom(emojiBrick1);
                mmom(emojiBrick2);
                mmom(emojiBrick3);
                mmom(emojiBrick5);
                }
                emojiBrick4.addEventListener("mouseout", function() {
                    emojiFaceBrick4.style.transform="translateY(0px)";
                    BadFaceTeller.style.animationPlayState = "paused";
                    if(!emotionSelected){
                        mmom(emojiBrick4);
                        emojiDescriptionBrick4.style.opacity="0";
                    }    
                });
            });

            //Icon5 hover
            emojiBrick5.addEventListener("mouseover", function() {
                emojiFaceBrick5.style.transform="translateY(-10px)";
                FuriousFaceTeller.style.animationPlayState = "running";
                if(!emotionSelected){
                smem(emojiDescriptionBrick5);
                smem(emojiBrick5);
                mmom(emojiBrick1);
                mmom(emojiBrick2)
                mmom(emojiBrick3);
                mmom(emojiBrick4);
                }
                emojiBrick5.addEventListener("mouseout", function() {
                    emojiFaceBrick5.style.transform="translateY(0px)";
                    FuriousFaceTeller.style.animationPlayState = "paused";
                    if(!emotionSelected){
                        mmom(emojiBrick5);
                        emojiDescriptionBrick5.style.opacity="0";
                    }     
                });
            });

            //Text area regex
            textAreaBrick.addEventListener("input", function() {        
                notificationAppear(notificationParagraphBrick, "");
                var isMsg = regexMsg.test(textAreaBrick.value);        
                if(textAreaBrick.value == ""){
                    messageTeller = "";
                    messageReady = false; // Confirm message setted
                    messageTeller = ""; //Set message on variable
                    actionButtonBrick.style.color = realWhite;
                    actionButtonBrick.style.backgroundColor = nebulaGrey;
                    notificationAppear(notificationParagraphBrick, byLanguage("The message must not be empty","El mensaje no puede estar vacío."));
                }
                else if(isMsg){
                    messageTeller = textAreaBrick.value;
                    messageReady = true; // Confirm message setted
                    messageTeller = textAreaBrick.value; //Set message on variable
                    actionButtonBrick.style.color = byTheme(realWhite,charmingGrey);
                    actionButtonBrick.style.backgroundColor = userColor;
                    notificationAppear(notificationParagraphBrick, byLanguage("Thanks for your feedback","Gracias por tu comentario."));
                }
                else if(!isMsg){
                    messageTeller = "";
                    messageReady = false; // Confirm message setted
                    messageTeller = ""; //Set message on variable
                    actionButtonBrick.style.color = realWhite;
                    actionButtonBrick.style.backgroundColor = nebulaGrey;
                    notificationAppear(notificationParagraphBrick, byLanguage("Use letters from Aa-Zz, numbers from 0-9, and supported special signs (?!.,; :)." ,"Usá letras de Aa-Zz, números de 0-9, y signos admitidos (?!.,;:)."));
                }    
                return;
            });


            //Check if is valid email and show notifications (Just regular expression, not real comprobation)
            function checkEmail(){
                var isEmail = regexMail.test(inputAreaBrick.value);
                if(inputAreaBrick.value==""){
                    emailTeller = "";
                    emailReadyTeller = false;
                    lockAndLoudTeller = false;
                    actionButtonBrick.style.color = realWhite;
                    actionButtonBrick.style.backgroundColor = nebulaGrey;
                    notificationAppear(notificationParagraphBrick, byLanguage('The field cannot be empty.' ,'Este campo debe llenarse.'));
                }
                else if(!isEmail){
                    emailTeller = "";
                    emailReadyTeller = false;
                    lockAndLoudTeller = false;
                    actionButtonBrick.style.color = realWhite;
                    actionButtonBrick.style.backgroundColor = nebulaGrey;
                    notificationAppear(notificationParagraphBrick, byLanguage("Not valid email address." ,"Correo electrónico no válido."));
                }
                else if(isEmail){
                    emailTeller = inputAreaBrick.value;
                    emailReadyTeller = true;
                    lockAndLoudTeller = true;
                    actionButtonBrick.style.color = byTheme(realWhite,charmingGrey);
                    actionButtonBrick.style.backgroundColor = userColor;
                    notificationAppear(notificationParagraphBrick, "");
                }
            }

            function entryComposer(entry,resp){
                if (entry==""){return ""}
                else return ('&'+entry+'='+resp)}
        

            //Submit fetch
            //Submit fetch
        function submit (answer) {      
            if(lockAndLoudTeller){
            answer = encodeURIComponent(answer)
            var fullFeedbackurl = urlFeedbackConstructor()+ 
            entryComposer(entryA,emotionTeller) +
            entryComposer(entryB,emailTeller) +
            entryComposer(entryC,messageTeller)
            '&submit=Submit'

            var opts = {
            method: "POST",
            mode: "no-cors", // Google will only submit a form if "mode" is "no-cors"
            redirect: "follow", 
            referrer: "no-referrer"
            }
            console.log("Making request to Google Forms");
            
                 
                fetch(fullFeedbackurl, opts).then(function(response) {
                return response.text();
            })
            .then(function(text) {      
                titleBrick.style.display = "block";  
                skipButtonBrick.style.display = "none";
                inputAreaBrick.style.display = "none";
                actionButtonBrick.style.display = "none";
                titleBrick.style.transform = "translateY(65px)";
                notificationAppear(titleBrick, byLanguage('We receive the feedback, thanks for your time.','Recibimos su comentario, gracias por su tiempo.')); 
                
            })
            .catch(function(error) {
                titleBrick.style.display = "block";  
                skipButtonBrick.style.display = "none";
                inputAreaBrick.style.display = "none";
                actionButtonBrick.style.display = "none";
                titleBrick.style.transform = "translateY(35px)";
                notificationAppear(titleBrick, byLanguage('Something went wrong, you should try later.','Algo salió mal, no hemos podido cargar su solicitud, por favor intentelo más tarde.')); 
                
            });
            setTimeout(function(){fatherBrick.style.transform = "translateY(20px)";
                fatherBrick.style.opacity = "0";
                titleBrick.style.opacity = "0";
                emojisBrick.style.opacity = "0";
                emojisBrick.style.transform = "translateY(20px)";
                xBrick.style.opacity = "0";

                setTimeout(function(){
                    titleBrick.style.display = "none";
                    fatherBrick.style.display = "none";
                }, 300);
            }, 3000);
            setTimeout(function(){ main(); }, 3000);
            
        }}
            
            //Event listener for skip button
            skipButtonBrick.addEventListener("click", function() {
                notificationParagraphBrick.style.opacity = "0"
                emailTeller = "none";
                emailReadyTeller = true;
                lockAndLoudTeller = true;
                paragraphBrick.innerHTML = byLanguage('Powered by '+ tellerSmallA,'Con el poder de '+ tellerSmallA);
                paragraphBrick.style.textAlign= "center";             
                paragraphBrick.style.opacity = "1";
                titleBrick.style.opacity = "0";
                skipButtonBrick.style.opacity = "0";
                inputAreasBrick.style.opacity = "0";
                actionButtonBrick.style.opacity = "0";
                submit();
            });

            //Next button event listener on click
            actionButtonBrick.addEventListener("click", function() {
                //Empty message
                if(textAreaBrick.value == ""){
                    notificationAppear(notificationParagraphBrick, byLanguage("The message must not be empty","El mensaje no puede estar vacío."));
                }
                //Emotion, message and email ready to fetch
                else if(emotionSelected == true && messageReady == true && emailReadyTeller == true && lockAndLoudTeller == true){
                    notificationAppear(notificationParagraphBrick, byLanguage("",""));
                    actionButtonBrick.style.opacity = "0";
                    titleBrick.style.opacity = "0";
                    skipButtonBrick.style.opacity = "0";
                    inputAreasBrick.style.opacity = "0";
                    paragraphBrick.style.textAlign= "center";
                    paragraphBrick.style.opacity = "1";
                    setTimeout(function(){submit()}, 1000);
                }
                //Emotion and message completed
                else if(emotionSelected == true && messageReady == true && emailReadyTeller == false && lockAndLoudTeller == false){
                    titleBrick.textContent = "";
                    emojiSelectorBrick.style.opacity = 0;
                    notificationAppear(notificationParagraphBrick, byLanguage("",""));
                    emojisBrick.style.transform = "translateY(20px)";
                    emojisBrick.style.opacity = "0";
                    paragraphBrick.style.opacity = "0";
                    titleBrick.style.opacity = "0";
                    titleBrick.style.display = "block";
                    skipButtonBrick.style.display = "block";
                    textAreasBrick.style.transform = "translateY(20px)";
                    textAreasBrick.style.opacity = "0";
                    inputAreasBrick.style.display = "block";
                    setTimeout(function(){
                        notificationAppear(titleBrick, byLanguage('Please enter your email if you are happy for us to contact you, if not press "skip".','Ingrese su correo si esta de acuerdo en que nos comuniquemos con usted, de lo contrario presione "omitir".'));
                        emojisBrick.style.display = "none";
                        checkEmail();
                        fatherBrick.style.height = "220px";
                        currentHeightforFeedback = 220;
                        actionButtonBrick.textContent = byLanguage("SEND","ENVIAR");
                        actionButtonBrick.style.color = realWhite;
                        actionButtonBrick.style.backgroundColor = nebulaGrey;
                        inputAreasBrick.style.top = "120px";
                        inputAreasBrick.style.opacity = "1";
                        textAreasBrick.style.display = "none";
                        skipButtonBrick.style.opacity = "1";
                        titleBrick.style.opacity = "1";
                    }, 300);
                }
            });
            //Listen email input
            inputAreaBrick.addEventListener("input", function() {    
                checkEmail()    
            });
        }

    }
    window.onload = function() {
            main();
    };

})();
