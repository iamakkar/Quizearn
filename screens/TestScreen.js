import React,{useState} from 'react';
import { View, Text, Dimensions,Animated } from 'react-native';
import Svg, { Polygon, Rect } from 'react-native-svg';

const DeviceHeight = Dimensions.get('window').height;

const x1 = 10;
const x2 = 110;
const x3 = 60;
const y1 = 30;
const y2 = 30;
const y3 = 30 + 50*Math.sqrt(3);
const fx1 = 10;
const fy1 = 25 + 100*Math.sqrt(3);
const fx2 = 110;
const fy2 = 25 + 100*Math.sqrt(3);
const fx3 = 60;
const fy3 = 25 + 50*Math.sqrt(3);
const ry = 30 + 100*Math.sqrt(3);
const it1x1 = 60;
const it1y1 = 105;
const it1x2 = 51.3395;
const it1y2 = 90;
const it1x3 = 68.6605;
const it1y3 = 90;
const it2x1 = 60;
const it2y1 = 105;
const it2x2 = 39.7921;
const it2y2 = 70;
const it2x3 = 80.2071;
const it2y3 = 70;
const it3x1 = 60;
const it3y1 = 105;
const it3x2 = 28.2448;
const it3y2 = 50;
const it3x3 = 91.7552;
const it3y3 = 50;
const it4x1 = 60;
const it4y1 = 105;
const it4x2 = 19.5843;
const it4y2 = 35;
const it4x3 = 100.416;
const it4y3 = 35;
const it5x1 = 60;
const it5y1 = 125;
const it5x2 = 71.5473;
const it5y2 = 145;
const it5x3 = 48.4527;
const it5y3 = 145;
const it6x1 = 60;
const it6y1 = 125;
const it6x2 = 83.0947;
const it6y2 = 165;
const it6x3 = 36.9053;
const it6y3 = 165;
const it7x1 = 60;
const it7y1 = 125;
const it7x2 = 94.642;
const it7y2 = 185;
const it7x3 = 25.358;
const it7y3 = 185;
const it8x1 = 60;
const it8y1 = 125;
const it8x2 = 100.416;
const it8y2 = 195;
const it8x3 = 19.5843;
const it8y3 = 195;
const svgHeight = ry + 25;

var points1 = x3 + ',' + y3 + ',' + x2 + ',' + y2 + ',' + x1 + ',' + y1;
var points2 = fx1 + ',' + fy1 + ',' + fx2 + ',' + fy2 + ',' + fx3 + ',' + fy3;
const it1points = it1x1 + ',' + it1y1 + ' ' + it1x2 + ',' + it1y2 + ' ' + it1x3 + ',' +it1y3;
const it2points = it2x1 + ',' + it2y1 + ' ' + it2x2 + ',' + it2y2 + ' ' + it2x3 + ',' +it2y3;
const it3points = it3x1 + ',' + it3y1 + ' ' + it3x2 + ',' + it3y2 + ' ' + it3x3 + ',' +it3y3;
const it4points = it4x1 + ',' + it4y1 + ' ' + it4x2 + ',' + it4y2 + ' ' + it4x3 + ',' +it4y3;
const it5points = it5x1 + ',' + it5y1 + ' ' + it5x2 + ',' + it5y2 + ' ' + it5x3 + ',' +it5y3;
const it6points = it6x1 + ',' + it6y1 + ' ' + it6x2 + ',' + it6y2 + ' ' + it6x3 + ',' +it6y3;
const it7points = it7x1 + ',' + it7y1 + ' ' + it7x2 + ',' + it7y2 + ' ' + it7x3 + ',' +it7y3;
const it8points = it8x1 + ',' + it8y1 + ' ' + it8x2 + ',' + it8y2 + ' ' + it8x3 + ',' +it8y3;

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default function Test() {
var it1Opacity = useState(new Animated.Value(1))[0];
var it2Opacity = useState(new Animated.Value(1))[0];
var it3Opacity = useState(new Animated.Value(1))[0];
var it4Opacity = useState(new Animated.Value(1))[0];
var it5Opacity = useState(new Animated.Value(0))[0];
var it6Opacity = useState(new Animated.Value(0))[0];
var it7Opacity = useState(new Animated.Value(0))[0];
var it8Opacity = useState(new Animated.Value(0))[0];
const rotateValue = useState(new Animated.Value(0))[0];

function hourGlassAnimation()
{  Animated.loop(
    Animated.sequence([
        Animated.parallel([
            Animated.stagger(200,
                [
                    Animated.timing(it4Opacity,
                        {
                            toValue:0,
                            duration:400,
                            useNativeDriver:true,
                            delay: 500
                        }),
                    Animated.timing(it3Opacity,
                            {
                                toValue:0,
                                duration:400,
                                useNativeDriver:true,
                                delay: 500
                            }),
                    Animated.timing(it2Opacity,
                            {
                                    toValue:0,
                                    duration:400,
                                    useNativeDriver:true,
                                    delay: 500
                           }),
                    Animated.timing(it1Opacity,
                            {
                                toValue:0,
                                duration:400,
                                useNativeDriver:true,
                                delay: 500
                            })
                ]),
                Animated.stagger(200,[
                    Animated.timing(it5Opacity,{
                        toValue:1,
                        useNativeDriver:true,
                        duration:400,
                        delay: 500
                    }),
                    Animated.timing(it6Opacity,{
                        toValue:1,
                        useNativeDriver:true,
                        duration:400,
                        delay: 500
                    }),
                    Animated.timing(it7Opacity,{
                        toValue:1,
                        useNativeDriver:true,
                        duration:400,
                        delay: 500
                    }),
                    Animated.timing(it8Opacity,{
                        toValue:1,
                        useNativeDriver:true,
                        duration:400,
                        delay: 500
                    }),
                ])
         ]),

         Animated.timing(rotateValue,{
            toValue:50,
            duration:500,
            useNativeDriver:true,
        }),
    
         Animated.parallel([
            Animated.stagger(200,
                [
                    Animated.timing(it8Opacity,
                        {   delay:500,
                            toValue:0,
                            duration:400,
                            useNativeDriver:true,
                        }),
                    Animated.timing(it7Opacity,
                            {
                                toValue:0,
                                duration:400,
                                useNativeDriver:true,
                                delay:500,
                            }),
                    Animated.timing(it6Opacity,
                            {
                                    toValue:0,
                                    duration:400,
                                    useNativeDriver:true,
                                    delay:500,
                           }),
                    Animated.timing(it5Opacity,
                            {
                                toValue:0,
                                duration:400,
                                useNativeDriver:true,
                                delay:500,
                            })
                ]),
                Animated.stagger(200,[
                    Animated.timing(it1Opacity,{
                        toValue:1,
                        useNativeDriver:true,
                        duration:400,
                        delay:500,
                    }),
                    Animated.timing(it2Opacity,{
                        toValue:1,
                        useNativeDriver:true,
                        duration:400,
                        delay:500,
                    }),
                    Animated.timing(it3Opacity,{
                        toValue:1,
                        useNativeDriver:true,
                        duration:400,
                        delay:500,
                    }),
                    Animated.timing(it4Opacity,{
                        toValue:1,
                        useNativeDriver:true,
                        duration:400,
                        delay:500,
                    }),
                ])
         ]),

         Animated.timing(rotateValue,{
            toValue:100,
            duration:500,
            useNativeDriver:true,
        }),

        Animated.timing(rotateValue,{
            toValue:0,
            duration:0,
            useNativeDriver:true
        })
    ]),{
        iterations:5
    }
).start();
}

hourGlassAnimation();

const angle = rotateValue.interpolate({
    inputRange:[0,100],
    outputRange:['0deg','360deg'],
  });

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}} >
            <AnimatedSvg width='120' height={svgHeight} style={[{marginTop: 50},
                {transform :[{rotate:angle}]}]} >

                <Rect 
                x='0'
                y='0'
                width='120'
                height='25'
                fill='#630'
                />

                <Polygon
                points={points1}
                fill="#23acc4"
                stroke="#23acc4"
                strokeWidth="0"
                />

                <AnimatedPolygon
                points={it1points}
                fill="#F2D16B"
                fillOpacity={it1Opacity}
                />

                <AnimatedPolygon
                points = {it2points}
                fill = "#F2D16B"
                fillOpacity={it2Opacity}/>

                <AnimatedPolygon
                points = {it3points}
                fill = "#F2D16B"
                fillOpacity={it3Opacity}
                />

                <AnimatedPolygon
                points = {it4points}
                fill = "#F2D16B"
                fillOpacity={it4Opacity}
                />

                <Polygon
                points={points2}
                fill="#23acc4"
                stroke="#23acc4"
                strokeWidth="0"
                />
            
                <AnimatedPolygon
                points={it5points}
                fill="#F2D16B"
                fillOpacity={it5Opacity}
                />

               <AnimatedPolygon
                points={it6points}
                fill="#F2D16B"
                fillOpacity={it6Opacity}
                />

               <AnimatedPolygon
                points={it7points}
                fill="#F2D16B"
                fillOpacity={it7Opacity}
                />

                <AnimatedPolygon
                points={it8points}
                fill="#F2D16B"
                fillOpacity={it8Opacity}
                />

                <Rect 
                x='0'
                y={ry}
                width='120'
                height='25'
                fill='#630'
                />

            </AnimatedSvg>
          {/*   <Text>This is Test Screen</Text> */}
        </View>
    );
}