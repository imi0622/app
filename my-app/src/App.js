import logo from './logo.svg';
import './App.css';
import React from 'react';
import Title from './components/title';

const jsonLocalStroage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  }
}
/* function Title(props) {
  return <h1>{props.children}</h1>;
} */

const Form = ({ updateMainFood }) => {
  const [value, setvalue] = React.useState("");
  const hangul = text => /[ㄱ-ㅎ| ㅏ-ㅣ|가-힣]/.test(text);
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleInputChange(data) {
    const uservalue = data.target.value;
    console.log(hangul(uservalue));
    if (hangul(uservalue)) {
      setErrorMessage("한글은 입력할 수 없습니다.");
    } else {
      setErrorMessage("");
    }
    setvalue(uservalue.toUpperCase());
  }
  function handleFormSubmit(e) {
    e.preventDefault();

    setErrorMessage("");

    if (value === "") {
      setErrorMessage("빈 값으로 추가할 수 없습니다.");
      return;
    }
    updateMainFood();
  }

  return (
    <form onSubmit={handleFormSubmit} >
      <input type="text" name="name" placeholder="상품명을 입력하세요" onChange={handleInputChange} value={value} />
      <button type="submit">추가</button>
      <div style={{ color: "#f00" }}>{errorMessage}</div>
    </form>

  );
}

// [div] : mainCard =================================================
const MainCard = ({ img, onHandleHeartClick }) => {
  return (
    <div className="main-card">
      <img
        src={img}
        alt="올리브오일"
        width="400" />
      <button onClick={onHandleHeartClick}>🤍</button>
    </div>
  );
}

// [ul] : favorites =================================================
function Favorites({ favorites }) {
  return (
    <ul className="favorites">
      {favorites.map(food => (<FoodItem img={food} key={food} />))}
    </ul>
  );
}

// foodItem =================================================
function FoodItem(props) {
  return (
    <li>
      <img src={props.img} alt={props.title} style={{ width: "150px", height: "100px", backgroundSize: "contain" }} />
    </li>
  );
}

// [리액트를 이용하여 추가] =====================================
// 추가할 위치 지정 : .food-li-insert
const foodLiInsert = document.querySelector('#food-li-insert');

const App = () => {
  const foodOne = "img/food-one.jpg";
  const foodTwo = "img/food-two.jpg";
  const foodThree = "img/food-three.jpg";
  const [mainFood, setMainFood] = React.useState(foodOne);
  const [favorites, setFavorites] = React.useState(jsonLocalStroage.getItem("favorites") || []);
  // const [counter, setCounter] = React.useState(Number(localStorage.getItem("counter")));
  const [counter, setCounter] = React.useState(jsonLocalStroage.getItem("counter"));

  function updateMainFood() {
    setMainFood(foodTwo);
    // 웹브라우저 로컬스토리지에 증가값 저장
    const nextCounter = counter + 1;
    setCounter(nextCounter);
    // localStorage.setItem("counter", nextCounter); 아래코드로 변경
    jsonLocalStroage.setItem("counter", nextCounter);
  }

  function handleHeartClick() {
    const addfavorite = [...favorites, mainFood];
    setFavorites(addfavorite);
    jsonLocalStroage.setItem("favorites", addfavorite);
  }

  return (
    <div>
      <Title>페이지 {counter}</Title>
      <Form updateMainFood={updateMainFood} />
      <MainCard img={mainFood} onHandleHeartClick={handleHeartClick} />
      <Favorites favorites={favorites} />
    </div>
  )
}

export default App;
