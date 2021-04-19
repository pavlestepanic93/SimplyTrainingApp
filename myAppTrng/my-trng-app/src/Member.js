import React,{Component} from 'react';
import axios from 'axios'
import {Table, Button, Modal, Form} from "react-bootstrap";


export class Member extends Component{

    state = {
        members: [],
        memberFullName : "",
        memberPhoneNumber: "",
        memberEmail : "",
        memberMembershipType: "",
        modalShow: false
    }

    componentDidMount(){
        axios({
            method: "GET",
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            url: `http://localhost:62936/api/members`
        }).then(response => 
            {   
                const membersGet = response.data.Value;
                this.setState( {members: membersGet});
            })
    }

    createMember = (data) =>
    {
        axios({
            method: "POST",
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            url: `http://localhost:62936/api/members`,
            data: data
        }).then(response => 
            {   
                console.log(response.data);
                const member = response.data;
                this.setState( {members:[...this.state.members, member] });
            }) 
    }

    handleFullNameChange = (e) => this.setState({memberFullName: e.target.value});
    handlePhoneNumberChange = (e) => this.setState({memberPhoneNumber: e.target.value});
    handleEmailChange = (e) => this.setState({memberEmail: e.target.value});
    handleMembershipTypeChange = (e) => this.setState({memberMembershipType: e.target.value});

    render(){
        return(
            <>
          <div style={{textAlign:"center", marginBottom: "10px"}}>
                <Button  variant="success" onClick={() => this.setState({modalShow: true})}>Create new Member</Button> 
                <Modal
                show={this.state.modalShow}
                    onHide={() => this.setState({modalShow: false,
                                                memberFullName : "",
                                                memberPhoneNumber: "",
                                                memberEmail : "",
                                                memberMembershipType: ""})}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Create Member
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Form.Group >
                        <Form.Label>Full Name: </Form.Label>
                        <Form.Control type="text" onChange={this.handleFullNameChange} value={this.state.memberFullName} placeholder="Full name input"/>

                        <Form.Label>Phone Number: </Form.Label>
                        <Form.Control type="text" onChange={this.handlePhoneNumberChange} value={this.state.memberPhoneNumber} placeholder="Phone number input"/> 

                        <Form.Label>Email: </Form.Label>
                        <Form.Control type="text" onChange={this.handleEmailChange} value={this.state.memberEmail} placeholder="Email input"/> 

                        <Form.Label>Membership Type: </Form.Label>
                        <Form.Control type="text" onChange={this.handleMembershipTypeChange} value={this.state.memberMembershipType} placeholder="Membership Type input"/>            
                    </Form.Group>

                    </Modal.Body>

                    <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        if(this.state.memberFullName === ""){
                            window.alert("Please enter full name");
                        }
                        else if(this.state.memberPhoneNumber === "")
                        {
                            window.alert("Please enter phone number");
                        }
                        else if(this.state.memberEmail === "")
                        {
                            window.alert("Please enter email");
                        }
                        else if(this.state.memberMembershipType === "")
                        {
                            window.alert("Please enter memebership type");
                        }
                        else{
                            this.createMember({
                                FullName: this.state.memberFullName,
                                PhoneNumber: this.state.memberPhoneNumber,
                                Email: this.state.memberEmail,
                                MembershipType: this.state.memberMembershipType
                            });
                        }

                        this.setState({modalShow: false,
                            memberFullName : "",
                            memberPhoneNumber: "",
                            memberEmail : "",
                            memberMembershipType: "",
                    })}}>Save</Button>

                    <Button variant="danger" onClick={() => this.setState({modalShow: false,
                                        memberFullName : "",
                                        memberPhoneNumber: "",
                                        memberEmail : "",
                                        memberMembershipType: "",
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
                <th>Membership Type</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {this.state.members.length > 0 ?  this.state.members.map((ele, index) => {
                    return <tr key={index}>
                        <td>{ele.FullName}</td>
                        <td>{ele.PhoneNumber}</td>
                        <td>{ele.Email}</td>
                        <td>{ele.MembershipType}</td>
                        <th> <Button>Edit</Button></th>
                        <th> <Button>Delete</Button></th>
                    </tr>
                }) : null}    
                
                </tbody>
    </Table>
    </>)
    }
}

export default Member;

