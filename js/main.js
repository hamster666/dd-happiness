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

data = dataset.map(function(d){
	return d.map(function(p,i){
		return {x:i, y:p, y0:0};
	});
});

var w = 900,
h = 500

// create canvas
var svg = d3.select("#viz").append("svg:svg")
	.attr("class", "chart")
	.attr("width", w)
	.attr("height", h )
	.append("svg:g")
	.attr("transform", "translate(10,470)");

var x = d3.scale.ordinal().rangeRoundBands([0, w-50]),
	y = d3.scale.linear().range([0, h-50]),
	colors = d3.scale.ordinal().range(["red", "pink", "lightgreen", "green"])

var remapped =["c1","c2","c3","c4"].map(function(dat,i){
    return dataset.map(function(d,ii){
        return {x: ii, y: d[i] };
    })
});

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
var w = 850;
var h = 220;

var circleSvg = d3.select("#circles").append("svg")
	.attr("width", w)
	.attr("height", h);

// draw circles
var circles = circleSvg.selectAll("circle")
		.data(circleData)
		.enter()
		.append("circle");

// place circles
circles.attr("cx", function(d,i){
		var sections = w/circleData.length;
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
		var sections = w/circleData.length;
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
		var sections = w/circleData.length;
		return (i * sections)+ (sections/2);
	})
	.attr("y", function(d){	
		return (h/2)-(d*3);
	})
	.attr("font-family", "sans-serif")
	.attr("font-size", "50px")
	.attr("text-anchor", "middle");























	// EXAMPLE


// var dataset = [
//     [
//         {
//             "time": "2014-02-19",
//             "y": 177
//         },
//         {
//             "time": "2014-02-20",
//             "y": 135
//         },
//         {
//             "time": "2014-02-21",
//             "y": 176
//         },
//         {
//             "time": "2014-02-22",
//             "y": 87
//         },
//         {
//             "time": "2014-02-23",
//             "y": 4
//         }
//     ],
//     [
//         {
//             "time": "2014-02-19",
//             "y": 40
//         },
//         {
//             "time": "2014-02-20",
//             "y": 38
//         },
//         {
//             "time": "2014-02-21",
//             "y": 53
//         },
//         {
//             "time": "2014-02-22",
//             "y": 18
//         },
//         {
//             "time": "2014-02-23",
//             "y": 2
//         }
//     ],
//     [
//         {
//             "time": "2014-02-19",
//             "y": 4
//         },
//         {
//             "time": "2014-02-20",
//             "y": 9
//         },
//         {
//             "time": "2014-02-21",
//             "y": 55
//         },
//         {
//             "time": "2014-02-22",
//             "y": 50
//         },
//         {
//             "time": "2014-02-23",
//             "y": 27
//         }
//     ]
// ]

		// var w = 600;    //width
		// var h = 500;    //height
		// var padding = {top: 40, right: 40, bottom: 40, left:40};
		// var dataset;
		// //Set up stack method
		// var stack = d3.layout.stack();
		// stack(dataset);

		// var color_hash = {
		// 	    0 : ["Invite","#1f77b4"],
		// 		1 : ["Accept","#2ca02c"],
		// 		2 : ["Decline","#ff7f0e"]

		// };


		// 	//Set up scales
		// 	var xScale = d3.time.scale()
		// 		.domain([new Date(dataset[0][0].time),d3.time.day.offset(new Date(dataset[0][dataset[0].length-1].time),8)])
		// 		.rangeRound([0, w-padding.left-padding.right]);

		// 	var yScale = d3.scale.linear()
		// 		.domain([0,				
		// 			d3.max(dataset, function(d) {
		// 				return d3.max(d, function(d) {
		// 					return d.y0 + d.y;
		// 				});
		// 			})
		// 		])
		// 		.range([h-padding.bottom-padding.top,0]);

		// 	var xAxis = d3.svg.axis()
		// 				   .scale(xScale)
		// 				   .orient("bottom");
		// 				   // .ticks(d3.time.days,1);

		// 	var yAxis = d3.svg.axis()
		// 				   .scale(yScale)
		// 				   .orient("left");
		// 				   // .ticks(10);

		// 	//Easy colors accessible via a 10-step ordinal scale
		// 	var colors = d3.scale.category10();

		// 	//Create SVG element
		// 	var svg = d3.select("#mbars")
		// 				.append("svg")
		// 				.attr("width", w)
		// 				.attr("height", h);

		// 	// Add a group for each row of data
		// 	var groups = svg.selectAll("g")
		// 		.data(dataset)
		// 		.enter()
		// 		.append("g")
		// 		.attr("class","rgroups")
		// 		.attr("transform","translate("+ padding.left + "," + (h - padding.bottom) +")")
		// 		.style("fill", function(d, i) {
		// 			return color_hash[dataset.indexOf(d)][1];
		// 		});

		// 	// Add a rect for each data value
		// 	var rects = groups.selectAll("rect")
		// 		.data(function(d) { return d; })
		// 		.enter()
		// 		.append("rect")
		// 		.attr("width", 2)
		// 		.style("fill-opacity",1e-6);


		// 	rects.transition()
		// 	     .duration(function(d,i){
		// 	    	 return 500 * i;
		// 	     })
		// 	     .ease("linear")
		// 	    .attr("x", function(d) {
		// 			return xScale(new Date(d.time));
		// 		})
		// 		.attr("y", function(d) {
		// 			return -(- yScale(d.y0) - yScale(d.y) + (h - padding.top - padding.bottom)*2);
		// 		})
		// 		.attr("height", function(d) {
		// 			return -yScale(d.y) + (h - padding.top - padding.bottom);
		// 		})
		// 		.attr("width", 15)
		// 		.style("fill-opacity",1);

		// 		svg.append("g")
		// 			.attr("class","x axis")
		// 			.attr("transform","translate(40," + (h - padding.bottom) + ")")
		// 			.call(xAxis);


		// 		svg.append("g")
		// 			.attr("class","y axis")
		// 			.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		// 			.call(yAxis);

				// adding legend

				// var legend = svg.append("g")
				// 				.attr("class","legend")
				// 				.attr("x", w - padding.right - 65)
				// 				.attr("y", 25)
				// 				.attr("height", 100)
				// 				.attr("width",100);

				// legend.selectAll("g").data(dataset)
				// 	  .enter()
				// 	  .append('g')
				// 	  .each(function(d,i){
				// 	  	var g = d3.select(this);
				// 	  	g.append("rect")
				// 	  		.attr("x", w - padding.right - 65)
				// 	  		.attr("y", i*25 + 10)
				// 	  		.attr("width", 10)
				// 	  		.attr("height",10)
				// 	  		.style("fill",color_hash[String(i)][1]);

				// 	  	g.append("text")
				// 	  	 .attr("x", w - padding.right - 50)
				// 	  	 .attr("y", i*25 + 20)
				// 	  	 .attr("height",30)
				// 	  	 .attr("width",100)
				// 	  	 .style("fill",color_hash[String(i)][1])
				// 	  	 .text(color_hash[String(i)][0]);
				// 	  });

			// 	svg.append("text")
			// 	.attr("transform","rotate(-90)")
			// 	.attr("y", 0 - 5)
			// 	.attr("x", 0-(h/2))
			// 	.attr("dy","1em")
			// 	.text("Number of Messages");

			// svg.append("text")
			//    .attr("class","xtext")
			//    .attr("x",w/2 - padding.left)
			//    .attr("y",h - 5)
			//    .attr("text-anchor","middle")
			//    .text("Days");

			// svg.append("text")
	  //       .attr("class","title")
	  //       .attr("x", (w / 2))             
	  //       .attr("y", 20)
	  //       .attr("text-anchor", "middle")  
	  //       .style("font-size", "16px") 
	  //       .style("text-decoration", "underline")  
	  //       .text("Number of messages per day.");

