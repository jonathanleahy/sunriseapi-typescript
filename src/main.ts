import { Point } from './Point';
import { ParallelQueue } from './parallelqueue';
import * as moment from 'moment';
import * as R from 'ramda'

const { unfold, curry } = R;

const point = curry((limit, n) => n > limit ? false : [new Point(), n + 1]);

const results: Point[] = unfold(point(12), 1);

let queue: ParallelQueue = new ParallelQueue(5);

queue.complete(function() {
  console.log('All tasks completed');
  console.log(results);

  // https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
  const result: number = Math.min.apply(Math, results.map(function(o) {
    return o.sunRise;
  }));

  const res: Point = results.find(function(aresult) {
    return aresult.sunRise == result;
  });

  console.log(`Locations: ${res.lat}, ${res.long}`);
  console.log(`DayLength: ${res.day_length}`)
  console.log(`Day: ${moment(res.sunrise).format("LLLL")} - ${moment(res.sunset).format("LLLL")}`)
});

results.map((aresult) => {
  queue.push(async (done) => {
    await aresult.fetchFromAPI();
    done();
  });
});


