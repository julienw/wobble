import { developScores, developDistribution } from './develop';

const data = Object.freeze({
  scores: Object.freeze(developScores({
    1: 'EAINORSTUL',
    2: 'DMG',
    3: 'BCP',
    4: 'FHV',
    8: 'JQ',
    10: 'KWXYZ'
  })),
  distribution: developDistribution(
    '15E9A8I6N6O6R6S6T6U5L3D3M2G2B2C2P2F2H2VJQKWXYZ'
  )
});


export default data;
