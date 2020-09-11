import React from 'react';

class CustomerDelete extends React.Component{

    deleteCustomer(id){
        const url = '/api/customers/'+ id;
        fetch(url, { //해당 url에 접속했을 때 실행됨
            method: 'DELETE'
        });
        this.props.stateRefresh(); //삭제 완료 후 삭제된 목록으로 새로고침
    }
    render(){
        return(
            <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
        )
    }
}

export default CustomerDelete;