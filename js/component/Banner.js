/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 使用ScrollView 打造一个this.props.datas
 *
 * 1.安装第三放类库 npm react-time-mixin --save
 */

import React, {Component} from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';


//屏幕信息
var dimensions = require('Dimensions');
//获取屏幕的宽度和高度
var {width} = dimensions.get('window');

class Banner extends Component {

    static defaultProps = {
        //定时器的间隔时间
        duration: 1000,
        onItemPress:(index)=>{}

    };
    static propTypes = {
        datas: PropTypes.array,
        duration: PropTypes.number,
onItemPress:PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            //当前显示的下标
            position: 0,
        }
    }

    //绘制完成，开启定时器
    componentDidMount() {
        this.startTimer();
    }

    startTimer() {
        //1.拿到ScrollView
        var scrollView = this.refs.scrollView;
        this.timer = setInterval(() => {
            //设置圆点的下标
            var curr = this.state.position;
            if (curr + 1 > this.props.datas.length - 1) {
                curr = 0;
            } else {
                curr++;
            }
            //更新状态机，更新当前下标
            this.setState({
                position: curr,
            });
            //滚动ScrollView，1.求出水平方向的平移量  offsetX = curr * width
            scrollView.scrollTo({x: curr * width, y: 0, animated: true})
        }, this.props.duration);

    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref="scrollView"
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}//自动分页
                    //滚动动画结束时调用此函数。一帧滚动结束
                    onMomentumScrollEnd={(v) => this.onAnimationEnd(v)}
                    //手指按下的时候，停止计时器
                    onTouchStart={() => clearInterval(this.timer)}>

                    {/*显示轮播图的图片内容*/}
                    {this.getImages()}
                </ScrollView>
                {/*生成底部的圆点指示器*/}
                <View style={styles.indicator}>
                    {this.getIndicators()}
                </View>
            </View>

        );
    }

    //获取轮播图显示的图片
    getImages() {
        var images = [];
        for (var i = 0; i < this.props.datas.length; i++) {
            //加个临时变量解决闭包的问题
            let j = i;
            images.push(
                <View key={i}>
                    <TouchableWithoutFeedback onPress={()=>{
                        this.props.onItemPress(j)
                    }}>
                    {<Image source={ {uri:this.props.datas[i]}} style={styles.image}/>}
                    </TouchableWithoutFeedback>
                </View>
            );
        }
        return images;
    }

    //获取左下角的4个圆点
    getIndicators() {
        var circles = [];
        for (var i = 0; i < this.props.datas.length; i++) {
            circles.push(
                <Text key={i}
                      style={i === this.state.position ? styles.selected : styles.unselected}>&bull;</Text>//&bull; html转义字符
            );
        }
        return circles;
    }

    //重写这个函数，系统已有的函数
    onAnimationEnd(v) {
        //1.求出水平方向的偏移量
        var offsetX = v.nativeEvent.contentOffset.x;
        //2.根据偏移量求出当前的页数  width为图片的宽度（this.props.datas的宽度 ）
        var position = Math.round(offsetX / width);
        //3.更新状态机, 刷新圆点
        this.setState({
            position: position
        });
        this.startTimer();
    }

    //结束计时器
    componentWillUnmount(nextProps, nextState) {
        clearInterval(this.timer);
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
    },
    //底部指示器的样式
    indicator: {
        width: width,
        height: 24,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: width,
        height: 150,
    },
    selected: {
        marginLeft: 10,
        fontSize: 40,
        color: '#5CB85C'
    },
    unselected: {
        marginLeft: 10,
        fontSize: 40,
        color: 'white'
    }
});

module.exports = Banner