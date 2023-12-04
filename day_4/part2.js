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
let map = new Map();
for (const ticket of tickets) {
   map.set(ticket.nr, Number(1));
}
for (const [ticket_nr, count] of map.entries()) {
   const ticket = tickets.find((t) => t.nr === ticket_nr);
   const winners = ticket.have.filter((num) => ticket.winning.includes(num)).length;
   for (let i = 1; i <= winners; ++i) {
      const cnt = map.get(ticket_nr+i);
      map.set(ticket_nr+i, cnt+count);
   }
}

let sum = 0;
for (const cnt of map.values()) {
   sum += cnt;
}
console.log("Tickets = ", sum);
