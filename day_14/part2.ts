const fs = require("fs");

function tilt(map: string[]) {
   for (const [idx,line] of map.entries()) {
      if (idx == 0)
         continue;
      for (let col = 0; col < line.length; ++col) {
         if (map[idx][col] != 'O')
            continue;
         let dst_line = idx - 1;
         while (dst_line >= 0 && map[dst_line][col] == '.')
            --dst_line;
         ++dst_line;
         map[idx] = map[idx].substring(0, col) + '.' + map[idx].substring(col+1);
         map[dst_line] = map[dst_line].substring(0, col) + 'O' + map[dst_line].substring(col+1);
      }
   }
}

function transpose(map: string[]): string[] {
   let ret: string[] = [];
   for (let i = 0; i < map.length; ++i)
      ret.push("");
   for (const [idx,line] of map.entries()) {
      for (let i = 0; i < line.length; ++i) {
         ret[i] = map[idx][i] + ret[i]; 
      }
   }
   return ret;
}

function print_map(map: string[]) {
   for (const line of map) {
      console.log(line);
   }
   console.log("-----------------------------------");
}

function cycle(map: string[]): string[] {
   let tmp = [...map];
   for (let i = 0; i < 4; ++i) {
      tilt(tmp);
      tmp = transpose(tmp);
   }
   return tmp;
}

function hash(s: string): number {
  return s.split("").reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
}

const map: string[] = fs.readFileSync("input.txt", "utf-8").split("\n").filter(l => l.length);

let tmp = [...map];

let cycle_start = 0;
let cycle_len = 0;
let cycle_cnt = 0;
let hashes: Object = {};
while (true) {
   tmp = cycle(tmp);
   ++cycle_cnt;

   const the_hash = hash(tmp.join('\n'));
   if (hashes.hasOwnProperty(the_hash)) {
      cycle_start = hashes[the_hash];
      cycle_len = cycle_cnt - cycle_start;
      break; 
   }
   hashes[the_hash] = cycle_cnt;
}

console.log(`Detected cycle starting at ${cycle_start} of length ${cycle_len}`);

const effective_cnt = (1_000_000_000 - cycle_start) % cycle_len;

console.log(`Must run ${cycle_start + effective_cnt} times to get the result`);

tmp = [...map];
for (let i = 0; i < cycle_start + effective_cnt; ++i) {
   tmp = cycle(tmp);
}

const total_load = tmp
   .map(l => (l.match(/O/g) || []).length)
   .reduce((acc,x,idx) => acc + (x * (map.length - idx)), 0);
console.log("Total load = ", total_load);
