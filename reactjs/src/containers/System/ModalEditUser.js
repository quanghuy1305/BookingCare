import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: ''
        }}
   
    componentDidMount() {
        let user = this.props.currentUser;
        if(user && !_.isEmpty(user)){
            this.setState({
                id: user.id, 
                email: user.email,
                password: 'none',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }    
    }

    toggle = () => {
        this
            .props
            .toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {

        let copyState = { ...this.state };
        copyState[id] =event.target.value;
        this.setState({
            ...copyState
        });
    }
    // validate du lieu
    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address','phoneNumber'];
        for(let i = 0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Thiếu dữ liệu: ' + arrInput[i]);
                break
            }
        }
        return isValid;
    }

    handleSaveUser = () =>{
        let isValid = this.checkValidInput();
        if(isValid === true ){
            this.props.editUser(this.state);
        }
    }
    
    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => {
                    this.toggle()
                }} className={'modal-container'} size="lg">
                <ModalHeader
                    toggle={() => {
                        this.toggle()
                    }}>Thay đổi thông tin</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label >Email</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "email")}}
                                value= {this.state.email}    
                                disabled
                                />
                        </div>
                        <div className="input-container">
                            <label >Mật khẩu</label>
                            <input
                                type="password"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "password")}}
                                    value= {this.state.password}  
                                    disabled
                                    />
                        </div>
                        <div className="input-container">
                            <label >Họ</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "firstName")}}
                                    value= {this.state.firstName}      
                                    />
                        </div>
                        <div className="input-container">
                            <label >Tên</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "lastName")}}
                                    value= {this.state.lastName}  
                                />
                        </div>
                        <div className="input-container">
                            <label >Số điện thoại</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "phoneNumber")}}
                                    value= {this.state.phoneNumber}  
                               />
                        </div>
                        <div className="input-container max-width-input">
                            <label >Địa chỉ</label>
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "address")}}
                                    value= {this.state.address}  
                                />
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => {
                            this.handleSaveUser()
                        }}>Lưu</Button>{' '}
                    <Button
                        color="secondary"
                        className="px-3"
                        onClick={() => {
                            this.toggle()
                        }}>Thoát</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
