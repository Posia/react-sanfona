'use strict';

import cx from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AccordionItemBody extends Component {
  render() {
    const {
      rootTag: Root,
      children,
      className,
      expanded,
      height,
      opacity,
      uuid
    } = this.props;

    const commonStyle = {
      overflow: 'hidden'
    };

    const bodyStyle = {
      ...commonStyle,
      opacity,
      height
    };

    return (
      <Root
        aria-hidden={!expanded}
        aria-labelledby={`react-sanfona-item-title-${uuid}`}
        className={cx('react-sanfona-item-body', className)}
        id={`react-sanfona-item-body-${uuid}`}
        style={bodyStyle}
      >
        <div className="react-sanfona-item-body-wrapper" style={commonStyle}>
          {children}
        </div>
      </Root>
    );
  }
}

AccordionItemBody.defaultProps = {
  rootTag: 'div'
};

AccordionItemBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  expanded: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  opacity: PropTypes.number,
  rootTag: PropTypes.string,
  uuid: PropTypes.string
};
