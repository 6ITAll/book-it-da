import { useState } from 'react';
import HybridDialog, {
  DialogWithActionProps,
  DialogWithOutActionProps,
} from './HybridDialog';
import { Button, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

type HybridDialogStoryArgs =
  | Omit<DialogWithActionProps, 'open' | 'setOpen'>
  | Omit<DialogWithOutActionProps, 'open' | 'setOpen'>;

const HybridDialogStoryWrapper = ({ ...args }: HybridDialogStoryArgs) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
      >
        Open Dialog
      </Button>
      <HybridDialog {...args} open={open} setOpen={setOpen} />
    </>
  );
};

const meta = {
  component: HybridDialogStoryWrapper,
  argTypes: {
    maxWidth: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<HybridDialogStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Dialog',
    contentNode: <Typography>This is the content of the dialog.</Typography>,
    fullScreen: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));

    const dialog = within(document.getElementById('root')!).queryByRole(
      'dialog',
    );
    await expect(dialog).toBeInTheDocument();
  },
};
