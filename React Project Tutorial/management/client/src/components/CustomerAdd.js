import React from 'react';
import { post } from 'axios';

class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault() // 데이터 전송오류 방지
        this.addCustomer() 
            .then((response) => { //서버로 부터 받은값 콘솔로 출력
                console.log(response.data);
                this.props.stateRefresh();// 새로고침 <- 서버로부터 addCustomer 동작을 응답받으면 실행됨
            })
        this.setState({ // 값 초기화
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })
        
    }

    handleFileChange = (e) => { //파일 값이 변경됐을 때 호출됨
        this.setState({
            file: e.target.files[0], // 다중선택x 하나의 파일만 선택전송 
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => { //일반적인 값이 변경됐을 때 호출
        let nextState = {};
        nextState[e.target.name] = e.target.value; 
        this.setState(nextState);
    }

    addCustomer = () => { //DB에 추가할 수 있도록 설정
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image',this.state.file);
        formData.append('name',this.state.userName);
        formData.append('birthday',this.state.birthday);
        formData.append('gender',this.state.gender);
        formData.append('job',this.state.job);

        const config = {
            headers: {
                'content-type': 'multipart/form-data' //전송하는 데이터에 대한 설정 multipart에 form-data 양식으로 전송
            }
        }
        return post(url, formData, config);
    }

    render(){
        return(
            //고객 추가 폼양식
            <form onSubmit={this.handleFormSubmit}> 
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>   
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }

}


export default CustomerAdd; //다른 소스에서 CustomerAdd를 사용할 수 있도록 내보내기