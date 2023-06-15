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
  const [explanation, setExplanation] = useState("");
  const [usage, setUsage] = useState("");
  const [translation, setTranslation] = useState("");

  const [loading, setLoading] = useState(false);
  const [creatable, setCreatable] = useState(false);
  const { dispatch } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();

  const [translate, setTranslate] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("hebrew");

  useEffect(() => {
    setCreatable(() => loading || !explanation);
  }, [loading, explanation]);

  const makeQuery = (ctx: string, wrd: string) =>
    `Given: word - '${wrd}' and context - '${ctx}'.
    Provide me an answer in template: 'Explanation: short explanation. * Usage: examples of usage. ${
      translate
        ? `* Translation: translate of ${wrd} in ${selectedLanguage} language`
        : ""
    }. Keep * delimeters.`;

  const process = async () => {
    setLoading(true);
    setTranslation("");
    setExplanation("");
    setUsage("");
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

      if (response.text) {
        const [explanation, usage, translation] = response.text
          .replaceAll("\n", "")
          .split("*")
          .map((w) => w.replace(/[\w\\s]*:/, "").trim());

        if (explanation) setExplanation(explanation);
        if (usage) setUsage(usage);
        if (translation) setTranslation(translation.replace(".", ""));
      }

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
      payload: {
        deckId,
        card: { id: uuid(), context, explanation, translation, usage, word },
      },
    });

    setContext("");
    setWord("");
    setTranslation("");
    setExplanation("");
    setUsage("");
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
          <span className="uppercase text-bold pb-1">
            <span className="text-red-500 pr-2">*</span>Word/Phrase
          </span>
          <Input
            placeholder="Enter a word"
            type="text"
            value={word}
            onChange={({ target: { value } }) => setWord(value)}
          />
        </label>
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

        <label className="flex gap-2 items-center">
          Translate
          <input
            type="checkbox"
            checked={translate}
            onChange={({ target }) => setTranslate(target.checked)}
          />
          <select
            className="grow p-1 bg-black border border-slate-400 rounded-sm text-slate-400"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="hebrew">Hebrew</option>
            <option value="russian">Russian</option>
          </select>
        </label>
        <label className="flex flex-col">
          <Button onClick={process} disabled={loading}>
            Process
          </Button>
        </label>
        <label className="flex flex-col">
          {loading && <span>Processing...</span>}
          {!loading && (
            <div className="flex flex-col gap-4">
              {explanation && (
                <label className="flex flex-col">
                  <span className="text-xs text-slate-400 mb-2">
                    Explanation
                  </span>
                  <TextArea
                    rows={2}
                    className="resize-none"
                    placeholder="Explanation"
                    value={explanation}
                    onChange={({ target: { value } }) => setExplanation(value)}
                  />
                </label>
              )}

              {usage && (
                <label className="flex flex-col">
                  <span className="text-xs text-slate-400 mb-2">Usage</span>
                  <TextArea
                    rows={2}
                    className="resize-none"
                    placeholder="Example of Usage"
                    value={usage}
                    onChange={({ target: { value } }) => setUsage(value)}
                  />
                </label>
              )}
              {translation && (
                <label className="flex flex-col">
                  <span className="text-xs text-slate-400 mb-2">
                    Translation
                  </span>
                  <TextArea
                    rows={2}
                    className="resize-none"
                    placeholder="Translation"
                    value={translation}
                    onChange={({ target: { value } }) => setTranslation(value)}
                  />
                </label>
              )}
            </div>
          )}
        </label>
      </div>

      <AddMenu disabled={creatable} onSave={save} />
    </section>
  );
}
