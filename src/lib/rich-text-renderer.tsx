/**
 * Rich text renderer for Payload CMS Lexical content
 */

import React from 'react';

interface RichTextNode {
  type: string;
  version?: number;
  children?: RichTextNode[];
  text?: string;
  format?: number;
  tag?: string;
  url?: string;
  rel?: string;
  target?: string;
}

interface RichTextContent {
  root: {
    type: string;
    children: RichTextNode[];
    direction: string;
    format: string;
    indent: number;
    version: number;
  };
}

/**
 * Render rich text content from Payload CMS
 */
export function renderRichText(content: RichTextContent | null | undefined): React.ReactNode {
  if (!content) {
    return null;
  }

  // Handle different content structures
  if (typeof content === 'string') {
    return <p>{content}</p>;
  }

  if (!content.root?.children) {
    return null;
  }

  try {
    return renderNodes(content.root.children);
  } catch (error) {
    console.error('Error rendering rich text:', error);
    return <p className="text-red-600">Error rendering content</p>;
  }
}

function renderNodes(nodes: RichTextNode[]): React.ReactNode {
  return nodes.map((node, index) => renderNode(node, index));
}

function renderNode(node: RichTextNode, key: number): React.ReactNode {
  if (!node) {
    return null;
  }

  // Text node
  if (node.text !== undefined) {
    let text: React.ReactNode = node.text;

    // Apply formatting
    if (node.format) {
      if (node.format & 1) text = <strong key={key}>{text}</strong>; // Bold
      if (node.format & 2) text = <em key={key}>{text}</em>; // Italic
      if (node.format & 8) text = <u key={key}>{text}</u>; // Underline
    }

    return text;
  }

  // Element nodes
  switch (node.type) {
    case 'paragraph':
      return (
        <p key={key} className="mb-4">
          {node.children && renderNodes(node.children)}
        </p>
      );

    case 'heading':
      const headingTag = node.tag || 'h2';
      const headingClasses = {
        h1: 'text-4xl font-bold mb-6',
        h2: 'text-3xl font-bold mb-4',
        h3: 'text-2xl font-bold mb-3',
        h4: 'text-xl font-bold mb-2',
        h5: 'text-lg font-bold mb-2',
        h6: 'text-base font-bold mb-2',
      };

      const className = headingClasses[headingTag as keyof typeof headingClasses] || headingClasses.h2;

      switch (headingTag) {
        case 'h1':
          return <h1 key={key} className={className}>{node.children && renderNodes(node.children)}</h1>;
        case 'h2':
          return <h2 key={key} className={className}>{node.children && renderNodes(node.children)}</h2>;
        case 'h3':
          return <h3 key={key} className={className}>{node.children && renderNodes(node.children)}</h3>;
        case 'h4':
          return <h4 key={key} className={className}>{node.children && renderNodes(node.children)}</h4>;
        case 'h5':
          return <h5 key={key} className={className}>{node.children && renderNodes(node.children)}</h5>;
        case 'h6':
          return <h6 key={key} className={className}>{node.children && renderNodes(node.children)}</h6>;
        default:
          return <h2 key={key} className={className}>{node.children && renderNodes(node.children)}</h2>;
      }

    case 'list':
      const ListTag = node.tag === 'ol' ? 'ol' : 'ul';
      const listClasses = ListTag === 'ol' ? 'list-decimal list-inside mb-4' : 'list-disc list-inside mb-4';

      return (
        <ListTag key={key} className={listClasses}>
          {node.children && renderNodes(node.children)}
        </ListTag>
      );

    case 'listitem':
      return (
        <li key={key} className="mb-1">
          {node.children && renderNodes(node.children)}
        </li>
      );

    case 'link':
      return (
        <a
          key={key}
          href={node.url}
          rel={node.rel}
          target={node.target}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {node.children && renderNodes(node.children)}
        </a>
      );

    case 'linebreak':
      return <br key={key} />;

    default:
      // For unknown node types, render children if they exist
      return node.children ? (
        <span key={key}>{renderNodes(node.children)}</span>
      ) : null;
  }
}