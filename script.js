let money = 1000;
let day = 1;
let level = 1;

let moneyelement = document.getElementById('money');
let winlosemessage = document.getElementById("winlosemessage");
let levelelement = document.getElementById('level');
let dayelement = document.getElementById('day');
let betsperclick = +document.getElementById('betsperclick').value;
let betammount = +document.getElementById('input').value;

let percentageofwinselement = document.getElementById('percentageofwins')
let percentageoflosseselement = document.getElementById('percentageoflosses')

let historyelement = document.getElementById('historypopup');
let statisticselement = document.getElementById('statisticspopup');
let betsperclickelement = document.getElementById('betsperclickpopup');
let historygrid = document.getElementById('historygrid');

function bet() {
    betammount = +document.getElementById('input').value;
    for (let i = 0; i < betsperclick; i++){
        if (money != 0 && betammount <= money) {
            const guess = Math.random();
            let wonlost;
            if (guess < 0.51) {
                winlosemessage.style.display = 'block';
                winlosemessage.style.color = 'chartreuse';
                winlosemessage.innerHTML = 'You win.';
                money+=betammount;
                wonlost = 'won';
            }
            else {
                winlosemessage.style.display = 'block';
                winlosemessage.style.color = 'red';
                winlosemessage.innerHTML = 'You lose.';
                money-=betammount;
                if (money == 0) {
                    moneyelement.innerHTML = 'You Lost.';
                    winlosemessage.innerHTML = 'You can\'t play anymore.';
                }
                wonlost = 'lost';
            }
            if (money != 0){
                moneyelement.innerHTML = `Money: ${money}`;
            }
            let newh1 = document.createElement('h1');
            newh1.innerHTML = day;
            newh1.classList.add('created-element')
            historygrid.appendChild(newh1);
            let newh2 = document.createElement('h1');
            newh2.innerHTML = betammount;
            newh2.classList.add('created-element')
            historygrid.appendChild(newh2);
            let newh3 = document.createElement('h1');
            newh3.innerHTML = money;
            newh3.classList.add('created-element')
            historygrid.appendChild(newh3);
            let newh4 = document.createElement('h1');
            newh4.innerHTML = wonlost;
            newh4.classList.add('created-element')
            newh4.classList.add('winsandlosses')
            historygrid.appendChild(newh4);
            day+=1;
            dayelement.innerHTML = `Day: ${day}`;
        }
        else {
            if (money != 0){
                winlosemessage.style.display = 'block';
                winlosemessage.style.color = 'red';
                winlosemessage.innerHTML = 'You don\'t have enough money.';
            }
        }
    }
}

function reset() {
    //resets variables
    money = 1000;
    day = 1;
    //resets display
    moneyelement.innerHTML = `Money: ${money}`;
    winlosemessage.style.display = 'none';
    dayelement.innerHTML = `Day: ${day}`;
    //resets history
    const elements = document.getElementsByClassName('created-element');
    const len = elements.length;
    for (let i = 0; i < len; i++) {
        elements[0].remove();
    }
    //resets statistics

}

function history() {
    historyelement.style.display = 'block';
}

function statistics() {
    statisticselement.style.display = 'block';
    const elements = document.getElementsByClassName('winsandlosses');
    const len = elements.length;
    let sum = 0;
    for (let i = 0; i < len; i++) {
        if (elements[i].innerHTML == 'won'){
            sum+=1;
        }
    }
    const percentageofwins = sum / len * 10000;
    percentageofwinselement.innerHTML = Math.floor(percentageofwins) / 100;
    percentageoflosseselement.innerHTML = 100 - Math.floor(percentageofwins) / 100
}

function betperclick() {
    betsperclickelement.style.display = 'block';
}

function closepopups() {
    historyelement.style.display = 'none';
    statisticselement.style.display = 'none';
    betsperclickelement.style.display = 'none';
    betsperclick = +document.getElementById('betsperclick').value;
}

document.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    switch (event.key) {
        case "Escape":
            closepopups();
            break;

        case "b":
            bet();
            break;
     
        default:
            return; // No key event
    }
  
    event.preventDefault(); // Avoid key handling twice
  });