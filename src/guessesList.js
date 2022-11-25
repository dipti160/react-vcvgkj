import React from 'react';

const GuessesList = (props) => {
  return (
    <>
      <div className="ul_class">All Guesses</div>
      <ul>
        {props?.data.length ? (
          props.data.map((e, index) => (
            <li key={index}>{`${e?.name} - ${e?.age}`}</li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </>
  );
};

export default GuessesList;
