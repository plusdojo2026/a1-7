import { useState } from 'react';

const ProductUpdate = () => {
    // 検索
    const [query, setQuery] = useState("");

    // 詳細表示
    const [selectedProduct, setSelectedProduct] = useState(null);

    // 編集モード 
    const [editMode, setEditMode] = useState(false);

    // 編集開始
    const handleEdit = () => {
        if (selectedProduct) {
            setEditData(selectedProduct);
            setEditMode(true);
        }
    };
    // リセット
    const handleReset = () => {
        if (selectedProduct) {
            setEditData(selectedProduct);
        }
    };
    // 更新
    const handleUpdate = () => {
        setSelectedProduct(editData);
        setEditMode(false);

        // API更新処理
    };

    //編集フォーム
    const [editData, setEditData] = useState({
        name: "",
        date: "",
        category: "",
        price: "",
        evaluation: "",
        purchaseprice: "",
        memo: "",
    });

    // 削除
    const handleDelete = () => {
        console.log("削除しました");

        // APIやデータベース削除処理
    };

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

            {/* 詳細表示 */}
            {selectedProduct && !editMode && (
                <div>

                    <h2>詳細</h2>
                    <p>商品名: {selectedProduct.name}</p>
                    <p>日時: {selectedProduct.date}</p>
                    <p>カテゴリ: {selectedProduct.category}</p>
                    <p>価格: {selectedProduct.price}</p>
                    <p>評価: {selectedProduct.evaluation}</p>
                    <p>買取価格: {selectedProduct.purchaseprice}</p>
                    <p>メモ: {selectedProduct.memo}</p>
                    <button onClick={handleEdit}>編集</button>
                </div >
            )}

            {/* 編集フォーム */}
            {editMode && (
                <div>
                    <h2>編集</h2>

                    <label>
                        商品名:
                        <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({
                                ...editData, name: e.target.value,
                            })
                            }
                        />
                    </label>

                    <br />
                    <label>
                        日時:
                        <input
                            type="text"
                            value={editData.date}
                            onChange={(e) => setEditData({
                                ...editData, date: e.target.value,
                            })
                            }
                        />
                    </label>
                    <label>
                        カテゴリ:
                        <input
                            type="text"
                            value={editData.category}
                            onChange={(e) => setEditData({
                                ...editData, category: e.target.value,
                            })
                            }
                        />
                    </label>
                    <label>
                        価格:
                        <input
                            type="number"
                            value={editData.price}
                            onChange={(e) => setEditData({
                                ...editData, price: e.target.value,
                            })
                            }
                        />
                    </label>
                    <label>
                        評価:
                        <input
                            type="text"
                            value={editData.evaluation}
                            onChange={(e) => setEditData({
                                ...editData, evaluation: e.target.value,
                            })
                            }
                        />
                    </label>
                    <label>
                        買取価格:
                        <input
                            type="number"
                            value={editData.purchaseprice}
                            onChange={(e) => setEditData({
                                ...editData, purchaseprice: e.target.value,
                            })
                            }
                        />
                    </label>
                    <label>
                        メモ:
                        <input
                            type="text"
                            value={editData.memo}
                            onChange={(e) => setEditData({
                                ...editData, memo: e.target.value,
                            })
                            }
                        />
                    </label>
                </div>
            )}

            <button onClick={handleReset}>リセット</button>
            <button onClick={handleUpdate}>更新</button>
            <button onClick={handleDelete}>ゴミ箱</button>
        </div>
    );
};

export default ProductUpdate;














