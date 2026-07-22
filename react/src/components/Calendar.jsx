import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import Select from 'react-select';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css'; 
import './Calendar.css'; 
import BottomNav from "./BottomNav";

const MyCalendar = () => {
  const [id] = useState(() => sessionStorage.getItem("id"));
  const [userId] = useState(() => sessionStorage.getItem("userId"));
  const [waste, setWaste] = useState([]);
  const [frequencies, setFrequencies] = useState([]);
  const products = window.products || {};
  const [modalStep, setModalStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  //コメント欄
  const [randomText, setRandomText] = useState('読み込み中...');

  useEffect(() => {
  if (id) {
    fetch(`/api/random-text?userId=${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('ネットワークエラー');
        }
        return response.text();
      })
      .then(data => {
        setRandomText(data);
      })
      .catch(err => {
        console.error("コメント取得エラー:", err);
        setRandomText("コメントの読み込みに失敗しました");
      });
  }
}, [id]);

  const formattedSelectedDate = selectedDate 
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
    : '';

  const dailyWastes = waste.filter(w => {
    if (!w.buyDate) return false;
    const dbDateOnly = w.buyDate.substring(0, 10);
    return dbDateOnly === formattedSelectedDate;
  });

  //  「日(0)〜土(6)」のどの曜日かを正しく返すように修正
  const getDayOfWeek = (date) =>{
    return date.getDay(); 
  };

  // 1〜7日＝第1週、8〜14日＝第2週、15〜21日＝第3週...
  const getWeekOfMonth = (date) => {
    const day = date.getDate();
    return Math.ceil(day/7);
  };

  const firstForm = {
    id: '',
    userId: userId,
    name: '',
    ap_type: 5, 
    buyDate: '',
    category: 1,
    sellingPrice: '',
    valuation: 0,
    purchasePrice: '0',
    memo: ''         
  };
  console.log(" 保持されているid:", id);
  console.log(" 保持されているuserId:", userId);

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

  useEffect(() => {
    if (id) {
      setNewWaste(prev => ({ ...prev, userId: id }));
      setModWaste(prev => ({ ...prev, userId: id }));
    }
  }, [id]);

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
    if (id) {
      refreshWasteList();
      refreshFrequencyList();
    }
  }, [id]);

  const refreshWasteList = () => {
    if (!id) return;
    fetch(`/api/waste/?id=${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');i
        }
        return response.json();
      })
      .then(json => setWaste(json || []))
      .catch(err => console.error("データ取得エラー:", err));
  };

  const refreshFrequencyList = () => {
    if (!id) return;
    fetch(`/api/frequency/?id=${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => setFrequencies(json || []))
      .catch(err => console.error("スケジュール取得エラー：", err));
  };

  const addNewWaste = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const currentTimeStr = `${hours}:${minutes}:${seconds}`;
    
    const currentDateTimeIso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${currentTimeStr}`;
    
    const wasteWithDateTime = {
      ...newWaste,
      userId: id ,
      buyDate: `${newWaste.buyDate}T${currentTimeStr}`, 
      sellingPrice: Number(newWaste.sellingPrice),
      purchasePrice: newWaste.purchasePrice ? Number(newWaste.purchasePrice) : null, 
      valuation: String(newWaste.valuation), 
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

  //const [isOpen, setIsOpen] = useState(false);
  //useEffect(() => {
  //   fetch('/api/User')
  //   .then((response) => {
  //     if(!response.ok)  {
  //       throw new alert('APIエラー');
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     if(data.lastLogin){
  //       setIsOpen(true);
  //     }
  //   })
    
  // }, []);

  return (
  <>
    {/*モーダル*/}
    {/* <div>
      {isOpen && (
        <div>
          <div>
            <h2>お知らせ</h2>
            <p>画面が開かれました！</p>
            <button onClick={() => setIsOpen(false)}>閉じる</button>
          </div>
        </div>
      )}
    </div> */}

    <div className="comment-wrapper">
      <p>{randomText}</p>
    </div>
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <p className="calendar-title">カレンダー</p>
        <Calendar 
          onClickDay={handleDayClick}
          tileContent={({ date, view }) => {
            if (view === 'month') {
              const tileDateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
              
              // 曜日と第何週を取得
              const dayOfWeek = getDayOfWeek(date);
              const weekNum = Math.ceil(date.getDate() / 7);

              // if (date.getDate() === 1) { 
              //   console.log("=== 1日の判定データ ===");
              //   console.log("カレンダー上の日付:", tileDateStr);
              //   console.log("カレンダーが判定に使っている曜日(0:日〜6:土):", dayOfWeek);
              //   console.log("第何週:", weekNum);
              //   console.log("DBから届いたごみの日データ一覧:", frequencies);
              // }

              // 今日の曜日・週が、データベースから届いたスケジュールに当てはまるかチェック
              const todaysGarbage = frequencies.filter(f => {
                const isMatchingDay = (
                  String(f.dayOfWeek) === String(dayOfWeek) || 
                  String(f.dayOfWeek2) === String(dayOfWeek)
                );
                if (!isMatchingDay) return false;

                // 週が一致するか
                let isMatchingWeek = false;
                if (weekNum === 1 && f.firstWeek) isMatchingWeek = true;
                if (weekNum === 2 && f.secondWeek) isMatchingWeek = true;
                if (weekNum === 3 && f.thirdWeek) isMatchingWeek = true;
                if (weekNum === 4 && f.fourthWeek) isMatchingWeek = true;
                
                return isMatchingWeek;
              });

              //  カレンダーの日付と一致する金額データを抽出
              const tilesDayWastes = waste.filter(w => {
                if (!w.buyDate) return false;
                return w.buyDate.substring(0, 10) === tileDateStr;
              });

              const totalAmount = tilesDayWastes.reduce((sum, item) => {
                return sum + (Number(item.sellingPrice) || 0);
              }, 0);

              // ゴミの日マーク
              if (todaysGarbage.length > 0 || tilesDayWastes.length > 0) {
                return (
                  <div className="tile-content-container">
                    {todaysGarbage.length > 0 && (
                      <div className="garbage-icons">
                        {todaysGarbage.map((g, idx) => (
                          <span key={idx} className="garbage-icon">
                            {g.gabageType === 1 && "🔥可燃"} {/* 1＝可燃 */}
                            {g.gabageType === 2 && "💎不燃"} {/* 2＝不燃 */}
                            {g.gabageType === 3 && "♻️資源"} {/* 3＝資源 */}
                            {g.gabageType === 4 && "🪵その他"} {/* 4＝その他 */}
                          </span>
                        ))}
                      </div>
                    )}

                    {/*  合計金額の表示  */}
                    {tilesDayWastes.length > 0 && (
                      <div className="tile-waste-amount">
                        ￥{totalAmount.toLocaleString()}
                      </div>
                    )}
                  </div>
                );
              }
            }
            return null;
          }}
        />
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
    <BottomNav />
  </>
    
  );
};

export default MyCalendar;