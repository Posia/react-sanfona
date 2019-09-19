'use strict';

import cx from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import uuid from 'uuid';

import { Animation, getChildrenHeight } from './util';
import AccordionItemBody from '../AccordionItemBody';
import AccordionItemTitle from '../AccordionItemTitle';

export default class AccordionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: props.expanded ? 'none' : 0,
      opacity: props.expanded ? 1 : 0,
      expanded: props.expanded
    };
  }

  componentWillMount() {
    this.uuid = this.props.uuid || uuid.v4();
    this.animation = new Animation(this.props.duration);
  }

  componentDidMount() {
    this.addAnimationHandlers();
    this.handleHeightChange();
  }

  componentDidUpdate(prevProps) {
    const { children, disabled, expanded } = this.props;

    if (prevProps.expanded !== expanded) {
      if (disabled) return;

      if (expanded) {
        this.handleExpand();
      } else {
        this.handleCollapse();
      }
    } else if (prevProps.children !== children) {
      this.handleHeightChange();
    }
  }

  addAnimationHandlers() {
    const { onAfterExpand, onAfterCollapse } = this.props;
    const bodyNode = this.getBodyNode();

    this.animation.addExpandHandler(progress => {
      const childrenHeight = getChildrenHeight(bodyNode);
      const actualHeight = (childrenHeight / 100) * progress.percents;

      this.setState({
        height: progress.inProgress ? actualHeight : 'auto',
        opacity: progress.percents / 100
      });
    });

    this.animation.addCollapseHandler(progress => {
      const childrenHeight = getChildrenHeight(bodyNode);
      const actualHeight =
        childrenHeight - (childrenHeight / 100) * progress.percents;

      this.setState({
        height: actualHeight,
        opacity: 1 - progress.percents / 100
      });
    });

    this.animation.addAfterCollapseHandler(() => {
      if (onAfterCollapse) onAfterCollapse();
    });

    this.animation.addAfterExpandHandler(() => {
      if (onAfterExpand) onAfterExpand();
    });
  }

  handleExpand() {
    const { index, onExpand, slug } = this.props;

    this.handleHeightChange();

    if (onExpand) {
      slug ? onExpand(slug, index) : onExpand(index);
    }
  }

  handleCollapse() {
    const { index, onClose, slug } = this.props;

    this.handleHeightChange();

    if (onClose) {
      slug ? onClose(slug, index) : onClose(index);
    }
  }

  getBodyNode() {
    return ReactDOM.findDOMNode(this.refs.body);
  }

  handleHeightChange() {
    const { expanded } = this.props;

    if (this.state.expanded === expanded) {
      return;
    }
    this.setState({ expanded });
    this.handleAnimationChange();
  }

  handleAnimationChange() {
    const { expanded } = this.props;
    if (expanded) {
      this.animation.expand();
    } else {
      this.animation.collapse();
    }
  }

  getProps() {
    const {
      className,
      disabled,
      disabledClassName,
      expanded,
      expandedClassName,
      style
    } = this.props;

    const props = {
      className: cx(
        'react-sanfona-item',
        className,
        {
          'react-sanfona-item-expanded': expanded && !disabled,
          'react-sanfona-item-disabled': disabled
        },
        expandedClassName && {
          [expandedClassName]: expanded
        },
        disabledClassName && {
          [disabledClassName]: disabled
        }
      ),
      role: 'tabpanel',
      style
    };

    return props;
  }

  render() {
    const {
      bodyClassName,
      bodyTag,
      children,
      disabled,
      onClick,
      onMouseOver,
      rootTag: Root,
      title,
      titleClassName,
      titleTag
    } = this.props;

    const { height, opacity } = this.state;

    return (
      <Root {...this.getProps()} ref="item">
        <AccordionItemTitle
          className={titleClassName}
          expanded={this.props.expanded}
          onClick={disabled ? null : onClick}
          onMouseOver={disabled ? null : onMouseOver}
          rootTag={titleTag}
          title={title}
          uuid={this.uuid}
        />
        <AccordionItemBody
          className={bodyClassName}
          expanded={this.props.expanded}
          opacity={opacity}
          height={height}
          ref="body"
          rootTag={bodyTag}
          uuid={this.uuid}
        >
          {children}
        </AccordionItemBody>
      </Root>
    );
  }
}

AccordionItem.defaultProps = {
  rootTag: 'div',
  titleTag: 'h3',
  bodyTag: 'div'
};

AccordionItem.propTypes = {
  bodyClassName: PropTypes.string,
  bodyTag: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  disabledClassName: PropTypes.string,
  duration: PropTypes.number,
  easing: PropTypes.string,
  expanded: PropTypes.bool,
  expandedClassName: PropTypes.string,
  index: PropTypes.number,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onClose: PropTypes.func,
  onExpand: PropTypes.func,
  onHover: PropTypes.func,
  onAfterCollapse: PropTypes.func,
  onAfterExpand: PropTypes.func,
  rootTag: PropTypes.string,
  slug: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  titleClassName: PropTypes.string,
  titleTag: PropTypes.string,
  uuid: PropTypes.string
};
