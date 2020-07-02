/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native'
import PropTypes from 'prop-types';

import strings from "../constants/strings";
import {spacing} from "../constants/dimension";
import Hits from './Hits';
import colors from "../constants/colors";
import fontSizes from "../constants/fontSizes";

const HitsList = (props) => {
  const {hits, size=fontSizes.h1} = props;
  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {
        hits.map(hit=> (
          <View style={styles.hits} key={hit.title}>
            <Hits property={hit.title} count={hit.count} size={size}/>
          </View>
        ))
      }
    </ScrollView>

  );
}

HitsList.propTypes = {
  hits:PropTypes.array.isRequired,
  size:PropTypes.number
};

const styles = StyleSheet.create({
  scrollView: {
    alignItems: 'center'
  },
  separator: {
    borderLeftWidth: 1,
    borderLeftColor: colors.lightGrey,
    height: '80%'
  },
  hits: {
    marginRight: spacing.medium_sm
  },
});

export default HitsList;