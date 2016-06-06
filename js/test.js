// test 1


dataset = dataset.map(function(d) { 
    return d.map(function(p, i) { 
        return {x:i, y:p, y0:0};
    });
});

console.log(dataset);

var w = 800;
var h = 800;

var margin = {top: 20, right: 50, bottom: 30, left: 20},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var padding = 20;

//Set up stack method
var stack = d3.layout.stack();

var layers = stack(dataset);

console.log(layers);

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width]);

var y = d3.scale.linear()
    .rangeRound([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%b"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("right");

var svg = d3.select('.content')
					.append('svg')
					.attr('width', w)
					.attr('height', h);



var area = d3.svg.area()
    .interpolate('cardinal')
    .x(function(d, i) { return x(i); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

svg.selectAll(".layer")
      .data(layers)
      .enter().append("path")
      .attr("class", "layer")
      .attr("d", function(d) { 
      	console.log(d);
      	return area(d); 
      })
      .style("fill", function(d, i) { return "blue"; });


// svg.selectAll('rect')
// 	.data(dataset[0])
// 	.enter()
// 	.append('rect')
// 	.attr('x',function(d,i){
// 		return i * (w/dataset.length);
// 	})
// 	.attr('y',function(d){
// 		return  h-(d*4);
// 	})
// 	.attr('width', w/dataset.length - padding)
// 	.attr('height',function(d){
// 		return d*4;
// 	})
// 	.attr("fill", function(d) {
// 		// console.log(d);
// 	    return "rgba(" + (d * 10) + ", 0, 90, 0.2)";
// 	});












// test 2
var dataset = [];

for (let i=0;i<10;i++){
	dataset.push(dayVals());
}

function dayVals() {
	let data = []
	for (let i=0;i<4;i++){
		let rand = Math.floor((Math.random()*20)+1);
		data.push(rand);
	}
	return data;
};


var data = dataset.map(function(d){

	return d.map(function(p,i){
		return {x:i, y:p, y0:0};
	});
});

console.log(data);
		var colors = {
			    0 : "#1f77b4",
				1 : "#2ca02c",
				2 : "#ff7f0e"

		};

var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width])
    .domain([0,3]);

var y = d3.scale.linear()
    .range([height, 0])
    .domain([0,25]);

var z = d3.scale.category20c();

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var stack = d3.layout.stack()
      .offset("zero")

var layers = stack(data);

var area = d3.svg.area()
    .interpolate('cardinal')
    .x(function(d, i) { return x(i); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

svg.selectAll(".layer")
      .data(layers)
      .enter().append("path")
      .attr("class", "layer")
      .attr("d", function(d) { return area(d); })
      .style("fill", function(d, i) {  return "rgba(" + (Math.random()*20) + ", 0, 90, 0.8)" });









