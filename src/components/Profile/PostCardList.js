import React, { Component } from "react";
import { Text, StyleSheet, View, FlatList ,AsyncStorage} from "react-native";
import PostCard from "./PostCard";
import { spacing } from "../../constants/dimension";
import {postActionList} from '../../store/actions/postAction'
import {connect} from 'react-redux';


// Demo Data

data = [
  {
    id: 1,
    profilePicUri:
      "https://www.usnews.com/dims4/USNEWS/410224b/2147483647/thumbnail/970x647/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2Fd1%2Fd8%2F8501ba714a21aed9a7327e02ade1%2F180515-10thingselonmusk-editorial.jpg",
    title: "Bessie Malone",
    bio: "A Good AutoResponder",
    discription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make ",
    postPicUri:
      "https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/05/04/Pictures/fitness-couple-giving-after-other-training-five_da6904f2-4f81-11e8-a9dc-143d85bacf22.jpg",
    like: 45,
    calorie: 90,
    comment: 30,
    timeStatus: "4 Hours ago",
  },
  {
    id: 2,
    profilePicUri:
      "https://res.cloudinary.com/demo/image/facebook/65646572251.jpg",
    title: "Rahul Pandey",
    bio: "A Good AutoResponder",
    discription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make ",
    postPicUri:
      "https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/05/04/Pictures/fitness-couple-giving-after-other-training-five_da6904f2-4f81-11e8-a9dc-143d85bacf22.jpg",
    like: 45,
    calorie: 90,
    comment: 30,
    timeStatus: "4 Hours ago",
  },
];

const renderPostCard = (data, index) => {



  return (
    <View style={styles.renderPostCard} key={data.id}>
      <PostCard
        profilePicUri={data.contentURL}
        title={data.createdBy}
        bio={data.createdBy}
        discription={data.textContent}
        postPicUri={data.contentURL}
        like={data.likes}
        calorie={data.likes}
        comment={data.shares}
        timeStatus={data.contentType}
      />
    </View>
  );
};

export  class PostCardList extends Component {

  constructor(props){
    super(props)
    this.state={
      status:false,
      posts:[]
    }
  }
  
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.postReducer !== this.props.postReducer) {
      const response = this.props.postReducer;
  
   
      
  const { posts } = response
  this.setState({posts:posts})
  const { textContent, contentURL, } = posts
  console.log("Checking the response new ",posts)
  
  
      // if (statusCode === 200) {
      //   this.setState({
      //     ActivityIndicatorStatus: false,
      //   });
  
      //   this.setState({totalData: userData});
      // } else {
      //   alert(responseMessage);
      // }
    }
  }
  
  
  
  
  async componentDidMount() {
    
    const token = await AsyncStorage.getItem('@token');

    this.props.postActionList(token);
    
  }
  


  render() {

    console.log("Posts posts posts",this.state.posts)

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={this.state.posts}
        renderItem={({ item, index }) => renderPostCard(item, index)}
      />
    );
  }
}

const styles = StyleSheet.create({
  renderPostCard: {
    marginBottom: spacing.medium_sm,
  },
});





const mapStateToProps = state => {
  return {
    postReducer: state.postReducer,
  };
};

export default connect(
  mapStateToProps,
  {postActionList},
)(PostCardList);

