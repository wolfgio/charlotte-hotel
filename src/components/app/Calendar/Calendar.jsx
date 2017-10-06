import React from 'react';
import moment from 'moment';

import "./Calendar.scss";

import CalendarMonthYear from './CalendarMonthYear';
import CalendarWeek from './CalendarWeek';
import CalendarDay from './CalendarDay';

class Calendar extends React.Component {
  state = {
    currentMonth: moment(new Date()),
    startingPosition: 1,
    monthDays: [],
    selectedDates: {
      firstDate: null,
      lastDate: null,
    },
  };

  componentWillMount() {
    return this.handleDays();
  }

  async handleDays() {
    const currentMonth = this.state.currentMonth;
    const firstDay = moment(currentMonth).startOf('month');
    let startingPosition = 1;
    if (firstDay.isoWeekday() < 7) {
      startingPosition = firstDay.isoWeekday() + 1;
    }
    const monthDays = [];

    for(let i = 1; i <= firstDay.daysInMonth(); i++) {
      const day = i - 1;
      monthDays.push({
        moment: moment(firstDay).add('days', day).format('MMMM[ ]DD[, ]YYYY'),
        value: i,
        checked: false
      })
    }

    await this.setState({
      startingPosition,
      monthDays,
    });
  }

  onLoad() {
    const monthDays = this.state.monthDays;
    const selectedDates = this.state.selectedDates;
    
    for (const day of monthDays) {
      if (selectedDates.firstDate && selectedDates.lastDate) {
        if (moment(selectedDates.firstDate.moment).isBefore(day.moment) &&
        moment(selectedDates.lastDate.moment).isAfter(day.moment) ||
        moment(selectedDates.firstDate.moment).isSame(day.moment) ||
        moment(selectedDates.lastDate.moment).isSame(day.moment)) {
          day.checked = true;
        } else {
          day.checked = false;
        }
      }

      if (selectedDates.firstDate && !selectedDates.lastDate) {
        if (moment(selectedDates.firstDate.moment).isSame(day.moment)) {
          day.checked = true;
        } else {
          day.checked = false;
        }
      }
    }

    this.setState({ monthDays });
  }

  handleSelect(value) {
    const monthDays = this.state.monthDays;
    const selectedDates = this.state.selectedDates;
    const selectedDay = monthDays.findIndex(day => day.value.toString() === value.toString());

    if (selectedDates.firstDate && selectedDates.lastDate) {
      selectedDates.firstDate = monthDays[selectedDay];
      selectedDates.lastDate = null;
    }

    if (!selectedDates.firstDate) {
      selectedDates.firstDate = monthDays[selectedDay];
    }

    if (selectedDates.firstDate.value < monthDays[selectedDay].value) {
      selectedDates.lastDate = monthDays[selectedDay];
    }

    if (selectedDates.firstDate.value > monthDays[selectedDay].value) {
      selectedDates.lastDate = selectedDates.firstDate;
      selectedDates.firstDate = monthDays[selectedDay];
    }

    for (const day of monthDays) {
      if (selectedDates.firstDate && selectedDates.lastDate) {
        if (moment(selectedDates.firstDate.moment).isBefore(day.moment) &&
        moment(selectedDates.lastDate.moment).isAfter(day.moment) ||
        moment(selectedDates.firstDate.moment).isSame(day.moment) ||
        moment(selectedDates.lastDate.moment).isSame(day.moment)) {
          day.checked = true;
        } else {
          day.checked = false;
        }
      }

      if (selectedDates.firstDate && !selectedDates.lastDate) {
        if (moment(selectedDates.firstDate.moment).isSame(day.moment)) {
          day.checked = true;
        } else {
          day.checked = false;
        }
      }
    }

    this.setState({ monthDays, selectedDates });

    this.props.onSelectDates(this.state.selectedDates);
  }

  render() {
    const { currentMonth } = this.state;

    return (
      <div className="calendar">
        <CalendarMonthYear
          onPrevious={() => this.setState({
            currentMonth: moment(this.state.currentMonth).add('month', - 1)
          }, () => this.handleDays())}
          onNext={() => this.setState({
            currentMonth: moment(this.state.currentMonth).add('month', + 1)
          }, () => this.handleDays())}
          month={currentMonth}
        />
        <CalendarWeek />
        <div className={`calendar-grid day start${this.state.startingPosition}`}>
          { this.state.monthDays.map(day => (
            <CalendarDay
              key={day.value}
              day={day.value}
              checked={day.checked}
              onLoad={() => this.onLoad()}
              onSelect={value => this.handleSelect(value)}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Calendar;