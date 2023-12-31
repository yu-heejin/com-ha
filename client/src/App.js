import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [res, setRes] = useState([]);

  const changeCodeHandler = (e) => {
    setText(e.target.value);
  }

  const submitHander = async (e) => {
    e.preventDefault();

    const result = await axios({
      url: 'http://localhost:3001',
      method: 'post',
      data: {
          text: text
      },
      headers: {
          contentType: 'application/json'
      }
    });

    setRes(result.data);
  }

  return (
    <div style={{
      textAlign: 'center'
    }}>
      <h2>Com-Ha</h2>
      <form onSubmit={submitHander}>
        <textarea
          style={{
            width: '30rem',
            height: '30rem'
          }}
          name='text'
          placeholder='이 곳에 코드를 입력하세요.'
          onChange={changeCodeHandler}
        />
        <p><button type='submit'>입력하기</button></p>
      </form>
      <hr/>
      <h3>실행 결과</h3>
      {res.map((value) => {
        return (
          <p>{value}</p>
        )
      })}
    </div>
  );
}

export default App;
