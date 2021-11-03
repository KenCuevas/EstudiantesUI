import React, { Component } from 'react';

import './App.css';
import { StudentService } from './service/StudentService';
import {DataTable} from 'primereact/datatable'
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


export default class App extends Component{
  constructor(){
    super();
    this.state = {
        visible: false,
        student: {
        id: null,
        name: null,
        lastname: null,
        identity: null,
        birthday: null,
        age: null,
        sex: null,
        grade: null
      },
      selectedStudent : [

      ]
    };

    this.items = [
      {
        label : 'Nuevo registro',
        icon  : 'pi pi-fw pi-plus',
        command : () => {this.showSaveDialog()}
      },
      {
        label : 'Editar registro',
        icon  : 'pi pi-fw pi-pencil',
        command : () => {this.showEditDialog()}
      },
      {
        label : 'Eliminar registro',
        icon  : 'pi pi-fw pi-trash',
        command : () => {this.delete()}
      }
    ];
    
    this.StudentService = new StudentService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this)
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }
  componentDidMount(){
    this.StudentService.getAll().then(data => this.setState({Student: data}));


  }
  save(){
    this.StudentService.save(this.state.student).then(data => {
      this.setState({
        visable : false,
        student: {
          id: null,
          name: null,
          lastname: null,
          identity: null,
          birthday: null,
          age: null,
          sex: null,
          grade: null
        }
      });
      this.StudentService.getAll().then(data => this.setState({Student: data}));
    }) 
  }

  delete(){
    if(window.confirm("Esta seguro que desea eliminar el registro?")){
      this.StudentService.delete(this.state.selectedStudent.id).then(data => {
      this.StudentService.getAll().then(data => this.setState({Student: data}));
      })
    }
  }

  render() {
    return (
      <div style={{with:'80%', margin:'0 auto', marginTop: '25px'}}>
        <Menubar model={this.items}/>
        <br/>
         <Panel header="React Crud Pruebas Claro">
        <DataTable value={this.state.Student} paginator={true} rows="6" rowsPerPageOptions={[2,8,15]} selectionMode="single" filter={true}  selection={this.state.selectedStudent} onSelectionChange={e => this.setState({ selectedStudent: e.value })}>
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Nombre"></Column>
          <Column field="lastname" header="Apellido"></Column>
          <Column field="identity" header="Identificacion"></Column>
          <Column field="birthday" header="Nacimiento"></Column>
          <Column field="age" header="Edad"></Column>
          <Column field="sex" header="Genero"></Column>
          <Column field="grade" header="Grado academico"></Column>
        </DataTable>
      </Panel>
      <Dialog header="Agregar nuevo estudiante" visible={this.state.visible} style={{ width: '400px' }} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
          <form id="student-form">
          <span className="p-float-label">
            <InputText value={this.state.student.name}style={{witdh:'100%'}}id="name" onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
              let student = Object.assign({}, prevState.student)
              student.name = val


              return { student }
            })}}/>
            <label htmlFor="name">Nombre</label>
          </span>
          <br/>
          <span className="p-float-label">
            <InputText value={this.state.student.lastname} filter filterPlaceholder="Search by name" style={{witdh:'100%'}}id="apellido" onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
              let student = Object.assign({}, prevState.student)
              student.lastname = val


              return { student }
            })}}/>
            <label htmlFor="apellido">Apellido</label>
          </span>
          <br/>
          <span className="p-float-label">
            <InputText value={this.state.student.identity}style={{witdh:'100%'}}id="identidad" onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
              let student = Object.assign({}, prevState.student)
              student.identity = val


              return { student }
            })}}/>
            <label htmlFor="identidad">Identidad</label>
          </span>
          <br/>
          <span className="p-float-label">
          <Calendar value={this.state.student.birthday}showIcon style={{witdh:'100%'}} id="birthday" onChange={(e) => { 
            let val = e.target.value;
            this.setState(prevState => {
            let student = Object.assign({}, prevState.student)
            student.birthday = val
            
            return { student }
          })}}/>
          <label htmlFor="birthday">Fecha de nacimiento</label>
          </span>
          <br/>

          <span className="p-float-label">
            <InputText value={this.state.student.age}style={{witdh:'100%'}} id="age" onChange={(e) => {
              let val = e.target.value;
              this.setState(prevState => {
              let student = Object.assign({}, prevState.student)
              student.age = val


              return { student }
            })}}/>
            <label htmlFor="age">Edad</label>
          </span>
          <br/>
          <span className="p-float-label">
            <InputText value={this.state.student.sex}style={{witdh:'100%'}} id="sex" onChange={(e) => { 
              let val = e.target.value;
              this.setState(prevState => {
              let student = Object.assign({}, prevState.student)
              student.sex = val

              return { student }
            })}}/>
            <label htmlFor="sex">Genero</label>
          </span>

          <br/>
          <span className="p-float-label">
            <InputText value={this.state.student.grade} style={{witdh:'100%'}} id="grade" onChange={(e) => { 
              let val = e.target.value;
              this.setState(prevState => {
              let student = Object.assign({}, prevState.student)
              student.grade = val

              return { student }
            })}}/>
            <label htmlFor="grade">Grado academico</label>

          </span>
          </form>
       </Dialog>
      </div>
    );
  }
  showSaveDialog(){
    this.setState({
      visible : true,
      student: {
        id: null,
        name: null,
        lastname: null,
        identity: null,
        birthday: null,
        age: null,
        sex: null,
        grade: null
      }
    });
    //document.getElementById('student-form').reset()
  }
  showEditDialog(){
    this.setState({
      visable : true,
      student : {
        id: this.state.selectedStudent.id,
        name: this.state.selectedStudent.name,
        lastname: this.state.selectedStudent.lastname,
        identity: this.state.selectedStudent.identity,
        birthday: this.state.selectedStudent.birthday,
        age: this.state.selectedStudent.age,
        sex: this.state.selectedStudent.sex,
        grade: this.state.selectedStudent.grade
      }
    })
  }
}

