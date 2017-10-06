import React from 'react';
import PropTypes from 'prop-types';

class CalendarDay extends React.Component {
  static propTypes = {
    day: PropTypes.number,
    checked: PropTypes.bool,
    onSelect: PropTypes.func,
    onLoad: PropTypes.func,
  };

  static defaultProps = {
    day: '',
    checked: false,
    onSelect: f => f,
    onLoad: f => f,
  };

  componentWillMount() {
    this.props.onLoad();
  }

  render() {
    return [
      <input
        id={this.props.day}
        key={this.props.day}
        className="calendar-day"
        type="checkbox"
        onClick={e => this.props.onSelect(e.target.value)}
        checked={this.props.checked}
        value={this.props.day}
      />,
      <label
        key={Math.random()}
        htmlFor={this.props.day}
      >
        <span>{this.props.day}</span>
      </label>
    ]
  }
}

export default CalendarDay;
