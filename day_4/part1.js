class Ticket {
   constructor(
      nr,
      winning,
      have
   ) {
      this.nr = nr;
      this.winning = winning;
      this.have = have;
   }

   // Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
   static fromStr(s) {
      const re = /Card\s+(\d+):\s+(.*)\|(.*)/;
      const matches = re.exec(s);

      const winning = matches[2].trim().split(/\s+/).map((s) => parseInt(s));
      const have = matches[3].trim().split(/\s+/).map((s) => parseInt(s));

      return new Ticket(parseInt(matches[1].trim()), winning, have);

   }
}

const fs = require("fs");
const { argv0 } = require("process");

const content = fs.readFileSync("input.txt", "utf-8");
const lines = content.split('\n');
const tickets = lines.filter((l) => l.length > 0).map((l) => Ticket.fromStr(l));
const points = tickets.map((t) => t.have.filter((num) => t.winning.includes(num)).length)
   .map((num_winners) => num_winners > 0 ? Math.pow(2, num_winners-1) : 0)
   .reduce((acc,x) => acc+x, 0);
console.log("Points = ", points);
