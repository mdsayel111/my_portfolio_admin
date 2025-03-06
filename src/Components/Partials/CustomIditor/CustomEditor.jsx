import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

function CustomEditor({ setState, data }) {
    return (
        <div className="custom_editor">
            <CKEditor
                editor={ClassicEditor}
                data={data}
                onChange={(event, editor) => {
                    setState(editor.getData());
                }}
            />
        </div>
    );
}

export default CustomEditor;