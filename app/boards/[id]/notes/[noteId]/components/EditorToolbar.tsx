'use client';

type EditorToolbarType = {
  onExecute: (prefix: string, postfix: string,  comm: string) => void;
};

export default function EditorToolbar({ ...props }: EditorToolbarType) {
  const executeCommand = (
    comm:
      | 'heading'
      | 'bold'
      | 'italic'
      | 'strikethrough'
      | 'quote'
      | 'code'
      | 'link'
      | 'unordered-list'
      | 'ordered-list'
      | 'image'
  ) => {
    switch (comm) {
      case 'heading':
        props.onExecute('# ', '', comm);
        break;
      case 'bold':
        props.onExecute('**', '**', comm);
        break;
      case 'italic':
        props.onExecute('_', '_', comm);
        break;
      case 'strikethrough':
        props.onExecute('~~', '~~', comm);
        break;
      case 'quote':
        props.onExecute('> ', '', comm);
        break;
      case 'code':
        props.onExecute('`', '`', comm);
        break;
      case 'link':
        props.onExecute('[', '](url)', comm);
        break;
      case 'unordered-list':
        props.onExecute('- ', '', comm);
        break;
      case 'ordered-list':
        props.onExecute('1. ', '', comm);
        break;
      case 'image':
        props.onExecute('![', '](url)', comm);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <li className="nav-item ms-auto">
        <button
          className="nav-link"
          title="Heading"
          onClick={() => executeCommand('heading')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-heading"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 12h10" />
            <path d="M7 5v14" />
            <path d="M17 5v14" />
            <path d="M15 19h4" />
            <path d="M15 5h4" />
            <path d="M5 19h4" />
            <path d="M5 5h4" />
          </svg>
        </button>
      </li>
      <li className="nav-item">
        <button
          className="nav-link"
          title="Bold"
          onClick={() => executeCommand('bold')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-bold"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 5h6a3.5 3.5 0 0 1 0 7h-6z" />
            <path d="M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7" />
          </svg>
        </button>
      </li>
      <li className="nav-item">
        <button
          className="nav-link"
          title="Italic"
          onClick={() => executeCommand('italic')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-italic"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M11 5l6 0" />
            <path d="M7 19l6 0" />
            <path d="M14 5l-4 14" />
          </svg>
        </button>
      </li>
      <li className="nav-item">
        <button
          className="nav-link"
          title="Strikethrough"
          onClick={() => executeCommand('strikethrough')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-strikethrough"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M16 6.5a4 2 0 0 0 -4 -1.5h-1a3.5 3.5 0 0 0 0 7h2a3.5 3.5 0 0 1 0 7h-1.5a4 2 0 0 1 -4 -1.5" />
          </svg>
        </button>
      </li>
      <li className="nav-item">
        <button
          className="nav-link"
          title="Quote"
          onClick={() => executeCommand('quote')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-blockquote"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 15h15" />
            <path d="M21 19h-15" />
            <path d="M15 11h6" />
            <path d="M21 7h-6" />
            <path d="M9 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2" />
            <path d="M3 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2" />
          </svg>
        </button>
      </li>
      <li className="nav-item">
        <button
          className="nav-link"
          title="Code"
          onClick={() => executeCommand('code')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-code"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 8l-4 4l4 4" />
            <path d="M17 8l4 4l-4 4" />
            <path d="M14 4l-4 16" />
          </svg>
        </button>
      </li>
      <li className="nav-item border-end">
        <a
          className="nav-link"
          title="Link"
          onClick={() => executeCommand('link')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-link"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 15l6 -6" />
            <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
            <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
          </svg>
        </a>
      </li>
      <li className="nav-item">
        <button
          className="nav-link"
          title="Ordered List"
          onClick={() => executeCommand('ordered-list')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-list-numbers"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M11 6h9" />
            <path d="M11 12h9" />
            <path d="M12 18h8" />
            <path d="M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4" />
            <path d="M6 10v-6l-2 2" />
          </svg>
        </button>
      </li>
      <li className="nav-item border-end">
        <button
          className="nav-link"
          title="Unordered List"
          onClick={() => executeCommand('unordered-list')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-list"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 6l11 0" />
            <path d="M9 12l11 0" />
            <path d="M9 18l11 0" />
            <path d="M5 6l0 .01" />
            <path d="M5 12l0 .01" />
            <path d="M5 18l0 .01" />
          </svg>
        </button>
      </li>
      <li className="nav-item ">
        <button
          className="nav-link"
          title="Image"
          onClick={() => executeCommand('image')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-photo"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 8h.01" />
            <path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z" />
            <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" />
            <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" />
          </svg>
        </button>
      </li>
    </>
  );
}
