import { DndContext, DragOverlay, PointerSensor, TouchSensor ,useSensor, useSensors} from "@dnd-kit/core";
import "../css/ProductSorting.css";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { act, createElement, useEffect, useState } from "react";
import axios from "axios";



const ProductSorting = () => {

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor, {
        activationConstraint: {
            delay: 150,
            tolerance: 5
        }
        })
    );



    const [activeItem, setActiveItem] = useState(null);


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

    //現在表示しているタブ
    let [active, setActive] = useState("used");


    //チェック済みリスト用
    //すべてリスト
    let [all, setAll] = useState([]);

    //使用リスト
    let [used2, setUsed2] = useState([]);

    //捨てるリスト
    let [trash2, setTrash2] = useState([]);

    //売るリスト
    let [cell2, setCell2] = useState([]);

    //あげるリスト
    let [give2, setGive2] = useState([]);

    //その他リスト
    let [other2, setOther2] = useState([]);

    //現在表示しているタブ
    let [active2, setActive2] = useState("used");




    //スライドコンテンツ
    let [open, setOpen] = useState(false);


    //チェックリスト追加、削除
    const OnCheck = (content_id,useType, obj,e) => {
        console.log("OnBUTTON" + e.target.checked);
        //追加処理
        if(e.target.checked === true){
            console.log(useType);
            if(useType === 'used'){
                const newObj = {...obj, ap_type: 1, checkBox: true};
                setUsed2((used2) => [...used2, newObj]);
                setAll((all) => [...all, newObj]);
                //削除
                setUsed(used.filter(value => value.id != content_id))
                console.log("削除");
            }
            else if(useType === 'trash'){
                const newObj = {...obj, ap_type: 2, checkBox: true};
                setTrash2((trash2) => [...trash2, newObj]);
                setAll((all) => [...all, newObj]);
                //削除
                setTrash(trash.filter(value => value.id != content_id))
                console.log("削除");
            }
            else if(useType === 'cell'){
                const newObj = {...obj, ap_type: 3, checkBox: true};
                setCell2((cell2) => [...cell2, newObj]);
                setAll((all) => [...all, newObj]);
                //削除
                setCell(cell.filter(value => value.id != content_id))
                console.log("削除");
            }
            else if(useType === 'give'){
                const newObj = {...obj, ap_type: 4, checkBox: true};
                setGive2((give2) => [...give2, newObj]);
                setAll((all) => [...all, newObj]);
                //削除
                setGive(give.filter(value => value.id != content_id))
                console.log("削除");
            }
            else if(useType === 'other'){
                const newObj = {...obj, ap_type: 5, checkBox: true};
                setOther2((other2) => [...other2, newObj]);
                setAll((all) => [...all, newObj]);
                //削除
                setOther(other.filter(value => value.id != content_id))
                console.log("削除");
            }
        }
        //削除処理
        else{
            console.log(useType);
            if(useType === 'used'){
                const newObj = {...obj, ap_type: 1, checkBox: false};
                setUsed((used) => [...used, newObj]);
                //削除
                setUsed2(used2.filter(value => value.id != content_id))
                setAll(all.filter(value => value.id != content_id))
                console.log("削除");
            }
            if(useType === 'trash'){
                const newObj = {...obj, ap_type: 2, checkBox: false};
                setTrash((trash) => [...trash, newObj]);
                //削除
                setTrash2(trash2.filter(value => value.id != content_id))
                setAll(all.filter(value => value.id != content_id))
                console.log("削除");
            }
            if(useType === 'cell'){
                const newObj = {...obj, ap_type: 3, checkBox: false};
                setCell((cell) => [...cell, newObj]);
                //削除
                setCell2(cell2.filter(value => value.id != content_id))
                setAll(all.filter(value => value.id != content_id))
                console.log("削除");
            }
            if(useType === 'give'){
                const newObj = {...obj, ap_type: 4, checkBox: false};
                setGive((give) => [...give, newObj]);
                //削除
                setGive2(give2.filter(value => value.id != content_id))
                setAll(all.filter(value => value.id != content_id))
                console.log("削除");
            }
            if(useType === 'other'){
                const newObj = {...obj, ap_type: 5, checkBox: false};
                setOther((other) => [...other, newObj]);
                //削除
                setOther2(other2.filter(value => value.id != content_id))
                setAll(all.filter(value => value.id != content_id))
                console.log("削除");
            }
            if(useType === 'all'){
                const newObj = {...obj, checkBox: false};
                if(newObj.ap_type === 1){
                    setUsed((used) => [...used, newObj]);
                    //削除
                    setUsed2(used2.filter(value => value.id != content_id))
                    setAll(all.filter(value => value.id != content_id))
                    console.log("削除");
                }
                else if(newObj.ap_type === 2){
                    setTrash((trash) => [...trash, newObj]);
                    //削除
                    setTrash2(trash2.filter(value => value.id != content_id))
                    setAll(all.filter(value => value.id != content_id))
                    console.log("削除");
                }
                else if(newObj.ap_type === 3){
                    setCell((cell) => [...cell, newObj]);
                    //削除
                    setCell2(cell2.filter(value => value.id != content_id))
                    setAll(all.filter(value => value.id != content_id))
                    console.log("削除");
                }
                else if(newObj.ap_type === 4){
                    setGive((give) => [...give, newObj]);
                    //削除
                    setGive2(give2.filter(value => value.id != content_id))
                    setAll(all.filter(value => value.id != content_id))
                    console.log("削除");
                }
                else if(newObj.ap_type === 5){
                    setOther((other) => [...other, newObj]);
                    //削除
                    setOther2(other2.filter(value => value.id != content_id))
                    setAll(all.filter(value => value.id != content_id))
                    console.log("削除");
                }
            }
        }
    }





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
        setNotAp(list.filter(p => p.ap_type === 0 && p.checkBox != true));
        setUsed(list.filter(p => p.ap_type === 1 && p.checkBox != true));
        setTrash(list.filter(p => p.ap_type === 2 && p.checkBox != true));
        setCell(list.filter(p => p.ap_type === 3 && p.checkBox != true));
        setGive(list.filter(p => p.ap_type === 4 && p.checkBox != true));
        setOther(list.filter(p => p.ap_type === 5 && p.checkBox != true));

        //チェック済みリスト用
        console.log(list.checkBox, list.checkBox);
        setAll(list.filter(p => p.checkBox === true));
        setUsed2(list.filter(p => p.ap_type === 1 && p.checkBox === true));
        setTrash2(list.filter(p => p.ap_type === 2 && p.checkBox === true));
        setCell2(list.filter(p => p.ap_type === 3 && p.checkBox === true));
        setGive2(list.filter(p => p.ap_type === 4 && p.checkBox === true));
        setOther2(list.filter(p => p.ap_type === 5 && p.checkBox === true));

        console.log("仕分け後リスト"+cell);
    };


    //仕分けをデータベースに送信
    let addSortList = () => {
        const margeList = [...notAp,...used,...trash,...cell,...give,...other,...all];
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
            //チェック済み
            setUsed2([]);
            setTrash2([]);
            setCell2([]);
            setGive2([]);
            setOther2([]);
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


    const handleDragStart = (event) => {
        setActiveItem(event.active.data.current);
        document.body.style.overflow = "hidden";     // スクロール禁止
        document.body.style.touchAction = "none";    // スワイプ禁止
    };


    const handleDragEnd = (event) => {

        document.body.style.overflow = "auto";       // スクロール解除
        document.body.style.touchAction = "auto";
        
        setActiveItem(null);

        const { active, over } = event;

        const type = active.data.current.type;


        if (over) {
            

            //未定義リスト
            if(over.id === 'drop-area' && type != 'notAp'){

                const name = active.data.current.name;
                const curId = active.id;
                const obj = active.data.current.obj;

                console.log("cur="+curId);
                const newObj = {...obj, ap_type: 0};
                setNotAp((notAp) => [...notAp, newObj]);

                console.log('setNot='+notAp);

                //「使う」の要素削除用
                if(type === 'used'){
                    setUsed(used.filter(value => value.id != curId))
                }

                //「捨てる」の要素削除用
                if(type === 'trash'){
                    setTrash(trash.filter(value => value.id != curId))
                }

                //「売る」の要素削除用
                if(type === 'cell'){
                    setCell(cell.filter(value => value.id != curId))
                }

                //「あげる」の要素削除用
                if(type === 'give'){
                    setGive(give.filter(value => value.id != curId))
                }

                //「その他」の要素削除用
                if(type === 'other'){
                    setOther(other.filter(value => value.id != curId))
                }

            }



            //使うリスト
            if(over.id === 'drop-area1' && type != 'used'){

                const name = active.data.current.name;
                const obj = active.data.current.obj;
                const curId = active.id;
                const check_info = active.data.current.check_inf;

    

                console.log(name);
                const newObj = {...obj, ap_type: 1};
                setUsed((used) => [...used, newObj]);

                //「未定義」の要素削除用
                if(type === 'notAp'){
                    setNotAp(notAp.filter(value => value.id != curId))
                }

                //「捨てる」の要素削除用
                if(type === 'trash'){
                    setTrash(trash.filter(value => value.id != curId))
                }

                //「売る」の要素削除用
                if(type === 'cell'){
                    setCell(cell.filter(value => value.id != curId))
                }

                //「あげる」の要素削除用
                if(type === 'give'){
                    setGive(give.filter(value => value.id != curId))
                }

                //「その他」の要素削除用
                if(type === 'other'){
                    setOther(other.filter(value => value.id != curId))
                }


            }



            //すてるリスト
            if(over.id === 'drop-area2' && type != 'trash'){

                const name = active.data.current.name;
                const type = active.data.current.type;
                const obj = active.data.current.obj;
                const curId = active.id;

                console.log(trash);
                const newObj = {...obj, ap_type: 2};
                setTrash((trash) => [...trash, newObj]);

                //「未定義」の要素削除用
                if(type === 'notAp'){
                    setNotAp(notAp.filter(value => value.id != curId))
                }

                //「使う」の要素削除用
                if(type === 'used'){
                    setTrash(used.filter(value => value.id != curId))
                }

                //「売る」の要素削除用
                if(type === 'cell'){
                    setCell(cell.filter(value => value.id != curId))
                }

                //「あげる」の要素削除用
                if(type === 'give'){
                    setGive(give.filter(value => value.id != curId))
                }

                //「その他」の要素削除用
                if(type === 'other'){
                    setOther(other.filter(value => value.id != curId))
                }

            }


            //売るリスト
            if(over.id === 'drop-area3' && type != 'cell'){

                const name = active.data.current.name;
                const type = active.data.current.type;
                const obj = active.data.current.obj;
                const curId = active.id;

                console.log(cell);
                const newObj = {...obj, ap_type: 3};
                setCell((cell) => [...cell, newObj]);

                //「未定義」の要素削除用
                if(type === 'notAp'){
                    setNotAp(notAp.filter(value => value.id != curId))
                }

                //「使う」の要素削除用
                if(type === 'used'){
                    setUsed(used.filter(value => value.id != curId))
                }

                //「すてる」の要素削除用
                if(type === 'trash'){
                    setTrash(trash.filter(value => value.id != curId))
                }

                //「あげる」の要素削除用
                if(type === 'give'){
                    setGive(give.filter(value => value.id != curId))
                }

                //「その他」の要素削除用
                if(type === 'other'){
                    setOther(other.filter(value => value.id != curId))
                }

            }



            //あげるリスト
            if(over.id === 'drop-area4' && type != 'give'){

                const name = active.data.current.name;
                const type = active.data.current.type;
                const obj = active.data.current.obj;
                const curId = active.id;

                console.log(give);
                const newObj = {...obj, ap_type: 4};
                setGive((give) => [...give, newObj]);

                //「未定義」の要素削除用
                if(type === 'notAp'){
                    setNotAp(notAp.filter(value => value.id != curId))
                }

                //「捨てる」の要素削除用
                if(type === 'trash'){
                    setTrash(trash.filter(value => value.id != curId))
                }

                //「使う」の要素削除用
                if(type === 'used'){
                    setUsed(used.filter(value => value.id != curId))
                }

                //「売る」の要素削除用
                if(type === 'cell'){
                    setCell(cell.filter(value => value.id != curId))
                }

                //「その他」の要素削除用
                if(type === 'other'){
                    setOther(other.filter(value => value.id != curId))
                }

            }


            //その他リスト
            if(over.id === 'drop-area5' && type != 'other'){

                const name = active.data.current.name;
                const type = active.data.current.type;
                const obj = active.data.current.obj;
                const curId = active.id;

                console.log(other);
                const newObj = {...obj, ap_type: 5};
                setOther((other) => [...other, newObj]);

                //「未定義」の要素削除用
                if(type === 'notAp'){
                    setNotAp(notAp.filter(value => value.id != curId))
                }

                //「捨てる」の要素削除用
                if(type === 'trash'){
                    setTrash(trash.filter(value => value.id != curId))
                }

                //「売る」の要素削除用
                if(type === 'cell'){
                    setCell(cell.filter(value => value.id != curId))
                }

                //「あげる」の要素削除用
                if(type === 'give'){
                    setGive(give.filter(value => value.id != curId))
                }

                //「使う」の要素削除用
                if(type === 'used'){
                    setUsed(used.filter(value => value.id != curId))
                }

            }


            //チェック済みリスト
            if(over.id === 'drop-area6' && type != 'checked'){

                const name = active.data.current.name;
                const obj = active.data.current.obj;
                const curId = active.id;

                console.log(name);
                const newObj = {...obj, ap_type: 6};
                setChecked((checked) => [...checked, newObj]);

                //「未定義」の要素削除用
                if(type === 'notAp'){
                    setNotAp(notAp.filter(value => value.id != curId))
                }

                //「使う」の要素削除用
                if(type === 'used'){
                    setUsed(used.filter(value => value.id != curId))
                }

                //「捨てる」の要素削除用
                if(type === 'trash'){
                    setTrash(trash.filter(value => value.id != curId))
                }

                //「売る」の要素削除用
                if(type === 'cell'){
                    setCell(cell.filter(value => value.id != curId))
                }

                //「あげる」の要素削除用
                if(type === 'give'){
                    setGive(give.filter(value => value.id != curId))
                }

                //「その他」の要素削除用
                if(type === 'other'){
                    setOther(other.filter(value => value.id != curId))
                }

            }


            console.log(
            `${active.id} を ${over.id} にドロップ`
            );
        }
    };



    function ItemView({ item }) {
    return (
        <div className="item-view">
            {item.name}
        </div>
    );
    }




    return (

        <DndContext sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}>





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


                <DragOverlay>
                    {activeItem ? (
                    <div className="overlay-item">
                        {activeItem ? <ItemView item={activeItem} /> : null}
                    </div>
                    ) : null}
                </DragOverlay>



                    <Droppable id="drop-area">
                        <h3 className="drop-Title">未適用</h3>
                        <div id="notAp-Table" className="notAp-Table">
                            {notAp.map((notApEle,index) =>
                                <Draggable key={notApEle.id} id={notApEle.id} name={notApEle.name} type='notAp' obj={notApEle} ac={activeItem ? true : false}>
                                {activeItem ? null : notApEle.name}
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
                                    <div className="content">
                                        <Draggable key={use.id} id={use.id} name={use.name} type='used' obj={use} ac={activeItem ? (activeItem.id === use.id ? true : false) : ""}>

                                        {activeItem ? null : use.name}
                                        
                                        </Draggable>
                                        <input
                                        type="checkbox"
                                        key={`used-${use.id}`}
                                        id={`used-${use.id}`}
                                        onChange={(e) => OnCheck(use.id,"used", use, e)}
                                        />
                                    </div>
                                
                                
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
                                    <div className="content">
                                        <Draggable key={trashEle.id} id={trashEle.id} name={trashEle.name} type='trash' obj={trashEle} ac={activeItem ? (activeItem.id === trashEle.id ? true : false) : ""}>
                                            
                                        {trashEle.name}

                                        </Draggable>
                                        <input
                                        type="checkbox"
                                        key={`trash-${trashEle.id}`}
                                        id={`trash-${trashEle.id}`}
                                        onChange={(e) => OnCheck(trashEle.id,"trash", trashEle, e)}
                                        />
                                    </div>
                                
                                
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
                                    <div className="content">
                                        <Draggable key={cellEle.id} id={cellEle.id} name={cellEle.name} type='cell' obj={cellEle} ac={activeItem ? (activeItem.id === cellEle.id ? true : false) : ""}>
                                            
                                        {cellEle.name}

                                        </Draggable>
                                        <input
                                        type="checkbox"
                                        key={`cell-${cellEle.id}`}
                                        id={`cell-${cellEle.id}`}
                                        onChange={(e) => OnCheck(cellEle.id,"cell", cellEle, e)}
                                        />
                                    </div>
                                
                                
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
                                    <div className="content">
                                        <Draggable key={giveEle.id} id={giveEle.id} name={giveEle.name} type='give' obj={giveEle} ac={activeItem ? (activeItem.id === giveEle.id ? true : false) : ""}>
                                            
                                        {giveEle.name}

                                        </Draggable>
                                        <input
                                        type="checkbox"
                                        key={`give-${giveEle.id}`}
                                        id={`give-${giveEle.id}`}
                                        onChange={(e) => OnCheck(giveEle.id,"give", giveEle, e)}
                                        />
                                    </div>
                                
                                
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
                                    <div className="content">
                                        <Draggable key={otherEle.id} id={otherEle.id} name={otherEle.name} type='other' obj={otherEle} ac={activeItem ? (activeItem.id === otherEle.id ? true : false) : ""}>
                                            
                                        {otherEle.name}

                                        </Draggable>
                                        <input
                                        type="checkbox"
                                        key={`other-${otherEle.id}`}
                                        id={`other-${otherEle.id}`}
                                        onChange={(e) => OnCheck(otherEle.id,"other", otherEle, e)}
                                        />
                                    </div>
                                
                                
                                )}
                            </div>
                        </Droppable>
                    </div>
                )}

            </div>


            {/* チェック済みリスト */}
            <div className="checked-Box">
                <h3 className="drop-Title">チェック済みリスト</h3>
                <nav className="button-Tab">
                    <button onClick={() => setActive2("all")} className={active2 === "all" ? "all-Button" : ""}>すべて</button>
                    <button onClick={() => setActive2("used")} className={active2 === "used" ? "used-Button" : ""}>使う</button>
                    <button onClick={() => setActive2("trash")} className={active2 === "trash" ? "trash-Button" : ""}>すてる</button>
                    <button onClick={() => setActive2("cell")} className={active2 === "cell" ? "cell-Button" : ""}>売る</button>
                    <button onClick={() => setActive2("give")} className={active2 === "give" ? "give-Button" : ""}>あげる</button>
                    <button onClick={() => setActive2("other")} className={active2 === "other" ? "other-Button" : ""}>その他</button>
                </nav>
                {/* すべてタブ */}
                {active2 === "all" &&(
                    <div className="used-Box">
                        <div className="droppable2">
                            <h3 className="drop-Title">すべて</h3>
                            <div id="category-Table" className="category-Table">
                                {all.map((allEle,index) =>
                                    <div className="content">
                                        <div className="draggable2">
                                            <table className="allTable">
                                                <tr>
                                                    <td className="td-one">
                                                    {allEle.ap_type === 1 ? '使う' : allEle.ap_type === 2 ? 'すてる' : allEle.ap_type === 3 ? '売る' : allEle.ap_type === 4 ? 'あげる' : 'その他'}
                                                    </td>
                                                    <td>{allEle.name}</td>
                                                </tr>
                                            </table>
                                        </div>

                                        <input
                                        type="checkbox"
                                        className="checkBox2"
                                        key={`all-${allEle.id}`}
                                        id={`all-${allEle.id}`}
                                        onChange={(e) => OnCheck(allEle.id,"all", allEle, e)}
                                        checked
                                        />
                                        
                                    </div>
                                
                                
                                )}
                            </div>
                        </div>
                    </div>
                )}


                {/* 使用タブ */}
                {active2 === "used" &&(
                    <div className="used-Box">
                        <div className="droppable2">
                            <h3 className="drop-Title">使う</h3>
                            <div id="category-Table" className="category-Table">
                                {used2.map((use,index) =>
                                    <div className="content">
                                        <div className="draggable2">
                                            
                                        {use.name}

                                        </div>
                                        <input
                                        type="checkbox"
                                        key={`use2-${use.id}`}
                                        id={`use2-${use.id}`}
                                        onChange={(e) => OnCheck(use.id,"used", use, e)}
                                        checked
                                        />
                                    </div>
                                
                                
                                )}
                            </div>
                        </div>
                    </div>
                )}


                {/* すてる */}
                {active2 === "trash" &&(
                    <div className="used-Box">
                        <div className="droppable2">
                            <h3 className="drop-Title">すてる</h3>
                            <div id="category-Table" className="category-Table">
                                {trash2.map((trashEle,index) =>
                                    <div className="content">
                                        <div className="draggable2">
                                            
                                        {trashEle.name}

                                        </div>
                                        <input
                                        type="checkbox"
                                        key={`trash2-${trashEle.id}`}
                                        id={`trash2-${trashEle.id}`}
                                        onChange={(e) => OnCheck(trashEle.id,"trash", trashEle, e)}
                                        checked
                                        />
                                    </div>
                                
                                
                                )}
                            </div>
                        </div>
                    </div>
                )}


                {/* 売る */}
                {active2 === "cell" &&(
                    <div className="used-Box">
                        <div className="droppable2">
                            <h3 className="drop-Title">売る</h3>
                            <div id="category-Table" className="category-Table">
                                {cell2.map((cellEle,index) =>
                                    <div className="content">
                                        <div className="draggable2">
                                            
                                        {cellEle.name}

                                        </div>
                                        <input
                                        type="checkbox"
                                        key={`cell2-${cellEle.id}`}
                                        id={`cell2-${cellEle.id}`}
                                        onChange={(e) => OnCheck(cellEle.id,"cell", cellEle, e)}
                                        checked
                                        />
                                    </div>
                                
                                
                                )}
                            </div>
                        </div>
                    </div>
                )}


                {/* あげる */}
                {active2 === "give" &&(
                    <div className="used-Box">
                        <div className="droppable2">
                            <h3 className="drop-Title">あげる</h3>
                            <div id="category-Table" className="category-Table">
                                {give2.map((giveEle,index) =>
                                    <div className="content">
                                        <div className="draggable2">
                                            
                                        {giveEle.name}

                                        </div>
                                        <input
                                        type="checkbox"
                                        key={`give2-${giveEle.id}`}
                                        id={`give2-${giveEle.id}`}
                                        onChange={(e) => OnCheck(giveEle.id,"give", giveEle, e)}
                                        checked
                                        />
                                    </div>
                                
                                
                                )}
                            </div>
                        </div>
                    </div>
                )}


                {/* その他タブ */}
                {active2 === "other" &&(
                    <div className="used-Box">
                        <div className="droppable2">
                            <h3 className="drop-Title">その他</h3>
                            <div id="category-Table" className="category-Table">
                                {other2.map((otherEle,index) =>
                                    <div className="content">
                                        <div className="draggable2">
                                            
                                        {otherEle.name}

                                        </div>
                                        <input
                                        type="checkbox"
                                        key={`other2-${otherEle.id}`}
                                        id={`other2-${otherEle.id}`}
                                        onChange={(e) => OnCheck(otherEle.id,"other", otherEle, e)}
                                        checked
                                        />
                                    </div>
                                
                                
                                )}
                            </div>
                        </div>
                    </div>
                )}


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