import { Textarea } from "@mantine/core";
import { useReducer } from "react";

const JornayaScriptEditor = () => {
  const initialState = {
    script: `<script>
                console.log("Hello World");
            </script>`,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_SCRIPT":
        return {
          ...state,
          script: action.payload,
        };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const UI = () => (
    <Textarea
      autosize
      maxRows={20}
      label="Jornaya Script"
      placeholder="Paste Jornaya Script Here"
      value={state.script}
      onChange={(e) => {
        let text = e.target.value;

        dispatch({
          type: "SET_SCRIPT",
          payload: text,
        });
      }}
    />
  );

  return {
    script: state.script,
    UI,
  };
};

export default JornayaScriptEditor;
