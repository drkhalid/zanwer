import React, {Component } from 'react'
import { Table,Button,ButtonGroup } from 'reactstrap';
import "../../node_modules/bootstrap/dist/css/bootstrap.css"


// import { Link } from 'gatsby'
import {FireApp} from "../database/firebase"
import Layout from '../components/layout'

const Firestore = FireApp.firestore();
Firestore.settings({ timestampsInSnapshots: true });



class IndexPage extends Component {


  state ={
    data: []
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

    click = x=> {
      console.log(this.state.data)
    }


  render (){
    return (<Layout>      
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
          {this.state.data.map(x=>(
            <tr key={x.id}>
             <td>
               <ButtonGroup>
                 <Button className="btn-danger">Delete</Button>
                 <Button className="btn-warning">Edit</Button>
               </ButtonGroup>
             </td>
             <td>{x.note}</td>
             <td>{x.theyOwe}</td>
             <td>{x.owe}</td>
             <td>{x.date}</td>
             <td>{x.place}</td>
             <td>{x.no}</td>
           </tr>
          ))}
        </tbody>
      </Table>      
      </Layout>
    )
  }
}


export default IndexPage
