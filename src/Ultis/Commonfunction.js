import { SettingsOverscanOutlined } from "@mui/icons-material";
import moment from "moment";

export const Isonsharelocation = () => {
  if ("geolocation" in navigator) {
    return true;
  } else {
    return false;
  }
};
export const Commonfc = {
  handlValue: (getvalue, setState) => {
    setState(getvalue);
  },
  //paramete array type array , objectKey is string  like ['key']

  keysofObj: (obj) => {
    return Object.keys(obj);
  },

  valuesofObj: (obj) => {
    return Object.values(obj);
  },
  removeDuplicate: (array, objKey) => {
    const setarray = new Set();
    //remove duplicate item
    return array.filter((el) => {
      const duplicate = setarray.has(el[`${objKey}`]);
      setarray.add(el[`${objKey}`]);
      return !duplicate;
    });
  },
  deadLine: (date) => {
    var limitedDate = new Date(date);
    var nowDate = new Date();
    var nowTime = moment(nowDate.getTime());
    var limitedTime = moment(limitedDate.getTime());

    const diff = limitedTime.diff(nowTime);
    const diffDuration = moment.duration(diff);
    console.log("duration", diffDuration);
    const result =
      nowDate.getTime() + diffDuration.days() * 24 * 60 * 60 * 1000;
    return result;
  },
  exPried: (date) => {
    var limitedDate = new Date(date);
    var nowDate = new Date();
    var nowTime = moment(nowDate.getTime());
    var limitedTime = moment(limitedDate.getTime());

    const diff = limitedTime.diff(nowTime);
    const diffDuration = moment.duration(diff);

    return diffDuration.milliseconds();
  },
};
