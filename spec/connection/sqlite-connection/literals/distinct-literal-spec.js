/* eslint-disable no-magic-numbers */

'use strict';

/* global describe, it, expect, beforeAll */

const { Literals }    = require('mythix-orm');
const Connection      = require('../../../../lib/sql-connection-base');
const { DistinctLiteral, Literal } = Literals;

describe('DistinctLiteral', () => {
  let connection;
  let User;

  beforeAll(async () => {
    connection = new Connection({
      bindModels: false,
      models:     require('../../../support/models'),
    });

    let models = connection.getModels();

    User = models.User;
  });

  describe('toString', () => {
    it('can turn a fully qualified name into a projection field', () => {
      expect((new DistinctLiteral('User:id')).toString(connection)).toEqual('DISTINCT ON("users"."id")');
    });

    it('will throw an exception if no field is present', () => {
      expect(() => (new DistinctLiteral()).toString(connection)).toThrow(new TypeError('DistinctLiteral::fullyQualifiedNameToDefinition: Unable to find field for fully qualified name "undefined".'));
    });

    it('can turn a raw field into a projection field', () => {
      expect((new DistinctLiteral(User.fields.firstName)).toString(connection)).toEqual('DISTINCT ON("users"."firstName")');
    });

    it('can provide a SQL literal', () => {
      expect((new DistinctLiteral(new Literal('test'))).toString(connection)).toEqual('DISTINCT ON(test)');
    });
  });
});
