tabBoule = [], tabListBallByColors = [] , ra = Raphael("holder", "1000", "400"), nbGen = 0;

Raphael.fn.ball = function (x, y, r, hue) {
    hue = hue / 10 || 0;
    return this.set(//code permettant la création d'une balle
        this.ellipse(x, y + r - r / 5, r, r / 2).attr({fill:"rhsb(" + hue + ", 1, .25)-hsb(" + hue + ", 1, .25)", stroke:"none", opacity:0}),
        this.ellipse(x, y, r, r).attr({fill:"r(.5,.9)hsb(" + hue + ", 1, .75)-hsb(" + hue + ", .5, .25)", stroke:"none"}),
        this.ellipse(x, y, r - r / 5, r - r / 20).attr({stroke:"none", fill:"r(.5,.1)#ccc-#ccc", opacity:0})
    );
};
Raphael.fn.createBocal = function (x, sizeX, sizeY) {
    var position_x = 50 + x;
    return this.set(
        this.path("M" + position_x + " 50l0 " + sizeY + "l" + sizeX + " 0l0 -" + sizeY + "").attr({'stroke-width':10, stroke:'#B34'})
    );
};

function remplirTabBoule(nbBoule, nbCouleur) {
    var nbMaxBoules = Math.ceil(nbBoule / nbCouleur), gen = [];
    for (var i = 0; i < nbBoule; i++) {
        var numColor = Math.floor(Math.random() * nbCouleur);
        if (tabListBallByColors[numColor] != nbMaxBoules) {
            tabListBallByColors[numColor] = (tabListBallByColors[numColor]) + 1;
            gen.push(numColor)
        }
        else {
            i--;
        }
    }
    tabBoule.push(gen);
    console.log(tabBoule);
    console.log(tabListBallByColors);
    viewBalls();
}
function newGen() {
    var nbBoule = tabBoule[0].length, gen = [];
    console.log(nbBoule);
    for (var i = 0; i < nbBoule; i++) {
        var numColor = tabBoule[nbGen][Math.floor(Math.random() * nbBoule)];
        gen.push(numColor);
    }
    tabBoule.push(gen);
    console.log(tabBoule);
    nbGen++;
    document.getElementById('gennumberst').innerHTML = nbGen - 1;
    document.getElementById('gennumbersd').innerHTML = nbGen;
}
function reInit() {
    ra.clear();
    ra.createBocal(0, 300, 300);
    ra.createBocal(350, 300, 300);
    tabListBallByColors = [0, 0, 0, 0, 0];
    tabBoule = [];
    document.getElementById('gennumberst').innerHTML = 0;
    document.getElementById('gennumbersd').innerHTML = 1;
    nbGen = 0;
}
function viewBalls() {
    values = calculateballs();
    //values[0] -> nombre de boules
    //values[1] -> nombre de boules par lignes
    //values[2] -> rayon d'une boule
    console.log('nombre de boule:' + values[0]);
    console.log('nombre de boules par ligne:' + values[1]);
    console.log('rayo,:' + values[2]);

    positionX = 100, positionY = 300, ballsAdd = 0;
    for (var iY = 0; iY < values[0]; iY++) {
        for (var iX = 0; iX < values[1]; iX++) {
            if (ballsAdd == values[0]) {
                iX = values[1];
                iY = values[0];
            }
            else {
                ra.ball(positionX, positionY, values[2], tabBoule[nbGen][ballsAdd]);
                positionX = positionX + (2 * values[2]);
                ballsAdd++;
            }
        }
        positionX = 100;
        positionY = positionY - (2 * values[2]);
    }
}
function calculateballs() {

    nbBoule = tabBoule[0].length;
    bouleParLigne = Math.ceil(Math.sqrt(nbBoule));
    rayonBoule = Math.floor(300 / bouleParLigne / 2.5);

    value = [nbBoule, bouleParLigne, rayonBoule];
    return value;

}
window.onload = function () {
    //creation du cadre
    reInit();
}