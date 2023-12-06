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

const time = time_line.split(" ").slice(1).filter((s) => s.trim().length > 0).join("");
const distance = dist_line.split(" ").slice(1).filter((s) => s.trim().length > 0).join("");

console.log(time);
console.log(distance);

const product = getNumWaysToWin(time,distance);
console.log("Product = ", product);
