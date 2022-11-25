import React, { useEffect, useState } from 'react';
import GuessesList from './guessesList.js';

const NameAgeGuesser = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [ageGuessData, setAgeGuessData] = useState([]);
  const [oddToggle, setOddToggle] = useState(false);
  const [nameToggle, setNameToggle] = useState(false);

  useEffect(() => {
    setCount(0);
    setName('');
    setAgeGuessData([]);
    setOddToggle(false);
    setNameToggle(false);
  }, []);

  useEffect(() => {
    const tempResData = [...ageGuessData];
    const temp = tempResData.filter((res) => {
      if (res?.age % 2 !== 0) return res;
    });
    if (temp.length === tempResData.length && tempResData.length) {
      setOddToggle(true);
    } else {
      setOddToggle(false);
    }
  }, [ageGuessData]);
  const onSubmit = () => {
    if (name == '') {
      setNameToggle(true);
    } else {
      fetch(` https://api.agify.io/?name=${name}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          const tempData = [data];
          let tempCount = count + 1;
          setCount(tempCount);
          setAgeGuessData([...ageGuessData, ...tempData]);
        })
        .catch(function () {
          console.log('API error');
        });
    }
  };
  return (
    <div className="wrapper">
      <h2 className="guess_class">Name Age Guesser</h2>
      <div className="total_class">
        Total Guesses: {`${count ? count : 'X'}`}
      </div>
      {oddToggle ? (
        <div className="odd_class">What an odd number of guesses!</div>
      ) : (
        <></>
      )}

      <br />
      <br />
      <br />
      <div className="name_div">Please enter a name here:</div>
      <input
        type={'text'}
        name="name"
        onChange={(e) => {
          setName(e.target.value);
          setNameToggle(false);
        }}
      />
      <button type="submit" name="submit" onClick={onSubmit}>
        submit
      </button>
      {nameToggle ? (
        <div className="name_required">Please enter the name!!</div>
      ) : (
        <></>
      )}
      <br />
      <br />
      <br />
      <GuessesList data={ageGuessData} />
    </div>
  );
};

export default NameAgeGuesser;
