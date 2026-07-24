import { useState } from 'react';
//import styles from './ProductSearch.module.css';
import Select from "react-select";

import axios from "axios";

function ProductSearch(){
    const [keyword, setKeyWord] = useState('');
    const[category, setCategory] = useState('');
    const[priceRange, setpriceRange ] = useState('');
    const[startDate, setStartDate] = useState('');
    const[endDate, setEndDate] = useState('');
    const [results, setResults] = useState([]);

    const categoryMap = {
        1: "衣類",
        2: "食品",
        3: "電子機器",
        4: "雑貨",
        5: "サービス",
        6: "その他"
        };

const handleSearch = async () => { //関数の宣言　async:画面のチラつきや不自然なローディング表示をなくす設計思想
    //選ばれた priceRange ("1000-2000") をハイフンで分割する
    let minPrice = '';
    let maxPrice = '';

    if (priceRange) {
      const [min, max] = priceRange.split('-');
      minPrice = min || ''; 
      maxPrice = max || '';
    }
    try{ //エラー対応
        const response = await axios.get('http://localhost:8080/api/products/search',{//URLの末尾に条件入れ込む
            params: {
                keyword: keyword,
                category: category,
                minPrice: minPrice,
                maxPrice: maxPrice,
                startDate: startDate,
                endDate:endDate
            }
        });
        setResults(response.data);//結果がjsonで帰ってくる
    }catch(error){
        console.error('検索エラー:',error);
    }
};

    return (
    <div>
        <h2>商品検索</h2>

        <input type='text'
        placeholder='キーワード'
        value={keyword}
        onChange={(e) => setKeyWord(e.target.value)}/>
        
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">選択してください。</option>
            <option value="1">衣類</option>
            <option value="2">食品</option>
            <option value="3">電子機器</option>
            <option value="4">雑貨</option>
            <option value="5">サービス</option>
            <option value="6">その他</option>
        </select>

        <select value={priceRange} onChange={(e) => setpriceRange(e.target.value)}>
            <option value="">すべての価格</option>
            <option value="0-1000">0～1000円</option>
            <option value="1000-5000">1000～5000円</option>
            <option value="5000-10000">5000～10000円</option>
            <option value="10000-20000">10000～20000円</option>
            <option value="20000-50000">20000～50000円</option>
            <option value="50000-">50000円～</option>
        </select>

        <input
            type='date'
            value={startDate}
            onChange= {(e) => setStartDate(e.target.value)}
        />

        <input
            type='date'
            value={endDate}
            onChange= {(e) => setEndDate(e.target.value)}
        />

        <button type='button' onClick={handleSearch}>検索</button>
        <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>商品名</th>
            <th>カテゴリ</th>
            <th>価格</th>
            <th>購入日</th>
          </tr>
        </thead>
        <tbody>
          {results.length > 0 ? (
            results.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{categoryMap[product.category]}</td>
                <td>{product.sellingPrice}円</td>
                <td>{product.buyDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">データがありません</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>


    );
}
export default ProductSearch;

