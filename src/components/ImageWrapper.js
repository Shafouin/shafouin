import React from "react";
import { Box, IconButton, Image, Tooltip, useToast } from "@chakra-ui/react";
import { CopyIcon, DownloadIcon } from "@chakra-ui/icons";
import { copyImageToClipboard } from "copy-image-clipboard";

const ImageWrapper = ({ imgSrc, isMobile, canCopyImagesToClipboard }) => {
  const [mounted, setMounted] = React.useState(false);
  const toast = useToast();

  // FIXME: could show copy button for gifs and always copy link

  /**
   * Only works when https is active
   * Also copying to clipboard is currently opt-in in firefox.. could add instructions in the error message
   * On mobile will copy a link to storage ? so maybe default to copying the URL
   */
  const handleCopyImg = () => {
    if (imgSrc) {
      /**
       * On mobile or when copying image to clipboard is not supported, copy URL to clipboard
       */
      if (isMobile || !canCopyImagesToClipboard) {
        navigator.clipboard
          .writeText("https://shafouin.github.io" + imgSrc)
          .then(() => {
            showWriteToClipboardSuccessToast();
          })
          .catch((err) => {
            showWriteToClipboardErrorToast();
            console.error("Error: " + err.message);
          });

        /**
         * Else copy img to clipboard
         */
      } else {
        copyImageToClipboard(imgSrc)
          .then(() => {
            showWriteToClipboardSuccessToast();
          })
          .catch((err) => {
            showWriteToClipboardErrorToast();
            console.error("Error: " + err.message);
          });
      }
    } else {
      showWriteToClipboardErrorToast();
      console.error("Error: no image src.");
    }
  };

  const showWriteToClipboardSuccessToast = () => {
    toast.closeAll();
    toast({
      title: "Image copiée.",
      description:
        "Tu peux maintenant la coller dans un appli de tchat par exemple, c'est dingue.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const showWriteToClipboardErrorToast = () => {
    toast.closeAll();
    toast({
      title: "OOPSIE WOOPSIE!!",
      description:
        "Uwu We make a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!.",
      status: "error",
      duration: 9000,
      isClosable: true,
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
            // If on device that does not support well image buffers, show different text
            <Tooltip
              label={
                isMobile || !canCopyImagesToClipboard
                  ? "Copier le lien"
                  : "Copier"
              }
            >
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
