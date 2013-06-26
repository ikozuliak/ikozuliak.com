'use strict';

angular.module('homepageApp')
    .controller('SunburstCtrl', function ($scope, $location) {
        var w = 820,
            h = 820,
            r = 410,
            angle = 0,
            color = d3.scale.category10();


        var partition = d3.layout.partition()
            .size([2 * Math.PI, r])
            .value(function (d) {
                return d.size;
            });

        var arc = d3.svg.arc()
            .startAngle(function (d) {
                return d.x - .01;
            })
            .endAngle(function (d) {
                return d.x + d.dx;
            })
            .innerRadius(function (d) {
                return d.y;
            })
            .outerRadius(function (d) {
                return d.y + d.dy + 1;
            });

        var svg = d3.select("#sunburst").append("svg:svg")
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
            .on("mouseenter", rotate)

        var group = svg.data([getData()]).selectAll("path")
            .data(partition.nodes)
            .enter().append('svg:g');

        //path variable is required by magnify function
        var path = group.append("svg:path")
            .attr("d", arc)
            .attr("id", function (d) {
                return d.name
            })
            .style("fill", function (d) {
                return d.color || "#bcc5c9"
            })
            .on("mouseenter", magnify)
            .each(stash);

        var text = group.append("text");

        text.attr("transform", function (d) {
//            return "translate(" + arc.centroid(d) + ")";
        })
            .attr("dy", 52)
            .attr("dx", 10)
            .attr("text-anchor", "middle")
            .attr("class", function (d) {
                return d.class || d.name
            })

        text.append("textPath")
            .attr("xlink:href", function (d) {
                return "#" + d.name
            })
            .text(function (d) {
                return d.name
            })
            .attr("method", "align")
            .attr("spacing", "exact")
            .attr("startOffset", function (d) {
                return d.offset || "21%"
            })


        function rotate(node) {
            angle += 90;
            svg
                .transition()
                .duration(1500)
                .ease("back")
                .attr("transform", "translate(" + w / 2 + "," + h / 2 + "), rotate( " + angle + ")")

            svg.selectAll("textPath")
                .transition()
                .duration(450)
                .attr("opacity", "0")
        }

        // Distort the specified node to 80% of its parent.
        function magnify(node) {

            if (parent = node.parent) {
                var parent,
                    x = parent.x,
                    k = Math.floor(Math.random() * (9 - 4) + 4) / 10;
                ;
                parent.children.forEach(function (sibling) {
                    x += reposition(sibling, x, sibling === node
                        ? parent.dx * k / node.value
                        : parent.dx * (1 - k) / (parent.value - node.value));
                });
            } else {
                reposition(node, 0, node.dx / node.value);
            }

            svg.selectAll("text")
                .transition()
                .duration(750)
                .attr("transform", function (d) {
//                    return "translate(" + arc.centroid(d) + ")";
                })


            path.transition()
                .duration(750)
                .attrTween("d", arcTween);
        }

        // Recursively reposition the node at position x with scale k.
        function reposition(node, x, k) {
            node.x = x;
            if (node.children && (n = node.children.length)) {
                var i = -1, n;
                while (++i < n) x += reposition(node.children[i], x, k);
            }
            return node.dx = node.value * k;
        }

        // Stash the old values for transition.
        function stash(d) {
            d.x0 = d.x;
            d.dx0 = d.dx;
        }

        // Interpolate the arcs in data space.
        function arcTween(a) {
            var i = d3.interpolate({x:a.x0, dx:a.dx0}, a);
            return function (t) {
                var b = i(t);
                a.x0 = b.x;
                a.dx0 = b.dx;
                return arc(b);
            };
        }

        function getData() {
            return {
                "name":" ",
                "color":"#1b2430",
                "children":[
                    {
                        "name":"J a v a S c r i p t",
                        "offset":"25%",
                        "class":"javascript",
                        "color":"#606d7a",
                        "children":[
                            {
                                "name":"M V V C",
                                "class":"mvvc",
                                "color":"#fff",
                                "children":[
                                    {
                                        "name":"A n g u l a r",
                                        "class":"angular",
                                        "offset":"15%",
                                        "children":[
                                            {
                                                "name":"",
                                                "color":"#f4f7f8",
                                                "size":10
                                            }
                                        ]
                                    },
                                    {
                                        "name":"B a c k b o n e",
                                        "offset":"15%",
                                        "children":[
                                            {
                                                "name":"",
                                                "color":"#f4f7f8",
                                                "size":10
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name":"C o f f e s c r i p t",
                                "color":"#fff",
                                "children":[
                                    {
                                        "name":"",
                                        "children":[
                                            {
                                                "name":"",
                                                "color":"#f4f7f8",
                                                "size":20
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name":"S e r v e r s i d e",
                                "color":"#fff",
                                "children":[
                                    {
                                        "name":"Node.js",
                                        "children":[
                                            {
                                                "name":"",
                                                "color":"#f4f7f8",
                                                "size":20
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name":"C  S  S",
                        "class":"css",
                        "offset":"25%",
                        "color":"#ffffff",
                        "children":[

                            {
                                "name":"P r e p r o c e s s i n g",
                                "class":"preprocessing",
                                "color":"#ecf1f4",
                                "children":[
                                    {
                                        "name":"L E S S",
                                        "children":[
                                            {
                                                "name":"",
                                                "color":"#f4f7f8",
                                                "size":14
                                            }
                                        ]
                                    },
                                    {
                                        "name":"S a s s",
                                        "children":[
                                            {
                                                "name":"",
                                                "color":"#f4f7f8",
                                                "size":13
                                            }
                                        ]
                                    },
                                    {
                                        "name":"Stylus",
                                        "children":[
                                            {
                                                "name":"",
                                                "color":"#f4f7f8",
                                                "size":13
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name":"C S S 3",
                                "offset":"18%",
                                "class":"css3",
                                "color":"#1b2430",
                                "children":[
                                    {
                                        "name":"Animations",
                                        "children":[
                                            {
                                                "name":"",
                                                "color":"#f4f7f8",
                                                "size":20
                                            }
                                        ]
                                    }
                                ]
                            }

                        ]
                    },

                    {
                        "name":"H T M L 5",
                        "class":"html5",
                        "color":"#fe4400",
                        "children":[
                            {
                                "name":"",
                                "size":60
                            }
                        ]
                    }
                ]
            }
        }


    })