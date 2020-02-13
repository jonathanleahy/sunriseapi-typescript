"use strict";
exports.__esModule = true;
var Point = /** @class */ (function () {
    function Point(lat, long) {
        this.lat = lat;
        this.long = long;
    }
    Point.prototype.display = function () {
        return "here" + this.lat.toString() + " " + this.long.toString();
    };
    return Point;
}());
exports.Point = Point;
