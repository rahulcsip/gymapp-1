import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import CreatePost from '../../components/Profile/CreatePost'
import PostCardList from '../../components/Profile/PostCardList'
import CommentList from '../../components/Profile/CommentList'
import colors, {appTheme} from "../../constants/colors";

export default class Feed extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <CreatePost/>
        <PostCardList/>
        <CommentList/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{flex: 1, backgroundColor:appTheme.darkBackground ,justifyContent: 'center', alignItems: 'center'}
})
