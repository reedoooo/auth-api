'use strict';

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.test') });

const { Team, Teammate, Cards, Clothes } = require('../../../src/models');

describe('Models', () => {
  it('Team should have hasMany relationship with Teammate', () => {
    expect(Team.associations.Teammate).toBeDefined();
    expect(Team.associations.Teammate.foreignKey).toBe('teamId');
    expect(Team.associations.Teammate.sourceKey).toBe('id');
  });

  it('Teammate should belong to Team', () => {
    expect(Teammate.associations.Team).toBeDefined();
    expect(Teammate.associations.Team.foreignKey).toBe('teamId');
    expect(Teammate.associations.Team.targetKey).toBe('id');
  });

  it('Cards and Clothes models should be part of the exports', () => {
    expect(Cards).toBeDefined();
    expect(Clothes).toBeDefined();
  });
});

