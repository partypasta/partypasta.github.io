document.getElementById('master_seed').value = localStorage.getItem("master_seed")
document.getElementById('scramble_seed').value = localStorage.getItem("scramble_seed")
document.getElementById('length').value = parseInt(localStorage.getItem("length"))
if (!parseInt(localStorage.getItem("length"))) {
  document.getElementById('master_seed').value = "Change me!"
  document.getElementById('scramble_seed').value = "Change me, too!"
  document.getElementById('length').value = 2
}

function generatepw() {
  let input = document.getElementById('input').value;
  let master_seed = document.getElementById('master_seed').value;
  let scramble_seed = document.getElementById('scramble_seed').value;
  let length = parseInt(document.getElementById('length').value);

  window.localStorage.setItem("master_seed", master_seed);
  window.localStorage.setItem("scramble_seed", scramble_seed);
  window.localStorage.setItem("length", length);

  let pw = generatePassword(input, master_seed, scramble_seed, length);

  document.getElementById("password").value = pw;
  document.getElementById("password").style.color = "#ffffff";
}

function generatepw2() {
  let input = document.getElementById('input').value;
  let master_seed = document.getElementById('master_seed').value;
  let scramble_seed = document.getElementById('scramble_seed').value;
  let length = parseInt(document.getElementById('length').value);

  window.localStorage.setItem("master_seed", master_seed);
  window.localStorage.setItem("scramble_seed", scramble_seed);
  window.localStorage.setItem("length", length);

  let pw = generatePassword2(input, master_seed, scramble_seed, length);

  document.getElementById("password").value = pw;
  document.getElementById("password").style.color = "#5EAFFF";
}

function get_color(b, dir) {
  let colors = {
    generate_down: "#333333",
    generate_up: "#5A5A5A",
    generate2_down: "#1d5084",
    generate2_up: "#2c77c1"
  }
  return colors[b + "_" + dir]
}

function button_down(b) {
  document.getElementById(b).style.backgroundColor = get_color(b, "down");
}

function button_up(b) {
  document.getElementById(b).style.backgroundColor = get_color(b, "up");
}
