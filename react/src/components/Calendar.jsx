import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Select from 'react-select';
import 'react-calendar/dist/Calendar.css'; 
import './Calendar.css'; 

const MyCalendar = () => {
  const [comment, setComment] = useState("ここにメモやコメントを表示。");
  const [modalStep, setModalStep] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const initialFormState = {
    name: '',
    date:'',
    category: '',
    price: '',
    evaluation: 0,
    purchasePrice: '',
    memo: ''         
  };
  const [newWaste, setNewWaste] = useState(initialFormState);

  const inputNewWaste = (e) => {
    setNewWaste({ ...newWaste, [e.target.name]: e.target.value });
  };

  const options = [
    { value: 'clothes', label: '衣類' },
    { value: 'food', label: '食品' },
    { value: 'machine', label: '電子機器' },
    { value: 'goods', label: '雑貨' },
    { value: 'service', label: 'サービス' },
    { value: 'others', label: 'その他' }
  ];

  const handleSelectChange = (selectedOption) => {
    setNewWaste({
      ...newWaste,
      category: selectedOption ? selectedOption.value : ''
    });
  };

  const handleReset = () => {
    setNewWaste(initialFormState);
  };
  
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDayClick = (value) => {
    setSelectedDate(value);
    setModalStep(0);
    toggleModal();
  };
  
  const [selectedDate, setSelectedDate] = useState(null);

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
                {modalStep === 2 && "登録情報一覧"}
              </h3>
              <button className="modal-close-btn" onClick={toggleModal}>×</button>
            </div>

            <div className="modal-body">

              {modalStep === 0 && (
                <div className="step-container">
                  <div className="menu-buttons">
                    <button className="menu-btn primary" onClick={() => setModalStep(1)}>+ 新規登録</button>
                    <button className="menu-btn secondary" onClick={() => setModalStep(2)}>履歴</button>
                  </div>
                </div>
              )}

              {modalStep === 1 && (
                <div className="form-container">
                  <p className="selected-date">選択した日付: <span>{selectedDate ? selectedDate.toLocaleDateString() : ''}</span></p>
                  
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
                          onClick={() => setNewWaste({ ...newWaste, evaluation: starCount })}
                        >
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
                      setShowModal(false);
                    }}>✅ 登録</button>
                  </div>
                </div>
              )}

              {modalStep === 2 && (
                <div className="history-container">
                  <p className="history-placeholder">ここに履歴を表示します。</p>
                  <div className="form-actions">
                    <button className="btn-back" onClick={() => setModalStep(0)}>◀ 戻る</button>
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