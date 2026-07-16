import { DndContext } from "@dnd-kit/core";
import "../css/ProductSorting.css";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { act, createElement, useEffect, useState } from "react";

const ProductSorting = () => {

    let productName = ['商品A','商品B'];

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
        setNotAp({[product]: product});
    }

    let inputUsed = (product) => {
        setUsed({[product]: product});
    }

    useEffect(() => {
        setNotAp(productName);
    },[]);

    console.log(notAp);

    //商品格納(コントローラーが出来次第データベースのデータを格納)
    // useEffect(() => {
    //     setNotAp({
    //         [productName]: productName,
    //     });
    //     }, []
    // );


    const handleDragEnd = (event) => {
        const { active, over } = event;

        const type = active.data.current.type;

        if (over) {

            //未定義リスト
            if(over.id === 'drop-area' && type != 'notAp'){

                const name = active.data.current.name;

                console.log(name);
                setNotAp((notAp) => [...notAp, name]);

                //「使う」の要素削除用
                if(type === 'used'){
                    setUsed(used.filter(value => value != name))
                }

                //「捨てる」の要素削除用
                if(type === 'trash'){
                    setTrash(trash.filter(value => value != name))
                }

                //「売る」の要素削除用
                if(type === 'cell'){
                    setCell(cell.filter(value => value != name))
                }

                //「あげる」の要素削除用
                if(type === 'give'){
                    setGive(give.filter(value => value != name))
                }

                //「その他」の要素削除用
                if(type === 'other'){
                    setOther(other.filter(value => value != name))
                }

            }




            //使用リスト
            if(over.id === 'drop-area1' && type != 'used'){

                const name = active.data.current.name;
                const type = active.data.current.type;

                console.log(name);
                setUsed((used) => [...used, name]);

                //「未定義」の要素削除用
                if(type === 'notAp'){
                    setNotAp(notAp.filter(value => value != name))
                }

                //「捨てる」の要素削除用
                if(type === 'trash'){
                    setTrash(trash.filter(value => value != name))
                }

                //「売る」の要素削除用
                if(type === 'cell'){
                    setCell(cell.filter(value => value != name))
                }

                //「あげる」の要素削除用
                if(type === 'give'){
                    setGive(give.filter(value => value != name))
                }

                //「その他」の要素削除用
                if(type === 'other'){
                    setOther(other.filter(value => value != name))
                }

            }

            console.log(
            `${active.id} を ${over.id} にドロップ`
            );
        }
    };



    return (

        <DndContext onDragEnd={handleDragEnd}>

            <header>
                <h1>ムダログ</h1>
            </header>

            <hr />


            <nav className="button-Tab">
                <button>使用</button>
                <button>捨てる</button>
                <button>売る</button>
                <button>あげる</button>
                <button>その他</button>
            </nav>

            <div className="list-Set">
                <div className="noAp-Box">
                    <Droppable id="drop-area">
                        <h3 className="drop-Title">未適用</h3>
                        <div id="notAp-Table">
                            {notAp.map((notAp,index) =>
                                <Draggable key={index} id={notAp} name={notAp} type='notAp'>
                                    <div>
                                        {notAp}
                                    </div>
                                </Draggable>
                            )}
                        </div>
                    </Droppable>
                </div>


                <div className="used-Box">
                    <Droppable id="drop-area1">
                        <h3 className="drop-Title">使う</h3>
                        <div id="category-Table">
                            {used.map((use,index) =>
                                <Draggable key={index} id={use} name={use} type='used'>
                                    <div className="category-Td">
                                        {use}
                                    </div>
                                </Draggable>
                            
                            
                            )}
                        </div>
                    </Droppable>
                </div>
            </div>

        </DndContext>
    );
};

export default ProductSorting;