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

const map: string[] = fs.readFileSync("input2.txt", "utf-8").split("\n").filter(l => l.length);

let tmp = [...map];

tmp = cycle(tmp);
print_map(tmp);
tmp = cycle(tmp);
print_map(tmp);
tmp = cycle(tmp);
print_map(tmp);


/*
const total_load = map
   .map(l => (l.match(/O/g) || []).length)
   .reduce((acc,x,idx) => acc + (x * (map.length - idx)), 0);
console.log("Total load = ", total_load);
*/
