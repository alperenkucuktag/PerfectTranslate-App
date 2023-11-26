import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { getLanguages, translateText } from "./Redux/Actions/translateActions";
import Select from "react-select";
import { clearAnswer } from "./Redux/Slices/translateSlice";

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.translateState);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [text, setText] = useState("");
  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });

  //*Dizideki code ven name keylerini sahip olan
  //*objelerin keylerini value ve label'a çevirdim
  const languages = useMemo(() => {
    return state.languages.map((item) => ({
      value: item.code,
      label: item.name,
    }));
  }, [state.languages]);

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    //*yazıları temizle
    setText("");
    dispatch(clearAnswer());
  };

  return (
    <div id='main-page'>
      <div className='container'>
        <h2>Çeviri+</h2>
        {/* üst kısım */}
        <div className='upper'>
          <Select
            value={sourceLang}
            onChange={setSourceLang}
            className='select'
            options={languages}
          />
          <button onClick={handleSwap}>DEĞİŞ</button>
          <Select
            value={targetLang}
            onChange={setTargetLang}
            className='select'
            options={languages}
          />
        </div>
        {/* orta kısm */}
        <div className='center'>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Çevirmek istediğiniz yazıyı giriniz ...'
          ></textarea>
          <textarea
            className={state.isTextLoading ? "loading" : ""}
            value={state.answer}
            disabled
          ></textarea>
        </div>
        {/* Alt kısım */}
        <button
          id='tranlate-btn'
          onClick={() => {
            dispatch(translateText({ sourceLang, targetLang, text }));
          }}
        >
          Çeviri
        </button>
      </div>
    </div>
  );
};

export default App;
