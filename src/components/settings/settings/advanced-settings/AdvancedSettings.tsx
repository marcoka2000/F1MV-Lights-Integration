import React, { useEffect, useState } from "react";
import { Alert, Autocomplete, Box, TextField, Typography } from "@mui/material";
import { BlueSwitch, getConfig, settingBoxSX, handleSetSingleSetting } from "@/components/settings/allSettings";

export default function AdvancedSettingsContent() {
  const [settings, setSettings] = useState<any | null>(null);

  const updateChannelOptions = [
    {
      label: "latest",
    },
    {
      label: "beta",
    },
    {
      label: "alpha",
    }
  ];


  useEffect(() => {
    async function fetchConfig() {
      const config = await getConfig();
      setSettings(config.Settings.advancedSettings);
    }
    fetchConfig();
  }, []);

  const saveConfig = async () => {
    if (!settings) return;
    await window.f1mvli.config.set("Settings.advancedSettings", settings);
  };

  useEffect(() => {
    saveConfig();
  }, [settings]);

  return (
    <>
      {settings && (
        <div>
          <Alert sx={{ mb: "20px", mr: "685px" }} severity="error">Changing these settings is strongly disrecommended!!</Alert>
          <Box sx={settingBoxSX}>
            <div>
              <Typography variant="h6" component="div">
               Debug Mode
              </Typography>
              <Typography variant="body2" component="div" sx={{ color: "grey" }}>
                This will enable debug mode, enable this if you want to see debug messages.
              </Typography>
            </div>
            <BlueSwitch
              id="debug-mode-switch"
              checked={settings.debugMode}
              onChange={(event) => {
                handleSetSingleSetting("debugMode", event.target.checked, setSettings, settings);
              }}
            />
          </Box>
          <Box sx={settingBoxSX}>
            <div>
              <Typography variant="h6" component="div">
                Update Channel
              </Typography>
              <Typography variant="body2" component="div" sx={{ color: "grey" }}>
                This will change the update channel, you can choose between latest, beta and alpha.
              </Typography>
            </div>
            <Autocomplete
              disablePortal={true}
              autoComplete={true}
              autoSelect={true}
              clearIcon={false}
              value={updateChannelOptions.find((option) => option.label === settings.updateChannel)}
              onChange={(event, newValue) => {
                // @ts-ignore
                handleSetSingleSetting("updateChannel", newValue.label, setSettings, settings);
              }}
              autoHighlight={true}
              id={"update-channel-selector"}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Channel" color={"secondary"} />}
              options={updateChannelOptions}
            />
          </Box>
          <Box sx={settingBoxSX}>
            <div>
              <Typography variant="h6" component="div">
                                Analytics
              </Typography>
              <Typography variant="body2" component="div" sx={{ color: "grey" }}>
                When enabled, you help us improve the app by sending anonymous usage data. Please consider keeping this enabled. Personal data is never collected!
              </Typography>
            </div>
            <BlueSwitch
              id="analytics-switch"
              checked={settings.analytics}
              onChange={(event) => {
                handleSetSingleSetting("analytics", event.target.checked, setSettings, settings);
              }}
            />
          </Box>
        </div>
      )}
    </>
  );
}