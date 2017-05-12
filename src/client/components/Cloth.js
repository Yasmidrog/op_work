import React, {PropTypes, Component} from 'react';
import "./Cloth.css"

class Cloth extends Component {
    render() {
        return (
            <div className="cloth">
                <div className="param">{this.props.cloth.name}</div>
                <div className="param">{this.props.cloth.cost} р.</div>
                <div className="param">{this.props.cloth.amount} шт.</div>
                {
                    <div className='remove'>
                        {this.props.login.isAuthenticated && (  <span onClick={() => {
                            this.props.remove(this.props.cloth.vcode)
                        }} className="sort_btn">[X]</span>)}

                        {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}

                        <span onClick={() => {
                            this.props.choose(this.props.cloth);
                        }} className="sort_btn">Редакт./инфо</span></div>}
            </div>
        );
    }
}

Cloth.propTypes = {
    cloth: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired
};

export default Cloth;



