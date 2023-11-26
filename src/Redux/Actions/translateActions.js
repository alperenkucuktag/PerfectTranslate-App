import { createAsyncThunk } from "@reduxjs/toolkit";
import { options } from "../../constants/İndex";
import axios from "axios";

export const getLanguages = createAsyncThunk("getLanguages", async () => {
  //*api ye diller için atılan istek
  const res = await axios.request(options);
  //*slice'a gönderilcek dil verisi
  return res.data.data.languages;
});

//*Çeviri için istek atmak

export const translateText = createAsyncThunk(
  "translateText",
  async (param) => {
    //api isteği
    const params = new URLSearchParams();
    params.set("source_language", param.sourceLang.value);
    params.set("target_language", param.targetLang.value);
    params.set("text", param.text);

    const options2 = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "7191470e9emshb1ea4f1b5fe0117p1c1fffjsn987823a71532",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: params,
    };
    const res = await axios.request(options2);
    return res.data.data.translatedText;
    //slice'a aktarma
  }
);
