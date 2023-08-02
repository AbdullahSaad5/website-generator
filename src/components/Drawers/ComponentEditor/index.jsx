import { Accordion, Drawer, Radio } from "@mantine/core";

const index = ({ opened, close, components }) => {
  return (
    <Drawer opened={opened} onClose={close} title="Edit Home Page">
      <Accordion>
        {components?.map((component, index) => {
          return (
            <Accordion.Item
              key={index}
              label={component.name}
              value={component.name}
            >
              <Accordion.Control>{component.name}</Accordion.Control>
              <Accordion.Panel>
                <Radio.Group
                  value={component.getter.toString()}
                  onChange={(value) => {
                    component.setter(value);
                  }}
                  styles={{
                    root: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    },
                  }}
                >
                  {component?.variants.map((variant, index) => {
                    return (
                      <Radio
                        key={index}
                        label={component.name + " " + (index + 1)}
                        value={index.toString()}
                        style={{
                          cursor: "pointer",
                        }}
                      />
                    );
                  })}
                </Radio.Group>
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Drawer>
  );
};

export default index;
