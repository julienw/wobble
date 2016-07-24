import { developScores, developDistribution } from './develop';

const data = Object.freeze({
  scores: Object.freeze(developScores({
    1: 'eainorstul',
    2: 'dmg',
    3: 'bcp',
    4: 'fhv',
    8: 'jq',
    10: 'kwxyz'
  })),
  distribution: developDistribution(
    '15e9a8i6n6o6r6s6t6u5l3d3m2g2b2c2p2f2h2vjqkwxyz'
  )
});


export default data;
