/**
 * Created by boblander on 6/11/2014.
 */
var jade = require('jade');
var xdate = require('xdate');

/*
 month-index
 day-index
 year
 month-short-name
 month-name
 prev-month-short-name
 prev-month-name
 next-month-short-name
 next-month-name
 day-name
 day-short-name
 };
 */
var json = { "days": [] };
json["requested-month"] = 6;
json["requested-year"] = 2014;

var date = new xdate(json["requested-year"], json["requested-month"], 1);

json["days-in-month"] = xdate.getDaysInMonth(json["requested-year"], json["requested-month"]);
json["first-day-in-month"] = date.getDay();
json["days-in-calendar"] = ((json["first-day-in-month"] == 0) && (json["days-in-month"] == 28)) ? 28 : 35;

json["month-index"] = date.getMonth();
json["month-name"] = date.toString("MMMM");
json["month-short-name"] = date.toString("MMM");

var nextMonth = date.clone().addMonths(1);
json["next-month-index"] = nextMonth.getMonth();
json["next-month-name"] = nextMonth.toString("MMMM");
json["next-month-short-name"] = nextMonth.toString("MMM");

var prevMonth = date.clone().addMonths(-1);
json["prev-month-index"] = prevMonth.getMonth();
json["prev-month-name"] = prevMonth.toString("MMMM");
json["prev-month-short-name"] = prevMonth.toString("MMM");

var i;

for (i = 0; i < json["first-day-in-month"]; i++) {
    date.addDays(-1);
}

var calendarIndex = 0;

for (i = 0; i < json["first-day-in-month"]; i++) {
    json.days.push({
        "day-index": date.getDay(),
        "day-name": date.toString("dddd"),
        "day-number": date.getDate(),
        "day-short-name": date.toString("ddd"),
        "index": calendarIndex,
        "next-month": false,
        "prev-month": true
    });

    calendarIndex++;
    date.addDays(1);
}

for (i = 0; i < json["days-in-month"]; i++) {
    json.days.push({
        "day-index": date.getDay(),
        "day-name": date.toString("dddd"),
        "day-number": date.getDate(),
        "day-short-name": date.toString("ddd"),
        "index": calendarIndex,
        "next-month": false,
        "prev-month": false
    });

    calendarIndex++;
    date.addDays(1);
}

for (i = date.getDay(); i < 7; i++) {
    json.days.push({
        "day-index": date.getDay(),
        "day-name": date.toString("dddd"),
        "day-number": date.getDate(),
        "day-short-name": date.toString("ddd"),
        "index": calendarIndex,
        "next-month": true,
        "prev-month": false
    });

    calendarIndex++;
    date.addDays(1);
}

console.log(json);
var html = jade.renderFile('time-machine.jade', {"json": json, "pretty": true}, {});
console.log(html);

//var html = jade.renderFile('time-machine 1.jade', {"json": json, "pretty": true}, {});
//console.log(html);

//var html = jade.renderFile('time-machine 2.jade', {"json": json, "pretty": true}, {});
//console.log(html);