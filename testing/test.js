var assert = require('assert');
const request = require('supertest');
const app = require ('../app');

describe('CLIENT GET', function() {
  it('GET our orders list', function(done) {
    request(app)
      .get('/client/?token=Pippo')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done(); });
      });
});

describe('CLIENT GET', function() {
  it('GET orders list without token', function(done) {
    request(app)
      .get('/client')
      .set('Accept', 'application/json')
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        done(); });
      });
});

describe('CLIENT GET', function() {
  it('GET orders list with number token', function(done) {
    request(app)
      .get('/client/?token=2')
      .set('Accept', 'application/json')
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        done(); });
      });
});

describe('CLIENT POST', function() {
  it('POST an order', function(done) {
    request(app)
      .post('/client/?token=Pippo')
      .set('Accept', 'application/json')
      .send({list : '1 pizza,1 birra', bill : 20})
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done(); });
      });
});

describe('CLIENT POST', function() {
  it('POST an order without body or with missing values', function(done) {
    request(app)
      .post('/client/?token=Pippo')
      .set('Accept', 'application/json')
      .send()
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        done(); });
      });
});

describe('CLIENT POST', function() {
  it('POST an order without token', function(done) {
    request(app)
      .post('/client/')
      .set('Accept', 'application/json')
      .send({list : '1 pizza,1 birra', bill : 20})
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        done(); });
      });
});

describe('ADMIN GET', function() {
  it('GET orders list ', function(done) {
    request(app)
      .get('/admin/?token=admin')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done(); });
      });
});

describe('ADMIN GET', function() {
  it('GET orders list by clients', function(done) {
    request(app)
      .get('/admin/?token=admin&client=Pippo')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done(); });
      });
});

describe('ADMIN GET', function() {
  it('GET orders list without token', function(done) {
    request(app)
      .get('/admin/')
      .set('Accept', 'application/json')
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        done(); });
      });
});

describe('ADMIN GET', function() {
  it('GET orders list by clients with invalid or unexistent client', function(done) {
    request(app)
      .get('/admin/?token=admin&client=ciao')
      .set('Accept', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        done(); });
      });
});

describe('ADMIN GET', function() {
  it('GET total of restaurant', function(done) {
    request(app)
      .get('/admin/total/?token=admin')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done(); });
      });
});

describe('ADMIN GET', function() {
  it('GET total of restaurant with invalid token', function(done) {
    request(app)
      .get('/admin/total/')
      .set('Accept', 'application/json')
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        done(); });
      });
});

describe('ADMIN GET', function() {
  it('GET orders by status', function(done) {
    request(app)
      .get('/admin/new?token=admin')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done(); });
      });
});

describe('ADMIN GET', function() {
  it('GET orders by status with invalid token', function(done) {
    request(app)
      .get('/admin/new')
      .set('Accept', 'application/json')
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        done(); });
      });
});

describe('ADMIN GET', function() {
  it('GET orders by status with invalid status', function(done) {
    request(app)
      .get('/admin/ciao233?token=admin')
      .set('Accept', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        done(); });
      });
});

describe('ADMIN DELETE', function() {
  it('DELETE an order', function(done) {
    request(app)
      .delete('/admin/2?token=admin')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done(); });
      });
});

describe('ADMIN DELETE', function() {
  it('DELETE an order with invalid id', function(done) {
    request(app)
      .delete('/admin/?token=admin')
      .set('Accept', 'application/json')
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done(); });
      });
});

describe('ADMIN DELETE', function() {
  it('DELETE an with invalid token', function(done) {
    request(app)
      .delete('/admin/2')
      .set('Accept', 'application/json')
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        done(); });
      });
});

describe('PUT DELETE', function() {
  it('PUT an order status', function(done) {
    request(app)
      .put('/admin/3?token=admin&status=closed')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done(); });
      });
});

describe('PUT DELETE', function() {
  it('PUT an order status without token', function(done) {
    request(app)
      .put('/admin/3status=closed')
      .set('Accept', 'application/json')
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        done(); });
      });
});

describe('PUT DELETE', function() {
  it('PUT an order status without status', function(done) {
    request(app)
      .put('/admin/3?token=admin')
      .set('Accept', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        done(); });
      });
});
