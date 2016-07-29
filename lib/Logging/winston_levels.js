/* eslint-disable key-spacing, no-multi-spaces */

const levels = [

  { n: 'Error',   v: 'red'     },
  { n: 'Warn',    v: 'yellow'  },
  { n: 'Info',    v: 'green'   },
  { n: 'Verbose', v: 'blue'    },
  { n: 'Debug',   v: 'cyan'    },
  { n: 'Silly',   v: 'grey'    }

];

const colorsMap = {};
const levelsMap = {};
const levelsArray = [];

let struct = {};

function logArrayElements(element, index) {
  levelsArray.push(element.n);
  levelsMap[element.n.toLowerCase()] = index;
  colorsMap[element.n.toLowerCase()] = element.v;
}

levels.forEach(logArrayElements);
struct = { ary: levelsArray, levels: levelsMap, colors: colorsMap};

export const Levels = struct;
