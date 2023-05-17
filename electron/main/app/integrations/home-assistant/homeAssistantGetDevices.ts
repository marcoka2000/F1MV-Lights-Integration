import { configVars } from "../../../config/config";
import fetch from "node-fetch";

export default async function homeAssistantGetDevices(){
  const url = configVars.homeAssistantHost + ":" + configVars.homeAssistantPort + "/api/states";
  const headers = {
    "Authorization": "Bearer " + configVars.homeAssistantToken,
    "Content-Type": "application/json"
  };

  let stateData;
  const res = await fetch(url, {
    method: "GET",
    headers: headers
  });
  stateData = await res.json();

  const deviceList = [];
  let hassData = {};
  for (const item of stateData) {
    if (item.entity_id.startsWith("light.")){
      const name = item.attributes.friendly_name;
      const id = item.entity_id;
      const state = item.state;
      deviceList.push({ name: name, id: id, state: state });
    }
  }
  const alreadySelectedDevices = configVars.homeAssistantDevices;
  hassData = {
    devices: deviceList,
    alreadySelectedDevices: alreadySelectedDevices
  };
  return hassData;
}