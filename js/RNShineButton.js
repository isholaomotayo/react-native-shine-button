
import React, { Component } from 'react'
import { StyleSheet, ViewPropTypes, Platform } from "react-native"
import PropTypes from 'prop-types'

import { requireNativeComponent } from "react-native"

import RNVectorHelper from './RNVectorHelper'

class RNShineButton extends Component {

    _onChange = (event) => {
      let value = false
      if (event.nativeEvent.value === 'YES') value = true

      this.props.onChange && this.props.onChange(value);

      this._shineButton.setNativeProps({ on: event.nativeEvent.value});
    }

    render () {
      let shape
      if (this.props.shape && this.props.shape.props) {
        let icon = this.props.shape.props
        let glyph = RNVectorHelper.Resolve(icon.family, icon.name);

        shape = Object.assign({}, icon, {
          glyph: glyph,
          size: this.props.size
        });
      } else {
        shape = {
          shape: this.props.shape
        }
      }

      if (Platform.OS === 'ios') {
        return <ShineButton ref={ref => {
              this._shineButton = ref;
            }} style={{ width: this.props.size, height: this.props.size }}
            props={{
              size: this.props.size,
              on: this.props.value,
              shape: shape,
              color: this.props.color,
              fillColor: this.props.fillColor
            }}
            onChange={this._onChange} />;
      } else if (Platform.OS === 'android') {
        return <ShineButton {...this.props} ref={ref => {
            this._shineButton = ref;
          }}
          style={{ width: this.props.size, height: this.props.size }}
          size={this.props.size}
          on={this.props.value}
          disable={this.props.disabled}
          shape={shape}
          color={this.props.color}
          fillColor={this.props.fillColor}
          onChange={this._onChange}
        />;
      }
    }
}


RNShineButton.propTypes = {
  ...ViewPropTypes,

  /**
   * is the checkbox checked. Default false
   */
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  shape: PropTypes.string,
  on: PropTypes.bool,
  color: PropTypes.string,
  fillColor: PropTypes.string,
  size: PropTypes.number,
  props: PropTypes.object,
  onChange: PropTypes.func
};

RNShineButton.defaultProps = {
  value: false,
  disabled: false,
  size: 100
};


const ShineButton = requireNativeComponent("RNShineButton", RNShineButton, {
  nativeOnly: { onChange: true, on: true }
})

export default RNShineButton