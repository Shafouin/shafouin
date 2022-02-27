import React from "react";
import { Box, IconButton, Image, Tooltip, useToast } from "@chakra-ui/react";
import { CopyIcon, DownloadIcon } from "@chakra-ui/icons";
import { copyImageToClipboard } from "copy-image-clipboard";

const ImageWrapper = ({ imgSrc }) => {
  // const mounted = React.useRef(false);
  const [mounted, setMounted] = React.useState(false);
  const toast = useToast();

  /**
   * Only works when https is active
   * Also copying to clipboard is currently opt-in in firefox ?..
   */
  const handleCopyImg = () => {
    if (imgSrc) {
      copyImageToClipboard(imgSrc)
        .then(() => {
          toast.closeAll();
          toast({
            title: "Image copiée.",
            description:
              "Tu peux maintenant la coller dans un appli de tchat par exemple, c'est dingue.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((e) => {
          toast.closeAll();
          toast({
            title: "OOPSIE WOOPSIE!!",
            description:
              "Uwu We make a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          console.error("Error: ", e.message);
        });
    }
  };

  /**
   * Delay button rendering because it's womehow very slow
   */
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box width={64}>
      <Image
        src={imgSrc}
        alt=""
        boxSize="64px"
        htmlHeight="64px"
        loading="lazy"
      />

      {mounted === true && (
        <Box pt={2}>
          {/* Only jpeg and png files can be copied to clipboard */}
          {imgSrc.match(/.+?\.(jpg|jpeg|png)/i) && (
            <Tooltip label="Copier">
              <IconButton
                size="xs"
                icon={<CopyIcon />}
                onClick={handleCopyImg}
              />
            </Tooltip>
          )}
          &nbsp;
          <Tooltip label="Télécharger">
            <IconButton
              as="a"
              size="xs"
              icon={<DownloadIcon />}
              download
              href={imgSrc}
            />
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default ImageWrapper;
