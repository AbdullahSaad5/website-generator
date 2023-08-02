import {
  Button,
  Drawer,
  FileInput,
  Group,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconTrash } from "@tabler/icons-react";

const index = ({ opened, state, dispatch, downloadCode, close }) => {
  return (
    <Drawer opened={opened} onClose={close} title="Edit Home Page">
      <Stack spacing={"lg"}>
        <TextInput
          label="Title"
          value={state.title}
          onChange={(e) =>
            dispatch({
              type: "SET_TITLE",
              payload: e.target.value,
            })
          }
        />
        <TextInput
          label="Add Link"
          value={state.link}
          onChange={(e) =>
            dispatch({
              type: "SET_LINK",
              payload: e.target.value,
            })
          }
          rightSection={
            <Button
              onClick={() => {
                if (!state.link.length) return;

                if (state.links.length >= 6) return;
                dispatch({
                  type: "ADD_LINK",
                  payload: state.link,
                });
              }}
            >
              Add
            </Button>
          }
          rightSectionWidth={80}
        />

        {state.links?.map((link, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text fz={"sm"}>{link}</Text>
              <Group>
                <IconChevronUp
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (index === 0) return;
                    dispatch({
                      type: "MOVE_UP",
                      payload: index,
                    });
                  }}
                  size={16}
                />

                <IconChevronDown
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (index === state.links.length - 1) return;
                    dispatch({
                      type: "MOVE_DOWN",
                      payload: index,
                    });
                  }}
                  size={16}
                />

                <IconTrash
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    dispatch({
                      type: "REMOVE_LINK",
                      payload: index,
                    });
                  }}
                  size={16}
                />
              </Group>
            </div>
          );
        })}

        <Textarea
          maxLength={80}
          label="Tagline"
          value={state.tagLine.replace(/<br\/>/g, "")}
          onChange={(e) => {
            let text = e.target.value;

            dispatch({
              type: "SET_TAGLINE",
              payload: text,
            });
          }}
        />

        <TextInput
          label="Phone"
          value={state.phone}
          maxLength={15}
          onChange={(e) => {
            dispatch({
              type: "SET_PHONE",
              payload: e.target.value,
            });
          }}
        />

        <TextInput
          label="Email"
          value={state.email}
          maxLength={40}
          onChange={(e) => {
            dispatch({
              type: "SET_EMAIL",
              payload: e.target.value,
            });
          }}
        />

        <TextInput
          label="Button Text"
          value={state.buttonText}
          maxLength={20}
          onChange={(e) => {
            dispatch({
              type: "SET_BUTTON_TEXT",
              payload: e.target.value,
            });
          }}
        />

        <FileInput
          label="Image 1"
          accept="image/*"
          value={state.image1}
          onChange={(e) => {
            const file = e;
            const url = URL.createObjectURL(file);
            file.preview = url;
            dispatch({
              type: "SET_IMAGE1",
              payload: file,
            });
          }}
        />

        <FileInput
          label="Image 2"
          accept="image/*"
          value={state.image2}
          onChange={(e) => {
            const file = e;
            const url = URL.createObjectURL(file);
            file.preview = url;
            dispatch({
              type: "SET_IMAGE2",
              payload: file,
            });
          }}
        />

        <FileInput
          label="Image 3"
          accept="image/*"
          value={state.image3}
          onChange={(e) => {
            const file = e;
            const url = URL.createObjectURL(file);
            file.preview = url;
            dispatch({
              type: "SET_IMAGE3",
              payload: file,
            });
          }}
        />

        <Button
          onClick={() => {
            dispatch({
              type: "RESET",
            });
          }}
        >
          Reset
        </Button>

        <Button onClick={downloadCode}>Download Code</Button>
      </Stack>
    </Drawer>
  );
};

export default index;
