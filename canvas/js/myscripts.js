let usershape = "freehand";
let usercolor = "black";
let usersize = 1;
let userfillcolor = "white";
let polygon;
let path;
let down = false;

let p1 = new Point(0,0);
let p2 = new Point(0,0);
let p3 = new Point(0,0);
let pointsarray = [];
let x = 0;

$(document).ready( function(){
    let canvas = document.getElementById("canvas1");
    let ctx = canvas.getContext("2d");
    let c = $('#canvas1');


    $(canvas).click(function(evt) {
        if (usershape === "polygon") {
            let p = new Point(0, 0);
            p.x = evt.clientX - c.offset().left;
            p.y = evt.clientY - c.offset().top;
            polygon.addPoint(p);
            polygon.strokecolor = usercolor;
            polygon.strokethickness = usersize;
            polygon.fillcolor = userfillcolor;
            polygon.draw(ctx);
            console.log(polygon.array);
        }
        if (usershape === "path")
        {
            let p = new Point(0,0);
            p.x = evt.clientX - c.offset().left;
            p.y = evt.clientY - c.offset().top;
            path.addPoint(p);
            path.strokecolor = usercolor;
            path.strokethickness = usersize;
            path.fillcolor = userfillcolor;
            path.draw(ctx);
            console.log(path.array);
        }

    });


    $(canvas).mousedown(function(evt){
        //console.log("Shape: " + usershape +" size: " + usersize + " color: " + usercolor + " fillcolor: " + userfillcolor);
        p1.x = evt.clientX - c.offset().left;
        p1.y = evt.clientY- c.offset().top;
        //console.log("clicked " + p1.x + " " + p1.y);
        if(usershape==="freehand")
        {
            down = true;
            path.clear();
                $(canvas).mousemove(function(evt){
                    if(down)
                    {
                        let p3 = new Point(0,0);
                        p3.x = evt.clientX - c.offset().left;
                        p3.y = evt.clientY- c.offset().top;
                        path.addPoint(p3);
                        path.strokecolor = usercolor;
                        path.strokethickness = usersize;
                        path.fillcolor = userfillcolor;
                        path.draw(ctx);
                        console.log(path.array);
                    }
                });
        }
        });

        $(canvas).mouseup(function(evt) {
            //console.log("Shape: " + usershape +" size: " + usersize + " color: " + usercolor + " fillcolor: " + userfillcolor);
            p2.x = evt.clientX - c.offset().left;
            p2.y = evt.clientY - c.offset().top;
            down = false;
            //console.log("clicked " + p2.x + " " + p2.y);
        if(usershape==="line")
        {
            let line = new Line(p1,p2,usersize,usercolor);
            line.draw(ctx);
        }
        if(usershape==="oval")
        {
            let x = (p1.x + p2.x) / 2;
            let y = (p1.y + p2.y) / 2;
            let center = new Point(x,y);
            let radiusx = Math.abs(center.x-p1.x);
            let radiusy = Math.abs(center.y-p1.y);
            let slope = (p1.y-p2.y)/(p1.x-p2.x);
            let oval = new Oval(center,radiusx,radiusy,slope,userfillcolor,usercolor,usersize);
            oval.draw(ctx);
        }
        if(usershape==="rectangle")
        {
            let topleft = p1;
            let width = p2.x-p1.x;
            let height = p2.y-p1.y;
            let rectangle = new Rectangle(p1,width,height,usercolor,usersize,userfillcolor);
            rectangle.draw(ctx);
           // console.log("width: " + width + " height: " + height);
        }

    });




    $("#linediv").click(function(evt) {
        let shape = document.getElementById("shapes");
        $(shape).text("Line");
        usershape = "line";
    });
    $("#ovaldiv").click(function(evt) {
        let shape = document.getElementById("shapes");
        $(shape).text("Oval");
        usershape = "oval";
    });
    $("#rectanglediv").click(function(evt) {
        let shape = document.getElementById("shapes");
        $(shape).text("Rectangle");
        usershape = "rectangle";
    });
    $("#polygondiv").click(function(evt) {
        let shape = document.getElementById("shapes");
        $(shape).text("Polygon");
        usershape = "polygon";
        pointsarray = [];
        polygon = new Polygon(pointsarray,usercolor,usersize,userfillcolor);
    });
    $("#pathdiv").click(function(evt) {
        let shape = document.getElementById("shapes");
        $(shape).text("Path");
        usershape = "path";
        pointsarray = [];
        path = new Path(pointsarray,usercolor,usersize);
    });
    $("#freehanddiv").click(function(evt) {
        let shape = document.getElementById("shapes");
        $(shape).text("Freehand");
        usershape = "freehand";
        pointsarray = [];
        path = new Path(pointsarray,usercolor,usersize);
    });
    //sizes
    $("#size1").click(function(evt) {
        let size = document.getElementById("size");
        $(size).text("1px");
        usersize = "1";
    });
    $("#size5").click(function(evt) {
        let size = document.getElementById("size");
        $(size).text("5px");
        usersize = "5";
    });
    $("#size10").click(function(evt) {
        let size = document.getElementById("size");
        $(size).text("10px");
        usersize = "10";
    });
    $("#size15").click(function(evt) {
        let size = document.getElementById("size");
        $(size).text("15px");
        usersize = "15";
    });
    $("#size25").click(function(evt) {
        let size = document.getElementById("size");
        $(size).text("25px");
        usersize = "25";
    });
    $("#size50").click(function(evt) {
        let size = document.getElementById("size");
        $(size).text("50px");
        usersize = "50";
    });
    $("#size100").click(function(evt) {
        let size = document.getElementById("size");
        $(size).text("100px");
        usersize = "100";
    });
    //stroke color
    $("#white").click(function(evt) {
        let color = document.getElementById("strokecolor");
        $(color).text("White");
        color.style.backgroundColor="white";
        color.style.color = "black";
        usercolor = "white";
    });
    $("#black").click(function(evt) {
        let color = document.getElementById("strokecolor");
        $(color).text("Black");
        color.style.backgroundColor="black";
        color.style.color = "white";
        usercolor = "black";
    });
    $("#red").click(function(evt) {
        let color = document.getElementById("strokecolor");
        $(color).text("Red");
        color.style.backgroundColor="red";
        color.style.color = "white";
        usercolor = "red";
    });
    $("#blue").click(function(evt) {
        let color = document.getElementById("strokecolor");
        $(color).text("Blue");
        color.style.backgroundColor="blue";
        color.style.color = "white";
        usercolor = "blue";
    });
    $("#orange").click(function(evt) {
        let color = document.getElementById("strokecolor");
        $(color).text("Orange");
        color.style.backgroundColor="orange";
        color.style.color = "white";
        usercolor = "orange";
    });
    $("#yellow").click(function(evt) {
        let color = document.getElementById("strokecolor");
        $(color).text("Yellow");
        color.style.backgroundColor="yellow";
        color.style.color = "black";
        usercolor = "yellow";
    });

    $("#green").click(function(evt) {
        let color = document.getElementById("strokecolor");
        $(color).text("Green");
        color.style.backgroundColor="green";
        color.style.color = "white";
        usercolor = "green";
    });
    $("#purple").click(function(evt) {
        let color = document.getElementById("strokecolor");
        $(color).text("Purple");
        color.style.backgroundColor="purple";
        color.style.color = "white";
        usercolor = "purple";
    });
//fill color
    $("#whitefill").click(function(evt) {
        let color = document.getElementById("fillcolor");
        $(color).text("White");
        color.style.backgroundColor="white";
        color.style.color = "black";
        userfillcolor = "white";
    });
    $("#blackfill").click(function(evt) {
        let color = document.getElementById("fillcolor");
        $(color).text("Black");
        color.style.backgroundColor="black";
        color.style.color = "white";
        userfillcolor = "black";
    });
    $("#redfill").click(function(evt) {
        let color = document.getElementById("fillcolor");
        $(color).text("Red");
        color.style.backgroundColor="red";
        color.style.color = "white";
        userfillcolor = "red";
    });
    $("#bluefill").click(function(evt) {
        let color = document.getElementById("fillcolor");
        $(color).text("Blue");
        color.style.backgroundColor="blue";
        color.style.color = "white";
        userfillcolor = "blue";
    });
    $("#orangefill").click(function(evt) {
        let color = document.getElementById("fillcolor");
        $(color).text("Orange");
        color.style.backgroundColor="orange";
        color.style.color = "white";
        userfillcolor = "orange";
    });
    $("#yellowfill").click(function(evt) {
        let color = document.getElementById("fillcolor");
        $(color).text("Yellow");
        color.style.backgroundColor="yellow";
        color.style.color = "black";
        userfillcolor = "yellow";
    });

    $("#greenfill").click(function(evt) {
        let color = document.getElementById("fillcolor");
        $(color).text("Green");
        color.style.backgroundColor="green";
        color.style.color = "white";
        userfillcolor = "green";
    });
    $("#purplefill").click(function(evt) {
        let color = document.getElementById("fillcolor");
        $(color).text("Purple");
        color.style.backgroundColor="purple";
        color.style.color = "white";
        userfillcolor = "purple";
    });
    //clear canvas
    $("#clear").click(function(evt) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(path)
        {
            path.clear();
        }
        if(polygon)
        {
            polygon.clear();
        }

    });
    $("#save").click(function(evt) {
        //implement save
    });
});


