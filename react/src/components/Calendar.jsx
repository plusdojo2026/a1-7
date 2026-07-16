import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import Select from 'react-select';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css'; 
import './Calendar.css'; 

const MyCalendar = () => {
  const [waste, setWaste] = useState([]);
  const products = window.products || {};
  const [modalStep, setModalStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const formattedSelectedDate = selectedDate 
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
    : '';

  const dailyWastes = waste.filter(w => {
    if (!w.buyDate) return false;
    const dbDateOnly = w.buyDate.substring(0, 10);
    return dbDateOnly === formattedSelectedDate;
  });

  const firstForm = {
    id: '',
    userId: 1, // NOT NULL制約エラー防止のためデフォルトで1を設定
    name: '',
    ap_type: 5, 
    buyDate: '',
    category: 1,
    sellingPrice: '',
    valuation: 0,
    purchasePrice: '',
    memo: ''         
  };

  const secondForm = {
    id: products.id,
    userId: products.userId,
    name: products.name || '',
    buyDate: products.buyDate,
    category: products.category,
    sellingPrice: products.sellingPrice,
    valuation: products.valuation || 0,
    purchasePrice: products.purchasePrice || '',
    memo: products.memo || ''         
  };

  const [newWaste, setNewWaste] = useState(firstForm);
  const [modWaste, setModWaste] = useState(secondForm);

  const inputNewWaste = (e) => {
    setNewWaste({ ...newWaste, [e.target.name]: e.target.value });
  };
  const inputModWaste = (e) => {
    setModWaste({ ...modWaste, [e.target.name]: e.target.value })
  };
  
  const handleSelectChange = (selectedOption) => {
    setNewWaste({
      ...newWaste,
      category: selectedOption ? selectedOption.value : ''
    });
  };

  const modWasteStart = (index) => {
    setModWaste(dailyWastes[index]);
    setModalStep(2);
  };

  useEffect(() => {
    refreshWasteList();
  }, []);

  // ★ 統一：URLの末尾に「/」を付与
  const refreshWasteList = () => {
    fetch('/api/waste/')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(json => setWaste(json || []))
    .catch(err => console.error("データ取得エラー:", err));
  };

  // ★ 統一：URLの末尾に「/」を付与
  const addNewWaste = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const currentTimeStr = `${hours}:${minutes}:${seconds}`;
    
    // YYYY-MM-DDTHH:mm:ss 形式の現在日時
    const currentDateTimeIso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${currentTimeStr}`;
    
    const wasteWithDateTime = {
      ...newWaste,
      userId: newWaste.userId || 1,
      buyDate: `${newWaste.buyDate}T${currentTimeStr}`, 
      sellingPrice: Number(newWaste.sellingPrice),
      purchasePrice: newWaste.purchasePrice ? Number(newWaste.purchasePrice) : null, 
      valuation: String(newWaste.valuation), // Spring Boot側の String 型に合わせる
      createdAt: currentDateTimeIso 
    };

    axios.post('/api/waste/add/', wasteWithDateTime)
    .then(response => {
      refreshWasteList();
      setNewWaste(firstForm);
    })
    .catch(err => {
      console.error("登録エラー詳細:", err.response ? err.response.data : err.message);
      refreshWasteList();
    });
  };

  // ★ 統一：URLの末尾に「/」を付与
  const updateWaste = () => {
    const formattedModWaste = {
      ...modWaste,
      buyDate: modWaste.buyDate ? modWaste.buyDate.replace(' ', 'T') : null,
      sellingPrice: Number(modWaste.sellingPrice),
      purchasePrice: modWaste.purchasePrice ? Number(modWaste.purchasePrice) : null,
      valuation: String(modWaste.valuation)
    };

    axios.post('/api/waste/mod/', formattedModWaste)
    .then(response => {
      refreshWasteList();
    })
    .catch(err => {
      console.error(err);
      refreshWasteList();
    });
  };

  // ★ 統一：URLの末尾に「/」を付与
  const deleteWaste = () => {
    if (!modWaste.id) return;
    axios.post('/api/waste/del/', { id: modWaste.id })
    .then(response => {
      refreshWasteList();
    })
    .catch(err => {
      console.error(err);
    });
  };

  const options = [
    { value: '1', label: '衣類' },
    { value: '2', label: '食品' },
    { value: '3', label: '電子機器' },
    { value: '4', label: '雑貨' },
    { value: '5', label: 'サービス' },
    { value: '6', label: 'その他' }
  ];

  const handleDayClick = (value) => {
    setSelectedDate(value);
    setModalStep(0);
    
    const clickedDateStr = `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;

    setNewWaste({
      ...firstForm,
      buyDate: clickedDateStr
    });

    setShowModal(true);
  };

  const handleReset = () => {
    if (modalStep === 1) {
      setNewWaste({
        ...firstForm,
        buyDate: formattedSelectedDate
      });
    } else if (modalStep === 2) {
      setModWaste(secondForm);
    }
  };
  
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="calendar-container">
      {/* ★ 修正：コメント欄部分を丸ごと削除 */}

      <div className="calendar-wrapper">
        <p className="calendar-title">カレンダー</p>
        <Calendar onClickDay={handleDayClick}/>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>

            <div className="modal-header">
              <h3>
                {modalStep === 0 && "メニュー選択"}
                {modalStep === 1 && "新規登録"}
                {modalStep === 2 && "登録情報確認"}
              </h3>
              <button className="modal-close-btn" onClick={toggleModal}>×</button>
            </div>

            <div className="modal-body">
              {modalStep === 0 && (
                <div className="menu-buttons">
                  <div className="step-container">
                    <button className="menu-btn primary" onClick={() => setModalStep(1)}>+ 新規登録</button>
                    {dailyWastes.length > 0 && (
                      <table>
                        <thead>
                          <tr>
                            <th>日付</th>
                            <th>商品名</th>
                            <th>金額</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dailyWastes.map((item, index) => (
                            <tr className="wasterow" key={index} onClick={() => modWasteStart(index)}>
                              <td className="date">{item.buyDate ? item.buyDate.substring(0, 10) : ''}</td>
                              <td className="name">{item.name}</td>
                              <td className="price">{item.sellingPrice}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {modalStep === 1 && (
                <div className="form-container">
                  <p className="selected-date">日付: <span>{selectedDate ? selectedDate.toLocaleDateString() : ''}</span></p>
                  
                  <div className="form-group">
                    <label>商品名</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={newWaste.name} 
                      onChange={inputNewWaste} 
                      placeholder="商品名を入力"
                    />
                  </div>

                  <div className="form-group">
                    <label>カテゴリー</label>
                    <Select
                      options={options}
                      onChange={handleSelectChange}
                      value={options.find(opt => opt.value === String(newWaste.category)) || null}
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
                      value={newWaste.sellingPrice} 
                      onChange={inputNewWaste} 
                      placeholder="価格を入力"
                    />
                  </div>

                  <div className="form-group">
                    <label>評価</label>
                    <div className="valuation-stars">
                      {[1, 2, 3, 4, 5].map((starCount) => (
                        <span
                          key={starCount}
                          className={`valuation-star ${starCount <= newWaste.valuation ? 'active' : ''}`}
                          onClick={() => setNewWaste({ ...newWaste, valuation: starCount })}>
                          {starCount <= newWaste.valuation ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>買取価格</label>
                    <input 
                      type="text" 
                      name="purchasePrice" 
                      value={newWaste.purchasePrice} 
                      onChange={inputNewWaste} 
                      placeholder="買取価格を入力"
                    />
                  </div>

                  <div className="form-group">
                    <label>備考</label>
                    <textarea 
                      name="memo"
                      placeholder="次回買うものなど自由に入力してください" 
                      rows="3"
                      value={newWaste.memo}
                      onChange={inputNewWaste}
                    ></textarea>
                  </div>
                  
                  <div className="form-actions">
                    <button className="btn-back" onClick={() => setModalStep(0)}>◀ 戻る</button>
                    <button className="btn-reset" onClick={handleReset}>リセット</button>
                    <button className="btn-submit" onClick={() => {
                      addNewWaste();
                      alert('保存しました！');
                      setShowModal(false);
                    }}>✅ 登録</button>
                  </div>
                </div>
              )}

              {modalStep === 2 && (
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
                    <button className="btn-back" onClick={() => setModalStep(0) }>◀ 戻る</button>
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

          </div>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;