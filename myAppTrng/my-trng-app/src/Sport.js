import React,{Component} from 'react';
import axios from 'axios'
import {Table, Button, Modal, Form} from "react-bootstrap";

export class Sport extends Component{

    state = {
        sports: [],
        sportSportsName : "",
        sportDescription: "",
        sportDifficult : "",
        sportMonthlyMembershipFee: "",
        sportIdTmp: 0,
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
            url: `http://localhost:62936/api/sports`
        }).then(response => 
            {   
                const sportsGet = response.data.Value;
                this.setState( {sports: sportsGet});
            })
    }

    createSport = (data) =>
    {
        axios({
            method: "POST",
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            url: `http://localhost:62936/api/sports`,
            data: data
        }).then(response => 
            {   
                const sport = response.data;
                this.setState( {sports:[...this.state.sports, sport] });
            }) 
    }

    deleteSport = (data) =>
    {
        axios({
            method: "DELETE",
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            url: `http://localhost:62936/api/sports/${data}`
        }).then(response => 
            {   
                const sportDel = response.data;
                this.setState( {sports: this.state.sports.filter(el => el.SportID !== sportDel)});
            })
            .catch((err) => {
                window.alert("This sport can't be deleted because it is assigned to one or more training.");
                }) 
    }

    updateSport = (data) =>
    {
        axios({
            method: "PUT",
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            url: `http://localhost:62936/api/sports`,
            data: data
        }).then(response => 
            {   
                const sport = response.data;
                this.setState( {sports: this.state.sports.map(e => {
                    if(e.SportID === sport.SportID){
                        return sport;
                    }
                    return e;
                })});
            }) 
    }

    handleSportsNameChange = (e) => this.setState({sportSportsName: e.target.value});
    handleSportDescriptionChange = (e) => this.setState({sportDescription: e.target.value});
    handleSportDifficultChange = (e) => this.setState({sportDifficult: e.target.value});
    handleSportMonthlyMembershipFeeChange = (e) => this.setState({sportMonthlyMembershipFee: e.target.value});


    render(){
        return(
            <>
          <div style={{textAlign:"center", marginBottom: "10px"}}>
                <Button  variant="success" onClick={() => this.setState({modalShow: true, createOrUpdate: "create"})}>Create new Sport</Button> 
                <Modal
                show={this.state.modalShow}
                    onHide={() => this.setState({modalShow: false,
                                                sportSportsName : "",
                                                sportDescription: "",
                                                sportDifficult : "",
                                                sportMonthlyMembershipFee: "",
                                                createOrUpdate: ""})}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Create or Edit Sport
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <Form.Group >
                        <Form.Label>Sport Name: </Form.Label>
                        <Form.Control type="text" onChange={this.handleSportsNameChange} value={this.state.sportSportsName} placeholder="Sport Name input"/>

                        <Form.Label>Description: </Form.Label>
                        <Form.Control type="text" onChange={this.handleSportDescriptionChange} value={this.state.sportDescription} placeholder="Description input"/> 

                        <Form.Label>Difficult: </Form.Label>
                        <Form.Control type="text" onChange={this.handleSportDifficultChange} value={this.state.sportDifficult} placeholder="Difficult input"/> 

                        <Form.Label>Monthly Membership Fee: </Form.Label>
                        <Form.Control type="text" onChange={this.handleSportMonthlyMembershipFeeChange} value={this.state.sportMonthlyMembershipFee} placeholder="Monthly Membership Fee input"/>            
                    </Form.Group>

                    </Modal.Body>

                    <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        if(this.state.sportSportsName === ""){
                            window.alert("Please enter sports name");
                        }
                        else if(this.state.sportDescription === "")
                        {
                            window.alert("Please enter description");
                        }
                        else if(this.state.sportDifficult === "")
                        {
                            window.alert("Please enter difficult");
                        }
                        else if(this.state.sportMonthlyMembershipFee === "")
                        {
                            window.alert("Please enter monthly membership fee");
                        }
                        else{
                            if(this.state.createOrUpdate === "create")
                            {
                            this.createSport({
                                SportsName: this.state.sportSportsName,
                                Description: this.state.sportDescription,
                                Difficult: this.state.sportDifficult,
                                MonthlyMembershipFee: this.state.sportMonthlyMembershipFee
                            });
                            }
                            else if(this.state.createOrUpdate === "update")
                            {
                                this.updateSport({
                                    SportID: this.state.sportIdTmp,
                                    SportsName: this.state.sportSportsName,
                                    Description: this.state.sportDescription,
                                    Difficult: this.state.sportDifficult,
                                    MonthlyMembershipFee: this.state.sportMonthlyMembershipFee
                                }); 
                            }
                        }

                        this.setState({modalShow: false,
                            sportSportsName : "",
                            sportDescription: "",
                            sportDifficult : "",
                            sportMonthlyMembershipFee: "",
                            createOrUpdate: ""
                    })}}>Save</Button>

                    <Button variant="danger" onClick={() => this.setState({modalShow: false,
                                        sportSportsName : "",
                                        sportDescription: "",
                                        sportDifficult : "",
                                        sportMonthlyMembershipFee: "",
                                        createOrUpdate: ""
                                })}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>  
    <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>Sport name</th>
                <th>Description</th>
                <th>Difficult</th>
                <th>Monthly Membership Fee</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {this.state.sports.length > 0 ?  this.state.sports.map((ele, index) => {
                    return <tr key={index}>
                        <td>{ele.SportsName}</td>
                        <td>{ele.Description}</td>
                        <td>{ele.Difficult}</td>
                        <td>{ele.MonthlyMembershipFee}</td>
                        <th> <Button  variant="warning" onClick={() => this.setState({modalShow: true,
                                                                                        createOrUpdate: "update",
                                                                                        sportIdTmp : ele.SportID,
                                                                                        sportSportsName : ele.SportsName,
                                                                                        sportDescription: ele.Description,
                                                                                        sportDifficult : ele.Difficult,
                                                                                        sportMonthlyMembershipFee: ele.MonthlyMembershipFee})}>Edit</Button></th>
                        <th> <Button onClick={() => this.deleteSport(ele.SportID)}variant="danger">Delete</Button></th>
                    </tr>
                }) : null}    
                
                </tbody>
    </Table>
    </>)
    }
}

export default Sport;