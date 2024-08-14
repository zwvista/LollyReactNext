import * as React from 'react';
// import '../misc/Common.css'
import { container } from "tsyringe";
import { SettingsService } from '@/view-models/misc/settings.service';
import { WordsUnitService } from '@/view-models/wpp/words-unit.service';
import { ChangeEvent, useReducer } from "react";
import { MUnitWord } from "@/models/wpp/unit-word";
import { Button, Dialog, DialogContent, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

export default function WordsTextbookDetail2(
  {id, isDialogOpened, handleCloseDialog}: {id: number, isDialogOpened: boolean, handleCloseDialog: () => void}
) {
  const wordsUnitService = container.resolve(WordsUnitService);
  const settingsService = container.resolve(SettingsService);
  const item = Object.create(wordsUnitService.textbookWords.find(value => value.ID === id)!) as MUnitWord;
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    item[e.target.id] = e.target.value;
    forceUpdate();
  };

  const onChangeSelect = (e: SelectChangeEvent) => {
    item[e.target.name] = e.target.value;
    forceUpdate();
  };

  const save = async () => {
    item.WORD = settingsService.autoCorrectInput(item.WORD);
    await wordsUnitService.update(item);
    handleCloseDialog();
  };

  return !item ? <div/> : (
    <Dialog open={isDialogOpened} onClose={handleCloseDialog} fullWidth classes={{ paperFullWidth: 'width:750px' }}>
      <DialogContent>
        <div className="grid mt-2 mb-2">
          <label className="col-4" htmlFor="ID">ID:</label>
          <TextField className="col-8" id="ID" value={item.ID.toString()} disabled />
        </div>
        <div className="grid mt-2 align-items-center">
          <label className="col-4" htmlFor="TEXTBOOK">TEXTBOOK:</label>
          <TextField className="col-8" id="TEXTBOOK" value={item.TEXTBOOKNAME} disabled />
        </div>
        <div className="grid mt-2 align-items-center">
          <label className="col-4" htmlFor="UNIT">UNIT:</label>
          <Select className="col-8" id="UNIT" name="UNIT" value={item.UNIT.toString()} onChange={onChangeSelect}>
            {settingsService.units.map(row =>
              <MenuItem value={row.value} key={row.value}>{row.label}</MenuItem>
            )}
          </Select>
        </div>
        <div className="grid mt-2 align-items-center">
          <label className="col-4" htmlFor="PART">PART:</label>
          <Select className="col-8" id="PART" name="PART" value={item.PART.toString()} onChange={onChangeSelect}>
            {settingsService.parts.map(row =>
              <MenuItem value={row.value} key={row.value}>{row.label}</MenuItem>
            )}
          </Select>
        </div>
        <div className="grid mt-2 align-items-center">
          <label className="col-4" htmlFor="SEQNUM">SEQNUM:</label>
          <TextField className="col-8" id="SEQNUM" value={item.SEQNUM.toString()} onChange={onChangeInput} />
        </div>
        <div className="grid mt-2 align-items-center">
          <label className="col-4" htmlFor="WORDID">WORDID:</label>
          <TextField className="col-8" id="WORDID" value={item.WORDID.toString()} disabled />
        </div>
        <div className="grid mt-2 align-items-center">
          <label className="col-4" htmlFor="WORD">WORD:</label>
          <TextField className="col-8" id="WORD" value={item.WORD} onChange={onChangeInput} />
        </div>
        <div className="grid mt-2 align-items-center">
          <label className="col-4" htmlFor="NOTE">NOTE:</label>
          <TextField className="col-8" id="NOTE" value={item.NOTE} onChange={onChangeInput} />
        </div>
        <div className="grid mt-2 align-items-center">
          <label className="col-4" htmlFor="FAMIID">FAMIID:</label>
          <TextField className="col-8" id="FAMIID" value={item.FAMIID.toString()} disabled />
        </div>
        <div className="grid mt-2 align-items-center">
          <label className="col-4" htmlFor="ACCURACY">ACCURACY:</label>
          <TextField className="col-8" id="ACCURACY" value={item.ACCURACY} disabled />
        </div>
        <div className="mt-4 flex justify-content-around flex-wrap">
          <Button variant="contained" className="border-round" onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" className="border-round" onClick={save}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
