import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Select from 'react-select';
import 'react-calendar/dist/Calendar.css'; 

const MyCalendar = () => {
  const [comment, setComment] = useState("ここにメモやコメントを表示。");

  const [modalStep, setModalStep] = useState(0);
  
  const [showModal, setShowModal] = useState(false);

  

  const initialFormState = {
    name: '',
    date:'',
    category: '',
    price: '',
    evaluation: '',   //評価
    purchasePrice: '',//買取価格
    memo: ''          // 備考
  };
  const [newWaste, setNewWaste] = useState(initialFormState);

  const inputNewWaste= (e) => {
    setNewWaste({ ...newWaste, [e.target.name]: e.target.value });
  };

  const options = [
      {value:'clothes', label: '衣類' },
      {value:'food', label: '食品' },
      {value:'machine', label: '電子機器' },
      {value:'goods', label: '雑貨' },
      {value:'service', label: 'サービス' },
      {value:'others', label: 'その他' }
    ]

    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelectChange = (selectedOption) => {
      setNewWaste({
        ...newWaste,
        category: selectedOption ? selectedOption.value : ''
      });
    };

  const handleReset = () => {
    setNewWaste(initialFormState);
  };

  
  let toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDayClick = (value) => {
    setSelectedDate(value);
    setModalStep(0);
    toggleModal();
  };
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <div>
        <h3>コメント</h3>
        <p className='comment-section'>{comment}</p>
      </div>

      <div className="calendar-wrapper">
        <p>カレンダー</p>
        <Calendar onClickDay={handleDayClick}/>
      </div>

      {/*モーダル部分*/}
      {showModal && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={toggleModal}>閉じる</button>

            {modalStep === 0 && (
              <div>
                <div>
                  <button onClick={() => setModalStep(1)}>新規登録</button>
                  <button onClick={() => setModalStep(2)}>履歴</button>
                </div>
              </div>
            )}

            {modalStep === 1 && (
              /*【新規登録】*/
              <div>
                <h3>新規登録</h3>
                    <p>日付: {selectedDate ? selectedDate.toLocaleDateString() : ''}</p>{/*三項演算子*/}
                  商品名：<input 
                  type="text" 
                  name="name" 
                  value={newWaste.name} 
                  onChange={inputNewWaste} 
                /><br />

                カテゴリー：
                <Select
                  options={options}
                  onChange={handleSelectChange}
                  value={options.find(opt => opt.value === newWaste.category) || null}
                  placeholder="選択してください"
                  isClearable 
                /><br />

                価格：
                <input 
                  type="text" 
                  name="price" 
                  value={newWaste.price} 
                  onChange={inputNewWaste} 
                /><br />

                評価：<div className="evaluation-stars">
                  {[1, 2, 3, 4, 5].map((starCount) => (
                    <span
                      key={starCount}
                      onClick={() => setNewWaste({ ...newWaste, evaluation: starCount })}>
                      {starCount <= newWaste.evaluation ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <br />

                買取価格：
                <input 
                  type="text" 
                  name="purchasePrice" 
                  value={newWaste.purchasePrice} 
                  onChange={inputNewWaste} 
                /><br />

                備考：
                <textarea 
                  name="memo"
                  placeholder="次回買うものなど" 
                  rows="4"
                  value={newWaste.memo}
                  onChange={inputNewWaste}
                ></textarea>
                <br />
                
                <button onClick={() => setModalStep(0)}>◀ 戻る</button>
                <button onClick={handleReset}>
                  リセット
                </button>
                <button onClick={() => {
                  alert('保存しました！');
                  setShowModal(false);
                }}>✅登録</button>
              </div>
            )}

            {/*【登録情報一覧】*/}

          </div>
        </div>
      )}
    </>
  );
};

export default MyCalendar;