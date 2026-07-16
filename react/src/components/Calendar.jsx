import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import Select from 'react-select';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css'; 
import './Calendar.css'; 

const MyCalendar = () => {
  const [waste, setWaste] = useState([]);
  const products = window.products || {};
  const [comment, setComment] = useState("ここにメモやコメントを表示。");
  const [modalStep, setModalStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const formattedSelectedDate = selectedDate 
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
    : '';

  const dailyWastes = waste.filter(w => w.date === formattedSelectedDate);

  const firstForm = {
    id: '',
    userId: products.userId || '',
    name: '',
    date: '',
    category: '',
    price: '',
    evaluation: 0,
    purchasePrice: '',
    memo: ''         
  };

  const secondForm = {
    id: products.id || '',
    userId: products.userId || '',
    name: products.name || '',
    date: products.date || '',
    category: products.category || '',
    price: products.price || '',
    evaluation: products.evaluation || 0,
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

  const refreshWasteList = () => {
    fetch('/api/waste/')
    .then(response => response.json())
    .then(json => setWaste(json || []))
    .catch(err => console.error(err));
  };

  const addNewWaste = () => {
    axios.post('/api/waste/add/', newWaste)
    .then(response => {
      refreshWasteList();
    })
    .catch(err => {
      console.error(err);
      refreshWasteList();
    });
  };

  const updateWaste = () => {
    axios.post('/api/waste/mod', modWaste)
    .then(response => {
      refreshWasteList();
    })
    .catch(err => {
      console.error(err);
      refreshWasteList();
    });
  };

  const deleteWaste = (index) => {
    axios.post('/api/waste/del', {id: dailyWastes[index].id})
    .then(response => {
      refreshWasteList();
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
      date: clickedDateStr
    });

    setShowModal(true);
  };

  const handleReset = () => {
    if (modalStep === 1) {
      setNewWaste({
        ...firstForm,
        date: formattedSelectedDate
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
      <div className="comment-wrapper">
        <h3>コメント</h3>
        <p className='comment-section'>{comment}</p>
      </div>

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
                              <td className="date">{item.date}</td>
                              <td className="name">{item.name}</td>
                              <td className="price">{item.price}</td>
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
                      value={options.find(opt => opt.value === newWaste.category) || null}
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
                      name="price" 
                      value={newWaste.price} 
                      onChange={inputNewWaste} 
                      placeholder="価格を入力"
                    />
                  </div>

                  <div className="form-group">
                    <label>評価</label>
                    <div className="evaluation-stars">
                      {[1, 2, 3, 4, 5].map((starCount) => (
                        <span
                          key={starCount}
                          className={`evaluation-star ${starCount <= newWaste.evaluation ? 'active' : ''}`}
                          onClick={() => setNewWaste({ ...newWaste, evaluation: starCount })}>
                          {starCount <= newWaste.evaluation ? '★' : '☆'}
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
                      alert('保存しました！');
                      addNewWaste();
                      setNewWaste(firstForm);
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
                      type="date" 
                      name="date" 
                      value={modWaste.date} 
                      onChange={inputModWaste} 
                      placeholder="日付を選択"
                    />
                  </div>
                  <div className="form-group">
                    <label>商品名</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={modWaste.name} 
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
                      value={options.find(opt => opt.value === modWaste.category) || null}
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
                      name="price" 
                      value={modWaste.price} 
                      onChange={inputModWaste} 
                      placeholder="価格を入力"
                    />
                  </div>

                  <div className="form-group">
                    <label>評価</label>
                    <div className="evaluation-stars">
                      {[1, 2, 3, 4, 5].map((starCount) => (
                        <span
                          key={starCount}
                          className={`evaluation-star ${starCount <= modWaste.evaluation ? 'active' : ''}`}
                          onClick={() => setModWaste({ ...modWaste, evaluation: starCount })}
                        >
                          {starCount <= modWaste.evaluation ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>買取価格</label>
                    <input 
                      type="text" 
                      name="purchasePrice" 
                      value={modWaste.purchasePrice} 
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
                      value={modWaste.memo}
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