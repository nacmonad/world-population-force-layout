import React, { Component } from 'react';
import ForceLayout from './ForceLayout';

export default class ForceChart extends Component {
  
  componentWillMount() {
    this.setState({countryData:require('./data/countries.json').countries.country})
   }
  

  render() {
    const wrapperStyle = {
      position:'fixed',
      width:'100%',
      height:'100%',
      background:'#222',
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    }
    const styles = {
      position:'relative', 
      width:600, 
      height:480, 
      overflow:'visible', 
     }
     
    return (
      <div style={wrapperStyle}>
        <div>
          <div style={{borderLeft:'1px white solid',paddingLeft:'10px', color:'white'}}>D3.js V4</div>
          <div style={{borderLeft:'1px white solid',paddingLeft:'10px', color:'white'}}>ReactJS</div>
          <div style={{borderLeft:'1px white solid',paddingLeft:'10px', color:'white'}}>ES6</div>
        </div>

        <svg className="Chart" style={styles} > 
          <ForceLayout data={this.state.countryData} style={{width:styles.width, height: styles.height}}/>
        </svg>
      </div>
    );
  }
}

