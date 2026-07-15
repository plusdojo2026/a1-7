import { DndContext } from "@dnd-kit/core";
import "../css/ProductSorting.css";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { createElement, useState } from "react";

const ProductSorting = () => {

    let productName = '商品A';

    //未適用リスト
    let [notAp, setNotAp] = useState([]);

    //使用リスト
    let [used, setUsed] = useState([]);

    //捨てるリスト
    let [trash, setTrash] = useState([]);

    //売るリスト
    let [cell, setCell] = useState([]);

    //あげるリスト
    let [give, setGive] = useState([]);

    //その他リスト
    let [other, setOther] = useState([]);

    //Json用格納処理
    let inputNotAp = (product) => {
        setNotAp({ ...notAp, [product.target.name]: product.target.value});
    }


    //商品格納(コントローラーが出来次第データベースのデータを格納)
    setNotAp({...notAp, [productName]:productName});



    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over) {
            inputNotAp(active.name);

            console.log(
            `${active.id} を ${over.id} にドロップ`
            );
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>

            <Draggable id="product-1">
            <div value={productName}></div>
            </Draggable>

            <Droppable id="drop-area">
                
            </Droppable>

        </DndContext>
    );
};

export default ProductSorting;