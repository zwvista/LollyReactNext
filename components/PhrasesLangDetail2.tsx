import * as React from 'react';
import { PhrasesLangService } from '@/view-models/wpp/phrases-lang.service';
// import '../misc/Common.css'
import { container } from "tsyringe";
import { SettingsService } from '@/view-models/misc/settings.service';
import { ChangeEvent, useReducer, useState } from "react";
import { MLangPhrase } from "@/models/wpp/lang-phrase";
import { Button, Dialog, DialogContent, TextField } from "@mui/material";

export default function PhrasesLangDetail2(
  {id, isDialogOpened, handleCloseDialog}: {id: number, isDialogOpened: boolean, handleCloseDialog: () => void}
) {
  const phrasesLangService = container.resolve(PhrasesLangService);
  const settingsService = container.resolve(SettingsService);
  const itemOld = phrasesLangService.langPhrases.find(value => value.ID === id);
  const [item] = useState(itemOld ? Object.create(itemOld) as MLangPhrase : phrasesLangService.newLangPhrase());
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    (item as any)[e.target.id] = e.target.value;
    forceUpdate();
  };

  const save = async () => {
    item.PHRASE = settingsService.autoCorrectInput(item.PHRASE);
    await (item.ID ? phrasesLangService.update(item) : await phrasesLangService.create(item));
    handleCloseDialog();
  };

  return !item ? <div/> : (
    <Dialog open={isDialogOpened} onClose={handleCloseDialog} fullWidth classes={{ paperFullWidth: 'width:750px' }}>
      <DialogContent>
        <div className="grid mt-2 mb-2">
          <label className="col-4" htmlFor="ID">ID:</label>
          <TextField className="col-8" id="ID" value={item.ID.toString()} disabled />
        </div>
        <div className="grid mb-2">
          <label className="col-4" htmlFor="PHRASE">PHRASE:</label>
          <TextField className="col-8" id="PHRASE" value={item.PHRASE} onChange={onChangeInput} />
        </div>
        <div className="grid mb-2">
          <label className="col-4" htmlFor="TRANSLATION">TRANSLATION:</label>
          <TextField className="col-8" id="TRANSLATION" value={item.TRANSLATION} onChange={onChangeInput} />
        </div>
        <div className="mt-4 flex justify-content-around flex-wrap">
          <Button variant="contained" className="border-round" onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" className="border-round" onClick={save}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
