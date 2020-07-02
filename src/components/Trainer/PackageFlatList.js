/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native'

import PackageOverview from '../../components/Package/PackageOverview';
import {spacing} from "../../constants/dimension";
import {appTheme} from "../../constants/colors";

const packageFlatList = (props) => {

  const renderPlan = (plan) => {
    const {title, noOfSessions, sessionsPerWeek, price, description, _id} = plan;
    return (
      <View style={styles.packageContainer}>
        <PackageOverview
          title={title}
          sessionCount={noOfSessions}
          sessionsPerWeek={sessionsPerWeek}
          price={price}
          description={description}
          editCallback={() => props.editCallback(_id)}
          deleteCallback={() => props.deleteCallback(_id)}
        />
      </View>
    )
  }

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      style={styles.container}
      data={props.packages}
      renderItem={({item}) => renderPlan(item)}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.darkBackground,
  },
  listContainer: {
    justifyContent: 'center',
    marginLeft: spacing.medium_lg,
    marginRight: spacing.medium_lg,
  },
  packageContainer: {
    marginTop: spacing.medium_sm,
    marginBottom: spacing.medium_sm
  }
});

export default packageFlatList;