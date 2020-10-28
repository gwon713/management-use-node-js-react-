import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden:{
        display: 'none'
    }
})
class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
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
        console.log(formData);
        const config = {
            headers: {
                'content-type': 'multipart/form-data' //전송하는 데이터에 대한 설정 multipart에 form-data 양식으로 전송
            }
        }
        return post(url, formData, config);
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({ // 값 초기화
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName} 
                                {/* 현재 선택된 파일이 없으면 프로필 이미지 선택이 나오게하고 파일이 선택되었으면 파일이름 출력 */}
                            </Button>
                        </label>
                        <br/>
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                        <TextField label="생년월일" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>   
                        <TextField label="성별" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="직업" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            //고객 추가 폼양식
            // <form onSubmit={this.handleFormSubmit}> 
            //     <h1>고객 추가</h1>
            //     프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
            //     이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
            //     생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>   
            //     성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
            //     직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
            //     <button type="submit">추가하기</button>
            // </form>
        )
    }

}


export default withStyles(styles)(CustomerAdd); //다른 소스에서 CustomerAdd를 사용할 수 있도록 내보내기