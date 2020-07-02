/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, FlatList, Image, StatusBar} from 'react-native'
import {connect} from "react-redux";

import TrainerThumb from '../../components/Trainer/TrainerThumb';
import colors, {appTheme} from "../../constants/colors";
import RouteNames from "../../navigation/RouteNames";
import * as actionCreators from '../../store/actions';
import {userTypes} from "../../constants/appConstants";
import UserThumb from "../../components/Trainer/UserThumb";
import {spacing} from "../../constants/dimension";
import requestCameraAndAudioPermission from "../../utils/permission";
import {initialiseVideoCall} from "../../utils/utils";

const defaultDP = 'https://media.istockphoto.com/photos/middle-aged-gym-coach-picture-id475467038';

class UserListing extends Component {

  componentDidMount() {
    const {updateTrainers,updateUserData } = this.props;
    updateTrainers();
    updateUserData();
  }

  openProfile = (userId) => {
    const {navigation} = this.props;
    navigation.navigate(RouteNames.Profile, {
      userId: userId
    });
  }

  callClicked = async (userId) => {
    const permissionGranted = await requestCameraAndAudioPermission();

    if (permissionGranted) {
      await initialiseVideoCall(userId);
    } else console.log("Cant initiate video call without permission");
  }

  renderUserThumb = (user, index) => {
    let {name, totalSlots = 0, userType,usedSlots = 0, experience = 0, rating, displayPictureUrl} = user;
    if (!displayPictureUrl) displayPictureUrl = defaultDP;

    return (
      <View style={styles.userContainer}>
        {
          userType === userTypes.USER && (
            <UserThumb
              name={name|| 'User'}
              dpUrl={displayPictureUrl}
              location={'Bangalore'}
              plan={Math.random() > 0.5 ? 'Basic' : 'Advanced'}
              onPress={() => this.openProfile(user._id)}
              postCount={Math.floor(Math.random() * 10)}
              subscriptionCount={Math.floor(Math.random()*2)}
            />
          )
        }
        {
          userType === userTypes.TRAINER && (
            <TrainerThumb
              name={name || 'Trainer'}
              slots={{
                remaining: totalSlots - usedSlots,
                used: usedSlots
              }}
              location={'Bangalore'}
              dpUrl={displayPictureUrl}
              experience={experience}
              description={"No description provided for this trainer"}
              rating={rating}
              packages={packages} //niche hai file ke
              onPress={() => this.openProfile(user._id)}
              callClicked={() => this.callClicked(user._id)}
            />
          )
        }
      </View>
    )
  }

  renderHorizontalSeparatorView = () => <View style={styles.itemSeparatorHorizontal}/>

  render() {
    let users = this.props.trainers;

    return (<>
        <StatusBar backgroundColor={appTheme.background}/>
        <View style={styles.listContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.container}
            data={users}
            renderItem={({item, index}) => this.renderUserThumb(item, index)}
            keyExtractor={(item, index) => item._id}
            ItemSeparatorComponent={this.renderHorizontalSeparatorView}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    paddingTop: spacing.large_lg,
    backgroundColor: appTheme.darkBackground,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: appTheme.darkBackground,
    width: '100%',
  },
  itemSeparatorHorizontal: {
    height: 1,
    marginTop: spacing.medium_lg,
    marginBottom: spacing.medium_lg,
    backgroundColor: appTheme.grey,
  },
  userContainer: {
    width: '100%'
  }
});

const mapStateToProps = (state) => ({
  trainers: state.app.trainers,
  authToken: state.user.authToken,
});

const mapDispatchToProps = (dispatch) => ({
  updateTrainers: () => dispatch(actionCreators.updateTrainers()),
  updateUserData: ()=> dispatch(actionCreators.updateUserData())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserListing);

const packages = [
  {
    name: 'Weight Loss Program',
    sessionCount: 15,
    price: 3500
  },
  {
    name: 'Fat Gain Program',
    sessionCount: 15,
    price: 3500
  },
  {
    name: 'Weight Loss Program',
    sessionCount: 15,
    price: 3500
  },
  {
    name: 'Fat Gain Program',
    sessionCount: 15,
    price: 3500
  },
  {
    name: 'Weight Loss Program',
    sessionCount: 15,
    price: 3500
  },
  {
    name: 'Fat Gain Program',
    sessionCount: 15,
    price: 3500
  },
]