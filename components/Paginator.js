import { Animated, Text, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import styles, { width } from './styles'
const DOT_WIDTH = 10
let NewData = []
export function Paginator({
    data = [],
    scrollX = null,
    color = 'blue',
    index = 0
}) {
    const [NewData, setNewData] = useState([])
    useEffect(() => {
        setNewData(paginatorNumbers(data, index))

        return () => {

        }
    }, [scrollX])

    // console.log("🚀 ~ file: Paginator.js ~ line 8 ~ Paginator ~ render ~ this.props?.data", this.props?.data)
    return (
        <View style={{ flexDirection: 'row', height: 15, flexWrap: 'wrap' }}>
            {data?.map((item, index) => {
                const inputRange = [(index - 2) * width, (index - 1) * width, index * width, (index + 1) * width, (index + 2) * width]

                // const dotWidth = this.props?.scrollX?.interpolate({
                //     inputRange,
                //     outputRange: [DOT_WIDTH, DOT_WIDTH * 2, DOT_WIDTH],
                //     extrapolate: 'clamp'
                // })
                const dotOpacity = scrollX?.interpolate({
                    inputRange,
                    outputRange: [0.3, 0.4, 1, 0.4, 0.3],
                    extrapolate: 'clamp'
                })
                const dotScale = scrollX?.interpolate({
                    inputRange,
                    outputRange: [0.6, .8, 1.5, .8, 0.6],
                    extrapolate: 'clamp'
                })
                return (
                    <Animated.View
                        key={`${index}`}
                        style={{
                            ...styles.dot,
                            flexWrap: 'wrap',
                            // flexShrink: 1,

                            backgroundColor: color || 'blue',

                            transform: [{ scale: dotScale }],
                            opacity: dotOpacity
                        }} />
                )
            })}
        </View>
    )

}


function paginatorNumbers(arr, newIndex) {
    // return arr.length > 5 && newIndex > 5
    //     ? arr.slice(newIndex - 6, newIndex + 5)
    //     : arr.slice(0, newIndex + 5)
    // return arr.slice(newIndex - 5, newIndex + 6)
    // You need constraints if index - 5 is < 0
    const startIndex = Math.max(0, newIndex - 5 - 1);

    const endIndex = newIndex + 5;

    return arr.slice(startIndex, endIndex);
}
export default Paginator