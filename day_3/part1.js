class MyNumber {
   value;
   line;
   col_from;
   col_to;
}

class MySymbol {
   is_gear;
   col;
   line;
}

let fs = require("fs");

const content = fs.readFileSync("input.txt", "utf-8")

const lines = content.split("\n");

function isNumber(s) {
   return !isNaN(Number(s));
}

function isSymbolAdjacent(my_num, symbols) {
   if (my_num.col_from > 0 && symbols[my_num.line].find((val) => val.col == my_num.col_from-1))
      return true;
   if (symbols[my_num.line].find((val) => val.col == my_num.col_to))
      return true;
   const prev_line = my_num.line > 0 ? symbols[my_num.line-1] : undefined;
   if (prev_line && prev_line.find((sym) => sym.col >= Math.max(0, my_num.col_from-1) && sym.col <= my_num.col_to))
      return true;
   const next_line = my_num.line < symbols.length-1 ? symbols[my_num.line+1] : undefined;
   if (next_line && next_line.find((sym) => sym.col >= Math.max(0, my_num.col_from-1) && sym.col <= my_num.col_to))
      return true;
   return false;
}

let curLine = 0;
let numbers = [];
let symbols = [];
for (const line of lines) {
   let inNumber = false;
   let curNumber = "";
   let curCol = 0;
   let startCol;
   numbers.push(new Array());
   symbols.push(new Array());
   for (const ch of line) {
      if (isNumber(ch)) {
         if (!inNumber) {
            inNumber = true;
            startCol = curCol;
         }
         curNumber += ch;
      } else {
         if (ch != '.') {
            let newSym = new MySymbol();
            newSym.is_gear = ch == '*';
            newSym.col = curCol;
            newSym.line = curLine;
            symbols[curLine].push(newSym);
         }
         if (inNumber) {
            let newNumber = new MyNumber();
            newNumber.line = curLine;
            newNumber.value = parseInt(curNumber);
            newNumber.col_to = curCol;
            newNumber.col_from = startCol;
            inNumber = false;
            numbers[curLine].push(newNumber);
            curNumber = "";
         }
      }
      ++curCol;
   }
   if (inNumber) {
      let newNumber = new MyNumber();
      newNumber.line = curLine;
      newNumber.value = parseInt(curNumber);
      newNumber.col_to = curCol;
      newNumber.col_from = startCol;
      numbers[curLine].push(newNumber);
   }
   ++curLine;
}

for (const line of numbers) {
   for (const num of line) {
      console.log(num);
      console.log("Adjacent? ", isSymbolAdjacent(num, symbols));
      console.log();
   }
}

const sum = numbers.reduce((acc, cur) => acc + cur.filter((num) => isSymbolAdjacent(num, symbols)).reduce((acc, num) => acc+num.value, 0), 0);
console.log("Sum = ", sum);
