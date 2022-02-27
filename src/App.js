import {
  Box,
  Container,
  SimpleGrid,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

function importAll(r) {
  return r.keys().map(r);
}

const imageDirs = [
  {
    label: "Chats",
    path: "../public/assets/images/chats",
    images: importAll(
      require.context(
        "../public/assets/images/chats",
        false,
        /\.(png|jpe?g|svg|gif)$/
      )
    ),
  },
  {
    label: "Chiens",
    path: "../public/assets/images/chiens",
    images: importAll(
      require.context(
        "../public/assets/images/chiens",
        false,
        /\.(png|jpe?g|svg|gif)$/
      )
    ),
  },
  {
    label: "Grenouilles",
    path: "../public/assets/images/grenouilles",
    images: importAll(
      require.context(
        "../public/assets/images/grenouilles",
        false,
        /\.(png|jpe?g|svg|gif)$/
      )
    ),
  },
  {
    label: "Panda",
    path: "../public/assets/images/panda",
    images: importAll(
      require.context(
        "../public/assets/images/panda",
        false,
        /\.(png|jpe?g|svg|gif)$/
      )
    ),
  },
  {
    label: "Pepe",
    path: "../public/assets/images/pepe",
    images: importAll(
      require.context(
        "../public/assets/images/pepe",
        false,
        /\.(png|jpe?g|svg|gif)$/
      )
    ),
  },

  {
    label: "Pokémon",
    path: "../public/assets/images/pokémon",
    images: importAll(
      require.context(
        "../public/assets/images/pokémon",
        false,
        /\.(png|jpe?g|svg|gif)$/
      )
    ),
  },
  {
    label: "Rats",
    path: "../public/assets/images/rats",
    images: importAll(
      require.context(
        "../public/assets/images/rats",
        false,
        /\.(png|jpe?g|svg|gif)$/
      )
    ),
  },
];

const App = () => {
  return (
    <Container maxW="4xl" centerContent>
      <Tabs isLazy>
        <TabList>
          <SimpleGrid columns={{ base: 3, sm: 4, md: 6, lg: 8, xl: 8 }}>
            {imageDirs.map(({ label }) => (
              <Box key={label}>
                <Tab key={label}>{label}</Tab>
              </Box>
            ))}
          </SimpleGrid>
        </TabList>

        <TabPanels>
          {imageDirs.map(({ label, images }) => (
            <TabPanel key={label}>
              <SimpleGrid
                columns={{ base: 3, sm: 3, md: 4, lg: 5, xl: 5 }}
                spacing={10}
              >
                {images.map((src, index) => (
                  <Box key={index} width={64}>
                    <Image
                      src={src}
                      alt=""
                      boxSize="64px"
                      htmlHeight="64px"
                      // style={minWidth: ""}
                      loading="lazy"
                    />
                  </Box>
                ))}
              </SimpleGrid>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default App;
