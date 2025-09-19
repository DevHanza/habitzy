import { useState } from "react";
import { EmojiPicker } from "frimousse";
import { IconButton, Popover, Portal } from "@chakra-ui/react";
import { SmilePlus } from "lucide-react";
import "./EmojiPickerButton.css";

function EmojiPickerButton() {
  const [open, setOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  return (
    <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Popover.Trigger asChild>
        <IconButton
          size="xs"
          fontSize={"1rem"}
          variant={"outline"}
          aria-label="Pick emoji"
        >
          {selectedEmoji || <SmilePlus />}
        </IconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content width={"auto"} className={"emojipicker"}>
            <Popover.Arrow />
            <Popover.Body py={4} px={3}>
              {/* Emoji Picker - Start */}
              <EmojiPicker.Root
                onEmojiSelect={(data) => {
                  setSelectedEmoji(data.emoji);
                }}
              >
                <EmojiPicker.Search />
                <EmojiPicker.Viewport style={{ height: "326px" }}>
                  <EmojiPicker.Loading>Loading…</EmojiPicker.Loading>
                  <EmojiPicker.Empty>No emoji found.</EmojiPicker.Empty>
                  <EmojiPicker.List />
                </EmojiPicker.Viewport>
              </EmojiPicker.Root>

              {/* Emoji Picker - End */}
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}

export default EmojiPickerButton;
