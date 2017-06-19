'use strict';

exports.id = 'setup';

exports.up = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  this.db.roles.insert([{
    name: 'superadmin',
    permissions: ['*:*']
  }, {
    name: 'administrator',
    permissions: ['course:*', 'instructor:*', 'staff:*', 'administrator:*', 'class:*', 'profile:*', 'schedule:*']
  }, {
    name: 'staff',
    permissions: ['student:*', 'course:read', 'instructor:read', 'class:*', 'profile:read,update', 'schedule:*']
  }, {
    name: 'instructor',
    permissions: ['course:read,update', 'profile:read,update']
  }, {
    name: 'student',
    permissions: ['preference:*', 'profile:read,update']
  }]);
  
  var superAdminRole = this.roles.find(r => r.name == 'superadmin');
  var administratorRole = this.roles.find(r => r.name == 'administrator');
  var staffRole = this.roles.find(r => r.name == 'staff');
  var instructorRole = this.roles.find(r => r.name == 'instructor');
  var studentRole = this.roles.find(r => r.name == 'student');

  this.db.tenants.insert([{
    name: '__admin__'
  }, {
    name: '__test__'
  }]);

  var adminTenant = this.db.tenants.find({ name: '__admin__' });
  var testTenant = this.db.tenants.find({ name: '__test__' });

  this.db.users.insert([{
    login: 'superadmin',
    password: '',
    passwordSalt: '',
    givenName: '',
    familyName: '',
    tenant: adminTenant.id,
    roles: [superAdminRole.id]
  }, {
    login: 'administrator',
    password: '',
    passwordSalt: '',
    givenName: '',
    familyName: '',
    tenant: testTenant.id,
    roles: [administratorRole.id]
  }, {
    login: 'staff',
    password: '',
    passwordSalt: '',
    givenName: '',
    familyName: '',
    tenant: testTenant.id,
    roles: [staffRole.id]
  }, {
    login: 'instructor',
    password: '',
    passwordSalt: '',
    givenName: '',
    familyName: '',
    tenant: testTenant.id,
    roles: [instructorRole.id]
  }, {
    login: 'student',
    password: '',
    passwordSalt: '',
    givenName: '',
    familyName: '',
    tenant: testTenant.id,
    roles: [studentRole.id]
  }]);

  this.db.users.createIndex({ login: 1 });

  done();
};

exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  this.db.users.drop();
  this.db.tenants.drop();
  this.db.roles.drop();
  done();
};