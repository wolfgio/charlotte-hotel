import React from 'react';

import './Home.scss';

import Nav from '../../common/Nav/Nav';
import Footer from '../../common/Footer/Footer';
import Button from '../../common/Button/Button';
import Calendar from '../../app/Calendar/Calendar'
import HotelList from '../../app/HotelList/HotelList';

class Home extends React.Component {
  state = {
    loading: false,
    dates: {},
    hotelsList: [],
  };

  loadHotels = async () => {
    if(!this.state.dates.firstDate || !this.state.dates.lastDate) {
      console.log('here');
    }

    await this.setState({ loading: true });
    return fetch('http://www.raphaelfabeni.com.br/rv/hotels.json')
      .then(resp => resp.json())
      .then((data) => {
        this.setState({ hotelsList: data.hotels, loading: false })
      })
      .catch(f => f);
  }

  render() {
    console.log(this.state);
    return [
      <div className="animated fadeIn page-container clearfix">
        <img
          className="hero-bg"
          src="http://www.raphaelfabeni.com.br/rv/test-resources/images/hero.jpg"
          alt="hero.jpg"
        />
        <Nav />
        <section className="home-container">
          <span className="welcome-text">WELCOME TO</span>
          <h1 className="main-header-text">CHARLOTTE</h1>
          <div className="calendar-wrapper">
            <h4>Select the dates to stay in charlotte</h4>
            <section>
              <div className="date-container">
                <div>
                  <h4>CHECK-IN</h4>
                  <span>
                    {this.state.dates.firstDate ?
                      this.state.dates.firstDate.moment :
                      'Choose a date'
                    }
                  </span>
                </div>
                <div>
                  <h4>CHECK-OUT</h4>
                  <span>
                    {this.state.dates.lastDate ?
                      this.state.dates.lastDate.moment :
                      'Choose a date'
                    }
                  </span>
                </div>
                <Button title="Search hotels" onClick={() => this.loadHotels()} />
              </div>
              <div>
                <Calendar onSelectDates={dates => this.setState({ dates })} />
              </div>
            </section>
          </div>
        </section>
        { this.state.dates.firstDate && this.state.dates.lastDate && this.state.hotelsList.length > 0 ?
            <HotelList dates={this.state.dates} data={this.state.hotelsList} /> : null } 
      </div>,
      <Footer />
    ]
  }
}

export default Home;
