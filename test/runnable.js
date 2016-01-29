'use strict';

const test = require('tape');

const few = require('few');
const Runnable = require('mocha').Runnable;

function promised () {
    return new Promise(resolve => process.nextTick(resolve));
}

test('should synchronous function pass', (t) => {
  t.plan(1);
  let test = new Runnable('synchronous', () => {});
  test.run(() => t.pass());
});

test('should function that throw error fail', (t) => {
  t.plan(1);
  let test = new Runnable('synchronous', () => { throw new Error('You had one job'); });
  test.run(err => t.equal(err.message, 'You had one job'));
});

test('should promise function pass', (t) => {
  t.plan(1);
  let test = new Runnable('promise', () => Promise.resolve());
  test.run(() => t.pass());
});

test('should prommise function that throw error fail', (t) => {
  t.plan(1);
  let test = new Runnable('promise', () => new Promise((resolve, reject) => process.nextTick(() => reject(new Error('You promised me')))));
  test.run(err => t.equal(err.message, 'You promised me'));
});

test('should callback function pass', (t) => {
  t.plan(1);
  let test = new Runnable('callback', done => process.nextTick(done));
  test.run(() => t.pass());
});

test('should callback function that throw error fail', (t) => {
  t.plan(1);
  let test = new Runnable('callback', done => process.nextTick(() => done(new Error('You never called me back'))));
  test.run(err => t.equal(err.message, 'You never called me back'));
});

test('should generator function pass', (t) => {
  t.plan(1);
  let test = new Runnable('generator', function* () { yield promised(); });
  test.run(() => t.pass());
});
