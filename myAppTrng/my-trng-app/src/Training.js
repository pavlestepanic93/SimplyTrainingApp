import React,{Component} from 'react';
import axios from 'axios'
import {Table, Button, Modal, Dropdown} from "react-bootstrap";
import DateTimePicker from 'react-datetime-picker';
import { dataTime } from "./datatime"

export class Training extends Component{

    state={
        training: [],
        coaches: [],
        members: [],
        sports: [],
        modalShow: false,
        dateTime: new Date(),
        coachName: "select coach",
        coachObject: null,
        memberName : "select member",
        memberObject: null,
        sportName: "select sport",
        sportObject: null
    }

    componentDidMount(){
        axios({
            method: "GET",
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            url: `http://localhost:62936/api/trainings`
        }).then(response => 
            {   
                const train = response.data.Value;
                this.setState( {training: train});
            })

            this.getMembers();
            this.getCoaches();
            this.getSports();
    }

    getMembers = () =>
    {
        axios({
            method: "GET",
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            url: `http://localhost:62936/api/members`
        }).then(response => 
            {   
                const member = response.data.Value;
                this.setState( {members: member});
            }) 
    }

    getCoaches = () =>
    {
        axios({
            method: "GET",
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            url: `http://localhost:62936/api/coaches`
        }).then(response => 
            {   
                const coach = response.data.Value;
                this.setState( {coaches: coach});
            }) 
    }

    getSports = () =>
    {
        axios({
            method: "GET",
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            url: `http://localhost:62936/api/sports`
        }).then(response => 
            {   
                const sport = response.data.Value;
                this.setState( {sports: sport});
            }) 
    }

    createTraining = (data) =>
    {
        axios({
            method: "POST",
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            url: `http://localhost:62936/api/trainings`,
            data: data
        }).then(response => 
            {   
                const train = response.data;
                this.setState( {training:[...this.state.training, train] });
            }) 
    }

    deleteTraining = (data) =>
    {
        axios({
            method: "DELETE",
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            url: `http://localhost:62936/api/trainings/${data}`
        }).then(response => 
            {   
                const trainingDel = response.data;
                this.setState( {training: this.state.training.filter(el => el.TrainingID !== trainingDel)});
            }) 
    }

    render(){
        return(
            <>
            <div style={{textAlign:"center", marginBottom: "10px"}}>
                <Button  variant="success" onClick={() => this.setState({modalShow: true})}>Create new Training</Button> 
                <Modal
                show={this.state.modalShow}
                    onHide={() => this.setState({modalShow: false,  dateTime: new Date(),
                                        coachName: "select coach",
                                        coachObject: null,
                                        memberName : "select member",
                                        memberObject: null,
                                        sportName: "select sport",
                                        sportObject: null})}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Create Training
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <DateTimePicker
                        onChange={(data) => {
                            this.setState({dateTime: data})
                        }}
                        value={this.state.dateTime}
                    />
                    <Dropdown>
                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                            {this.state.memberName}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {this.state.members.length > 0 ? this.state.members.map((ele,index) => {
                                return <Dropdown.Item key={index} onClick={() => this.setState({memberName: ele?.FullName, memberObject: ele})}>{ele?.FullName}</Dropdown.Item>
                            }) : null} 
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            {this.state.coachName}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {this.state.coaches.length > 0 ? this.state.coaches.map((ele, index) => {
                                return <Dropdown.Item key={index} onClick={() => this.setState({coachName: ele?.FullName, coachObject: ele})}>{ele?.FullName}</Dropdown.Item>
                            }) : null} 
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {this.state.sportName}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {this.state.sports.length > 0 ? this.state.sports.map((ele, index) => {
                                return <Dropdown.Item key={index} onClick={() => this.setState({sportName: ele?.SportsName, sportObject: ele})}>{ele?.SportsName}</Dropdown.Item>
                            }) : null} 
                        </Dropdown.Menu>
                    </Dropdown>

                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        if(this.state.dateTime === null){
                            window.alert("date time picker is null");
                        }
                        else if(this.state.coachObject === null)
                        {
                            window.alert("Please select coach");
                        }
                        else if(this.state.sportObject === null)
                        {
                            window.alert("Please select sport");
                        }
                        else if(this.state.memberObject === null)
                        {
                            window.alert("Please select member");
                        }
                        else{
                            this.createTraining({
                                TimeAndDateOfTraining: dataTime(this.state.dateTime),
                                Coach: this.state.coachObject,
                                Member: this.state.memberObject,
                                Sport: this.state.sportObject
                            });
                        }

                        this.setState({modalShow: false,  dateTime: new Date(),
                            coachName: "select coach",
                            coachObject: null,
                            memberName : "select member",
                            memberObject: null,
                            sportName: "select sport",
                            sportObject: null})
                }}>Save</Button>
                    <Button variant="danger" onClick={() => this.setState({modalShow: false , dateTime: new Date(),
                                        coachName: "select coach",
                                        coachObject: null,
                                        memberName : "select member",
                                        memberObject: null,
                                        sportName: "select sport",
                                        sportObject: null})}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
    <Table striped bordered hover variant="dark">
    <thead>
        <tr>
        <th>Coach</th>
        <th>Member</th>
        <th>Sport</th>
        <th>Date and Time</th>
        <th>Delete</th>
        </tr>
    </thead>
    <tbody>
        {this.state.training.length > 0 ?  this.state.training.map((ele, index) => {
            return <tr key={index}>
                <td>{ele.Coach?.FullName}</td>
                <td>{ele.Member?.FullName}</td>
                <td>{ele.Sport?.SportsName}</td>
                <td>{ele.TimeAndDateOfTraining}</td>
                <th> <Button onClick={() => this.deleteTraining(ele.TrainingID)}variant="danger">Delete</Button></th>
                </tr>
        }) : null}    
        
    </tbody>
    </Table>
    </>)
    }
}

export default Training;