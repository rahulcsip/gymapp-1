/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types';
import fontSizes from "../constants/fontSizes";
import {textSlicer} from "../utils/utils";
import strings from "../constants/strings";
import colors, {appTheme} from "../constants/colors";

const ExpandingText = (props) => {
  const {children, contentLength, style} = props;
  const [sliced, setSliced] = useState(children.length > contentLength);

  const buttonContent = sliced ? strings.SEE_MORE : strings.SEE_LESS;
  let disabled = children.length<contentLength;

  return (
    <TouchableOpacity disabled={disabled} onPress={() => setSliced(!sliced)} style={styles.container}>
      <Text style={[styles.textStyle, style]}>
        {textSlicer(children, sliced ? contentLength : -1)}
        <Text> </Text>
        {
          !disabled && (
            <Text style={styles.buttonText}>
              {buttonContent}
            </Text>
          )
        }

      </Text>
    </TouchableOpacity>
  );
}

ExpandingText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  contentLength: PropTypes.number
};

ExpandingText.defaultProps = {
  contentLength: 50
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  textStyle: {
    fontSize: fontSizes.h3,
    color: 'black'
  },
  buttonText: {
    color: appTheme.brightContent
  }
});

export default ExpandingText;