import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Box, styled } from '@mui/material';

interface TextEditorProps {
  value: string;
  setValue: (value: string) => void;
  width?: string;
  height?: string;
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

const TextEditorContainer = styled(Box)<{
  editorWidth?: string;
  editorHeight?: string;
}>(({ editorWidth, editorHeight }) => ({
  '& .ql-editor': {
    width: editorWidth || '100%',
    height: editorHeight || '300px',
    backgroundColor: 'inherit',
  },
  '& .ql-container': {
    borderRadius: '0 0 8px 8px',
  },
  '& .ql-toolbar': {
    borderRadius: '8px 8px 0 0',
  },
}));

const TextEditor = ({
  value,
  setValue,
  width,
  height,
}: TextEditorProps): JSX.Element => {
  return (
    <TextEditorContainer editorWidth={width} editorHeight={height}>
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
