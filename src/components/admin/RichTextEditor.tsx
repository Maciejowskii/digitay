"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, Heading2, Heading3, List, ListOrdered, Quote, Code, Strikethrough, RemoveFormatting } from 'lucide-react';
import { useEffect, useState } from 'react';

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const ToolbarBtn = ({ onClick, isActive, disabled = false, children }: any) => (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      disabled={disabled}
      className={`p-2 transition-colors border-r border-zinc-300 focus:outline-none flex items-center justify-center
        ${isActive ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-wrap border-b border-zinc-400 bg-white items-center">
      <ToolbarBtn 
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
        isActive={editor.isActive('heading', { level: 2 })}
      >
        <Heading2 className="w-4 h-4" />
      </ToolbarBtn>
      <ToolbarBtn 
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} 
        isActive={editor.isActive('heading', { level: 3 })}
      >
        <Heading3 className="w-4 h-4" />
      </ToolbarBtn>
      
      <div className="w-[1px] h-6 bg-zinc-300 mx-1"></div>
      
      <ToolbarBtn 
        onClick={() => editor.chain().focus().toggleBold().run()} 
        isActive={editor.isActive('bold')}
      >
        <Bold className="w-4 h-4" />
      </ToolbarBtn>
      <ToolbarBtn 
        onClick={() => editor.chain().focus().toggleItalic().run()} 
        isActive={editor.isActive('italic')}
      >
        <Italic className="w-4 h-4" />
      </ToolbarBtn>
      <ToolbarBtn 
        onClick={() => editor.chain().focus().toggleStrike().run()} 
        isActive={editor.isActive('strike')}
      >
        <Strikethrough className="w-4 h-4" />
      </ToolbarBtn>

      <div className="w-[1px] h-6 bg-zinc-300 mx-1"></div>

      <ToolbarBtn 
        onClick={() => editor.chain().focus().toggleBulletList().run()} 
        isActive={editor.isActive('bulletList')}
      >
        <List className="w-4 h-4" />
      </ToolbarBtn>
      <ToolbarBtn 
        onClick={() => editor.chain().focus().toggleOrderedList().run()} 
        isActive={editor.isActive('orderedList')}
      >
        <ListOrdered className="w-4 h-4" />
      </ToolbarBtn>
      <ToolbarBtn 
        onClick={() => editor.chain().focus().toggleBlockquote().run()} 
        isActive={editor.isActive('blockquote')}
      >
        <Quote className="w-4 h-4" />
      </ToolbarBtn>
      <ToolbarBtn 
        onClick={() => editor.chain().focus().toggleCodeBlock().run()} 
        isActive={editor.isActive('codeBlock')}
      >
        <Code className="w-4 h-4" />
      </ToolbarBtn>

      <div className="w-[1px] h-6 bg-zinc-300 mx-1"></div>
      
      <ToolbarBtn onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>
        <RemoveFormatting className="w-4 h-4" />
      </ToolbarBtn>
    </div>
  );
};

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
         heading: {
            levels: [2, 3],
         },
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose-custom min-h-[250px] focus:outline-none p-4 font-mono text-sm leading-relaxed text-zinc-900',
      },
    },
  });

  // Watch for external value changes (like form resets or async dataload)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
       // Optional: we can check if the editor is focused, to prevent overwriting active typing
       // But typically for complete controlled component we might need deeper syncing. 
       // For this simple admin form, setting content on load is enough.
       // editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="border border-zinc-400 bg-white rounded-none flex flex-col focus-within:ring-2 focus-within:ring-zinc-900 focus-within:border-zinc-900 transition-all w-full shadow-sm">
      <MenuBar editor={editor} />
      
      {/* 
        Tech Brutalism Base Typography mapped to Tiptap Elements 
        Since we might not use @tailwindcss/typography plugins globally, 
        we'll inject local CSS here for the editor content specifically.
      */}
      <style jsx global>{`
        .prose-custom {
          outline: none;
        }
        .prose-custom h2 {
          font-family: inherit;
          font-weight: 900;
          font-size: 1.5rem;
          text-transform: uppercase;
          letter-spacing: -0.05em;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }
        .prose-custom h3 {
          font-family: inherit;
          font-weight: 700;
          font-size: 1.125rem;
          text-transform: uppercase;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }
        .prose-custom p {
          margin-bottom: 1rem;
        }
        .prose-custom ul {
          list-style-type: square;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .prose-custom ol {
          list-style-type: decimal-leading-zero;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .prose-custom li {
          margin-bottom: 0.25rem;
        }
        .prose-custom blockquote {
          border-left: 4px solid #18181b; /* zinc-900 */
          padding-left: 1rem;
          margin-left: 0;
          margin-right: 0;
          font-style: italic;
          color: #52525b; /* zinc-500 */
        }
        .prose-custom pre {
          background-color: #18181b;
          color: #f4f4f5;
          padding: 1rem;
          border-radius: 0;
          overflow-x: auto;
          font-family: monospace;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }
        .prose-custom code {
          background-color: #f4f4f5;
          padding: 0.125rem 0.25rem;
          font-family: monospace;
          font-size: 0.875em;
        }
        .prose-custom pre code {
          background-color: transparent;
          padding: 0;
        }
        /* ProseMirror specific placeholder classes if needed */
        .ProseMirror p.is-editor-empty:first-child::before {
          content: '${placeholder || "Zacznij pisać..."}';
          float: left;
          color: #3f3f46; /* zinc-700 */
          pointer-events: none;
          height: 0;
        }
      `}</style>
      
      <div className="bg-white border-t border-zinc-400 min-h-[250px]">
        {isMounted ? (
           <EditorContent editor={editor} className="cursor-text h-full" />
        ) : (
           <div className="p-4 text-zinc-500 font-mono text-sm">Ładowanie edytora...</div>
        )}
      </div>
    </div>
  );
}
