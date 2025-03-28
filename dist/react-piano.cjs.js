'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var range = _interopDefault(require('just-range'));
var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));
var classNames = _interopDefault(require('classnames'));
var difference = _interopDefault(require('lodash.difference'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var SORTED_PITCHES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
var ACCIDENTAL_PITCHES = ['Db', 'Eb', 'Gb', 'Ab', 'Bb'];
var PITCH_INDEXES = {
  C: 0,
  'C#': 1,
  Db: 1,
  D: 2,
  'D#': 3,
  Eb: 3,
  E: 4,
  F: 5,
  'F#': 6,
  Gb: 6,
  G: 7,
  'G#': 8,
  Ab: 8,
  A: 9,
  'A#': 10,
  Bb: 10,
  B: 11
};
var MIDI_NUMBER_C0 = 12;
var MIN_MIDI_NUMBER = MIDI_NUMBER_C0;
var MAX_MIDI_NUMBER = 127;
var NOTE_REGEX = /([a-g])([#b]?)(\d+)/;
var NOTES_IN_OCTAVE = 12; // Converts string notes in scientific pitch notation to a MIDI number, or null.
//
// Example: "c#0" => 13, "eb5" => 75, "abc" => null
//
// References:
// - http://www.flutopedia.com/octave_notation.htm
// - https://github.com/danigb/tonal/blob/master/packages/note/index.js

function fromNote(note) {
  if (!note) {
    throw Error('Invalid note argument');
  }

  var match = NOTE_REGEX.exec(note.toLowerCase());

  if (!match) {
    throw Error('Invalid note argument');
  }

  var _match = _slicedToArray(match, 4),
      letter = _match[1],
      accidental = _match[2],
      octave = _match[3];

  var pitchName = "".concat(letter.toUpperCase()).concat(accidental);
  var pitchIndex = PITCH_INDEXES[pitchName];

  if (pitchIndex == null) {
    throw Error('Invalid note argument');
  }

  return MIDI_NUMBER_C0 + pitchIndex + NOTES_IN_OCTAVE * parseInt(octave, 10);
} //
// Build cache for getAttributes
//


function buildMidiNumberAttributes(midiNumber) {
  var pitchIndex = (midiNumber - MIDI_NUMBER_C0) % NOTES_IN_OCTAVE;
  var octave = Math.floor((midiNumber - MIDI_NUMBER_C0) / NOTES_IN_OCTAVE);
  var pitchName = SORTED_PITCHES[pitchIndex];
  return {
    note: "".concat(pitchName).concat(octave),
    pitchName: pitchName,
    octave: octave,
    midiNumber: midiNumber,
    isAccidental: ACCIDENTAL_PITCHES.includes(pitchName)
  };
}

function buildMidiNumberAttributesCache() {
  return range(MIN_MIDI_NUMBER, MAX_MIDI_NUMBER + 1).reduce(function (cache, midiNumber) {
    cache[midiNumber] = buildMidiNumberAttributes(midiNumber);
    return cache;
  }, {});
}

var midiNumberAttributesCache = buildMidiNumberAttributesCache(); // Returns an object containing various attributes for a given MIDI number.
// Throws error for invalid midiNumbers.

function getAttributes(midiNumber) {
  var attrs = midiNumberAttributesCache[midiNumber];

  if (!attrs) {
    throw Error('Invalid MIDI number');
  }

  return attrs;
} // Returns all MIDI numbers corresponding to natural notes, e.g. C and not C# or Bb.


var NATURAL_MIDI_NUMBERS = range(MIN_MIDI_NUMBER, MAX_MIDI_NUMBER + 1).filter(function (midiNumber) {
  return !getAttributes(midiNumber).isAccidental;
});
var MidiNumbers = {
  fromNote: fromNote,
  getAttributes: getAttributes,
  MIN_MIDI_NUMBER: MIN_MIDI_NUMBER,
  MAX_MIDI_NUMBER: MAX_MIDI_NUMBER,
  NATURAL_MIDI_NUMBERS: NATURAL_MIDI_NUMBERS
};

var Key =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Key, _React$Component);

  function Key() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Key);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Key)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onPlayNoteInput", function () {
      _this.props.onPlayNoteInput(_this.props.midiNumber);
    });

    _defineProperty(_assertThisInitialized(_this), "onStopNoteInput", function () {
      _this.props.onStopNoteInput(_this.props.midiNumber);
    });

    return _this;
  }

  _createClass(Key, [{
    key: "getAbsoluteKeyPosition",
    // Key position is represented by the number of natural key widths from the left
    value: function getAbsoluteKeyPosition(midiNumber) {
      var OCTAVE_WIDTH = 7;

      var _MidiNumbers$getAttri = MidiNumbers.getAttributes(midiNumber),
          octave = _MidiNumbers$getAttri.octave,
          pitchName = _MidiNumbers$getAttri.pitchName;

      var pitchPosition = this.props.pitchPositions[pitchName];
      var octavePosition = OCTAVE_WIDTH * octave;
      return pitchPosition + octavePosition;
    }
  }, {
    key: "getRelativeKeyPosition",
    value: function getRelativeKeyPosition(midiNumber) {
      return this.getAbsoluteKeyPosition(midiNumber) - this.getAbsoluteKeyPosition(this.props.noteRange.first);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          naturalKeyWidth = _this$props.naturalKeyWidth,
          accidentalWidthRatio = _this$props.accidentalWidthRatio,
          midiNumber = _this$props.midiNumber,
          gliss = _this$props.gliss,
          useTouchEvents = _this$props.useTouchEvents,
          accidental = _this$props.accidental,
          active = _this$props.active,
          disabled = _this$props.disabled,
          children = _this$props.children; // Need to conditionally include/exclude handlers based on useTouchEvents,
      // because otherwise mobile taps double fire events.

      return React.createElement("div", {
        className: classNames('ReactPiano__Key', {
          'ReactPiano__Key--accidental': accidental,
          'ReactPiano__Key--natural': !accidental,
          'ReactPiano__Key--disabled': disabled,
          'ReactPiano__Key--active': active
        }),
        style: {
          left: ratioToPercentage(this.getRelativeKeyPosition(midiNumber) * naturalKeyWidth),
          width: ratioToPercentage(accidental ? accidentalWidthRatio * naturalKeyWidth : naturalKeyWidth)
        },
        onMouseDown: useTouchEvents ? null : this.onPlayNoteInput,
        onMouseUp: useTouchEvents ? null : this.onStopNoteInput,
        onMouseEnter: gliss ? function (event) {
          if (event.buttons) {
            _this2.onPlayNoteInput();
          }
        } : null,
        onMouseLeave: this.onStopNoteInput,
        onPointerDown: useTouchEvents ? function (ev) {
          ev.target.releasePointerCapture(ev.pointerId);
        } : null,
        onPointerEnter: useTouchEvents ? function (event) {
          if (event.buttons) {
            _this2.onPlayNoteInput();
          }
        } : null,
        onPointerLeave: useTouchEvents ? this.onStopNoteInput : null,
        onTouchStart: useTouchEvents ? this.onPlayNoteInput : null,
        onTouchCancel: useTouchEvents ? this.onStopNoteInput : null,
        onTouchEnd: useTouchEvents ? this.onStopNoteInput : null
      }, React.createElement("div", {
        className: "ReactPiano__NoteLabelContainer"
      }, children));
    }
  }]);

  return Key;
}(React.Component);

_defineProperty(Key, "propTypes", {
  midiNumber: PropTypes.number.isRequired,
  naturalKeyWidth: PropTypes.number.isRequired,
  // Width as a ratio between 0 and 1
  gliss: PropTypes.bool.isRequired,
  useTouchEvents: PropTypes.bool.isRequired,
  accidental: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onPlayNoteInput: PropTypes.func.isRequired,
  onStopNoteInput: PropTypes.func.isRequired,
  accidentalWidthRatio: PropTypes.number.isRequired,
  pitchPositions: PropTypes.object.isRequired,
  children: PropTypes.node
});

_defineProperty(Key, "defaultProps", {
  accidentalWidthRatio: 0.65,
  pitchPositions: {
    C: 0,
    Db: 0.55,
    D: 1,
    Eb: 1.8,
    E: 2,
    F: 3,
    Gb: 3.5,
    G: 4,
    Ab: 4.7,
    A: 5,
    Bb: 5.85,
    B: 6
  }
});

function ratioToPercentage(ratio) {
  return "".concat(ratio * 100, "%");
}

var Keyboard =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Keyboard, _React$Component);

  function Keyboard() {
    _classCallCheck(this, Keyboard);

    return _possibleConstructorReturn(this, _getPrototypeOf(Keyboard).apply(this, arguments));
  }

  _createClass(Keyboard, [{
    key: "getMidiNumbers",
    // Range of midi numbers on keyboard
    value: function getMidiNumbers() {
      return range(this.props.noteRange.first, this.props.noteRange.last + 1);
    }
  }, {
    key: "getNaturalKeyCount",
    value: function getNaturalKeyCount() {
      return this.getMidiNumbers().filter(function (number) {
        var _MidiNumbers$getAttri = MidiNumbers.getAttributes(number),
            isAccidental = _MidiNumbers$getAttri.isAccidental;

        return !isAccidental;
      }).length;
    } // Returns a ratio between 0 and 1

  }, {
    key: "getNaturalKeyWidth",
    value: function getNaturalKeyWidth() {
      return 1 / this.getNaturalKeyCount();
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      return this.props.width ? this.props.width : '100%';
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      if (!this.props.width) {
        return '100%';
      }

      var keyWidth = this.props.width * this.getNaturalKeyWidth();
      return "".concat(keyWidth / this.props.keyWidthToHeight, "px");
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var naturalKeyWidth = this.getNaturalKeyWidth();
      return React.createElement("div", {
        className: classNames('ReactPiano__Keyboard', this.props.className),
        style: {
          width: this.getWidth(),
          height: this.getHeight()
        }
      }, this.getMidiNumbers().map(function (midiNumber) {
        var _MidiNumbers$getAttri2 = MidiNumbers.getAttributes(midiNumber),
            note = _MidiNumbers$getAttri2.note,
            isAccidental = _MidiNumbers$getAttri2.isAccidental;

        var isActive = !_this.props.disabled && _this.props.activeNotes.includes(midiNumber);

        return React.createElement(Key, {
          naturalKeyWidth: naturalKeyWidth,
          midiNumber: midiNumber,
          noteRange: _this.props.noteRange,
          active: isActive,
          accidental: isAccidental,
          disabled: _this.props.disabled,
          onPlayNoteInput: _this.props.onPlayNoteInput,
          onStopNoteInput: _this.props.onStopNoteInput,
          gliss: _this.props.gliss,
          useTouchEvents: _this.props.useTouchEvents,
          key: midiNumber
        }, _this.props.disabled ? null : _this.props.renderNoteLabel({
          isActive: isActive,
          isAccidental: isAccidental,
          midiNumber: midiNumber
        }));
      }));
    }
  }]);

  return Keyboard;
}(React.Component);

_defineProperty(Keyboard, "propTypes", {
  noteRange: noteRangePropType,
  activeNotes: PropTypes.arrayOf(PropTypes.number),
  onPlayNoteInput: PropTypes.func.isRequired,
  onStopNoteInput: PropTypes.func.isRequired,
  renderNoteLabel: PropTypes.func.isRequired,
  keyWidthToHeight: PropTypes.number.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  gliss: PropTypes.bool,
  useTouchEvents: PropTypes.bool,
  // If width is not provided, must have fixed width and height in parent container
  width: PropTypes.number
});

_defineProperty(Keyboard, "defaultProps", {
  disabled: false,
  gliss: false,
  useTouchEvents: false,
  keyWidthToHeight: 0.33,
  renderNoteLabel: function renderNoteLabel() {}
});

function isNaturalMidiNumber(value) {
  if (typeof value !== 'number') {
    return false;
  }

  return MidiNumbers.NATURAL_MIDI_NUMBERS.includes(value);
}

function noteRangePropType(props, propName, componentName) {
  var _props$propName = props[propName],
      first = _props$propName.first,
      last = _props$propName.last;

  if (!first || !last) {
    return new Error("Invalid prop ".concat(propName, " supplied to ").concat(componentName, ". ").concat(propName, " must be an object with .first and .last values."));
  }

  if (!isNaturalMidiNumber(first) || !isNaturalMidiNumber(last)) {
    return new Error("Invalid prop ".concat(propName, " supplied to ").concat(componentName, ". ").concat(propName, " values must be valid MIDI numbers, and should not be accidentals (sharp or flat notes)."));
  }

  if (first >= last) {
    return new Error("Invalid prop ".concat(propName, " supplied to ").concat(componentName, ". ").concat(propName, ".first must be smaller than ").concat(propName, ".last."));
  }
}

var ControlledPiano =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ControlledPiano, _React$Component);

  function ControlledPiano() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ControlledPiano);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ControlledPiano)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isMouseDown: false,
      useTouchEvents: false
    });

    _defineProperty(_assertThisInitialized(_this), "handleNoteChanges", function (_ref) {
      var prevActiveNotes = _ref.prevActiveNotes,
          nextActiveNotes = _ref.nextActiveNotes;

      if (_this.props.disabled) {
        return;
      }

      var notesStopped = difference(prevActiveNotes, nextActiveNotes);
      var notesStarted = difference(nextActiveNotes, prevActiveNotes);
      notesStarted.forEach(function (midiNumber) {
        _this.props.playNote(midiNumber);
      });
      notesStopped.forEach(function (midiNumber) {
        _this.props.stopNote(midiNumber);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getMidiNumberForKey", function (code) {
      if (!_this.props.keyboardShortcuts) {
        return null;
      }

      var shortcut = _this.props.keyboardShortcuts.find(function (sh) {
        return sh.code === code;
      });

      return shortcut && shortcut.midiNumber;
    });

    _defineProperty(_assertThisInitialized(_this), "getKeyForMidiNumber", function (midiNumber) {
      if (!_this.props.keyboardShortcuts) {
        return null;
      }

      var shortcut = _this.props.keyboardShortcuts.find(function (sh) {
        return sh.midiNumber === midiNumber;
      });

      return shortcut && shortcut.code;
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
      // Don't conflict with existing combinations like ctrl + t
      if (event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }

      var midiNumber = _this.getMidiNumberForKey(event.code);

      if (midiNumber) {
        _this.onPlayNoteInput(midiNumber);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyUp", function (event) {
      // This *should* also check for event.ctrlKey || event.metaKey || event.ShiftKey like onKeyDown does,
      // but at least on Mac Chrome, when mashing down many alphanumeric keystrokes at once,
      // ctrlKey is fired unexpectedly, which would cause onStopNote to NOT be fired, which causes problematic
      // lingering notes. Since it's fairly safe to call onStopNote even when not necessary,
      // the ctrl/meta/shift check is removed to fix that issue.
      var midiNumber = _this.getMidiNumberForKey(event.code);

      if (midiNumber) {
        _this.onStopNoteInput(midiNumber);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onPlayNoteInput", function (midiNumber) {
      if (_this.props.disabled) {
        return;
      } // Pass in previous activeNotes for recording functionality


      _this.props.onPlayNoteInput(midiNumber, _this.props.activeNotes);
    });

    _defineProperty(_assertThisInitialized(_this), "onStopNoteInput", function (midiNumber) {
      if (_this.props.disabled) {
        return;
      } // Pass in previous activeNotes for recording functionality


      _this.props.onStopNoteInput(midiNumber, _this.props.activeNotes);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseDown", function () {
      _this.setState({
        isMouseDown: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function () {
      _this.setState({
        isMouseDown: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function (event) {
      // When re-entering the piano area, check if the mouse button is still down
      // If not, make sure we're not in gliss mode
      if (!event.buttons) {
        _this.setState({
          isMouseDown: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onTouchStart", function () {
      _this.setState({
        useTouchEvents: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderNoteLabel", function (_ref2) {
      var midiNumber = _ref2.midiNumber,
          isActive = _ref2.isActive,
          isAccidental = _ref2.isAccidental;

      var keyboardShortcut = _this.getKeyForMidiNumber(midiNumber);

      return _this.props.renderNoteLabel({
        keyboardShortcut: keyboardShortcut,
        midiNumber: midiNumber,
        isActive: isActive,
        isAccidental: isAccidental
      });
    });

    return _this;
  }

  _createClass(ControlledPiano, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('keydown', this.onKeyDown);
      window.addEventListener('keyup', this.onKeyUp);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.onKeyDown);
      window.removeEventListener('keyup', this.onKeyUp);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.activeNotes !== prevProps.activeNotes) {
        this.handleNoteChanges({
          prevActiveNotes: prevProps.activeNotes || [],
          nextActiveNotes: this.props.activeNotes || []
        });
      }
    } // This function is responsible for diff'ing activeNotes
    // and playing or stopping notes accordingly.

  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        style: {
          width: '100%',
          height: '100%'
        },
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp,
        onMouseEnter: this.onMouseEnter,
        onTouchStart: this.onTouchStart,
        "data-testid": "container"
      }, React.createElement(Keyboard, {
        noteRange: this.props.noteRange,
        onPlayNoteInput: this.onPlayNoteInput,
        onStopNoteInput: this.onStopNoteInput,
        activeNotes: this.props.activeNotes,
        className: this.props.className,
        disabled: this.props.disabled,
        width: this.props.width,
        keyWidthToHeight: this.props.keyWidthToHeight,
        gliss: this.state.isMouseDown,
        useTouchEvents: this.state.useTouchEvents,
        renderNoteLabel: this.renderNoteLabel
      }));
    }
  }]);

  return ControlledPiano;
}(React.Component);

_defineProperty(ControlledPiano, "propTypes", {
  noteRange: PropTypes.object.isRequired,
  activeNotes: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  playNote: PropTypes.func.isRequired,
  stopNote: PropTypes.func.isRequired,
  onPlayNoteInput: PropTypes.func.isRequired,
  onStopNoteInput: PropTypes.func.isRequired,
  renderNoteLabel: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  width: PropTypes.number,
  keyWidthToHeight: PropTypes.number,
  keyboardShortcuts: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    midiNumber: PropTypes.number.isRequired
  }))
});

_defineProperty(ControlledPiano, "defaultProps", {
  renderNoteLabel: function renderNoteLabel(_ref3) {
    var keyboardShortcut = _ref3.keyboardShortcut,
        midiNumber = _ref3.midiNumber,
        isActive = _ref3.isActive,
        isAccidental = _ref3.isAccidental;
    return keyboardShortcut ? React.createElement("div", {
      className: classNames('ReactPiano__NoteLabel', {
        'ReactPiano__NoteLabel--active': isActive,
        'ReactPiano__NoteLabel--accidental': isAccidental,
        'ReactPiano__NoteLabel--natural': !isAccidental
      })
    }, keyboardShortcut) : null;
  }
});

var Piano =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Piano, _React$Component);

  function Piano() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Piano);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Piano)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      activeNotes: _this.props.activeNotes || []
    });

    _defineProperty(_assertThisInitialized(_this), "handlePlayNoteInput", function (midiNumber) {
      _this.setState(function (prevState) {
        // Need to be handled inside setState in order to set prevActiveNotes without
        // race conditions.
        if (_this.props.onPlayNoteInput) {
          _this.props.onPlayNoteInput(midiNumber, {
            prevActiveNotes: prevState.activeNotes
          });
        } // Don't append note to activeNotes if it's already present


        if (prevState.activeNotes.includes(midiNumber)) {
          return null;
        }

        return {
          activeNotes: prevState.activeNotes.concat(midiNumber)
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleStopNoteInput", function (midiNumber) {
      _this.setState(function (prevState) {
        // Need to be handled inside setState in order to set prevActiveNotes without
        // race conditions.
        if (_this.props.onStopNoteInput) {
          _this.props.onStopNoteInput(midiNumber, {
            prevActiveNotes: _this.state.activeNotes
          });
        }

        return {
          activeNotes: prevState.activeNotes.filter(function (note) {
            return midiNumber !== note;
          })
        };
      });
    });

    return _this;
  }

  _createClass(Piano, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Make activeNotes "controllable" by using internal
      // state by default, but allowing prop overrides.
      if (prevProps.activeNotes !== this.props.activeNotes && this.state.activeNotes !== this.props.activeNotes) {
        this.setState({
          activeNotes: this.props.activeNotes || []
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          activeNotes = _this$props.activeNotes,
          onPlayNoteInput = _this$props.onPlayNoteInput,
          onStopNoteInput = _this$props.onStopNoteInput,
          otherProps = _objectWithoutProperties(_this$props, ["activeNotes", "onPlayNoteInput", "onStopNoteInput"]);

      return React.createElement(ControlledPiano, _extends({
        activeNotes: this.state.activeNotes,
        onPlayNoteInput: this.handlePlayNoteInput,
        onStopNoteInput: this.handleStopNoteInput
      }, otherProps));
    }
  }]);

  return Piano;
}(React.Component);

_defineProperty(Piano, "propTypes", {
  noteRange: PropTypes.object.isRequired,
  activeNotes: PropTypes.arrayOf(PropTypes.number.isRequired),
  playNote: PropTypes.func.isRequired,
  stopNote: PropTypes.func.isRequired,
  onPlayNoteInput: PropTypes.func,
  onStopNoteInput: PropTypes.func,
  renderNoteLabel: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  width: PropTypes.number,
  keyWidthToHeight: PropTypes.number,
  keyboardShortcuts: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    midiNumber: PropTypes.number.isRequired
  }))
});

/**
 * Create keyboard shortcuts based on physical key positions using event.code
 * This makes the piano playable with the same physical key positions
 * regardless of keyboard layout (QWERTY, AZERTY, Dvorak, etc.)
 */

function createKeyboardShortcuts(_ref) {
  var firstNote = _ref.firstNote,
      lastNote = _ref.lastNote,
      keyboardConfig = _ref.keyboardConfig;
  var currentMidiNumber = firstNote;
  var naturalKeyIndex = 0;
  var keyboardShortcuts = [];

  while ( // There are still keys to be assigned
  naturalKeyIndex < keyboardConfig.length && // Note to be assigned does not surpass range
  currentMidiNumber <= lastNote) {
    var keyCode = keyboardConfig[naturalKeyIndex];

    var _MidiNumbers$getAttri = MidiNumbers.getAttributes(currentMidiNumber),
        isAccidental = _MidiNumbers$getAttri.isAccidental;

    if (isAccidental) {
      keyboardShortcuts.push({
        code: keyCode.flat,
        midiNumber: currentMidiNumber
      });
    } else {
      keyboardShortcuts.push({
        code: keyCode.natural,
        midiNumber: currentMidiNumber
      });
      naturalKeyIndex += 1;
    }

    currentMidiNumber += 1;
  }

  return keyboardShortcuts;
}

var KeyboardShortcuts = {
  create: createKeyboardShortcuts,
  // Preset configurations using KeyboardEvent.code values
  // These represent physical key positions regardless of keyboard layout
  PIANO_LAYOUT: [{
    natural: 'KeyZ',
    flat: null,
    sharp: 'KeyS'
  }, {
    natural: 'KeyX',
    flat: 'KeyS',
    sharp: 'KeyD'
  }, {
    natural: 'KeyC',
    flat: 'KeyD',
    sharp: null
  }, {
    natural: 'KeyV',
    flat: null,
    sharp: 'KeyG'
  }, {
    natural: 'KeyB',
    flat: 'KeyG',
    sharp: 'KeyH'
  }, {
    natural: 'KeyN',
    flat: 'KeyH',
    sharp: 'KeyJ'
  }, {
    natural: 'KeyM',
    flat: 'KeyJ',
    sharp: null
  }],
  BOTTOM_ROW: [{
    natural: 'KeyZ',
    flat: 'KeyA',
    sharp: 'KeyS'
  }, {
    natural: 'KeyX',
    flat: 'KeyS',
    sharp: 'KeyD'
  }, {
    natural: 'KeyC',
    flat: 'KeyD',
    sharp: 'KeyF'
  }, {
    natural: 'KeyV',
    flat: 'KeyF',
    sharp: 'KeyG'
  }, {
    natural: 'KeyB',
    flat: 'KeyG',
    sharp: 'KeyH'
  }, {
    natural: 'KeyN',
    flat: 'KeyH',
    sharp: 'KeyJ'
  }, {
    natural: 'KeyM',
    flat: 'KeyJ',
    sharp: 'KeyK'
  }, {
    natural: 'Comma',
    flat: 'KeyK',
    sharp: 'KeyL'
  }, {
    natural: 'Period',
    flat: 'KeyL',
    sharp: 'Semicolon'
  }, {
    natural: 'Slash',
    flat: 'Semicolon',
    sharp: 'Quote'
  }],
  HOME_ROW: [{
    natural: 'KeyA',
    flat: 'KeyQ',
    sharp: 'KeyW'
  }, {
    natural: 'KeyS',
    flat: 'KeyW',
    sharp: 'KeyE'
  }, {
    natural: 'KeyD',
    flat: 'KeyE',
    sharp: 'KeyR'
  }, {
    natural: 'KeyF',
    flat: 'KeyR',
    sharp: 'KeyT'
  }, {
    natural: 'KeyG',
    flat: 'KeyT',
    sharp: 'KeyY'
  }, {
    natural: 'KeyH',
    flat: 'KeyY',
    sharp: 'KeyU'
  }, {
    natural: 'KeyJ',
    flat: 'KeyU',
    sharp: 'KeyI'
  }, {
    natural: 'KeyK',
    flat: 'KeyI',
    sharp: 'KeyO'
  }, {
    natural: 'KeyL',
    flat: 'KeyO',
    sharp: 'KeyP'
  }, {
    natural: 'Semicolon',
    flat: 'KeyP',
    sharp: 'BracketLeft'
  }, {
    natural: 'Quote',
    flat: 'BracketLeft',
    sharp: 'BracketRight'
  }],
  QWERTY_ROW: [{
    natural: 'KeyQ',
    flat: 'Digit1',
    sharp: 'Digit2'
  }, {
    natural: 'KeyW',
    flat: 'Digit2',
    sharp: 'Digit3'
  }, {
    natural: 'KeyE',
    flat: 'Digit3',
    sharp: 'Digit4'
  }, {
    natural: 'KeyR',
    flat: 'Digit4',
    sharp: 'Digit5'
  }, {
    natural: 'KeyT',
    flat: 'Digit5',
    sharp: 'Digit6'
  }, {
    natural: 'KeyY',
    flat: 'Digit6',
    sharp: 'Digit7'
  }, {
    natural: 'KeyU',
    flat: 'Digit7',
    sharp: 'Digit8'
  }, {
    natural: 'KeyI',
    flat: 'Digit8',
    sharp: 'Digit9'
  }, {
    natural: 'KeyO',
    flat: 'Digit9',
    sharp: 'Digit0'
  }, {
    natural: 'KeyP',
    flat: 'Digit0',
    sharp: 'Minus'
  }, {
    natural: 'BracketLeft',
    flat: 'Minus',
    sharp: 'Equal'
  }]
};

exports.ControlledPiano = ControlledPiano;
exports.Piano = Piano;
exports.Keyboard = Keyboard;
exports.KeyboardShortcuts = KeyboardShortcuts;
exports.MidiNumbers = MidiNumbers;
//# sourceMappingURL=react-piano.cjs.js.map
