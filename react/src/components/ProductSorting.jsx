import { DndContext } from "@dnd-kit/core";
import "../css/ProductSorting.css";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { act, createElement, useEffect, useState } from "react";
import axios from "axios";



const ProductSorting = () => {

    //let productName = ['商品A','商品B','商品C','商品D','商品E','商品F','商品G','商品H'];

    let [sendList, setSendList] = useState({});

    let [productName, setProductName] = useState([]);

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


    //スライドコンテンツ
    let [open, setOpen] = useState(false);


    //Json用格納処理
    let inputNotAp = (product) => {
        setNotAp({[product]: product});
    }

    let inputUsed = (product) => {
        setUsed({[product]: product});
    }


    // 商品取得
    useEffect(() => {
        fetch('http://localhost:8080/api/sorting/')
            .then(response => response.json())
            .then(json => {
                setProductName(json);
                console.log('productnameis=', json);
            });
    }, []);

    // 商品分類
    useEffect(() => {
        if (!productName || productName.length === 0) return;

        sortCategory(productName);
    }, [productName]);

    // 分類処理
    const sortCategory = (list) => {
        setNotAp(list.filter(p => p.ap_type === 0));
        setUsed(list.filter(p => p.ap_type === 1));
        setTrash(list.filter(p => p.ap_type === 2));
        setCell(list.filter(p => p.ap_type === 3));
        setGive(list.filter(p => p.ap_type === 4));
        setOther(list.filter(p => p.ap_type === 5));
        setChecked(list.filter(p => p.ap_type === 6));
        console.log("仕分け後リスト"+cell);
    };


    //仕分けをデータベースに送信
    let addSortList = () => {
        const margeList = [...notAp,...used,...trash,...cell,...give,...other,...checked];
        console.log('margeList='+margeList);

        axios.post('/api/sorting/add/', margeList).then(response => {
            refreshSortList();
            //初期化
            setNotAp([]);
            setUsed([]);
            setTrash([]);
            setCell([]);
            setGive([]);
            setOther([]);
            setChecked([]);
            //仕分け
            sortCategory(productName);
        });
    }
    // useEffect(() => {
    //     refreshBookList();
    // },[]);
    let refreshSortList = () => {
        fetch('/api/sorting/').then(response => response.json()).then(json => setProductName(json));
    }


    const handleDragEnd = (event) => {
        const { active, over } = event;

        const type = active.data.current.type;

        if (over) {

            //未定義リスト
            if(over.id === 'drop-area' && type != 'notAp'){

                const name = active.data.current.name;
                const obj = active.data.current.obj;

                console.log(name);
                const newObj = {...obj, ap_type: 0};
                setNotAp((notAp) => [...notAp, newObj]);

                console.log('setNot='+notAp);

                //「使う」の要素削除用
                if(type === 'used'){
                    setUsed(used.filter(value => value.name != name))
                }

                //「捨てる」の要素削除用
                if(type === 'trash'){
                    setTrash(trash.filter(value => value.name != name))
                }

                //「売る」の要素削除用
                if(type === 'cell'){
                    setCell(cell.filter(value => value.name != name))
                }

                //「あげる」の要素削除用
                if(type === 'give'){
                    setGive(give.filter(value => value.name != name))
                }

                //「その他」の要素削除用
                if(type === 'other'){
                    setOther(other.filter(value => value.name != name))
                }

                //「チェック済み」の要素削除用
                if(type === 'checked'){
                    setChecked(checked.filter(value => value.name != name))
                }

            }




            //使用リスト
            if(over.id === 'drop-area1' && type != 'used'){

                const name = active.data.current.name;
                const type = active.data.current.type;
                const obj = active.data.current.obj;

                console.log(name);
                const newObj = {...obj, ap_type: 1};
                setUsed((used) => [...used, newObj]);

                //「未定義」の要素削除用
                if(type === 'notAp'){
                    setNotAp(notAp.filter(value => value.name != name))
                }

                //「捨てる」の要素削除用
                if(type === 'trash'){
                    setTrash(trash.filter(value => value.name != name))
                }

                //「売る」の要素削除用
                if(type === 'cell'){
                    setCell(cell.filter(value => value.name != name))
                }

                //「あげる」の要素削除用
                if(type === 'give'){
                    setGive(give.filter(value => value.name != name))
                }

                //「その他」の要素削除用
                if(type === 'other'){
                    setOther(other.filter(value => value.name != name))
                }

                //「チェック済み」の要素削除用
                if(type === 'checked'){
                    setChecked(checked.filter(value => value.name != name))
                }

            }



            //すてるリスト
            if(over.id === 'drop-area2' && type != 'trash'){

                const name = active.data.current.name;
                const type = active.data.current.type;
                const obj = active.data.current.obj;

                console.log(trash);
                const newObj = {...obj, ap_type: 2};
                setTrash((trash) => [...trash, newObj]);

                //「未定義」の要素削除用
                if(type === 'notAp'){
                    setNotAp(notAp.filter(value => value.name != name))
                }

                //「使う」の要素削除用
                if(type === 'used'){
                    setTrash(used.filter(value => value.name != name))
                }

                //「売る」の要素削除用
                if(type === 'cell'){
                    setCell(cell.filter(value => value.name != name))
                }

                //「あげる」の要素削除用
                if(type === 'give'){
                    setGive(give.filter(value => value.name != name))
                }

                //「その他」の要素削除用
                if(type === 'other'){
                    setOther(other.filter(value => value.name != name))
                }

                //「チェック済み」の要素削除用
                if(type === 'checked'){
                    setChecked(checked.filter(value => value.name != name))
                }

            }


            //売るリスト
            if(over.id === 'drop-area3' && type != 'cell'){

                const name = active.data.current.name;
                const type = active.data.current.type;
                const obj = active.data.current.obj;

                console.log(cell);
                const newObj = {...obj, ap_type: 3};
                setCell((cell) => [...cell, newObj]);

                //「未定義」の要素削除用
                if(type === 'notAp'){
                    setNotAp(notAp.filter(value => value.name != name))
                }

                //「使う」の要素削除用
                if(type === 'used'){
                    setUsed(used.filter(value => value.name != name))
                }

                //「すてる」の要素削除用
                if(type === 'trash'){
                    setTrash(trash.filter(value => value.name != name))
                }

                //「あげる」の要素削除用
                if(type === 'give'){
                    setGive(give.filter(value => value.name != name))
                }

                //「その他」の要素削除用
                if(type === 'other'){
                    setOther(other.filter(value => value.name != name))
                }

                //「チェック済み」の要素削除用
                if(type === 'checked'){
                    setChecked(checked.filter(value => value.name != name))
                }

            }



            //あげるリスト
            if(over.id === 'drop-area4' && type != 'give'){

                const name = active.data.current.name;
                const type = active.data.current.type;
                const obj = active.data.current.obj;

                console.log(give);
                const newObj = {...obj, ap_type: 4};
                setGive((give) => [...give, newObj]);

                //「未定義」の要素削除用
                if(type === 'notAp'){
                    setNotAp(notAp.filter(value => value.name != name))
                }

                //「捨てる」の要素削除用
                if(type === 'trash'){
                    setTrash(trash.filter(value => value.name != name))
                }

                //「使う」の要素削除用
                if(type === 'used'){
                    setUsed(used.filter(value => value.name != name))
                }

                //「売る」の要素削除用
                if(type === 'cell'){
                    setCell(cell.filter(value => value.name != name))
                }

                //「その他」の要素削除用
                if(type === 'other'){
                    setOther(other.filter(value => value.name != name))
                }

                //「チェック済み」の要素削除用
                if(type === 'checked'){
                    setChecked(checked.filter(value => value.name != name))
                }

            }


            //その他リスト
            if(over.id === 'drop-area5' && type != 'other'){

                const name = active.data.current.name;
                const type = active.data.current.type;
                const obj = active.data.current.obj;

                console.log(other);
                const newObj = {...obj, ap_type: 5};
                setOther((other) => [...other, newObj]);

                //「未定義」の要素削除用
                if(type === 'notAp'){
                    setNotAp(notAp.filter(value => value.name != name))
                }

                //「捨てる」の要素削除用
                if(type === 'trash'){
                    setTrash(trash.filter(value => value.name != name))
                }

                //「売る」の要素削除用
                if(type === 'cell'){
                    setCell(cell.filter(value => value.name != name))
                }

                //「あげる」の要素削除用
                if(type === 'give'){
                    setGive(give.filter(value => value.name != name))
                }

                //「使う」の要素削除用
                if(type === 'used'){
                    setUsed(used.filter(value => value.name != name))
                }

                //「チェック済み」の要素削除用
                if(type === 'checked'){
                    setChecked(checked.filter(value => value.name != name))
                }

            }


            //チェック済みリスト
            if(over.id === 'drop-area6' && type != 'checked'){

                const name = active.data.current.name;
                const obj = active.data.current.obj;

                console.log(name);
                const newObj = {...obj, ap_type: 6};
                setChecked((checked) => [...checked, newObj]);

                //「未定義」の要素削除用
                if(type === 'notAp'){
                    setNotAp(notAp.filter(value => value.name != name))
                }

                //「使う」の要素削除用
                if(type === 'used'){
                    setUsed(used.filter(value => value.name != name))
                }

                //「捨てる」の要素削除用
                if(type === 'trash'){
                    setTrash(trash.filter(value => value.name != name))
                }

                //「売る」の要素削除用
                if(type === 'cell'){
                    setCell(cell.filter(value => value.name != name))
                }

                //「あげる」の要素削除用
                if(type === 'give'){
                    setGive(give.filter(value => value.name != name))
                }

                //「その他」の要素削除用
                if(type === 'other'){
                    setOther(other.filter(value => value.name != name))
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
                        <div id="notAp-Table" className="notAp-Table">
                            {notAp.map((notApEle,index) =>
                                <Draggable key={index} id={notApEle.name} name={notApEle.name} type='notAp' obj={notApEle}>
                                    <div className="content">
                                        {notApEle.name}<input className="checkBox" type="checkbox"></input>
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
                            <div id="category-Table" className="category-Table">
                                {used.map((use,index) =>
                                    <Draggable key={index} id={use.name} name={use.name} type='used' obj={use}>
                                        <div className="content">
                                            {use.name}<input className="checkBox" type="checkbox"></input>
                                        </div>
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
                            <div id="category-Table" className="category-Table">
                                {trash.map((trashEle,index) =>
                                    <Draggable key={index} id={trashEle.name} name={trashEle.name} type='trash' obj={trashEle}>
                                        <div className="content">
                                            {trashEle.name}<input className="checkBox" type="checkbox"></input>
                                        </div>
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
                            <div id="category-Table" className="category-Table">
                                {cell.map((cellEle,index) =>
                                    <Draggable key={index} id={cellEle.name} name={cellEle.name} type='cell' obj={cellEle}>
                                        <div className="content">
                                            {cellEle.name}<input className="checkBox" type="checkbox"></input>
                                        </div>
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
                            <div id="category-Table" className="category-Table">
                                {give.map((giveEle,index) =>
                                    <Draggable key={index} id={giveEle.name} name={giveEle.name} type='give' obj={giveEle}>
                                        <div className="content">
                                            {giveEle.name}<input className="checkBox" type="checkbox"></input>
                                        </div>
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
                            <div id="category-Table" className="category-Table">
                                {other.map((otherEle,index) =>
                                    <Draggable key={index} id={otherEle.name} name={otherEle.name} type='other' obj={otherEle}>
                                        <div className="content">
                                            {otherEle.name}<input className="checkBox" type="checkbox"></input>
                                        </div>
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
                    <nav className="button-Tab">
                        <button onClick={() => setActive("used")} className={active === "used" ? "used-Button" : ""}>使う</button>
                        <button onClick={() => setActive("trash")} className={active === "trash" ? "trash-Button" : ""}>すてる</button>
                        <button onClick={() => setActive("cell")} className={active === "cell" ? "cell-Button" : ""}>売る</button>
                        <button onClick={() => setActive("give")} className={active === "give" ? "give-Button" : ""}>あげる</button>
                        <button onClick={() => setActive("other")} className={active === "other" ? "other-Button" : ""}>その他</button>
                    </nav>
                    <div id="category-Table" className="category-Table">
                        {checked.map((checkedEle,index) =>
                            <Draggable key={index} id={checkedEle.name} name={checkedEle.name} type='checked' obj={checkedEle}>
                                <div className="content">
                                    {checkedEle.name}<input className="checkBox" type="checkbox"></input>
                                </div>
                            </Draggable>
                        
                        
                        )}
                    </div>
                </Droppable>


               {/* 左に固定された矢印ボタン（常に表示） */}
                <button
                    onClick={() => setOpen(!open)}
                    style={{
                    position: "fixed",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 1000,
                    width: 30,
                    height: 60,
                    background: "#ddd",
                    border: "none",
                    borderRadius: "8px 0 0 8px",
                    cursor: "pointer"
                    }}
                >
                    {open ? "◀" : "▶"}
                </button>

                {/* スライドするコンテンツ（矢印とは別に動く） */}
                <div
                    style={{
                    position: "fixed",
                    right: open ? 0 : -250,   // ← コンテンツだけ動かす
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 250,
                    height: 200,
                    background: "#eee",
                    borderRadius: "0 8px 8px 0",
                    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                    transition: "right 0.3s ease",
                    padding: "16px",
                    zIndex: 999
                    }}
                >
                    <button className="sortButton" onClick={() => addSortList()}>仕分け完了</button>
                </div>


            </div>

        </DndContext>
    );
};

export default ProductSorting;