'use strict';

const { expect } = require('chai');
const path = require('path');
const { ImportError } = require('../../src/errors');
const helpers = require('../helpers');

describe(`method import()`, () => {
  const differ = helpers.createInstance();

  it(`should get an error when trying to import a schema from a nonexistent file`, function() {
    const folderPath = './invalidSchemas';
    const expectedPath = path.resolve(__dirname, folderPath); // absolute path
    let error;
    try {
      differ.import(folderPath);
    } catch (e) {
      error = e;
    }
    expect(error).to.be.an.instanceOf(ImportError);
    expect(error.path).to.equal(expectedPath);
    expect(error.message).to.equal(
      'File or folder is missing at the specified path'
    );
  });

  it('should import the schema from the folder', function() {
    const importedUsingObjectOptions = differ.import({
      path: '../objects',
      locals: {
        tables: { users: 'DifferSchema.users', roles: 'DifferSchema.roles' },
      },
    });
    expect(importedUsingObjectOptions).to.have.property('size', 2);
    expect(importedUsingObjectOptions.get('DifferSchema.roles')).to.not.equal(
      undefined
    );
  });

  it('should import the schema from the file', function() {
    const importedUsingStringOption = differ.import(
      '../objects/users.schema.json'
    );
    expect(importedUsingStringOption).to.have.property('size', 1);
  });

  it(`should replace placeholders with values from 'locals'`, function() {
    const imported = differ.import({
      path: '../objects/roles.schema.json',
      locals: {
        tables: { roles: 'DifferSchema.roles' },
        defaultPrimaryKey: '1099',
      },
    });
    expect(imported).to.have.property('size', 1);
    const importedObject = [...imported.values()][0];
    expect(importedObject.getFullName()).has.equal('DifferSchema.roles');
    expect(importedObject.properties.columns[0].default).has.equal('1099');
  });
});
