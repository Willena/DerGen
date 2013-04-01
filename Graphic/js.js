var paper = Raphael('raphael_view', 400, 400);
var xOrigin = 10;
var yOrigin = 400;
var xMin;
var xMax;
var yMin;
var yMax;
var xScale;
var yScale;
var points;
var tabColor = ['#336699','#CC0033','#FFFF00','#00FF00','#FF00FF','#FF6000'];

var nbGenerations;
var nbColor = 5;

function start_graph()
{
    xMin = 0;
    xMax = 1;
    yMin = 0;
    yMax = 10;
    xScale = 28;
    yScale = 28;
    points = [];

    nbGenerations = 1;

    draw_grid();

    for(var i = 0; i < nbColor; i++)
    {
        points[i] = [];
        points[i][0] = [];
        points[i][0][0] = 0;
        points[i][0][1] = 0;

        draw_line(i, tabColor[i]);
    }

    console.log(points);
}

function more_graph()
{
    paper.clear();

    xMax++;
    xScale--;

    nbGenerations++;

    draw_grid();

    var rowTab = nbGenerations - 1;

    for(var i = 0; i < nbColor; i++)
    {
        var nbRandom = Math.floor(Math.random() * 10);

        points[i][rowTab] = [];
        points[i][rowTab][0] = nbGenerations;
        points[i][rowTab][1] = nbRandom;

        draw_line(i, tabColor[i]);
    }

    console.log(rowTab);
    console.log(nbRandom);
    console.log(points);
}

function value2pixels(point)
{
    if (point[0] < xMin) { point[0] = xMin; }
    if (point[1] < yMin) { point[1] = yMin; }
    if (point[0] > xMax) { point[0] = xMax; }
    if (point[1] > yMax) { point[1] = yMax; }

    return [ xOrigin + point[0] * xScale, yOrigin - point[1] * yScale ];
}

function draw_grid()
{
    var pt1, pt2, axis;

    for (var y = yMin; y <= yMax; ++y)
    {
        pt1 = value2pixels([xMin, y]);
        pt2 = value2pixels([xMax, y]);
        axis = paper.path("M " + pt1[0] + "," + pt1[1] + " L " + pt2[0] + "," + pt2[1]);
        axis.attr({'stroke' : '#888', 'stroke-width' : '0.4px'});
    }

    for (var x = xMin; x <= xMax; ++x)
    {
        pt1 = value2pixels([x, yMin]);
        pt2 = value2pixels([x, yMax]);
        axis = paper.path("M " + pt1[0] + "," + pt1[1] + " L " + pt2[0] + "," + pt2[1]);
        axis.attr({'stroke' : '#888', 'stroke-width' : '0.4px'});
    }

    pt1 = value2pixels([xMin, 0]);
    pt2 = value2pixels([xMax, 0]);
    axis = paper.path("M " + pt1[0] + "," + pt1[1] + " L " + pt2[0] + "," + pt2[1]);
    axis.attr({'stroke' : '#333', 'stroke-width' : '0.6px'});

    pt1 = value2pixels([0, yMin]);
    pt2 = value2pixels([0, yMax]);
    axis = paper.path("M " + pt1[0] + "," + pt1[1] + " L " + pt2[0] + "," + pt2[1]);
    axis.attr({'stroke' : '#333333', 'stroke-width' : '0.6px'});
}

function draw_line(tab, color)
{
    var pixelPoint = value2pixels(points[tab][0]);
    var pathStr = "M " + pixelPoint[0] + "," + pixelPoint[1];

    for (var i = 1; i < points[tab].length; ++i)
    {
        pixelPoint = value2pixels(points[tab][i]);
        pathStr += " L " + pixelPoint[0] + "," + pixelPoint[1];
    }

    var line = paper.path(pathStr);
    line.attr({'stroke' : color, 'stroke-width' : '2'});

    draw_points(tab, color);
}

function draw_points(tab, color)
{
    var pixelPoint;

    for (var i = 0; i < points[tab].length; ++i)
    {
        pixelPoint = value2pixels(points[tab][i]);

        var affText = 'X : ' + points[tab][i][0] + ' Y : ' + points[tab][i][1];

        var circle = paper.circle(pixelPoint[0], pixelPoint[1], 2);
        var text = paper.text(pixelPoint[0], pixelPoint[1] - 16, affText);

        circle.attr({fill: "#333", stroke: color, "stroke-width": 4});
        text.attr({'fill' : '#400', 'font-size' : '9px'});
        text.hide();

        set_handler(circle, text);
    }
}

function set_handler(circle, text)
{
    circle.hover(function()
        {
            circle.animate({'r' : 4}, 120);
            text.show();
        },
        function()
        {
            circle.animate({'r' : 2}, 120);
            text.hide();
        }
    );
}