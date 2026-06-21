"use client";

import { AuthorizedAccountFromAPI } from "@/db/schema";
import Box from "../Box/Box";
import DefaultMessage from "../DefaultMessage/DefaultMessage";
import "./LanguageTab.css";
import { languages, setl10nData } from "@/lib/l10n";

const LanguageTab = (props: {
  account: AuthorizedAccountFromAPI
}) => {
  return (
    <div className="h-full flex flex-col gap-1">
      <h1><DefaultMessage id="settings.tab.language" /></h1>
      <Box className="grow rounded-2xl">
        <div className="flex flex-col rounded-2xl">
          {languages.map((language, i) => {
            return (
              <button key={i} className="lang" onClick={() => setl10nData(language.code)}>
                <div className="transition">
                  <img src={`/l10n/icons/${language.code}.svg`} aria-hidden />
                  <span>{language.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </Box>
    </div>
  )
};

export default LanguageTab;
