import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as goodsActions from '../actions/goods-actions';
import * as loginActions from '../actions/login-actions';
import GoodsList from './GoodsList';
import LoginForm from './LoginForm'
import GoodInput from './GoodInput';
import Header from './Header';
import "./GoodsContainer.css"
class GoodsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goods: [],
            error: null,
            current: null
        };
    }

    componentDidMount() {
        this.props.actions.retrieveGoods();
    }

    render() {
        const {goods} = this.props;
        return (
            <div className="wrapper">
                <Header logout={this.props.loginActions.logout} isAuthenticated={this.props.login.isAuthenticated}
                        retrieveGoods={this.props.actions.retrieveGoods}/>

                <div className="form-good">
                    <GoodInput cloth={this.state.current} login={this.props.login}
                               addGood={this.props.actions.addGood}/>
                    {!this.props.login.isAuthenticated && (
                        <LoginForm className="login" performLogin={this.props.loginActions.login}/>
                    )}
                    <div className="error">
                        {this.props.login.error}<br/>
                        {this.props.errors[this.props.errors.length - 1]}
                    </div>
                </div>
                <div className="list_wrap">
                    <GoodsList choose={(g) => {
                        this.setState({...this.state, current: g})
                    }} actions={this.props.actions} login={this.props.login} goods={goods}/>
                </div>
            </div>
        )
    }
}

GoodsContainer.propTypes = {
    goods: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, props) {
    console.log(state.errors);
    return {
        goods: state.goods.goods,
        login:state.login,
        errors:state.errors
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(goodsActions, dispatch),
        loginActions: bindActionCreators(loginActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsContainer);
