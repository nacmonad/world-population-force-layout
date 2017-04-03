import React, { Component } from 'react';
import * as d3 from 'd3';

export default class ForceLayout extends Component {
  

  componentDidMount() { 
    const width = this.props.style.width,
    height = this.props.style.height;

    var color = d3.scaleOrdinal(d3.schemeCategory20b)
        .domain(d3.range(20));

    var nodes = this.props.data;
    //sorted descending
    nodes.sort((a,b)=>{
      return parseInt(b.population,10)-parseInt(a.population,10)
    })

    nodes = nodes.map((e) => { return {...e, cluster:Math.floor(Math.random() * 10)} })  
    
    //nodes = nodes.splice(0,50)
    var rScale = d3.scaleLinear()
      .domain([d3.min(nodes.map((e)=>parseInt(e.population,10))),d3.max(this.props.data.map((e)=>parseInt(e.population,10)))])
      .range([10,100])
    var fScale = d3.scaleLinear()
      .domain([d3.min(nodes.map((e)=>parseInt(e.population,10))),d3.max(this.props.data.map((e)=>parseInt(e.population,10)))])
      .range([8,36])
    
    var forceCollide = d3.forceCollide()
        .radius(function(d) { return rScale(parseInt(d.population,10)) + 0.5 })
        .iterations(3);

    var force = d3.forceSimulation()
        .nodes(nodes)
        .force("center", d3.forceCenter())
        .force("collide", forceCollide)
        .force("gravity", d3.forceManyBody(1))
        .force("x", d3.forceX().strength(.2))
        .force("y", d3.forceY().strength(.2))
        .on("tick", tick);

    var circle = d3.select('.CountryGroup').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')').selectAll("circle")
        .data(nodes)
      .enter()
        .append("g")
          .attr("class", "node")
        .append("circle")
        .attr("r", function(d) { return rScale(parseInt(d.population,10)) })
        .style("fill", function(d,i) { return color(i) })
        .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended))
        
    var labels = d3.selectAll(".node")
          .filter((d,i)=>{return i < 26})
          .append("text")
            .attr("class","text-node")
            .style("fill", "white")
            .attr("pointer-events","none")
            .attr("dx",12)
            .attr("dy", ".5em")
            .attr("font-size", (d)=>fScale(parseInt(d.population,10)))
            .text((d,i)=> {
              if(i<=25) return d.countryName
               })

    function tick() {
      circle
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });

      labels
        .attr("dx", (d)=>d.x - d.countryName.length*fScale(parseInt(d.population,10))/4)
        .attr("dy", (d)=>d.y + fScale(parseInt(d.population,10))/4)
    }

    function dragstarted(d) {
      if (!d3.event.active) force.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) force.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }


  }

  render() {
    
    return (
      <g className="CountryGroup" style={{ width:this.props.width, height:this.props.height}}>
         
      </g>
    );
  }
}

