import * as moment from 'moment';

const axios = require('axios').default;

export class Point {

  public lat: number;
  public long: number;
  public sunrise: number;
  public sunset: number;
  public day_length: number;
  public error: boolean;

  constructor() {
    this.lat = Math.floor((Math.random() * 180) + 1) - 90;
    this.long = Math.floor((Math.random() * 360) + 1) - 180;
    this.error = false
  }

  get sunRise(): number {
    return parseInt(moment(this.sunrise).format('HHmmss'));
  }

  async fetchFromAPI() {
    try {
      const res = await axios.get(`https://api.sunrise-sunset.org/json?lat=${this.lat}&lng=${this.long}&formatted=0`);
      this.sunrise = { ...res.data.results };
      this.sunset = { ...res.data.results };
      this.day_length = res.data.results.day_length;
      this.error = false
    } catch ($e) {
      this.error = true
    }
  }

}
