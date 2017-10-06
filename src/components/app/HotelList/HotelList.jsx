import React from 'react';
import PropTypes from 'prop-types';
import Range from 'rc-slider/lib/Range';

import 'rc-slider/assets/index.css';
import './HotelList.scss';

import HotelCard from './Components/HotelCard/HotelCard';

class HotelList extends React.Component {
  static propTypes = {
    data: PropTypes.array,
  };

  state = {
    filters : {
      price: [0, 600],
      rate: 5,
    },
    stars: [
      { _id: 'start1', value: 1, checked: true },
      { _id: 'start2', value: 2, checked: true },
      { _id: 'start3', value: 3, checked: true },
      { _id: 'start4', value: 4, checked: true },
      { _id: 'start5', value: 5, checked: true },
    ],
  }

  handleStarFilterClick(starId) {
    const stars = this.state.stars;

    const starIndex = stars.findIndex(star => star._id === starId);
    if (starIndex !== -1) {
      stars.forEach((star) => {
        if(star.value <= stars[starIndex].value) {
          star.checked = true;
        } else {
          star.checked = false;
        }
      }); 
    }

    this.setState({ filters: {
      price: this.state.filters.price,
      rate: stars[starIndex].value,
    }, stars });
  }

  renderStars = () => this.state.stars.map(star => [
    <input
      key={star._id}
      id={star._id}
      className="start-filter-input"
      name={star._id}
      checked={star.checked}
      value={star.value}
      type="checkbox"
      onClick={e => this.handleStarFilterClick(e.target.id)}
    />,
    <label key={`${star._id}${Math.random()}`} htmlFor={star._id} />
  ]);

  render() {
    return (
      <div className="hotel-list-container animated fadeIn">
        <h3>Best choices between {this.props.dates.firstDate.moment} and {this.props.dates.lastDate.moment}</h3>
        <div className="hotel-list-filters">
          <h3>Filters</h3>
          <h5>Price Range</h5>
          <Range
            className="hotel-list-range"
            max={600}
            defaultValue={[0, 600]}
            onChange={price => this.setState({ filters: {
              price,
              rate: this.state.filters.rate,
            }})}
          />
          <section className="hotel-list-price">
            <span className="filters-min">${this.state.filters.price[0]}</span>
            <span className="filters-max">${this.state.filters.price[1]}</span>
          </section>
          <hr />
          <h5>Starts</h5>
          {this.renderStars()}
        </div>
        <div className="hotels-list-content">
          {this.props.data.filter(item => {
            if (item.price >= this.state.filters.price[0] && item.price <= this.state.filters.price[1]) {
              console.log(this.state.rate);
              if (item.rate <= this.state.filters.rate) {
                return item;
              }              
            }

            return null;
          }).map(item => (
            <HotelCard key={`${item.name}${Math.random()}`} item={item} />
          ))}
        </div>
      </div>
    )
  }
}

export default HotelList;
