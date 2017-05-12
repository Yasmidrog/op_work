import React, {PropTypes, Component} from 'react';
import "./Header.css"
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: null,
            for_whom: null
        }
    }

    changed(e) {
        this.setState({...this.state, filter: e.target.value || null});
        if(e.target.value.length<1)
        { this.props.retrieveGoods(null); return}
        this.props.retrieveGoods({filter:this.state.filter||null});
    }

    render() {
        return (
            <div className="header">
                <ul>
                    <li className="brand">Магазин одежды</li>
                    <li><input value={this.state.filter||''} type="text" onFocus={this.changed.bind(this)} onChange={
                        this.changed.bind(this)}/>

                        <span className="clear" onClick={
                        (e) => {
                            this.setState({...this.state, filter: null});
                            this.props.retrieveGoods(null);
                        }}> {'\u00A0'}{'\u00A0'}X{'\u00A0'} </span></li>
                    <li>
                        { [{label: "Детское", value: "П"},
                            {label: "Женское", value: "Д"},
                            {label: "Мужское", value: "М"}].map((c) => {
                            return (<span className="span" key={c.label} onClick={()=>{
                                this.props.retrieveGoods({
                                    filter: this.state.filter||'',
                                    for_whom: c.value
                                })}}>{c.label} </span>)
                        })
                        }
                    </li>
                    <li>   {this.props.isAuthenticated && (<button className="exit" onClick={() => {
                        this.props.logout();
                    }}> Выйти
                    </button>)}
                    </li>


                </ul>


            </div>
        );
    }
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    retrieveGoods: PropTypes.func.isRequired,
};

export default Header;
















