"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { TextArea } from "@/components/textarea";
import { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { AddMenu } from "@/components/add-menu";
import { useAppContext } from "./context";
import { v4 as uuid } from "uuid";
import { useSnackbar } from "notistack";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default function Home() {
  const [context, setContext] = useState("");
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);
  const [creatable, setCreatable] = useState(false);
  const { dispatch } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setCreatable(() => loading || !translation);
  }, [loading, translation]);

  const makeQuery = (ctx: string, wrd: string) =>
    `Given: word - '${wrd}' and context - '${ctx}. Provide me an examplanation, an examples of usage and translation to russian. Divide all three answers with newlines.`;

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

  const save = (deckId: string) => {
    dispatch({
      type: "addToDeck",
      payload: { deckId, card: { id: uuid(), context, translation, word } },
    });

    setContext("");
    setWord("");
    setTranslation("");
    enqueueSnackbar("Card has been added.", {
      variant: "success",
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  return (
    <section className="flex flex-col h-full overflow-hidden">
      <span className="text-center text-bold text-xl pb-4">Card Creation</span>
      <div className="overflow-auto flex flex-col gap-6 h-full pb-4">
        <label className="flex flex-col">
          <span className="uppercase text-bold pb-1">Context</span>
          <TextArea
            placeholder="Enter a context"
            rows={5}
            value={context}
            className="resize-none"
            onChange={({ target: { value } }) => setContext(value)}
          />
        </label>
        <label className="flex flex-col">
          <span className="uppercase text-bold pb-1">Word/Phrase</span>
          <Input
            placeholder="Enter a word"
            type="text"
            value={word}
            onChange={({ target: { value } }) => setWord(value)}
          />
        </label>
        <label className="flex flex-col">
          <Button onClick={translate} disabled={loading}>
            Translate
          </Button>
        </label>
        <label className="flex flex-col">
          {loading && <span>Translating...</span>}
          {!loading && (
            <TextArea
              rows={5}
              className="resize-none"
              placeholder="Translation will be here..."
              value={translation}
              onChange={({ target: { value } }) => setTranslation(value)}
            />
          )}
        </label>
      </div>

      <AddMenu disabled={creatable} onSave={save} />
    </section>
  );
}
