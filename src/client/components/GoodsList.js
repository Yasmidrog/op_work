import React, {PropTypes, Component} from 'react';
import Cloth from './Cloth';
import './GoodsList.css'
class GoodsList extends Component {
    render() {
        const goods = this.props.goods;
        let crit = [{name:"name", val:"Название"}, {name:"cost", val:"Цена"}, {name:"amount", val:"Кол-во"}];


        return (
            <div className="list" >
                <div className="list_head">
                {goods[0] && crit.map((c) => {
                    return (
                        <div key={c.name} className="row">
                           {c.val}:<button className="sort_btn" onClick={() => {
                                this.props.actions.sortGoods({
                                    name: c.name,
                                    order: -1
                                });
                            }}>[▼]
                            </button><button className="sort_btn" onClick={() => {
                                this.props.actions.sortGoods({
                                    name: c.name,
                                    order: 1
                                });
                            }}>[▲]
                            </button>
                        </div>)

                })}
                <button className="sort_btn update" onClick={() => {
                    this.props.actions.retrieveGoods();
                }}>Обновить
                </button>
                </div>
                {this.props.goods.map((g) =>
                    <Cloth choose={(g) => this.props.choose(g)} remove={this.props.actions.remove}
                           login={this.props.login} key={g.vcode} cloth={g}/>
                )}
            </div>
        );
    }
}
GoodsList.propTypes = {
    goods: PropTypes.array.isRequired
};

export default GoodsList;
