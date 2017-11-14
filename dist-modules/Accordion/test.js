'use strict';

var _unexpected = require('unexpected');

var _unexpected2 = _interopRequireDefault(_unexpected);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _skinDeep = require('skin-deep');

var _skinDeep2 = _interopRequireDefault(_skinDeep);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _AccordionItem = require('../AccordionItem');

var _AccordionItem2 = _interopRequireDefault(_AccordionItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Accordion Test Case', function () {
  var vdom = void 0,
      instance = void 0,
      items = void 0;

  it('should render', function () {
    var tree = _skinDeep2.default.shallowRender(_react2.default.createElement(_index2.default, null));

    instance = tree.getMountedInstance();
    vdom = tree.getRenderOutput();

    (0, _unexpected2.default)(instance, 'to be defined');
    (0, _unexpected2.default)(vdom, 'to be defined');
    (0, _unexpected2.default)(vdom.type, 'to be', 'div');
  });

  it('should render with a custom tag', function () {
    var tree = _skinDeep2.default.shallowRender(_react2.default.createElement(_index2.default, { rootTag: 'ul' }));

    instance = tree.getMountedInstance();
    vdom = tree.getRenderOutput();

    (0, _unexpected2.default)(instance, 'to be defined');
    (0, _unexpected2.default)(vdom, 'to be defined');
    (0, _unexpected2.default)(vdom.type, 'to be', 'ul');
  });

  it('should render with one item only', function () {
    var tree = _skinDeep2.default.shallowRender(_react2.default.createElement(
      _index2.default,
      null,
      _react2.default.createElement(_AccordionItem2.default, { key: 1 })
    ));

    instance = tree.getMountedInstance();
    vdom = tree.getRenderOutput();

    (0, _unexpected2.default)(instance, 'to be defined');
    (0, _unexpected2.default)(vdom, 'to be defined');
    (0, _unexpected2.default)(vdom.type, 'to be', 'div');
  });

  describe('activeItems state', function () {
    it('should not set item as active when disabled', function () {
      var tree = _skinDeep2.default.shallowRender(_react2.default.createElement(
        _index2.default,
        null,
        _react2.default.createElement(_AccordionItem2.default, { title: 'First', key: 1 }),
        _react2.default.createElement(_AccordionItem2.default, { title: 'Second', key: 2, disabled: true, expanded: true })
      ));

      vdom = tree.getRenderOutput();

      items = tree.props.children;

      (0, _unexpected2.default)(items[0].props.expanded, 'to be false');
      (0, _unexpected2.default)(items[1].props.expanded, 'to be false');
    });
  });

  describe('allowMultiple', function () {
    it('should allow multiple expanded items', function () {
      var tree = _skinDeep2.default.shallowRender(_react2.default.createElement(
        _index2.default,
        { allowMultiple: true },
        _react2.default.createElement(_AccordionItem2.default, { title: 'First', key: 1 }),
        _react2.default.createElement(_AccordionItem2.default, { title: 'Second', key: 2, expanded: true })
      ));

      instance = tree.getMountedInstance();
      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      (0, _unexpected2.default)(items[0].props.expanded, 'to be false');
      (0, _unexpected2.default)(items[1].props.expanded, 'to be true');

      instance.handleClick(0);

      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      (0, _unexpected2.default)(items[0].props.expanded, 'to be true');
      (0, _unexpected2.default)(items[1].props.expanded, 'to be true');
    });

    it('should default to first active item if allowMultiple is false', function () {
      var tree = _skinDeep2.default.shallowRender(_react2.default.createElement(
        _index2.default,
        null,
        _react2.default.createElement(_AccordionItem2.default, { title: 'First', key: 1, expanded: true }),
        _react2.default.createElement(_AccordionItem2.default, { title: 'Second', key: 2, expanded: true })
      ));

      vdom = tree.getRenderOutput();

      items = tree.props.children;

      (0, _unexpected2.default)(items[0].props.expanded, 'to be true');
      (0, _unexpected2.default)(items[1].props.expanded, 'to be false');
    });

    it('should allow multiple selected indexes of different types', function () {
      var tree = _skinDeep2.default.shallowRender(_react2.default.createElement(
        _index2.default,
        { allowMultiple: true },
        _react2.default.createElement(_AccordionItem2.default, { title: 'First', key: 1, expanded: true }),
        _react2.default.createElement(_AccordionItem2.default, { title: 'Second', key: 2, slug: 'second', expanded: true })
      ));

      vdom = tree.getRenderOutput();

      items = tree.props.children;

      (0, _unexpected2.default)(items[0].props.expanded, 'to be true');
      (0, _unexpected2.default)(items[1].props.expanded, 'to be true');
    });

    it('should save activeItems on state when allowMultiple is true', function () {
      var tree = _skinDeep2.default.shallowRender(_react2.default.createElement(
        _index2.default,
        { allowMultiple: true },
        _react2.default.createElement(_AccordionItem2.default, { title: 'First', key: 1 }),
        _react2.default.createElement(_AccordionItem2.default, { title: 'Second', key: 2, expanded: true })
      ));

      instance = tree.getMountedInstance();

      (0, _unexpected2.default)(instance.state.activeItems, 'to equal', [1]);
    });

    it('should update activeItems state when clicking on an item', function () {
      var tree = _skinDeep2.default.shallowRender(_react2.default.createElement(
        _index2.default,
        { allowMultiple: true },
        _react2.default.createElement(_AccordionItem2.default, { title: 'First', key: 1 }),
        _react2.default.createElement(_AccordionItem2.default, { title: 'Second', key: 2, expanded: true })
      ));

      instance = tree.getMountedInstance();

      (0, _unexpected2.default)(instance.state.activeItems, 'to equal', [1]);

      instance.handleClick(0);

      (0, _unexpected2.default)(instance.state.activeItems, 'to equal', [1, 0]);
    });

    it('should keep only one activeItem when allowMultiple is false', function () {
      var tree = _skinDeep2.default.shallowRender(_react2.default.createElement(
        _index2.default,
        null,
        _react2.default.createElement(_AccordionItem2.default, { title: 'First', key: 1 }),
        _react2.default.createElement(_AccordionItem2.default, { title: 'Second', key: 2, expanded: true })
      ));

      instance = tree.getMountedInstance();

      (0, _unexpected2.default)(instance.state.activeItems, 'to equal', [1]);

      instance.handleClick(0);

      (0, _unexpected2.default)(instance.state.activeItems, 'to equal', [0]);
    });
  });

  describe('openNextAccordionItem', function () {
    it('should open next accordion item', function () {
      var tree = _skinDeep2.default.shallowRender(_react2.default.createElement(
        _index2.default,
        { openNextAccordionItem: true },
        _react2.default.createElement(_AccordionItem2.default, { title: 'First', key: 1, expanded: true }),
        _react2.default.createElement(_AccordionItem2.default, { title: 'Second', key: 2 })
      ));

      instance = tree.getMountedInstance();
      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      (0, _unexpected2.default)(items[0].props.expanded, 'to be true');
      (0, _unexpected2.default)(items[1].props.expanded, 'to be false');

      instance.handleClick(0);

      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      (0, _unexpected2.default)(items[0].props.expanded, 'to be false');
      (0, _unexpected2.default)(items[1].props.expanded, 'to be true');
    });

    it('should close last item and not open another accordion item', function () {
      var tree = _skinDeep2.default.shallowRender(_react2.default.createElement(
        _index2.default,
        { openNextAccordionItem: true },
        _react2.default.createElement(_AccordionItem2.default, { title: 'First', key: 1 }),
        _react2.default.createElement(_AccordionItem2.default, { title: 'Second', key: 2, expanded: true })
      ));

      instance = tree.getMountedInstance();
      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      (0, _unexpected2.default)(items[0].props.expanded, 'to be false');
      (0, _unexpected2.default)(items[1].props.expanded, 'to be true');

      instance.handleClick(1);

      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      (0, _unexpected2.default)(items[0].props.expanded, 'to be false');
      (0, _unexpected2.default)(items[1].props.expanded, 'to be false');
    });

    it('should open multiple if allowMultiple present', function () {
      var tree = _skinDeep2.default.shallowRender(_react2.default.createElement(
        _index2.default,
        { openNextAccordionItem: true, allowMultiple: true },
        _react2.default.createElement(_AccordionItem2.default, { title: 'First', key: 1, expanded: true }),
        _react2.default.createElement(_AccordionItem2.default, { title: 'Second', key: 2 }),
        _react2.default.createElement(_AccordionItem2.default, { title: 'Third', key: 3 })
      ));

      instance = tree.getMountedInstance();
      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      (0, _unexpected2.default)(items[0].props.expanded, 'to be true');
      (0, _unexpected2.default)(items[1].props.expanded, 'to be false');
      (0, _unexpected2.default)(items[2].props.expanded, 'to be false');

      instance.handleClick(1);
      instance.handleClick(2);

      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      (0, _unexpected2.default)(items[0].props.expanded, 'to be true');
      (0, _unexpected2.default)(items[1].props.expanded, 'to be true');
      (0, _unexpected2.default)(items[2].props.expanded, 'to be true');
    });

    it('should override slug property and assign key to index', function () {
      var tree = _skinDeep2.default.shallowRender(_react2.default.createElement(
        _index2.default,
        { openNextAccordionItem: true },
        _react2.default.createElement(_AccordionItem2.default, { title: 'First', key: 1, slug: 'first', expanded: true }),
        _react2.default.createElement(_AccordionItem2.default, { title: 'Second', key: 2, slug: 'second' })
      ));

      instance = tree.getMountedInstance();

      instance.handleClick(0);

      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      (0, _unexpected2.default)(items[0].props.expanded, 'to be false');
      (0, _unexpected2.default)(items[1].props.expanded, 'to be true');
    });

    it('should ignore null items', function () {
      var tree = _skinDeep2.default.shallowRender(_react2.default.createElement(
        _index2.default,
        null,
        _react2.default.createElement(_AccordionItem2.default, { title: 'First', key: 1 }),
        null,
        _react2.default.createElement(_AccordionItem2.default, { title: 'Second', key: 2 })
      ));

      instance = tree.getMountedInstance();

      vdom = tree.getRenderOutput();
      items = vdom.props.children;

      (0, _unexpected2.default)(items.length, 'to equal', 2);
    });
  });
});