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

type Lense = { 
   label: string,
   focal_length: number | undefined
}

const steps: string[] = fs.readFileSync("input.txt", "utf-8").replace(/\n/g, "").split(",");

const rex = /([a-z]+)(-|((=)(\d+)))/;

const boxes: Array<Lense[]> = Array.from({ length: 256 }, (_, i) => []);

for (const step of steps) {
   const cap = rex.exec(step);
   const what = cap[2];
   const label = cap[1];
   const box_nr = hash(label);
   const box = boxes[box_nr];
   const index = box.findIndex(l => l.label === label);
   if (what.startsWith("-")) {
      console.log(`Remove ${label} from box ${box_nr}`);
      if (index > -1) {
         box.splice(index, 1); 
      }
   } else {
      const focal_length = parseInt(what.substring(1));
      if (index > -1) {
         console.log(`Update focal length of ${label} to ${focal_length} in box ${box_nr}`);
         box[index].focal_length = focal_length;
      } else {
         console.log(`Insert ${label} with length ${focal_length} into box ${box_nr}`);
         box.push({ label, focal_length });
      }
   }
}

const sum = boxes
   .map((box,box_nr) =>
        box.reduce((acc,lense,lense_idx) => acc + ((box_nr+1) * (lense_idx+1) * lense.focal_length), 0)
    )
   .reduce((acc,x) => acc + x);

console.log(`Sum = ${sum}`);
