import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Box, styled } from '@mui/material';
import { useEffect, useRef } from 'react';

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
  'align',
  'header',
  'size',
];

const modules = {
  toolbar: [
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ['image', 'blockquote'],
    [{ header: [1, 2, 3, false] }],
    [{ size: ['small', false, 'large', 'huge'] }],
  ],
};

const TextEditorContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  '& .quill': {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  '& .ql-container.ql-snow': {
    flex: '1 1 auto',
    border: 'none',
    borderRadius: '0 0 8px 8px',
  },
  '& .ql-editor': {
    flex: '1 1 auto',
  },
  '& .ql-toolbar.ql-snow': {
    border: 'none',
    borderBottom: '1px solid #ccc',
    borderRadius: '8px 8px 0 0',
  },
  '& .ql-editor.ql-blank::before': {
    color: '#999',
    fontStyle: 'normal',
    textAlign: 'center',
  },
});

const TextEditor = ({ value, setValue }: TextEditorProps): JSX.Element => {
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.getEditor().root.dataset.placeholder =
        '내용을 입력하세요';
    }
  }, []);

  return (
    <TextEditorContainer>
      <ReactQuill
        value={value}
        onChange={setValue}
        formats={formats}
        modules={modules}
        placeholder="내용을 입력하세요"
      />
    </TextEditorContainer>
  );
};

export default TextEditor;
