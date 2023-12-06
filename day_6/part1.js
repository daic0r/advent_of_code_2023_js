function getNumWaysToWin(time_avail, record_dist) {
   // (time_avail - dur_press) * dur_press
   const time_avail_2 = time_avail / 2.0;
   const root = Math.sqrt(time_avail_2 * time_avail_2 - record_dist);
   const zero_point_1 = Math.floor(time_avail_2 - root);

   // Symmetrical, so point at the end is the same distance from the end
   // as the first point is from the beginning
   return (time_avail - zero_point_1 - 1) - zero_point_1;
}

// --------------------------------------
const fs = require('fs');

const contents = fs.readFileSync("input.txt", "utf8");

const lines = contents.split("\n");
const time_line = lines[0];
const dist_line = lines[1];

console.log(time_line);
console.log(dist_line);

const times = time_line.split(" ").filter((s) => s.trim().length > 0).map((s) => parseInt(s.trim())).filter((n) => !isNaN(n));
const distances = dist_line.split(" ").filter((s) => s.trim().length > 0).map((s) => parseInt(s.trim())).filter((n) => !isNaN(n));

for (const [time,dist] of times.map((time, idx) => [time, distances[idx]])) {
   console.log(getNumWaysToWin(time,dist));
}

const product = times.map((time, idx) => [time, distances[idx]]).reduce((acc,x) => acc*getNumWaysToWin(x[0],x[1]), 1);
console.log("Product = ", product);
