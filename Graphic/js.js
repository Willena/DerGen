var paper = Raphael('raphael_view', 400, 400);
var xOrigin = 10;
var yOrigin = 350;
var xMin = 0;
var xMax = 1;
var yMin = 0;
var yMax = 10;
var xScale = 200;
var yScale = 28;
var points = [];
var tabColor = ['#336699', '#CC0033', '#FFFF00', '#00FF00', '#FF00FF', '#FF6000'];

var nbGen = 0;
var nbColor = 5;

var firstTime = 1;

var tabBoule = [
    [1, 5, 4, 2, 5, 3, 5, 1, 4, 1, 5],
    [2, 4, 1, 3, 5, 1, 4, 2, 3, 5, 4, 2, 5, 1, 2, 4, 3, 1, 5, 2, 5]
];

window.onload = function () {
    draw_grid();
}

function start_graph() {
    paper.clear();

    draw_grid();

    for (var i = 0; i < nbColor; i++) {
        points[i] = [];
    }

    var nbColor1 = 0, nbColor2 = 0, nbColor3 = 0, nbColor4 = 0, nbColor5 = 0;

    for (var z = 1; z < tabBoule[nbGen].length; z++) {
        if (tabBoule[nbGen][z] == 1) {
            nbColor1++;
        }
        else if (tabBoule[nbGen][z] == 2) {
            nbColor2++;
        }
        else if (tabBoule[nbGen][z] == 3) {
            nbColor3++;
        }
        else if (tabBoule[nbGen][z] == 4) {
            nbColor4++;
        }
        else if (tabBoule[nbGen][z] == 5) {
            nbColor5++;
        }
    }

    console.log(nbColor1);

    var tabNbColorByGen = [nbColor1, nbColor2, nbColor3, nbColor4, nbColor5];

    var totalNbBall = nbColor1 + nbColor2 + nbColor3 + nbColor4 + nbColor5;

    var rowTab = points[0].length;

    for (var i = 0; i < nbColor; i++) {
        var percentageNbColor = tabNbColorByGen[i];

        points[i] = [];
        points[i][rowTab] = [];
        points[i][rowTab][0] = 0;
        points[i][rowTab][1] = percentageNbColor;

        draw_line(i, tabColor[i]);
    }

    console.log(points);
}

function more_graph() {
    paper.clear();

    if (firstTime == 1) {
        firstTime = 0;
    }
    else {
        xMax++;
    }

    nbGen++;

    xScale = 200 / xMax;

    draw_grid();

    var nbColor1 = 0, nbColor2 = 0, nbColor3 = 0, nbColor4 = 0, nbColor5 = 0;

    for (var z = 1; z < tabBoule[nbGen].length; z++) {
        if (tabBoule[nbGen][z] == 1) {
            nbColor1++;
        }
        else if (tabBoule[nbGen][z] == 2) {
            nbColor2++;
        }
        else if (tabBoule[nbGen][z] == 3) {
            nbColor3++;
        }
        else if (tabBoule[nbGen][z] == 4) {
            nbColor4++;
        }
        else if (tabBoule[nbGen][z] == 5) {
            nbColor5++;
        }

        console.log(z);
    }

    console.log(nbColor1);

    var tabNbColorByGen = [nbColor1, nbColor2, nbColor3, nbColor4, nbColor5];

    var totalNbBall = nbColor1 + nbColor2 + nbColor3 + nbColor4 + nbColor5;

    var rowTab = points[0].length;

    for (var i = 0; i < nbColor; i++) {
        var percentageNbColor = tabNbColorByGen[i];

        points[i][rowTab] = [];
        points[i][rowTab][0] = xMax;
        points[i][rowTab][1] = percentageNbColor;

        draw_line(i, tabColor[i]);
    }

    console.log(xMax + 'xMax');
    console.log(rowTab);
    console.log(percentageNbColor);
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

    for (var x = xMin; x <= xMax; ++x) {
        pt1 = value2pixels([x, yMin]);
        pt2 = value2pixels([x, yMax]);
        axis = paper.path("M " + pt1[0] + "," + pt1[1] + " L " + pt2[0] + "," + pt2[1]);
        axis.attr({'stroke': '#888', 'stroke-width': '0.4px'});
    }

    pt1 = value2pixels([xMin, 0]);
    pt2 = value2pixels([xMax, 0]);
    axis = paper.path("M " + pt1[0] + "," + pt1[1] + " L " + pt2[0] + "," + pt2[1]);
    axis.attr({'stroke': '#333', 'stroke-width': '0.6px'});

    pt1 = value2pixels([0, yMin]);
    pt2 = value2pixels([0, yMax]);
    axis = paper.path("M " + pt1[0] + "," + pt1[1] + " L " + pt2[0] + "," + pt2[1]);
    axis.attr({'stroke': '#333333', 'stroke-width': '0.6px'});
}

function draw_line(tab, color) {
    var pixelPoint = value2pixels(points[tab][0]);
    var pathStr = "M " + pixelPoint[0] + "," + pixelPoint[1];

    for (var i = 1; i < points[tab].length; ++i) {
        pixelPoint = value2pixels(points[tab][i]);
        pathStr += " L " + pixelPoint[0] + "," + pixelPoint[1];
    }

    var line = paper.path(pathStr);
    line.attr({'stroke': color, 'stroke-width': '1.5px'});

    draw_points(tab, color);
}

function draw_points(tab, color) {
    var pixelPoint;

    for (var i = 0; i < points[tab].length; ++i) {
        pixelPoint = value2pixels(points[tab][i]);

        var text = paper.text(pixelPoint[0], pixelPoint[1], points[tab][i][1]);
        var circle = paper.circle(pixelPoint[0], pixelPoint[1], 2);

        circle.attr({'fill': '#e22', 'stroke': color, 'stroke-width': '3px'});
        text.attr({'fill': '#400', 'font-size': '9px'});

        set_handler(circle, text, pixelPoint[0], pixelPoint[1]);
    }
}

function set_handler(circle, text, x, y) {
    circle.hover(function () {
            circle.animate({'r': 4}, 120);
            text.animate({'x': 100, 'y': 100}, 500);
        },
        function () {
            circle.animate({'r': 2}, 120);
            text.animate({'x': x, 'y': y}, 120);
        }
    );
}