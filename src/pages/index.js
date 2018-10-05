import React, {Component } from 'react'
import { Table, Button, ButtonGroup, Collapse, InputGroup, InputGroupText, InputGroupAddon, Input,Form } from 'reactstrap';
import "../../node_modules/bootstrap/dist/css/bootstrap.css"


// import { Link } from 'gatsby'
import {FireApp} from "../database/firebase"
import Layout from '../components/layout'

const Firestore = FireApp.firestore();
Firestore.settings({ timestampsInSnapshots: true });



class IndexPage extends Component {
  state ={
    data: [],
    newItem:{place:"",date:"",owe:"",theyOwe:"",note:""},
    formOpen:false,
    editing:false,
    currentEdit:""
    
  }

    componentDidMount() {
      
      Firestore.collection('data')
        .onSnapshot(snap => {
          this.setState({
            data: snap.docs.map(x => {
              console.log(x.data())
              return {
                ...x.data(),
                id: x.id
              }
            })
          })
        })
    }


    handleChnge =(e)=>{
      this.setState({
        newItem:{...this.state.newItem,[e.target.name]:e.target.value}
      })
    }

    handleSubmit = e=>{
      e.preventDefault();

      Firestore.collection('data').add({...this.state.newItem,["date"]:new Date().toLocaleDateString()})
      .then(res=>this.setState({newItem:{place:"",date:"",owe:"",theyOwe:"",note:""}}))
    }

    handleDelete = id =>{
      Firestore.collection('data').doc(id).delete()
    }
    handleEdit = (e) => {
      e.preventDefault()

      Firestore.collection('data').doc(this.state.currentEdit).set(this.state.newItem)
      .then(res=>this.setState({newItem:{place:"",date:"",owe:"",theyOwe:"",note:""},formOpen:false,
      editing:false,
      currentEdit:""}))
    }

  render (){
    return (
      <Layout> 
        <Button onClick={()=>this.setState({formOpen:!this.state.formOpen})}>زیاد كردن</Button>
        <div className="row my-4">
          <div className="col-12">
            <Collapse isOpen={this.state.formOpen}>
              <Form onSubmit={this.handleSubmit}>
                  <InputGroup>
                  <Input value={this.state.newItem.place} name="place" onChange={(e)=>this.handleChnge(e)} />
                  <InputGroupAddon addonType="append">
                  <InputGroupText >شوێن</InputGroupText>
                  </InputGroupAddon>
                  </InputGroup>
                <br />
                  <InputGroup>
                  <Input value={this.state.newItem.owe} name="owe" onChange={(e)=>this.handleChnge(e)} />
                  <InputGroupAddon addonType="append">
                  <InputGroupText>قه‌ردارین</InputGroupText>
                  </InputGroupAddon>
                  </InputGroup>
                <br />
                  <InputGroup>
                  <Input value={this.state.newItem.theyOwe} name="theyOwe" onChange={(e)=>this.handleChnge(e)} />
                  <InputGroupAddon name="theyOwe" addonType="append">
                  <InputGroupText>قه‌ردارمانن</InputGroupText>
                  </InputGroupAddon>
                  </InputGroup>

                <br />
                  <InputGroup>
                  <Input value={this.state.newItem.note} name="note" onChange={(e)=>this.handleChnge(e)} />
                  <InputGroupAddon addonType="append">
                  <InputGroupText>تێبینی</InputGroupText>
                  </InputGroupAddon>
                  </InputGroup>

                  <div className="form-group">

                    {this.state.editing?
                    <div className='mt-2'>
                      <button className="btn btn-success mr-2" onClick={(e)=>this.handleEdit(e)}>پاشه‌كه‌وت بكه‌</button>
                      <button className="btn btn-success" onClick={()=>this.handleSubmit()}>زیاد بكه‌</button>
                    </div>
                    :
                    <div className='mt-2'><button onClick={()=>this.handleSubmit()} className="btn btn-success">زیاد بكه‌</button></div>
                    }

                  </div>
                  
              </Form>
            </Collapse>
          </div>
        </div>
        
        <Table striped>
        <thead className="thead-dark">
          <tr>
            <th>فرمان</th>
            <th>تێبینی</th>
            <th>قه‌ردارمانن</th>
            <th>قه‌ردارین</th>
            <th>به‌روار</th>
            <th>ناوی شوێن</th>
            <th>ژماره‌</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((x,i)=>(
            <tr key={x.id}>
             <td>
               <ButtonGroup>
                 <Button onClick={()=>this.handleDelete(x.id)} className="btn-danger">Delete</Button>
                 <Button onClick={()=>this.setState({newItem:x,formOpen:true,
        editing:true,currentEdit:x.id})} className="btn-warning">Edit</Button>
               </ButtonGroup>
             </td>
             <td>{x.note}</td>
             <td>{x.theyOwe}</td>
             <td>{x.owe}</td>
             <td>{x.date}</td>
             <td>{x.place}</td>
             <td>{i+1}</td>
           </tr>
          ))}
        </tbody>
      </Table>      
      </Layout>
    )
  }
}


export default IndexPage
