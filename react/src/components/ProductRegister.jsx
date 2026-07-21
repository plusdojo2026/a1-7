import { useState } from 'react';
//import styles from './ProductRegister.module.css';
const ProductRegister = () => {

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
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};
export default ProductRegister;