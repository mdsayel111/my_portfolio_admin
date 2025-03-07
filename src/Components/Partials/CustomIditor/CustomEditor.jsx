import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./CustomEditor.css"

function CustomEditor({value, setValue}) {

  console.log(value)

  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}

export default CustomEditor