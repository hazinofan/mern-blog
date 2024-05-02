import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function CreatePost() {
    return (
      <div className='p-3 max-w-3xl mx-auto min-h-screen'>
          <h1 className='text-3xl my-7 font-semibold text-center'>Create a post</h1>
          <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 sm:flex-row justify-between"> 
                  <TextInput type='text' placeholder='Title' required id='title' className='flex-1' />
                  <Select>
                      <option value='uncategorized'>Select a Category</option>
                      <option value='coding'>Coding</option>
                      <option value='health'>Health & Fitness</option>
                      <option value='technology'>Technology & Gadgets</option>
                      <option value='travel'>Travel & Adventure</option>
                      <option value='fashion'>Fashion & Style</option>
                      <option value='food'>Food & Recipes</option>
                      <option value='art'>Arts & Crafts</option>
                      <option value='finance'>Finance & Investment</option>
                      <option value='education'>Education & Learning</option>
                  </Select>
              </div>
              <div className="flex gap-4 items-center justify-between border-4
               border-teal-500 border-dotted p-3 mt-8">
                  <FileInput type='file' accept='image/*' />
                  <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>Upload Image</Button>
              </div>
              <ReactQuill theme='snow' placeholder='Write Something...' className='h-72 mt-12' required/>
              <Button className='mt-12' type='button' gradientDuoTone='purpleToBlue' outline > Publish </Button>
          </form>
      </div>
    )
  }
  
  export default CreatePost;
  