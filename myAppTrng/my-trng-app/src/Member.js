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
        memberIdTmp: 0,
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
                const member = response.data;
                this.setState( {members:[...this.state.members, member] });
            }) 
    }

    deleteMember = (data) =>
    {
        axios({
            method: "DELETE",
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            url: `http://localhost:62936/api/members/${data}`
        }).then(response => 
            {   
                const memberDel = response.data;
                this.setState( {members: this.state.members.filter(el => el.MemberID !== memberDel)});
            }) 
            .catch((err) => {
                window.alert("This member can't be deleted because it is assigned to one or more training.");
                })            
    }

    updateMember = (data) =>
    {
        axios({
            method: "PUT",
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            url: `http://localhost:62936/api/members`,
            data: data
        }).then(response => 
            {   
                const member = response.data;
                this.setState( {members: this.state.members.map(e => {
                    if(e.MemberID === member.MemberID){
                        return member;
                    }
                    return e;
                })});
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
                <Button  variant="success" onClick={() => this.setState({modalShow: true, createOrUpdate: "create"})}>Create new Member</Button> 
                <Modal
                show={this.state.modalShow}
                    onHide={() => this.setState({modalShow: false,
                                                memberFullName : "",
                                                memberPhoneNumber: "",
                                                memberEmail : "",
                                                memberMembershipType: "",
                                                createOrUpdate: ""})}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Create or Edit Member
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <Form.Group >
                        <Form.Label>Full Name: </Form.Label>
                        <Form.Control type="text" onChange={this.handleFullNameChange} value={this.state.memberFullName} placeholder="Full Name input"/>

                        <Form.Label>Phone Number: </Form.Label>
                        <Form.Control type="text" onChange={this.handlePhoneNumberChange} value={this.state.memberPhoneNumber} placeholder="Phone Number input"/> 

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
                            if(this.state.createOrUpdate === "create")
                            {
                            this.createMember({
                                FullName: this.state.memberFullName,
                                PhoneNumber: this.state.memberPhoneNumber,
                                Email: this.state.memberEmail,
                                MembershipType: this.state.memberMembershipType
                            });
                            }
                            else if(this.state.createOrUpdate === "update")
                            {
                                this.updateMember({
                                    MemberID: this.state.memberIdTmp,
                                    FullName: this.state.memberFullName,
                                    PhoneNumber: this.state.memberPhoneNumber,
                                    Email: this.state.memberEmail,
                                    MembershipType: this.state.memberMembershipType
                                }); 
                            }
                        }

                        this.setState({modalShow: false,
                            memberFullName : "",
                            memberPhoneNumber: "",
                            memberEmail : "",
                            memberMembershipType: "",
                            createOrUpdate: ""
                    })}}>Save</Button>

                    <Button variant="danger" onClick={() => this.setState({modalShow: false,
                                        memberFullName : "",
                                        memberPhoneNumber: "",
                                        memberEmail : "",
                                        memberMembershipType: "",
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
                        <th> <Button  variant="warning" onClick={() => this.setState({modalShow: true,
                                                                                        createOrUpdate: "update",
                                                                                        memberIdTmp : ele.MemberID,
                                                                                        memberFullName : ele.FullName,
                                                                                        memberPhoneNumber: ele.PhoneNumber,
                                                                                        memberEmail : ele.Email,
                                                                                        memberMembershipType: ele.MembershipType})}>Edit</Button></th>
                        <th> <Button onClick={() => this.deleteMember(ele.MemberID)}variant="danger">Delete</Button></th>
                    </tr>
                }) : null}    
                
                </tbody>
    </Table>
    </>)
    }
}

export default Member;

