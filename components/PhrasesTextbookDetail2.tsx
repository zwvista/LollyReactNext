import * as React from 'react';
// import '../misc/Common.css'
import { container } from "tsyringe";
import { SettingsService } from '@/view-models/misc/settings.service';
import { PhrasesUnitService } from '@/view-models/wpp/phrases-unit.service';
import { ChangeEvent, useReducer, useState } from "react";
import { MUnitPhrase } from "@/models/wpp/unit-phrase";
import { Button, Dialog, DialogContent, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

export default function PhrasesTextbookDetail2(
  {id, isDialogOpened, handleCloseDialog}: {id: number, isDialogOpened: boolean, handleCloseDialog: () => void}
) {
  const phrasesUnitService = container.resolve(PhrasesUnitService);
  const settingsService = container.resolve(SettingsService);
  const [item] = useState(Object.create(phrasesUnitService.textbookPhrases.find(value => value.ID === id)!) as MUnitPhrase);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    (item as any)[e.target.id] = e.target.value;
    forceUpdate();
  };

  const onChangeSelect = (e: SelectChangeEvent) => {
    (item as any)[e.target.name] = e.target.value;
    forceUpdate();
  };

  const save = async () => {
    item.PHRASE = settingsService.autoCorrectInput(item.PHRASE);
    await phrasesUnitService.update(item);
    handleCloseDialog();
  };

  return !item ? <div/> : (
    <Dialog open={isDialogOpened} onClose={handleCloseDialog} fullWidth classes={{ paperFullWidth: 'width:750px' }}>
      <DialogContent>
        <div className="grid mt-2 mb-2">
          <label className="col-4" htmlFor="ID">ID:</label>
          <TextField className="col-8" id="ID" value={item.ID.toString()} disabled/>
        </div>
        <div className="grid mb-2">
          <label className="col-4" htmlFor="TEXTBOOK">TEXTBOOK:</label>
          <TextField className="col-8" id="TEXTBOOK" value={item.TEXTBOOKNAME} disabled/>
        </div>
        <div className="grid mb-2">
          <label className="col-4" htmlFor="UNIT">UNIT:</label>
          <Select className="col-8" id="UNIT" name="UNIT" value={item.UNIT.toString()} onChange={onChangeSelect}>
            {settingsService.units.map(row =>
              <MenuItem value={row.value} key={row.value}>{row.label}</MenuItem>
            )}
          </Select>
        </div>
        <div className="grid mb-2">
          <label className="col-4" htmlFor="PART">PART:</label>
          <Select className="col-8" id="PART" name="PART" value={item.PART.toString()} onChange={onChangeSelect}>
            {settingsService.parts.map(row =>
              <MenuItem value={row.value} key={row.value}>{row.label}</MenuItem>
            )}
          </Select>
        </div>
        <div className="grid mb-2">
          <label className="col-4" htmlFor="SEQNUM">SEQNUM:</label>
          <TextField className="col-8" id="SEQNUM" value={item.SEQNUM.toString()} onChange={onChangeInput}/>
        </div>
        <div className="grid mb-2">
          <label className="col-4" htmlFor="PHRASEID">PHRASEID:</label>
          <TextField className="col-8" id="PHRASEID" value={item.PHRASEID.toString()} disabled/>
        </div>
        <div className="grid mb-2">
          <label className="col-4" htmlFor="PHRASE">PHRASE:</label>
          <TextField className="col-8" id="PHRASE" value={item.PHRASE} onChange={onChangeInput}/>
        </div>
        <div className="grid mb-2">
          <label className="col-4" htmlFor="TRANSLATION">TRANSLATION:</label>
          <TextField className="col-8" id="TRANSLATION" value={item.TRANSLATION} onChange={onChangeInput}/>
        </div>
        <div className="mt-4 flex justify-content-around flex-wrap">
          <Button variant="contained" className="border-round" onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" className="border-round" onClick={save}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
