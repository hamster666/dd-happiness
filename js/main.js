// create dummy data
var dataset = [];

for (let i=0;i<7;i++){
	dataset.push(dayVals());
}

function dayVals() {
	let data = [];
	for (let i=0;i<4;i++){
		let rand = Math.floor((Math.random()*20)+1);
		data.push(rand);
	}
	return data;
};

// ajax request to get json
// var yes; 
// d3.json("./data.json", function(error, json) {
//   if (error) return console.warn(error);
//   yes = json;
//   // visualizeit();
// });

// console.log(yes);


// find average percentages from dataset
function average(d){
	var data = [];
	var i = 0;
	for(i;i<d.length;i++){

		var total = 0;
		var amount = 0;
		var x = 0;

		for(x;x<4;x++){
			total += d[i][x] * 4;
			amount += d[i][x] * x;
		}

		data.push(Math.round((amount*100)/total));
	}
	return data;
}

var linepoints = average(dataset);	

var width = 800,
	h = 500;

// create canvas
var svg = d3.select("#viz").append("svg:svg")
	.attr("class", "chart")
	.attr("width", width)
	.attr("height", h )
	.append("svg:g")
	.attr("transform", "translate(10,470)");

var x = d3.scale.ordinal().rangeRoundBands([0, width-50]),
	y = d3.scale.linear().range([0, h-50]),
	colors = d3.scale.ordinal().range(["red", "pink", "lightgreen", "green"])

var remapped =["c1","c2","c3","c4"].map(function(dat,i){
    return dataset.map(function(d,ii){
        return {x: ii, y: d[i] };
    })
});

var xAxis = d3.svg.axis()
	.scale(x)
	.tickSize(3)
	.tickSubdivide(true);

var yAxis = d3.svg.axis()
	.scale(y)
	.tickSize(3)
	.orient('left')
	.tickSubdivide(true);

svg.append('svg:g')
	.attr('class','x-axis')
	.attr('transform','translate(0,-10)')
	.call(xAxis);

svg.append('svg:g')
	.attr('class','y-axis')
	.attr('transform','translate(10,'+ (-h + 50) +')')
	.call(yAxis);

var stacked = d3.layout.stack()(remapped)

x.domain(stacked[0]
	.map(function(d) { return d.x; }));
y.domain([0, d3.max(stacked[stacked.length - 1], function(d) { 
		return d.y0 + d.y; }
	)]);

// Add a group for each column.
var valgroup = svg.selectAll("g.valgroup")
	.data(stacked)
	.enter().append("svg:g")
	.attr("class", "valgroup")
	.style("fill", function(d, i) { 
		return colors(i); 
	});

// Add a rect for each date.
var rect = valgroup.selectAll("rect")
	.data(function(d){return d;})
	.enter()
	.append("svg:rect")
	.attr("x", function(d) { return x(d.x); })
	.attr("y", function(d) { return -y(d.y0) - y(d.y); })
	.attr("height", function(d) { return y(d.y); })
	.attr("width", x.rangeBand()-20);

// Add a rect for each date.
var rect = valgroup.selectAll("text")
	.data(function(d){return d;})
	.enter()
	.append("text", "hello")
	.attr("x", function(d) { return 100 })
	.attr("y", function(d) { return 100 })
	.attr("height",20)
	.attr("width",20)
	.attr("font-family", "sans-serif")
	.attr("font-size", "11px")
	.attr("fill", "black")
	.attr("text-anchor", "middle");


// CIRCLES

var circleData = dataset[0];
var width = 850;
var h = 220;

var circleSvg = d3.select("#circles").append("svg")
	.attr("width", width)
	.attr("height", h);

// draw circles
var circles = circleSvg.selectAll("circle")
		.data(circleData)
		.enter()
		.append("circle");

// place circles
circles.attr("cx", function(d,i){
		var sections = width/circleData.length;
		return (i * sections)+ (sections/2);
	})
	.attr("cy", h/2)
	.attr("r", function(d){
		return 20+(d*4);
	})
	.style("fill", function(d, i) { 
		return colors(i); 
	})
	.attr("stroke", function(d){
		return "black";
	})
	.attr("stroke-width", 2);

// draw smiles
circleSvg.selectAll("path")
	.data(circleData)
	.enter()
	.append("path")
	.attr("d", function(d,i){
		var sections = width/circleData.length;
		var mX = (i * sections)+(sections/2)-(d*4),
			mY = (h/2)+(d),
			qX1 = (i * sections)+(sections/2),
			qY1 = (h/2) ,
			qX = (i * sections)+(sections/2)+(d*4),
			qY = (h/2)+d;

			var increment = (d*3) + (i*2);

			qY1 = i>1 ? qY1 + increment : qY1 - increment;

		return `M${mX} ${mY} Q${qX1} ${qY1} ${qX} ${qY}`;
	})
	.attr("fill", "transparent")
	.attr("stroke","black");

// draw text values
circleSvg.selectAll("text")
	.data(circleData)
	.enter()
	.append("text")
	.text(function(d){
		return ".    .";
	})
	.attr("x", function(d,i){
		var sections = width/circleData.length;
		return (i * sections)+ (sections/2);
	})
	.attr("y", function(d){	
		return (h/2)-(d*3);
	})
	.attr("font-family", "sans-serif")
	.attr("font-size", "50px")
	.attr("text-anchor", "middle");














