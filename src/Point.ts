import * as moment from 'moment';

const axios = require('axios').default;

export class Point {

  public lat: number;
  public long: number;
  public sunrise: number;
  public sunset: number;
  public day_length: number;

  constructor() {
    this.lat = Math.floor((Math.random() * 180) + 1) - 90;
    this.long = Math.floor((Math.random() * 360) + 1) - 180;
  }

  get sunRise(): number {
    return parseInt(moment(this.sunrise).format("HHmmss"))
  }

  async fetchFromAPI() {
    const res = await axios.get(`https://api.sunrise-sunset.org/json?lat=${this.lat}&lng=${this.long}&formatted=0`);
    this.sunrise = res.data.results.sunrise;
    this.sunset = res.data.results.sunset;
    this.day_length = res.data.results.day_length;
  }

}
