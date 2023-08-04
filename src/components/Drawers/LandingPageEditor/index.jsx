import { Accordion, Drawer } from "@mantine/core";

const index = ({ opened, close, components }) => {
  return (
    <Drawer opened={opened} onClose={close} title="Edit Home Page">
      <Accordion>
        {components.map((Component, index) => {
          return (
            <Accordion.Item value={Component.name} key={index}>
              <Accordion.Control>{Component.name}</Accordion.Control>
              <Accordion.Panel>{Component.component}</Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Drawer>
  );
};

export default index;
