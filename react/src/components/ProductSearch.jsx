import { useState } from 'react';
// import '../css/ProductSearch.css';
import Select from "react-select";
import BottomNav from "./BottomNav";
import Header from "./Header";
import axios from "axios";

function ProductSearch() {
    const [keyword, setKeyWord] = useState('');
    const [category, setCategory] = useState('');
    const [priceRange, setpriceRange] = useState('');
    const [productSort, setproductSort] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [results, setResults] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalStep, setModalStep] = useState(0);
    const [modWaste, setModWaste] = useState({});

    const options = [
        { value: "1", label: "衣類" },
        { value: "2", label: "食品" },
        { value: "3", label: "電子機器" },
        { value: "4", label: "雑貨" },
        { value: "5", label: "サービス" },
        { value: "6", label: "その他" }
    ];

    const categoryMap = {
        1: "衣類",
        2: "食品",
        3: "電子機器",
        4: "雑貨",
        5: "サービス",
        6: "その他"
    };

    let sortBy = '';
    let direction = '';
    if(productSort) {
        const [field, dir] = productSort.split(',');
        sortBy = field;
        direction = dir;
    }

    const handleSearch = async () => {
        let minPrice = '';
        let maxPrice = '';

        if (priceRange) {
          const [min, max] = priceRange.split('-');
          minPrice = min || ''; 
          maxPrice = max || '';
        }
        try {
            const response = await axios.get('http://localhost:8080/api/products/search', {
                params: {
                    keyword,
                    category,
                    minPrice,
                    maxPrice,
                    startDate,
                    endDate,
                    sortBy,
                    direction
                }
            });
            setResults(response.data);
        } catch(error) {
            console.error('検索エラー:', error);
        }
    };

    const modWasteStart = (product) => {
        setModWaste({ ...product });
        setModalStep(2);
        setShowModal(true);
    };

    const inputModWaste = (e) => {
        const { name, value } = e.target;
        setModWaste({ ...modWaste, [name]: value });
    };

    const handleReset = () => {
        setModWaste({});
    };

    const updateWaste = async () => {
        const formattedModWaste = {
            ...modWaste,
            buyDate: modWaste.buyDate ? modWaste.buyDate.replace(' ', 'T') : null,
            sellingPrice: Number(modWaste.sellingPrice),
            purchasePrice: modWaste.purchasePrice ? Number(modWaste.purchasePrice) : null,
            valuation: String(modWaste.valuation)
        };

        try {
            await axios.post('/api/waste/mod/', formattedModWaste);
            handleSearch();
        } catch (error) {
            console.error('更新エラー:', error);
            handleSearch();
        }
    };

    const deleteWaste = async () => {
        if (!modWaste.id) return;
        try {
            await axios.post('/api/waste/del/', { id: modWaste.id });
            handleSearch();
        } catch (error) {
            console.error('削除エラー:', error);
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <>
            <Header/>
            <div className="container">
                
                <h2 className="title">商品検索</h2>

                <div className="formGroup">
                    <div className="search-row full-width">
                        <input 
                            type='text'
                            placeholder='キーワード検索'
                            value={keyword}
                            onChange={(e) => setKeyWord(e.target.value)}
                            className="input"
                        />
                    </div>
                    
                    <div className="search-row two-columns">
                        <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                            className="select"
                        >
                            <option value="">カテゴリを選択</option>
                            <option value="1">衣類</option>
                            <option value="2">食品</option>
                            <option value="3">電子機器</option>
                            <option value="4">雑貨</option>
                            <option value="5">サービス</option>
                            <option value="6">その他</option>
                        </select>

                        <select 
                            value={priceRange} 
                            onChange={(e) => setpriceRange(e.target.value)}
                            className="select"
                        >
                            <option value="">すべての価格</option>
                            <option value="0-1000">0～1000円</option>
                            <option value="1000-5000">1000～5000円</option>
                            <option value="5000-10000">5000～10000円</option>
                            <option value="10000-20000">10000～20000円</option>
                            <option value="20000-50000">20000～50000円</option>
                            <option value="50000-">50000円～</option>
                        </select>
                    </div>

                    <div className="search-row date-range-container">
                        <div className="date-input-group">
                            <label className="date-label">開始日</label>
                            <input
                                type='date'
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="input"
                            />
                        </div>
                        <span className="date-wave">～</span>
                        <div className="date-input-group">
                            <label className="date-label">終了日</label>
                            <input
                                type='date'
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="input"
                            />
                        </div>
                    </div>

                    <div className="search-row full-width">
                        <select 
                            value={productSort} 
                            onChange={(e) => setproductSort(e.target.value)}
                            className="select"
                        >
                            <option value=''>並び替え</option>
                            <option value="buyDate,asc">日付：昇順</option>
                            <option value="buyDate,desc">日付：降順</option>
                            <option value="sellingPrice,asc">金額：昇順</option>
                            <option value="sellingPrice,desc">金額：降順</option>
                            <option value="valuation,asc">評価：昇順</option>
                            <option value="valuation,desc">評価：降順</option>
                        </select>
                    </div>

                    <div className="search-row full-width">
                        <button 
                            type='button' 
                            onClick={handleSearch}
                            className="searchButton"
                        >
                            検索
                        </button>
                    </div>
                </div>
                
                <div className="tableContainer">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="th">商品名</th>
                                <th className="th">カテゴリ</th>
                                <th className="th">価格</th>
                                <th className="th">購入日</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.length > 0 ? (
                                results.map((product) => (
                                    <tr 
                                        key={product.id} 
                                        className="tr wasterow" 
                                        onClick={() => modWasteStart(product)}
                                    >
                                        <td className="td">{product.name}</td>
                                        <td className="td">{categoryMap[product.category]}</td>
                                        <td className="td">{product.sellingPrice}円</td>
                                        <td className="td">{product.buyDate ? product.buyDate.substring(0, 10) : ''}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="tr">
                                    <td colSpan="4" className="emptyMessage">データがありません</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {showModal && modalStep === 2 && (
                    <div className="modal-overlay" onClick={toggleModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3>商品詳細・編集</h3>
                                <button className="modal-close-btn" onClick={toggleModal}>×</button>
                            </div>
                            <div className="modal-body">
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
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>商品名</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            value={modWaste.name || ''} 
                                            onChange={inputModWaste} 
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
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>備考</label>
                                        <textarea 
                                            name="memo"
                                            rows="3"
                                            value={modWaste.memo || ''}
                                            onChange={inputModWaste}
                                        ></textarea>
                                    </div>
                                    
                                    <div className="form-actions">
                                        <button className="btn-back" onClick={() => { setModalStep(0); setShowModal(false); }}>◀ 閉じる</button>
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
                            </div>
                        </div>
                    </div>
                )}

            </div>
            <BottomNav/>
        </>
    );
}

export default ProductSearch;