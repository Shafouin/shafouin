import React from "react";
import { Box, IconButton, Image, Tooltip } from "@chakra-ui/react";
import { CopyIcon, DownloadIcon } from "@chakra-ui/icons";
import { copyImageToClipboard } from "copy-image-clipboard";

const ImageWrapper = ({ imgSrc }) => {
  // const mounted = React.useRef(false);
  const [mounted, setMounted] = React.useState(false);

  /**
   * Onlky works when https is active
   */
  const handleCopyImg = () => {
    copyImageToClipboard(imgSrc).catch((e) => {
      console.error("Error: ", e.message);
    });
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
