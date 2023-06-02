"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { TextArea } from "@/components/textarea";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Head from "next/head";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default function Home() {
  const [context, setContext] = useState("What is love?");
  const [word, setWord] = useState("love");
  const [translation, setTranslation] = useState("");
  const [lang, setLang] = useState("russian");
  const [loading, setLoading] = useState(false);

  const makeQuery = (ctx: string, wrd: string) =>
    `Provide me an exact meaning of '${wrd}' in sentence: '${ctx} and translate the meaning to  ${lang} language`;
  const translate = async () => {
    setLoading(true);
    try {
      const {
        data: { choices },
      } = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: makeQuery(context, word),
        temperature: 0.3,
        max_tokens: 2048,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      });
      const [response] = choices;

      if (response.text) setTranslation(response.text);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  };

  const save = () => {
    const rawCards = localStorage.getItem("cards");
    const cards = rawCards ? JSON.parse(rawCards) : [];
    cards.push({ context, word, translation });
    localStorage.setItem("cards", JSON.stringify(cards));
  };

  return (
    <>
      <Head>
        <title>Twigo Learn</title>
        <link rel="icon" type="image/png" href="/favicon.ico"></link>
        <meta name="description" content="Twigo Learn App"></meta>
      </Head>
      <section className="flex flex-col h-full gap-6">
        <span className="text-center text-bold text-xl">Card Creation</span>
        <label className="flex flex-col">
          Context
          <TextArea
            rows={5}
            value={context}
            className="resize-none"
            onChange={({ target: { value } }) => setContext(value)}
          />
        </label>
        <label className="flex flex-col">
          Word/Phrase
          <Input
            type="text"
            value={word}
            onChange={({ target: { value } }) => setWord(value)}
          />
        </label>
        <label className="flex flex-col">
          Target Language
          <div className="flex gap-4">
            <select
              className="grow p-2 border border-slate-400 rounded-sm"
              value={lang}
              onChange={({ target: { value } }) => setLang(value)}
            >
              <option value="russian">Russian</option>
              <option value="hebrew">Hebrew</option>
            </select>
            <Button onClick={translate} disabled={loading}>
              Translate
            </Button>
          </div>
        </label>
        <label className="flex flex-col">
          {loading ? (
            <span>Translating...</span>
          ) : (
            <pre className="max-w-full whitespace-pre-wrap">{translation}</pre>
          )}
        </label>
        <Button onClick={save} disabled={loading || !translation}>
          Save a Card
        </Button>
      </section>
    </>
  );
}
