const fs = require('fs');

function derive_sequence(seq) {
   let ret = [];
   for (let i = 0; i < seq.length-1; ++i) {
      const subarr = seq.slice(i, i+2);
      ret.push(subarr[1] - subarr[0]);
   }
   return ret;
}

function extrapolate(seq_arr) {
   for (let i = seq_arr.length-2; i >= 0; --i) {
      seq_arr[i].push(seq_arr[i+1][seq_arr[i+1].length-1] + seq_arr[i][seq_arr[i].length-1]);
   }
}

const lines = fs.readFileSync("input.txt", "utf-8").split("\n").filter(l => l.length);

const sequences = lines.map(l => l.split(" ")).map(arr => [ arr.map(e => parseInt(e)) ]);

for (const seq_arr of sequences) {
   while (seq_arr[seq_arr.length-1].reduce((acc, x) => acc + (x !== 0 ? 1 : 0), 0) !== 0) {
      seq_arr.push(derive_sequence(seq_arr[seq_arr.length-1]));
   }
   extrapolate(seq_arr);
}

const sum = sequences.map(seq_arr => seq_arr[0].pop()).reduce((acc,x) => acc+x, 0);

console.log("Sum = ", sum);
