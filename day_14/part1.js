const fs = require("fs");
function tilt(map) {
    for (const [idx, line] of map.entries()) {
        if (idx == 0)
            continue;
        for (let col = 0; col < line.length; ++col) {
            if (map[idx][col] != 'O')
                continue;
            let dst_line = idx - 1;
            while (dst_line >= 0 && map[dst_line][col] == '.')
                --dst_line;
            ++dst_line;
            map[idx] = map[idx].substring(0, col) + '.' + map[idx].substring(col + 1);
            map[dst_line] = map[dst_line].substring(0, col) + 'O' + map[dst_line].substring(col + 1);
        }
    }
}
const map = fs.readFileSync("input.txt", "utf-8").split("\n").filter(l => l.length);
tilt(map);
for (const line of map) {
    console.log(line);
}
const total_load = map
    .map(l => (l.match(/O/g) || []).length)
    .reduce((acc, x, idx) => acc + (x * (map.length - idx)), 0);
console.log("Total load = ", total_load);
