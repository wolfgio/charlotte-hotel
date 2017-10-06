import React from 'react';
import moment from 'moment';

class CalendarMonthYear extends React.Component {
  render() {
    const selectedMonth = moment(this.props.month).format('MMMM [/] YYYY');
    return (
      <div className="calendar-month-year">
        <button onClick={() => this.props.onPrevious()}>{'<'}</button>
        <h5>{selectedMonth}</h5>
        <button onClick={() => this.props.onNext()}>{'>'}</button>
      </div>
    )
  }
}

export default CalendarMonthYear;