import React,{Component} from 'react';
import axios from 'axios'
import {Table, Button, Modal, Form} from "react-bootstrap";

export class Coach extends Component{

    state = {
        coaches: [],
        coachFullName : "",
        coachPhoneNumber: "",
        coachEmail : "",
        coachExperience: "",
        coachIdTmp: 0,
        modalShow: false,
        createOrUpdate: ""
    }

    componentDidMount(){
        axios({
            method: "GET",
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            url: `http://localhost:62936/api/coaches`
        }).then(response => 
            {   
                const coachesGet = response.data.Value;
                this.setState( {coaches: coachesGet});
            })
    }

    createCoach = (data) =>
    {
        axios({
            method: "POST",
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            url: `http://localhost:62936/api/coaches`,
            data: data
        }).then(response => 
            {   
                const coach = response.data;
                this.setState( {coaches:[...this.state.coaches, coach] });
            }) 
    }

    deleteCoach = (data) =>
    {
        axios({
            method: "DELETE",
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            url: `http://localhost:62936/api/coaches/${data}`
        }).then(response => 
            {   
                const coachDel = response.data;
                this.setState( {coaches: this.state.coaches.filter(el => el.CoachID !== coachDel)});
            })
            .catch((err) => {
                window.alert("This coach can't be deleted because it is assigned to one or more training.");
                }) 
    }

    updateCoach = (data) =>
    {
        axios({
            method: "PUT",
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            url: `http://localhost:62936/api/coaches`,
            data: data
        }).then(response => 
            {   
                const coach = response.data;
                this.setState( {coaches: this.state.coaches.map(e => {
                    if(e.CoachID === coach.CoachID){
                        return coach;
                    }
                    return e;
                })});
            }) 
    }

    handleFullNameChange = (e) => this.setState({coachFullName: e.target.value});
    handlePhoneNumberChange = (e) => this.setState({coachPhoneNumber: e.target.value});
    handleEmailChange = (e) => this.setState({coachEmail: e.target.value});
    handleExperienceChange = (e) => this.setState({coachExperience: e.target.value});

    render(){
        return(
            <>
          <div style={{textAlign:"center", marginBottom: "10px"}}>
                <Button  variant="success" onClick={() => this.setState({modalShow: true, createOrUpdate: "create"})}>Create new Coach</Button> 
                <Modal
                show={this.state.modalShow}
                    onHide={() => this.setState({modalShow: false,
                                                coachFullName : "",
                                                coachPhoneNumber: "",
                                                coachEmail : "",
                                                coachExperience: "",
                                                createOrUpdate: ""})}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Create or Edit Coach
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <Form.Group >
                        <Form.Label>Full Name: </Form.Label>
                        <Form.Control type="text" onChange={this.handleFullNameChange} value={this.state.coachFullName} placeholder="Full Name input"/>

                        <Form.Label>Phone Number: </Form.Label>
                        <Form.Control type="text" onChange={this.handlePhoneNumberChange} value={this.state.coachPhoneNumber} placeholder="Phone Number input"/> 

                        <Form.Label>Email: </Form.Label>
                        <Form.Control type="text" onChange={this.handleEmailChange} value={this.state.coachEmail} placeholder="Email input"/> 

                        <Form.Label>Experience: </Form.Label>
                        <Form.Control type="text" onChange={this.handleExperienceChange} value={this.state.coachExperience} placeholder="Experience input"/>            
                    </Form.Group>

                    </Modal.Body>

                    <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        if(this.state.coachFullName === ""){
                            window.alert("Please enter full name");
                        }
                        else if(this.state.coachPhoneNumber === "")
                        {
                            window.alert("Please enter phone number");
                        }
                        else if(this.state.coachEmail === "")
                        {
                            window.alert("Please enter email");
                        }
                        else if(this.state.coachExperience === "")
                        {
                            window.alert("Please enter experience");
                        }
                        else{
                            if(this.state.createOrUpdate === "create")
                            {
                            this.createCoach({
                                FullName: this.state.coachFullName,
                                PhoneNumber: this.state.coachPhoneNumber,
                                Email: this.state.coachEmail,
                                Experience: this.state.coachExperience
                            });
                            }
                            else if(this.state.createOrUpdate === "update")
                            {
                                this.updateCoach({
                                    CoachID: this.state.coachIdTmp,
                                    FullName: this.state.coachFullName,
                                    PhoneNumber: this.state.coachPhoneNumber,
                                    Email: this.state.coachEmail,
                                    Experience: this.state.coachExperience
                                }); 
                            }
                        }

                        this.setState({modalShow: false,
                            coachFullName : "",
                            coachPhoneNumber: "",
                            coachEmail : "",
                            coachExperience: "",
                            createOrUpdate: ""
                    })}}>Save</Button>

                    <Button variant="danger" onClick={() => this.setState({modalShow: false,
                                        coachFullName : "",
                                        coachPhoneNumber: "",
                                        coachEmail : "",
                                        coachExperience: "",
                                        createOrUpdate: ""
                                })}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>  
    <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>Full Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Experience</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {this.state.coaches.length > 0 ?  this.state.coaches.map((ele, index) => {
                    return <tr key={index}>
                        <td>{ele.FullName}</td>
                        <td>{ele.PhoneNumber}</td>
                        <td>{ele.Email}</td>
                        <td>{ele.Experience}</td>
                        <th> <Button  variant="warning" onClick={() => this.setState({modalShow: true,
                                                                                        createOrUpdate: "update",
                                                                                        coachIdTmp : ele.CoachID,
                                                                                        coachFullName : ele.FullName,
                                                                                        coachPhoneNumber: ele.PhoneNumber,
                                                                                        coachEmail : ele.Email,
                                                                                        coachExperience: ele.Experience})}>Edit</Button></th>
                        <th> <Button onClick={() => this.deleteCoach(ele.CoachID)}variant="danger">Delete</Button></th>
                    </tr>
                }) : null}    
                
                </tbody>
    </Table>
    </>)
    }
}

export default Coach;