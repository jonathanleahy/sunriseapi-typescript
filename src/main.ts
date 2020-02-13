/**
 *
 * Jon Leahy
 * 12th Feb 2020
 *
 * The following queue class wasn't created by myself:
 * parallel queue
 * https://github.com/emilbayes/parallel-queue#readme
 *
 */

import { Point } from './Point';
import { ParallelQueue } from './parallelqueue';
import * as moment from 'moment';
import * as R from 'ramda';

const { unfold, curry } = R;

const APoint = curry((limit, n) => n > limit ? false : [new Point(), n + 1]);

// create an array of Points
const Points: Point[] = unfold(APoint(100), 1);

process.stdout.write(`${Points.length} tasks to complete...`);

// setup a parallel queue for Asynchronous api fetching
const queue: ParallelQueue = new ParallelQueue(4);

// iterate through all the points and add the Point.fetchFromAPI to the queue
Points.map((aresult, index) => {
  queue.push(async (done) => {
    await aresult.fetchFromAPI();
    process.stdout.write(".");
    done();
  });
});

// when the parallel queue has completed
queue.complete(function() {
  console.log(`All ${Points.length} tasks completed`);

  // find the point with the min. sunRise
  const result: number = Math.min.apply(Math, Points.map(function(o) {
    return o.sunRise;
  }));

  // find the point which matches the min sunRise above
  const PointWithEarliestSunrise: Point = Points.find(function(aresult) {
    return (aresult.sunRise == result && !aresult.error);
  });

  // give the user some feedback
  if (PointWithEarliestSunrise) {
    console.log(`Locations: ${PointWithEarliestSunrise.lat}, ${PointWithEarliestSunrise.long}`);
    console.log(`DayLength: ${PointWithEarliestSunrise.day_length}`);
    console.log(`Day: ${moment(PointWithEarliestSunrise.sunrise).format('LLLL')} - ${moment(PointWithEarliestSunrise.sunset).format('LLLL')}`);
  }
  // any errors?
  // find the point which matches the min sunRise above
  const errors: Point[] = Points.filter(function(aresult) {
    return aresult.error == true;
  });
  (errors.length == 0 ? null : console.log(`There were ${errors.length} errors`));

});



