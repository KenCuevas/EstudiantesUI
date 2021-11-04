import axios from 'axios';

export class StudentService{
    BASEURL = 'https://student-api-claro.herokuapp.com/api/v2/';
    getAll(){
        return axios.get(this.BASEURL + "student/all").then(res => res.data);
    }

    save(student){
        return axios.post(this.BASEURL + "student/add", student).then(res => res.data)
    }
    edit (id){
        return axios.put(this.BASEURL + "replaceStudent/" +id).then(res => res.data)
    }
    delete(id){
        return axios.delete(this.BASEURL + "deleteStudent/" +id).then(res => res.data)
    }

}