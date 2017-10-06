import React from 'react';
import PropTypes from 'prop-types';

import './HotelCard.scss';

import Button from '../../../../common/Button/Button';

class HotelCard extends React.Component {
  static propTypes = {
    item: PropTypes.object,
  }

  static defaultProps = {
    item: {},
  }

  state = {
    showChart: false,
  }

  renderHotelStarts = (rate) => {
    const starts = [];
    for (let i = 0; i < rate; i++) {
      starts.push(<li className="hotel-start" />)
    }

    if (starts.length > 0) {
      return starts;
    }

    return null;
  }

  renderHotelChartPrice = (list) => (
    <div className="hotel-list-card-chart-wrapper animated fadeIn">
      <header>
        <h5>PRICE HISTORY FOR 2017</h5>
        <button onClick={() => this.setState({ showChart: false })}>Back to description</button>
      </header>
      <div className="hotel-list-card-chart-container">
        {list.map(item => <div key={item.value} style={{ height: `${((item.value * 100) / 167) * 0.30}%`}} />)}
      </div>
    </div>
  );

  render() {
    return (
      <div className="hotel-list-card animated fadeIn">
        <img className="hotel-card-image" src={this.props.item.image} alt="hotelImage.png" />
        {!this.state.showChart ? [
          <div className="hotel-card-price animated fadeIn">
            <span>${this.props.item.price}</span>
          </div>,
          <div className="hotel-card-content animated fadeIn">
            <ul className="hotel-starts-list">
              {this.renderHotelStarts(this.props.item.rate)}
            </ul>
            <h5>{this.props.item.name}</h5>
            <p>{this.props.item.description}</p>
            <Button title="Book now" small onClick={f => f} />
            <Button title="Price history" small secondary onClick={() => this.setState({ showChart: true })} />
          </div>,
        ] : this.renderHotelChartPrice(this.props.item.price_history)}
      </div>
    )
  }
}

export default HotelCard;
