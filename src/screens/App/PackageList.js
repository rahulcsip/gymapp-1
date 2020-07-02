/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity, LayoutAnimation} from 'react-native'
import {connect} from "react-redux";

import PackageOverview from '../../components/Package/PackageOverview';
import {spacing} from "../../constants/dimension";
import * as actionCreators from "../../store/actions";
import colors, {appTheme} from "../../constants/colors";
import RouteNames from "../../navigation/RouteNames";
import PackageFlatList from "../../components/Trainer/PackageFlatList";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import strings from "../../constants/strings";
import FontAwesome from 'react-native-vector-icons/Entypo';
import BarButton from '../../components/BarButton';
class PackageList extends Component {

  editPackage = packageId => {
    this.props.navigation.navigate(RouteNames.PackageEdit,{
      packageId
    });
  }
  createPackage = () => {
    this.props.navigation.navigate(RouteNames.PackageEdit);
  }

  addButton = () => (
    <View style={styles.addButtonContainer}>
      <BarButton onPress={this.createPackage}/>
    </View>
  )

  deletePackage = (packageId)=> {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.props.deletePackage(packageId);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{strings.MY_PACKAGES}</Text>
        </View>

        <PackageFlatList
          packages={this.props.packages}
          editCallback={this.editPackage}
          deleteCallback={this.deletePackage}
        />
        <this.addButton/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.darkBackground,
  },
  titleContainer: {
    paddingTop: spacing.medium_sm,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingBottom: spacing.medium_sm,
    marginBottom:spacing.medium_sm,
    backgroundColor: appTheme.background,
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: fontSizes.h0,
    fontFamily: fonts.PoppinsRegular
  },
  addButtonContainer: {
    paddingTop: spacing.medium_sm,
    paddingBottom: spacing.medium_sm,
    backgroundColor: appTheme.background,
    alignItems: 'center'
  }
});

const mapStateToProps = (state) => ({
  packages: state.trainer.packages
});

const mapDispatchToProps = (dispatch) => ({
  deletePackage: packageId => dispatch(actionCreators.deletePackage(packageId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PackageList);