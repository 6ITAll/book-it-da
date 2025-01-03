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

class DefaultPlayNotFoundError extends Error {
  constructor() {
    super('Default 스토리의 play 함수가 존재하지 않습니다.');
    this.name = 'DefaultPlayNotFoundError';
  }
}

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Dialog',
    contentNode: <Typography>This is the content of the dialog.</Typography>,
    fullScreen: false,
  },
  play: async ({ context, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));

    const dialog = within(document.getElementById('root')!).queryByRole(
      'dialog',
    );
    await expect(dialog).toBeInTheDocument();

    context.dialog = dialog;
  },
};

export const WithBackButton: Story = {
  args: {
    title: 'Dialog with Back Button',
    contentNode: <Typography>This dialog has a back button.</Typography>,
    onBack: () => console.log('Back button clicked'),
  },
  play: async ({ context }) => {
    if (!Default.play) throw new DefaultPlayNotFoundError();
    await Default.play(context);

    const dialog = context.dialog;
    const backButton = within(dialog).getByRole('button', {
      name: /back/i,
    });
    await expect(backButton).toBeInTheDocument();
  },
};

export const WithAction: Story = {
  args: {
    title: 'Dialog with Action',
    contentNode: <Typography>This dialog has a Action.</Typography>,
    action: 'Action',
    onActionClick: () => console.log('Action button clicked'),
  },
  play: async ({ context }) => {
    if (!Default.play) throw new DefaultPlayNotFoundError();
    await Default.play(context);

    const dialog = context.dialog;
    const actionButton = within(dialog).getByRole('button', {
      name: /action/i,
    });
    await expect(actionButton).toBeInTheDocument();
  },
};

