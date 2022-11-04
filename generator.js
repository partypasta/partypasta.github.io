Array.prototype.searchString = function(strn) {
  let occurences = 0;
  for (let i of this) {
    occurences += strn.split(i).length - 1;
  }
  return occurences;
}

function num_specials(str) {
  return real_specials.searchString(str);
}

function num_numbers(str) {
  return numbers.searchString(str);
}


function trade_places(list, source, dest) {
  let nl = list
  let temp = [list[source], list[dest]];
  nl[source] = temp[1];
  nl[dest] = temp[0];
  return nl;
}

Array.prototype.trade_places = function(source, dest) {
  let temp = [this[source], this[dest]];
  this[source] = temp[1];
  this[dest] = temp[0];
}

function split_into_pieces(str) {
  l = [];
  for (let i = 0; i < str.length / 2; i++) {
    l.push(str.substring(i*2, (i + 1) * 2))
  }
  return l;
}

Array.prototype.shuffleFromSeed = function(seed) {
  //let new_special_characters = [...this];
  let swaps = split_into_pieces(seed);
  for (let i of swaps) {
    parts = i.split("");
    // perform a swap for each byte
    this.trade_places(parseInt(parts[0], 16) % this.length, parseInt(parts[1], 16) % this.length)
  }

  //this = new_special_characters;
}

function generatePassword(input, master_seed, scramble_seed, length) {
  let inputAndSalt = input + master_seed  + length.toString();
  let isalt = CryptoJS.SHA256(inputAndSalt).toString();
  console.log(isalt);

  words = [];

  for (let i = 0; i < length; i++) {
    let temp = parseInt(isalt.substring(i*3, (i+1)*3), 16);
    temp = noun_list[temp];
    words.push(temp);
  }

  console.log(words)

  let isaltAndScramble = isalt + scramble_seed;
  let iscrm = CryptoJS.SHA256(isaltAndScramble).toString();

  let sparts = []
  for (i of iscrm.split("")) {
    let val = parseInt(i, 16) % 3;
    sparts.push(val);
  }

  let sparts_counter = 0;

  let rawpw = words.join("");

  let new_special_characters = [...special_characters];

  let swaps = split_into_pieces(iscrm);
  for (let i of swaps) {
    parts = i.split("");
    new_special_characters = trade_places(new_special_characters, parseInt(parts[0], 16), parseInt(parts[1], 16))
  }




  let pw = "";

  for (let i = 0; i < rawpw.length; i++) {
    let val = rawpw[i];
    switch(sparts[i]) {
      case 0:
        pw += val.toLowerCase();
        break;
      case 1:
        pw += val.toUpperCase();
        break;
      case 2:
        if (new_special_characters[sparts_counter] === undefined) {
          sparts_counter = 0;
        }
        pw += new_special_characters[sparts_counter];
        sparts_counter++;
        break;
    }
  }
  return pw;
}

function generatePassword2(input, master_seed, scramble_seed, length) {
  let inputAndSalt = input + master_seed  + length.toString();
  let isalt = CryptoJS.SHA256(inputAndSalt).toString();
  // hashed input and salt
  console.log(isalt);

  words = [];

  for (let i = 0; i < length; i++) {
    // get words from word list
    // for example, if hash is e3565e18672...,
    // [e35] = word #3637, [65e] = word #1630, [186] = word #390
    let temp = parseInt(isalt.substring(i*3, (i+1)*3), 16);
    temp = noun_list[temp];
    words.push(temp);
  }

  console.log(words)

  // hash it AGAIN!!!
  let isaltAndScramble = isalt + scramble_seed;
  let iscrm = CryptoJS.SHA256(isaltAndScramble).toString();

  // what type of character will this be?
  let sparts = []
  for (i of iscrm.split("")) {
    let val = parseInt(i, 16) % 3;
    sparts.push(val);
  }

  let sparts_counter = 0;

  // joined words
  let rawpw = words.join("");

  // shuffle special characters
  let new_special_characters = [...special_characters];

  // swap based on hash
  new_special_characters.shuffleFromSeed(iscrm);


  let pw = "";

  for (let i = 0; i < rawpw.length; i++) {
    let val = rawpw[i];
    switch(sparts[i]) {
      case 0:
        pw += val.toLowerCase();
        break;
      case 1:
        pw += val.toUpperCase();
        break;
      case 2:
      /*
        if (new_special_characters[sparts_counter] === undefined) {
          sparts_counter = 0;
        }
        pw += new_special_characters[sparts_counter];
        sparts_counter++;*/
        pw += leet_convert[val.toLowerCase()];
        break;
    }
  }

  // if there aren't enough numbers/special characters
  if (num_specials(pw) < 1) {
    new_rsc = [...real_specials]
    new_rsc.shuffleFromSeed(iscrm);
    pw += new_rsc[0];
  }
  if (num_numbers(pw) < 1) {
    new_rsc = [...numbers]
    new_rsc.shuffleFromSeed(iscrm);
    pw += new_rsc[0];
  }
  return pw;
}

console.log(generatePassword2('Among Us', 'master', 'egg', 2))
console.log(generatePassword2('Among Us', 'master', 'egg', 2))
