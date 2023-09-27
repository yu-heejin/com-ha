import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');

  const changeCodeHandler = (e) => {
    setText(e.target.value);
  }

  const submitHander = async (e) => {
    e.preventDefault();

    console.log(text);

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

    console.log(result);
  }

  return (
    <div>
      <h2>Com-Ha</h2>
      <form onSubmit={submitHander}>
        <textarea
          style={{
            width: '300px',
            height: '300px'
          }}
          name='text'
          placeholder='이 곳에 코드를 입력하세요.'
          onChange={changeCodeHandler}
        />
        <button type='submit'>입력하기</button>
      </form>
      <hr/>
      <h3>실행 결과</h3>
    </div>
  );
}

export default App;
