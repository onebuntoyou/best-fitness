import React from 'react';
import ReactDom from 'react-dom';
import { Redirect } from 'react-router';
import './style.css'
const moment = require('moment');

class MyAppointments extends React.Component {
	state = {
		appointments: [],
	}

	constructor(){
		super();
		this.getAppointments = this.getAppointments.bind(this);
	}

	getAppointments(){
		//console.log(this.props.client.Client.id);
		fetch('/api/myAppointments/' + this.props.client.Client.id)
			.then(res => {
				if(res.status < 400){
					return res.json();
				}
				else{
					console.log("error");
				}
			})
			.then(body => {
				this.setState({appointments: body.allAppointments})
			})
  }
  render(){
  	if(this.props.client == null) {
  		return <Redirect to="/"/>
  	}
  	this.getAppointments();
  	let appointment = this.state.appointments.map((item) => {
  		return(
  				<tr>
  					<td>{moment(item.date, "YYYY-MM-DD").format("ddd MMM Do")}</td>
  					<td>{moment(item.time, "HH:mm:ss").format("hA")}</td>
  				</tr>
  		)
  	})
  	return(
  		<div>
  		<h3 className="text-center newfont">Your appointments! Are you ready?</h3>
  		<br/>
  		<table className="text-center newfont">
  			<tr>
  				<th>Date</th>
  				<th>Time</th>
  			</tr>
  			{appointment}
  		</table>
  		</div>
  )}
}
export default MyAppointments;