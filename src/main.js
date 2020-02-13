"use strict";
exports.__esModule = true;
var Point_1 = require("./Point");
var parallelqueue_1 = require("./parallelqueue");
var R = require('ramda');
var unfold = R.unfold, curry = R.curry;
var point = curry(function (limit, n) { return n > limit ? false : [new Point_1.Point(n, n), n + 1]; });
var result = unfold(point(5), 1);
var queue = new parallelqueue_1.ParallelQueue(5);
queue.complete(function () {
    setTimeout(function () {
        console.log("All tasks completed");
    }, 500);
});
q.push(function (done) {
    console.log("task 0 processing...");
    setTimeout(function () {
        console.log("task 0 done!");
        done();
    }, 5000);
});
q.push(function (done) {
    console.log("task 1 processing...");
    setTimeout(function () {
        console.log("task 1 done!");
    }, 500);
}, 500)
    .push(function (done) {
    console.log("task 2 processing...");
    setTimeout(function () { }, 500);
}, 3000)
    .push(function (done) {
    console.log("task 3 processing...");
    setTimeout(function () { }, 500);
}, 2000);
console.log(result);
