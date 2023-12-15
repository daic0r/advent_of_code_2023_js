const fs = require("fs");

function hash(s: string): number {
   let cur_val = 0;
   for (let i = 0; i < s.length; ++i) {
      cur_val += s.charCodeAt(i);
      cur_val *= 17;
      cur_val %= 256;
   }
   return cur_val;
}

const steps: string[] = fs.readFileSync("input.txt", "utf-8").replace(/\n/g, "").split(",");

const sum = steps.reduce((acc,x) => acc + hash(x), 0);

console.log("Sum =", sum);
