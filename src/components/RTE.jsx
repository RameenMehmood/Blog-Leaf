import React from 'react'
import { Controller } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'
import conf from "../conf/conf";


function RTE({name,control,label,defaultValue=""}) {
  const apiKey = conf.tinymce;
  return (
    <>
        {label && <label  className='font-size' >{label}</label>}

        <div className="editor">
        <Controller
        
        name={name || "content"}
        control={control}
        render={({field : {onChange}})=>(
            <Editor
            apiKey={apiKey}
            initialValue={defaultValue}
            init={{
                height: 500,
                menubar: true,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:13px }'
            }}
            onEditorChange={onChange}
            
            />
        )}

        />
        </div>
    </>
  )
}

export default RTE
