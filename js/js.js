var tabBoule = [], tabListBallByColors = [] , paper = Raphael("holder", "1000", "400"), nbGen = 0, nbColor = 0, value = [], gen = [], position = [];

var xOrigin , yOrigin , xMin , xMax , yMin , yMax , xScale , yScale , points = [], firstTime = 1;


Raphael.fn.ball = function (x, y, r, hue) {
    hue = hue / 5 || 0;
    return this.set(//code permettant la création d'une balle
        //this.ellipse(x, y + r - r / 5, r, r / 2).attr({fill:"rhsb(" + hue + ", 1, .25)-hsb(" + hue + ", 1, .25)", stroke:"none", opacity:0}),
        this.ellipse(x, y, r, r).attr({fill: "r(.6,.4)hsb(" + hue + ", 1, 1)-hsb(" + hue + ", .5, .4)", stroke: "none"})//,
        //this.ellipse(x, y, r - r / 5, r - r / 20).attr({stroke:"none", fill:"r(.5,.1)#ccc-#ccc", opacity:0})
    );
};
Raphael.fn.createBocal = function (x, sizeX, sizeY) {
    var position_x = 40 + x;
    return this.set(
        this.path("M" + position_x + " 50l0 " + sizeY + "l" + sizeX + " 0l0 -" + sizeY + "").attr({'stroke-width': 5, stroke: '#333333'})
    );
};
Raphael.fn.empty = function () {
    paper.remove();
    paper = Raphael("holder", "1000", "400");

}

function remplirTabBoule(nbBoule, nbCouleur) {
    if (nbCouleur <= 5 && nbCouleur >= 0) {
        if (nbBoule <= 100 && nbBoule >= 0) {
            document.getElementById('start').style.display = 'none';
            document.getElementById('toolbar').style.display = '';
            paper.empty();
            paper.createBocal(0, 290, 290);
            paper.createBocal(340, 290, 290);
            nbColor = nbCouleur;

            calculateballs(nbBoule);
            position[0] = 400 + value[3], position[1] = 320 - value[4], position[2] = 0, position[3] = 0;

            var nbMaxBoules = Math.ceil(nbBoule / nbColor), gen = [];
            for (var i = 0; i < nbBoule; i++) {
                var numColor = Math.floor(Math.random() * nbColor);

                if (tabListBallByColors[numColor] != nbMaxBoules) {
                    tabListBallByColors[numColor] = (tabListBallByColors[numColor]) + 1;
                    gen.push(numColor)
                }
                else {
                    i--;
                }
            }

            tabBoule.push(gen);
            drawBallsInBocal(1, nbGen);
            console.log(tabListBallByColors);
            console.log(tabBoule);
            start_graph();
        }
    }


}

function nextGen() {
    document.getElementById('drawBall').classList.remove('disabled');
    document.getElementById('drawAllBalls').classList.remove('disabled');
    document.getElementById('drawAllBalls').style.display = "";
    document.getElementById('newGen').style.display = "none";
    document.getElementById("drawBall").style.display = "";

    paper.empty();

    paper.createBocal(0, 290, 290);
    paper.createBocal(340, 290, 290);

    nbGen++;
    position[0] = 400 + value[3], position[1] = 320 - value[4], position[2] = 0, position[3] = 0;
    document.getElementById('gennumberst').innerHTML = nbGen;
    document.getElementById('gennumbersd').innerHTML = nbGen + 1;

    drawBallsInBocal(1, nbGen);

    more_graph();
}

function drawAllBalls() {
    document.getElementById('newGen').classList.remove('disabled');
    document.getElementById('drawBall').classList.add('disabled');
    document.getElementById('drawAllBalls').style.display = "none";
    document.getElementById('newGen').style.display = "";


    paper.empty();

    paper.createBocal(0, 290, 290);
    paper.createBocal(340, 290, 290);

    pointsShow()

    gen = [];

    for (var i = 0; i < value[0]; i++) {
        var numColor = tabBoule[nbGen][Math.floor(Math.random() * value[0])];
        gen.push(numColor);
    }

    tabBoule.push(gen);

    var nbGen2 = nbGen + 1;

    drawBallsInBocal(1, nbGen);
    drawBallsInBocal(2, nbGen2);
    gen = [];
}

function drawBallsInBocal(nbGraph, nbGen) {
    nbGenBalls = nbGen;

    if (nbGraph != 1) {
        positionX = 400 + value[3];
    }
    else {
        positionX = 60 + value[3];
    }

    positionY = 320 - value[4], ballsAdd = 0;

    for (var iY = 0; iY < value[0]; iY++) {
        for (var iX = 0; iX < value[1]; iX++) {
            if (ballsAdd == value[0]) {
                iX = value[1];
                iY = value[0];
            }
            else {
                paper.ball(positionX, positionY, value[2], tabBoule[nbGenBalls][ballsAdd]);
                positionX = positionX + (2 * value[2]);
                ballsAdd++;

            }
        }

        if (nbGraph != 1) {
            positionX = 400 + value[3]
        }
        else {
            positionX = 60 + value[3];
        }

        positionY = positionY - (2 * value[2]);
    }
}

function reInit() {
    document.getElementById("drawAllBalls").style.display = ""
    document.getElementById("newGen").style.display = "none"
    document.getElementById('toolbar').style.display = 'none';
    document.getElementById('start').style.display = '';
    document.getElementById("textGraph").innerHTML = " ";

    paper.empty();
    paper.createBocal(0, 290, 290);
    paper.createBocal(340, 290, 290);

    tabListBallByColors = [0, 0, 0, 0, 0];
    tabBoule = [];

    nbGen = 0;

    document.getElementById('gennumberst').innerHTML = 0;
    document.getElementById('gennumbersd').innerHTML = 1;
    xOrigin = 700, yOrigin = 340, xMin = 0, xMax = 1, yMin = 0, yMax = 10, xScale = 250, yScale = 29, points = [], firstTime = 1;
    draw_grid();
}

function calculateballs(nbBoule) {

    bouleParLigne = Math.ceil(Math.sqrt(nbBoule));
    rayonBoule = Math.floor(300 / bouleParLigne / 2.05);
    if (nbBoule < 50) {
        sizeXToAdd = Math.floor((290 / bouleParLigne / 1.9) - 20);
        sizeYToAdd = rayonBoule / 2;
    }
    else {
        sizeXToAdd = -2.5;
        sizeYToAdd = 0;
    }
    value = [nbBoule, bouleParLigne, rayonBoule, sizeXToAdd, sizeYToAdd];
}

window.onload = function () {
    //creation du cadre
    reInit();
}

function start_graph() {
    draw_grid();

    for (var i = 0; i < nbColor; i++) {
        points[i] = [];
    }

    var nbColor0 = 0, nbColor1 = 0, nbColor2 = 0, nbColor3 = 0, nbColor4 = 0;
    for (var z = 0; z < tabBoule[nbGen].length; z++) {
        if (tabBoule[nbGen][z] == 0) {
            nbColor0++;
        }

        if (tabBoule[nbGen][z] == 1) {
            nbColor1++;
        }

        if (tabBoule[nbGen][z] == 2) {
            nbColor2++;
        }

        if (tabBoule[nbGen][z] == 3) {
            nbColor3++;
        }

        if (tabBoule[nbGen][z] == 4) {
            nbColor4++;
        }
    }

    console.log(nbColor0);
    console.log(nbColor1);
    console.log(nbColor2);
    console.log(nbColor3);
    console.log(nbColor4);

    var tabNbColorByGen = [nbColor0, nbColor1, nbColor2, nbColor3, nbColor4];

    var totalNbBall = nbColor0 + nbColor1 + nbColor2 + nbColor3 + nbColor4;

    var rowTab = points[0].length;

    for (var i = 0; i < nbColor; i++) {
        var percentageNbColor = tabNbColorByGen[i] / totalNbBall * 10;

        points[i] = [];
        points[i][rowTab] = [];
        points[i][rowTab][0] = 0;
        points[i][rowTab][1] = percentageNbColor;

        draw_line(i);
    }

    console.log(points);
}

function pointsShow() {
    draw_grid();

    for (var i = 0; i < nbColor; i++) {
        draw_line(i);
    }
}

function more_graph() {
    console.log(tabBoule);

    if (firstTime == 1) {
        firstTime = 0;
    }
    else {
        xMax++;
    }

    xScale = 250 / xMax;

    draw_grid();

    var nbColor0 = 0, nbColor1 = 0, nbColor2 = 0, nbColor3 = 0, nbColor4 = 0;

    for (var z = 1; z < tabBoule[nbGen].length; z++) {
        if (tabBoule[nbGen][z] == 0) {
            nbColor0++;
        }

        if (tabBoule[nbGen][z] == 1) {
            nbColor1++;
        }

        if (tabBoule[nbGen][z] == 2) {
            nbColor2++;
        }

        if (tabBoule[nbGen][z] == 3) {
            nbColor3++;
        }

        if (tabBoule[nbGen][z] == 4) {
            nbColor4++;
        }
    }

    console.log(nbColor0);

    var tabNbColorByGen = [nbColor0, nbColor1, nbColor2, nbColor3, nbColor4];

    var totalNbBall = nbColor0 + nbColor1 + nbColor2 + nbColor3 + nbColor4;

    var rowTab = points[0].length;

    for (var i = 0; i < nbColor; i++) {
        var percentageNbColor = tabNbColorByGen[i] / totalNbBall * 10;

        points[i][rowTab] = [];
        points[i][rowTab][0] = xMax;
        points[i][rowTab][1] = percentageNbColor;

        draw_line(i);
    }

    console.log(xMax + ' xMax');
    console.log(rowTab + ' rowTab');
    console.log(percentageNbColor + ' percentageNbColor4');
    console.log(tabNbColorByGen);
    console.log(points);
}

function value2pixels(point) {
    if (point[0] < xMin) {
        point[0] = xMin;
    }
    if (point[1] < yMin) {
        point[1] = yMin;
    }
    if (point[0] > xMax) {
        point[0] = xMax;
    }
    if (point[1] > yMax) {
        point[1] = yMax;
    }

    return [ xOrigin + point[0] * xScale, yOrigin - point[1] * yScale ];
}

function draw_grid() {
    var pt1, pt2, axis;

    for (var y = yMin; y <= yMax; ++y) {
        pt1 = value2pixels([xMin, y]);
        pt2 = value2pixels([xMax, y]);
        axis = paper.path("M " + pt1[0] + "," + pt1[1] + " L " + pt2[0] + "," + pt2[1]);
        axis.attr({'stroke': '#888', 'stroke-width': '0.4px'});
    }

    /*   for (var x = xMin; x <= xMax; ++x) {
     pt1 = value2pixels([x, yMin]);
     pt2 = value2pixels([x, yMax]);
     axis = paper.path("M " + pt1[0] + "," + pt1[1] + " L " + pt2[0] + "," + pt2[1]);
     axis.attr({'stroke': '#888', 'stroke-width': '0.4px'});
     }*/

    pt1 = value2pixels([xMin, 0]);
    pt2 = value2pixels([xMax, 0]);
    axis = paper.path("M " + pt1[0] + "," + pt1[1] + " L " + pt2[0] + "," + pt2[1]);
    axis.attr({'stroke': '#333333', 'stroke-width': '0.6px'});

    pt1 = value2pixels([0, yMin]);
    pt2 = value2pixels([0, yMax]);
    axis = paper.path("M " + pt1[0] + "," + pt1[1] + " L " + pt2[0] + "," + pt2[1]);
    axis.attr({'stroke': '#333333', 'stroke-width': '0.6px'});


}

function draw_line(tab) {
    var pixelPoint = value2pixels(points[tab][0]);
    var pathStr = "M " + pixelPoint[0] + "," + pixelPoint[1];

    for (var i = 1; i < points[tab].length; ++i) {
        pixelPoint = value2pixels(points[tab][i]);
        pathStr += " L " + pixelPoint[0] + "," + pixelPoint[1];
    }

    var hsbcolor = tab / 5;

    var line = paper.path(pathStr);
    line.attr({'stroke': "hsb(" + hsbcolor + ", 1, 1)", 'stroke-width': '1.5px'});

    draw_points(tab, hsbcolor);
}

function draw_points(tab, hsbcolor) {
    var pixelPoint;

    for (var i = 0; i < points[tab].length; ++i) {
        pixelPoint = value2pixels(points[tab][i]);

        var affText = 'Génération : ' + points[tab][i][0] + ', ' + Math.floor(points[tab][i][1] * 10) + '%';

        // var circle = paper.circle(pixelPoint[0], pixelPoint[1], 1);
        //circle.attr({fill: "#333", stroke: "hsb(" + hsbcolor + ", 1, 1)", "stroke-width": 4});
        //  set_handler(circle, affText);
    }
}

function set_handler(circle, affText) {
    circle.hover(function () {
            circle.animate({'r': 4}, 120);

            document.getElementById('textGraph').innerHTML = affText;
        },
        function () {
            circle.animate({'r': 1}, 120);
        }
    );
}

function chooseBall() {
    var numColor = tabBoule[nbGen][Math.floor(Math.random() * value[0])];
    gen.push(numColor);
    drawBall();

}
function drawBall() {
    //position[0] = X, position[1] = Y, position[2] = balladd, position[3] = ligne

    if (gen.length < value[0]) {
        if (position[3] < value[1]) {
            paper.ball(position[0], position[1], value[2], gen[position[2]]);
            position[0] = position[0] + (2 * value[2]);
            position[2]++;
            position[3]++;
        }
        else {
            position[0] = 400 + value[3];
            position[1] = position[1] - (2 * value[2]);
            position[3] = 1;
            position[2]++;
            paper.ball(position[0], position[1], value[2], gen[position[2]]);
            position[0] = position[0] + (2 * value[2]);
        }
    }
    else {
        paper.ball(position[0], position[1], value[2], gen[position[2]]);
        tabBoule.push(gen);
        gen = [];
        document.getElementById("drawBall").style.display = "none";
        document.getElementById("drawAllBalls").style.display = "none";
        document.getElementById("newGen").style.display = "";
        console.log("DISARITION ....")

    }


}
