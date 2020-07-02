/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native'
import PropTypes from 'prop-types';

import PackagePreview from './PackagePreview';

import {spacing} from "../../constants/dimension";

const renderPackagePreview = (packageData, index) => {
  return (
    <View style={styles.packageContainer} key={index}>
      <PackagePreview
        count={packageData.sessionCount}
        title={packageData.name}
        price={packageData.price}
      />
    </View>
  )
}

const packagePreviewList = (props) => {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={props.packages}
      renderItem={({item, index}) => renderPackagePreview(item, index)}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

packagePreviewList.propTypes = {

};

const styles = StyleSheet.create({
  packageContainer:{
    marginRight:spacing.medium
  }
});

export default packagePreviewList;