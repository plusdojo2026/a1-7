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

    //チェック済みリスト
    let [checked,setChecked] = useState([]);

    //現在表示しているタブ
    let [active, setActive] = useState("used");

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



            //すてるリスト
            if(over.id === 'drop-area2' && type != 'trash'){

                const name = active.data.current.name;
                const type = active.data.current.type;

                console.log(trash);
                setTrash((trash) => [...trash, name]);

                //「未定義」の要素削除用
                if(type === 'notAp'){
                    setNotAp(notAp.filter(value => value != name))
                }

                //「使う」の要素削除用
                if(type === 'used'){
                    setTrash(used.filter(value => value != name))
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


            //売るリスト
            if(over.id === 'drop-area3' && type != 'cell'){

                const name = active.data.current.name;
                const type = active.data.current.type;

                console.log(cell);
                setCell((cell) => [...cell, name]);

                //「未定義」の要素削除用
                if(type === 'notAp'){
                    setNotAp(notAp.filter(value => value != name))
                }

                //「使う」の要素削除用
                if(type === 'used'){
                    setUsed(used.filter(value => value != name))
                }

                //「すてる」の要素削除用
                if(type === 'trash'){
                    setTrash(trash.filter(value => value != name))
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



            //あげるリスト
            if(over.id === 'drop-area4' && type != 'give'){

                const name = active.data.current.name;
                const type = active.data.current.type;

                console.log(give);
                setGive((give) => [...give, name]);

                //「未定義」の要素削除用
                if(type === 'notAp'){
                    setNotAp(notAp.filter(value => value != name))
                }

                //「捨てる」の要素削除用
                if(type === 'trash'){
                    setTrash(trash.filter(value => value != name))
                }

                //「使う」の要素削除用
                if(type === 'used'){
                    setUsed(used.filter(value => value != name))
                }

                //「売る」の要素削除用
                if(type === 'cell'){
                    setCell(cell.filter(value => value != name))
                }

                //「その他」の要素削除用
                if(type === 'other'){
                    setOther(other.filter(value => value != name))
                }

            }


            //その他リスト
            if(over.id === 'drop-area5' && type != 'other'){

                const name = active.data.current.name;
                const type = active.data.current.type;

                console.log(other);
                setOther((other) => [...other, name]);

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

                //「使う」の要素削除用
                if(type === 'used'){
                    setUsed(used.filter(value => value != name))
                }

            }


            //チェック済みリスト
            if(over.id === 'drop-area6' && type != 'checked'){

                const name = active.data.current.name;

                console.log(name);
                setNotAp((notAp) => [...notAp, name]);

                //「未定義」の要素削除用
                if(type === 'notAp'){
                    setNotAp(notAp.filter(value => value != name))
                }

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
                <button onClick={() => setActive("used")} className={active === "used" ? "used-Button" : ""}>使う</button>
                <button onClick={() => setActive("trash")} className={active === "trash" ? "trash-Button" : ""}>すてる</button>
                <button onClick={() => setActive("cell")} className={active === "cell" ? "cell-Button" : ""}>売る</button>
                <button onClick={() => setActive("give")} className={active === "give" ? "give-Button" : ""}>あげる</button>
                <button onClick={() => setActive("other")} className={active === "other" ? "other-Button" : ""}>その他</button>
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

                {/* 使用タブ */}
                {active === "used" &&(
                    <div className="used-Box">
                        <Droppable id="drop-area1">
                            <h3 className="drop-Title">使う</h3>
                            <div id="category-Table">
                                {used.map((use,index) =>
                                    <Draggable key={index} id={use} name={use} type='used'>
                                        {use}
                                    </Draggable>
                                
                                
                                )}
                            </div>
                        </Droppable>
                    </div>
                )}


                {/* すてる */}
                {active === "trash" &&(
                    <div className="used-Box">
                        <Droppable id="drop-area2">
                            <h3 className="drop-Title">すてる</h3>
                            <div id="category-Table">
                                {trash.map((trashEle,index) =>
                                    <Draggable key={index} id={trashEle} name={trashEle} type='trash'>
                                        {trashEle}
                                    </Draggable>
                                
                                
                                )}
                            </div>
                        </Droppable>
                    </div>
                )}


                {/* 売る */}
                {active === "cell" &&(
                    <div className="used-Box">
                        <Droppable id="drop-area3">
                            <h3 className="drop-Title">売る</h3>
                            <div id="category-Table">
                                {cell.map((cellEle,index) =>
                                    <Draggable key={index} id={cellEle} name={cellEle} type='cell'>
                                        {cellEle}
                                    </Draggable>
                                
                                
                                )}
                            </div>
                        </Droppable>
                    </div>
                )}


                {/* あげる */}
                {active === "give" &&(
                    <div className="used-Box">
                        <Droppable id="drop-area4">
                            <h3 className="drop-Title">あげる</h3>
                            <div id="category-Table">
                                {give.map((giveEle,index) =>
                                    <Draggable key={index} id={giveEle} name={giveEle} type='give'>
                                        {giveEle}
                                    </Draggable>
                                
                                
                                )}
                            </div>
                        </Droppable>
                    </div>
                )}


                {/* その他タブ */}
                {active === "other" &&(
                    <div className="used-Box">
                        <Droppable id="drop-area5">
                            <h3 className="drop-Title">その他</h3>
                            <div id="category-Table">
                                {other.map((otherEle,index) =>
                                    <Draggable key={index} id={otherEle} name={otherEle} type='other'>
                                        {otherEle}
                                    </Draggable>
                                
                                
                                )}
                            </div>
                        </Droppable>
                    </div>
                )}

            </div>


            {/* チェック済みリスト */}
            <div className="checked-Box">
                <Droppable id="drop-area6">
                    <h3 className="drop-Title">チェック済みリスト</h3>
                    <div id="category-Table">
                        {checked.map((checkedEle,index) =>
                            <Draggable key={index} id={checkedEle} name={checkedEle} type='checked'>
                                {checkedEle}
                            </Draggable>
                        
                        
                        )}
                    </div>
                </Droppable>
            </div>

        </DndContext>
    );
};

export default ProductSorting;