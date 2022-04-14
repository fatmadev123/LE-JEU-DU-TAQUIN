let platterContent = "<table>\n<tr class=row1>\n<td class='pawn cellEmpty' id=cell0 onclick=clickCell(this)>0</td>\n";
let arrayPic = [];

function Play() {
    menuItem = document.getElementById('newGame').disabled = true;

    let imgPathStart = "<img src = 'chameleon0_";
    let imgPathEnd = ".jpg'"
    for (let i = 0; i < 15; i++) {
        arrayPic[i] = imgPathStart + (i + 1) + imgPathEnd;
    }
    randomize(arrayPic);
    
    buildPlatter(arrayPic);
}
function Assist(){
    document.getElementById('picModel').innerHTML = "<img src= 'chameleon0.png'>"
}
function buildPlatter(arrayPic) {
    for (let i = 0; i < arrayPic.length; i++) {
        switch (i) {
            case 0:
                platterContent += (`<td class=pawn id=cell${i+1} onclick="clickCell(this)">${arrayPic[i]}</td>\n`);
                break;
            case 3:
            case 7:
            case 11:
                platterContent += (`<tr class=row${i}>\n<td class=pawn id=cell${i+1} onclick="clickCell(this)">${arrayPic[i]}</td>\n`);
                break;
            case 2:
            case 6:
            case 10:
            case 14:
                platterContent += (`<td class=pawn id=cell${i+1} onclick="clickCell(this)">${arrayPic[i]}</td>\n</tr>\n`);
                break;
            default:
                platterContent += (`<td class=pawn id=cell${i+1} onclick="clickCell(this)">${arrayPic[i]}</td>\n`);
                break;
        }
    }
    platterContent += "</table>";
    document.getElementById('platter').innerHTML = platterContent;
    document.getElementById('assist').disabled = false;
}

function clickCell(clicked) {
    var idClicked = "";
    var idEmpty = "";
    var test = document.getElementsByClassName('cellEmpty');
    idEmpty = test[0].id;
    idEmpty = idEmpty.match(/(\d+)/);
    idClicked = clicked.id;
    idClicked = idClicked.match(/(\d+)/);
    actualOrder = "";
    if (test[0].parentElement.classList == clicked.parentElement.classList) {
        if (parseInt(idEmpty[0]) - parseInt(idClicked[0]) === -1) {
            //move à gauche
            clicked.firstElementChild.classList.toggle('glissementRight');
            setTimeout(function () {
                swapValue(test, clicked)
            }, 100);
        } else {
            if (parseInt(idEmpty[0]) - parseInt(idClicked[0]) === 1) {
                //move à droite
                clicked.firstElementChild.classList.toggle('glissementLeft');
                setTimeout(function () {
                    swapValue(test, clicked)
                }, 100);
            }
        }
    } else {
        if ((parseInt(idEmpty[0], 10) == (parseInt(idClicked[0], 10) - 4))) {
            //move en bas
            clicked.firstElementChild.classList.toggle('glissementTop');
            setTimeout(function () {
                swapValue(test, clicked)
            }, 100);
        } else {
            if ((parseInt(idEmpty[0], 10) == (parseInt(idClicked[0], 10) + 4))) {
                clicked.firstElementChild.classList.toggle('glissementBot');
                setTimeout(function () {
                    swapValue(test, clicked)
                }, 100);
                //move à haut
            }
        }
    }
}

function swapValue(test, clicked) {
    clicked.firstElementChild.className = "";
    txtEmpty = test[0].innerHTML;
    txtClicked = clicked.innerHTML;
    clicked.innerHTML = txtEmpty;
    test[0].innerHTML = txtClicked;
    test[0].classList.toggle('cellEmpty');
    clicked.classList.toggle('cellEmpty');
    compareSchema()
}

function compareSchema() {
    var mySchema = document.getElementsByTagName('td');
    var myStr = [];
    for (let i = 0; i < mySchema.length; i++) {
        myStr[i] = mySchema[i].innerHTML;
        //myStr[i] = mySchema[i].innerText;
    }
    myStr = myStr.join("");
    switch (arrayType) {
        case "Numbers":
            myStr2 = arrayNum.join("");
            checkResult(myStr2, myStr);
            break;
        case "Letters":
            var myStr2 = arrayLet.join("");
            checkResult(myStr2, myStr);
            break;
    }
}

function checkResult(myStr2, myStr) {
    if ((myStr == "0" + myStr2) || (myStr == myStr2 + "0")) {
        document.getElementById("linkModal").click();
        console.log('GAGNE');
        document.location.reload(true);
    }
}

function randomize(tab) {
    var i, j, tmp;
    for (i = tab.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tmp = tab[i];
        tab[i] = tab[j];
        tab[j] = tmp;
    }
    return tab;
}
