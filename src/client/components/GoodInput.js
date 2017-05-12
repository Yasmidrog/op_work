import React, {PropTypes, Component} from 'react'
import {Form, Text, Select} from 'react-form'
import Number from './form-inputs/Number'
import './GoodInput.css'
class GoodInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const cloth = this.props.cloth || {};
        return (
            <Form
                onSubmit={(val) => {
                    this.props.addGood(val);
                    console.log(val)
                }}
                validate={(val) => {
                    let crit = [
                        {name: "name", val: "название"},
                        {name: "cost", val: "цену"},
                        {name: "amount", val: "кол-во"},
                        {name: "color", val: "цвет"},
                        {name: "size", val: "размер"},
                        {name: "vcode", val: "артикул"}];

                    let valid = {};

                   for(let k of crit){
                        valid[k.name] = !val[k.name] ? `Введите ${k.val}` : undefined
                    }
                    if(val.vcode&&!["М","Д", "П"].includes(val.vcode[0])){
                       valid.vcode="Артикул должен начинаться с М, Д, П"
                    }
                    if(val.size&&!["S","M", "L", "XL"].includes(val.size)){
                        valid.size="Допустимые размеры: S, M, L, XL"
                    }
                    return {...valid};
                }}
                values={{
                    name: cloth.name,
                    vcode: cloth.vcode,
                    color: cloth.color,
                    size: cloth.size,
                    cost: cloth.cost,
                    amount: cloth.amount,
                }}
            >
                {({submitForm, resetForm}) => {
                    return (
                        <form onSubmit={submitForm}>
                            <Text placeholder='Название' field='name'/>
                            <Text placeholder='Артикул' field='vcode'/>
                            <Text placeholder='Цвет' field="color"/>
                            <Text placeholder='Размер' field="size"/>
                            <label className="label_right">
                                Цена:<Number className="input_right" min={0}
                                             format="0.0[.]00" step={0.1} field="cost"/>
                            </label>
                            <label className="label_left">
                                Кол.:<Number className="input_right " format="0" min={0} field="amount"/>
                            </label>
                            <br/>
                            <button hidden={!this.props.login.isAuthenticated} onClick={resetForm} type='submit'>Отправить</button>
                        </form>
                    )
                }}
            </Form>)
    }
}

GoodInput.propTypes = {
    addGood: PropTypes.func.isRequired,
};

export default GoodInput;



