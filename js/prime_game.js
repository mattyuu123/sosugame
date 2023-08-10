const NOT_PRIMES = [1, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32, 33, 34, 35, 36, 38, 39, 40, 42, 44, 45, 46, 48, 49, 50, 51, 52, 54, 55, 56, 57, 58, 60, 62, 63, 64, 65, 66, 68, 69, 70, 72, 74, 75, 76, 77, 78, 80, 81, 82, 84, 85, 86, 87, 88, 90, 91, 92, 93, 94, 95, 96, 98, 99];
const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
const ROW_SIZE = 8;
const COL_SIZE = 7;
const INITIAL_PRIME_NUMS = 5;
var remaining;
var score;

window.onload = function(){
    score = 0;
    $('#score').text(String(score));

    init_game_board();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

function init_game_board(){

    $('#game_table').empty();

    remaining = INITIAL_PRIME_NUMS;
    $('#remaining').text(String(remaining));

    temp_not_primes = shuffle(NOT_PRIMES);
    temp_primes = shuffle(PRIMES);

    var prime_places = [];
    for (let i = 0; i < COL_SIZE*ROW_SIZE; i++) {
        prime_places.push(i);
    }
    prime_places = shuffle(prime_places);
    prime_places = prime_places.slice(0, INITIAL_PRIME_NUMS);

    var sosu_counter = 0;

    for(var i=0;i<ROW_SIZE;i++){
        var append_tr = "<tr>";
        for(var j=0;j<COL_SIZE;j++){
            no = COL_SIZE*i + j;
            var val_num = String(temp_not_primes[no]);
            if(prime_places.includes(no)){ 
                val_num = temp_primes[sosu_counter];
                sosu_counter += 1;
            }
            var str_num = String(val_num);
            append_tr += "<td id='td_" + String(no) + "' no=" + String(no) + " val_num=" + val_num + ">" + str_num +   "</td>";
        }
        append_tr += "</tr>";
        $('#game_table').append(append_tr);
    }

    for(var i=0;i<ROW_SIZE;i++){
        for(var j=0;j<COL_SIZE;j++){
            no = COL_SIZE*i + j;
            document.getElementById("td_" + String(no)).addEventListener('touchstart', click_td, false);
        }
    }
}

function click_td(){
    if(PRIMES.includes(Number($(this).attr("val_num")))){
        $(this).addClass("yellow");
        score += 1;
        remaining -= 1;
        $('#remaining').text(String(remaining));
        $('#score').text(String(score));
        if(remaining == 0){
            init_game_board();
        }
    
    } else {
        $(this).addClass("red");
    }
    this.removeEventListener('click', click_td, false);
}