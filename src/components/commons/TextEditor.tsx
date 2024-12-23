import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Box, styled } from '@mui/material';

interface TextEditorProps {
  value: string;
  setValue: (value: string) => void;
}

const formats = [
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'color',
  'background',
  'image',
  'blockquote',
  'code-block',
];

const modules = {
  toolbar: [
    [{ list: 'ordered' }, { list: 'bullet' }],
    [],
    ['bold', 'italic', 'underline', 'strike'],
    [],
    [{ color: [] }, { background: [] }],
    [],
    ['image', 'blockquote'],
  ],
};

const TextEditorContainer = styled(Box)(() => ({
  '& .ql-editor': {
    width: '100%',
    height: '300px',
    backgroundColor: 'inherit',
  },
  '& .ql-container': {
    borderRadius: '0 0 8px 8px',
  },
  '& .ql-toolbar': {
    borderRadius: '8px 8px 0 0',
  },
}));

const TextEditor = ({ value, setValue }: TextEditorProps): JSX.Element => {
  return (
    <TextEditorContainer>
      <ReactQuill
        value={value}
        onChange={setValue}
        formats={formats}
        modules={modules}
      />
    </TextEditorContainer>
  );
};

export default TextEditor;
