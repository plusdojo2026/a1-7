import { useState } from 'react';
//import styles from './ProductSearch.module.css';
import Select from "react-select";

import axios from "axios";

const ProductSearch = () => {

    // 検索
    const [query, setQuery] = useState("");

    // 購入日
    const [purchaseDate, setPurchaseDate] = useState("");

    // カテゴリ
    const [category, setCategory] = useState("");

    // 価格帯
    const [price, setPrice] = useState("");

    // 並び替え
    const [sort, setSort] = useState("asc");

    // 選択した商品ID
    const [selectedId, setSelectedId] = useState("");

    // 商品一覧
    const [items] = useState([
        {
            id: 1,
            name: "白Tシャツ",
            date: "2026-07-13",
            category: "トップス",
            price: 3000
        },
        {
            id: 2,
            name: "黒スニーカー",
            date: "2026-07-15",
            category: "シューズ",
            price: 12000
        }
    ]);

    //　詳細・編集
    const [modalStep, setModalStep] = useState(0);

    const [modWaste, setModWaste] = useState({
        buyDate: "",
        name: "",
        category: "",
        sellingPrice: "",
        valuation: 0,
        purchasePrice: "",
        memo: ""
    });

    const options = [
        { value: "トップス", label: "トップス" },
        { value: "ボトムス", label: "ボトムス" },
        { value: "アウター", label: "アウター" },
        { value: "シューズ", label: "シューズ" },
        { value: "アクセサリー", label: "アクセサリー" }
    ];

    const inputModWaste = (e) => {
        setModWaste({
            ...modWaste,
            [e.target.name]: e.target.value
        });
    };

    const handleReset = () => {
        setModWaste({
            buyDate: "",
            name: "",
            category: "",
            sellingPrice: "",
            valuation: 0,
            purchasePrice: "",
            memo: ""
        });
    };

    const updateWaste = () => {
        axios.post("http://localhost:8080/api/waste/mod", modWaste)
            .then(() => {
                alert("更新しました");
            })
            .catch((err) => {
                console.error(err);
                alert("更新に失敗しました");
            });
    };

    const deleteWaste = () => {
        axios.post("http://localhost:8080/api/waste/del", {
            id: modWaste.id
        })
            .then(() => {
                alert("削除しました");
            })
            .catch((err) => {
                console.error(err);
                alert("削除に失敗しました");
            });
    };

    const [showModal, setShowModal] = useState(false);

    return (
        <div /*className={styles.container}*/>
            <h1>ムダログ</h1>

            {/* 検索 */}
            <input
                type="text"
                placeholder="商品を検索"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <br />
            <br />

            {/* 購入日 */}
            <input
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
            />

            <br />
            <br />

            {/* カテゴリ */}
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">カテゴリ</option>
                <option value="トップス">トップス</option>
                <option value="ボトムス"> ボトムス</option>
                <option value="アウター">アウター</option>
                <option value="シューズ"> シューズ</option>
                <option value="アクセサリー">アクセサリー</option>
            </select>

            <br />
            <br />

            { /* 価格 */}
            <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            >

                <option value="">価格</option>
                <option value="0-1000">0~1000円</option>
                <option value="1000~3000">1000~3000円</option>
                <option value="3000~5000">3000円~5000円</option>
                <option value="5000~10000">5000~10000円</option>
            </select>

            <br />
            <br />

            {/* 並び替え */}
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
            >

                <option value="">並び替え</option>
                <option value="new">新しい順</option>
                <option value="old">古い順</option>
                <option value="high">価格が高い順</option>
                <option value="low">価格が安い順</option>
            </select>

            <hr />

            {/* 商品一覧 */}
            <div>
                <select
                    value={selectedId}
                    onChange={(e) => setSelectedId(Number(e.target.value))}
                >
                    <option value="">-- 選択してください --</option>

                    {items.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>

            <hr />

            {/* 選択した商品の表示 */}
            {selectedId !== "" && (
                <div>
                    {items
                        .filter((item) => item.id === selectedId)
                        .map((item) => (
                            <div key={item.id}>
                                <p>商品名 : {item.name}</p>
                                <p>購入日 : {item.date}</p>
                                <p>カテゴリ : {item.category}</p>
                                <p>価格 : {item.price}円</p>

                                <button
                                    onClick={() => {
                                        setModWaste({
                                            id: item.id,
                                            buyDate: item.date,
                                            name: item.name,
                                            category: item.category,
                                            sellingPrice: item.price,
                                            valuation: 0,
                                            purchasePrice: "",
                                            memo: ""
                                        });

                                        setShowModal(true);
                                        setModalStep(2);
                                    }}
                                >
                                    編集
                                </button>
                            </div>
                        ))}
                </div>
            )}

            {/*検索ページ詳細・編集 */}
            {showModal && modalStep === 2 && (
                <div className="form-container">
                    <div className="form-group">
                        <label>日付</label>
                        <input
                            type="datetime-local"
                            name="buyDate"
                            value={
                                modWaste.buyDate
                                    ? modWaste.buyDate.replace(' ', 'T').substring(0, 16)
                                    : ''
                            }
                            onChange={inputModWaste}
                            placeholder="日付を選択"
                        />
                    </div>
                    <div className="form-group">
                        <label>商品名</label>
                        <input
                            type="text"
                            name="name"
                            value={modWaste.name || ''}
                            onChange={inputModWaste}
                            placeholder="商品名を入力"
                        />
                    </div>

                    <div className="form-group">
                        <label>カテゴリー</label>
                        <Select
                            options={options}
                            onChange={(selectedOption) => setModWaste({
                                ...modWaste,
                                category: selectedOption ? selectedOption.value : ''
                            })}
                            value={options.find(opt => opt.value === String(modWaste.category)) || null}
                            placeholder="選択してください"
                            isClearable
                            className="react-select-container"
                            classNamePrefix="react-select"
                        />
                    </div>

                    <div className="form-group">
                        <label>価格</label>
                        <input
                            type="text"
                            name="sellingPrice"
                            value={modWaste.sellingPrice || ''}
                            onChange={inputModWaste}
                            placeholder="価格を入力"
                        />
                    </div>

                    <div className="form-group">
                        <label>評価</label>
                        <div className="valuation-stars">
                            {[1, 2, 3, 4, 5].map((starCount) => (
                                <span
                                    key={starCount}
                                    className={`valuation-star ${starCount <= modWaste.valuation ? 'active' : ''}`}
                                    onClick={() => setModWaste({ ...modWaste, valuation: starCount })}
                                >
                                    {starCount <= modWaste.valuation ? '★' : '☆'}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>買取価格</label>
                        <input
                            type="text"
                            name="purchasePrice"
                            value={modWaste.purchasePrice || ''}
                            onChange={inputModWaste}
                            placeholder="買取価格を入力"
                        />
                    </div>

                    <div className="form-group">
                        <label>備考</label>
                        <textarea
                            name="memo"
                            placeholder="次回買うものなど自由に入力してください"
                            rows="3"
                            value={modWaste.memo || ''}
                            onChange={inputModWaste}
                        ></textarea>
                    </div>

                    <div className="form-actions">
                        <button className="btn-back" onClick={() => setModalStep(0)}>◀ 戻る</button>
                        <button className="btn-reset" onClick={handleReset}>リセット</button>
                        <button className="btn-submit" onClick={() => {
                            alert('保存しました！');
                            updateWaste();
                            setShowModal(false);
                        }}>✅ 保存</button>
                        <button className="btn-delete" onClick={() => {
                            alert('削除しました!');
                            deleteWaste();
                            setShowModal(false);
                        }}>削除</button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ProductSearch;

